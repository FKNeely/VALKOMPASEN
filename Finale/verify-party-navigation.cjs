// Real-browser checks for booth switching and separate conversations. Requires local Chrome.
const {spawn} = require('node:child_process');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'valkompanjonen-party-navigation-'));
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', '--user-data-dir=' + path.join(output, 'profile'), 'about:blank',
], {windowsHide:true, stdio:['ignore','ignore','pipe']});
let socket, requestId = 0, session;
const pending = new Map();
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function call(method, params = {}, sessionId = session) {
  return new Promise((resolve, reject) => {
    const id = ++requestId;
    pending.set(id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params, ...(sessionId ? {sessionId} : {})}));
  });
}
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true});
  if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function click(selector) {
  return evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
}
async function checkLayout(width, height) {
  const layout = await evaluate(`(() => {
    const rect = id => {const r=document.getElementById(id).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width};};
    return {nav:rect('partyChatNavigation'),back:rect('partyBack'),heading:rect('partyShortcutsTitle'),chat:rect('partyChat'),form:rect('partyChatForm'),
      rows:Array.from(partyShortcutList.querySelectorAll('button')).map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,bottom:r.bottom,height:r.height};}),
      logos:Array.from(partyShortcutList.querySelectorAll('img')).map(img=>({loaded:img.naturalWidth>0,width:img.width,height:img.height})),
      viewport:[innerWidth,innerHeight],page:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],
      noOverflow:document.documentElement.scrollWidth<=innerWidth && document.documentElement.scrollHeight<=innerHeight,
      navNoScroll:partyChatNavigation.scrollHeight<=partyChatNavigation.clientHeight,
      bullets:getComputedStyle(partyShortcutList).listStyleType};
  })()`);
  assert(layout.noOverflow, `${width} × ${height}: page overflow ${JSON.stringify(layout)}`);
  assert(layout.nav.left > layout.chat.right && layout.nav.left > layout.form.right, 'Navigation must be to the right of the chat');
  assert(layout.chat.width >= 750 && layout.form.width >= 750, 'Conversation must keep its laptop width');
  assert(layout.nav.width >= 200 && layout.nav.width <= 220);
  assert(layout.navNoScroll && layout.bullets === 'none');
  assert(layout.nav.bottom < height && layout.form.bottom < height);
  assert(layout.rows.length === 7 && layout.rows.every(row => row.left >= layout.nav.left && row.right <= layout.nav.right && row.bottom < height && row.height >= 36 && row.height <= 40));
  assert(layout.logos.every(logo => logo.loaded && logo.width === 24 && logo.height === 24));
  return layout;
}

(async () => {
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let log = '';
      const timeout = setTimeout(() => reject(Error('Chrome startup timeout')), 15000);
      chrome.stderr.on('data', chunk => {
        log += chunk;
        const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) {clearTimeout(timeout); resolve(match[1]);}
      });
      chrome.on('error', reject);
    });
    socket = new WebSocket(endpoint);
    await new Promise(resolve => socket.addEventListener('open', resolve));
    socket.addEventListener('message', event => {
      const result = JSON.parse(event.data), task = pending.get(result.id);
      if (!task) return;
      pending.delete(result.id);
      if (result.error) task.reject(Error(JSON.stringify(result.error)));
      else task.resolve(result.result);
    });
    const target = await call('Target.createTarget', {url:'about:blank'}, null);
    session = (await call('Target.attachToTarget', {targetId:target.targetId, flatten:true}, null)).sessionId;
    await call('Page.enable');
    const layouts = [];
    for (const [width, height] of [[1440,900],[1366,768]]) {
      await call('Emulation.setDeviceMetricsOverride', {width,height,deviceScaleFactor:1,mobile:false});
      await call('Page.navigate', {url:pathToFileURL(path.resolve('index.html')).href});
      let ready = false;
      for (let attempt=0; attempt<100; attempt++) {
        ready = await evaluate('document.readyState === "complete" && typeof openPartyChat === "function"');
        if (ready) break;
        await delay(100);
      }
      assert(ready, 'App did not load');
      await evaluate('Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,1500))])');
      await click('#partyViewButton');
      await click('.party-option[data-party="Socialdemokraterna"]');
      const inspect = () => evaluate(`({title:partyChatTitle.textContent,logo:partyChatLogo.getAttribute('src'),theme:partyView.style.getPropertyValue('--party-chat-accent'),parties:Array.from(partyShortcutList.querySelectorAll('button')).map(el=>el.dataset.partyShortcut),count:partyChatLog.children.length,draft:partyChatInput.value})`);
      let current = await inspect();
      assert.equal(current.parties.length, 7);
      assert(!current.parties.includes('Socialdemokraterna'));
      assert.equal(current.count, 0);
      layouts.push({width,height,empty:await checkLayout(width,height)});
      await click('[data-party-question]');
      await evaluate(`partyChatLog.querySelector('.party-answer-toggle').click();partyChatLog.querySelector('.debate-like-button').click();partyChatInput.value='Skolfråga till S';partyChatInput.dispatchEvent(new Event('input'));`);
      await evaluate('partyChatLog.scrollTop=55');
      const originalScroll = await evaluate('partyChatLog.scrollTop');
      const original = await evaluate(`partyChatLog.querySelector('.party-answer-summary').textContent`);
      await click('[data-party-shortcut="Moderaterna"]');
      current = await inspect();
      assert.equal(current.title, 'Moderaterna Valstuga');
      assert.equal(current.logo, 'assets/parties/moderaterna.png');
      assert.equal(current.theme, '#24528a');
      assert.equal(current.count, 0);assert.equal(current.draft, '');
      assert(!current.parties.includes('Moderaterna') && current.parties.includes('Socialdemokraterna'));
      await click('[data-party-question]');
      await evaluate(`partyChatInput.value='Skolfråga till M';partyChatInput.dispatchEvent(new Event('input'));`);
      const moderatorAnswer = await evaluate(`partyChatLog.querySelector('.party-answer-summary').textContent`);
      assert.notEqual(moderatorAnswer, original);
      await click('[data-party-shortcut="Socialdemokraterna"]');
      current = await inspect();
      assert.equal(current.count, 2);assert.equal(current.draft, 'Skolfråga till S');
      assert.equal(await evaluate(`partyChatLog.querySelector('.party-answer-summary').textContent`), original);
      assert.equal(await evaluate(`partyChatLog.querySelector('.party-answer-details').hidden`), false);
      assert.equal(await evaluate('partyChatLog.scrollTop'), originalScroll);
      assert.equal(await evaluate(`partyChatLog.querySelector('.debate-like-button').getAttribute('aria-pressed')`), 'true');
      assert.equal(await evaluate(`getComputedStyle(partyChatLog.querySelector('.party-answer-content')).backgroundColor`), 'rgb(169, 30, 64)');
      const allParties = await evaluate('Object.keys(partyProfiles)');
      for (const party of allParties.filter(p => p !== 'Socialdemokraterna')) {
        await click(`[data-party-shortcut="${party}"]`);
        current = await inspect();
        assert.equal(current.title, party + ' Valstuga');
        assert.equal(current.parties.length, 7);assert(!current.parties.includes(party));
      }
      await click('[data-party-shortcut="Moderaterna"]');
      current = await inspect();
      assert.equal(current.count, 2);assert.equal(current.draft, 'Skolfråga till M');
      assert.equal(await evaluate(`partyChatLog.querySelector('.party-answer-summary').textContent`), moderatorAnswer);
      await click('#partyBack');
      assert.equal(await evaluate('partyChatNavigation.hidden && !partyPicker.hidden'), true);
      await click('.party-option[data-party="Moderaterna"]');
      assert.equal((await inspect()).count, 2);
      await click('#debateViewButton');await click('#partyViewButton');
      await click('.party-option[data-party="Socialdemokraterna"]');
      assert.equal((await inspect()).draft, 'Skolfråga till S');
      // Detached messages must reflect likes removed while in another booth.
      await click('[data-party-shortcut="Moderaterna"]');
      await evaluate(`setDebateMessageLiked(likedDebateMessages.find(message=>message.context==='Valstuga'&&message.partyName==='Socialdemokraterna'),false)`);
      await click('[data-party-shortcut="Socialdemokraterna"]');
      assert.equal(await evaluate(`partyChatLog.querySelector('.debate-like-button').getAttribute('aria-pressed')`), 'false');
      await evaluate('partyChatLog.scrollTop=0;document.activeElement.blur()');
      layouts.at(-1).withMessages = await checkLayout(width,height);
      await call('Input.dispatchKeyEvent', {type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      await call('Input.dispatchKeyEvent', {type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      const focus = await evaluate(`(()=>{const button=partyShortcutList.querySelector('button');button.focus();return {visible:button.matches(':focus-visible'),outline:getComputedStyle(button).outlineWidth};})()`);
      assert(focus.visible && focus.outline === '2px');
      await evaluate('document.activeElement.blur()');
      const hoverPoint = await evaluate(`(()=>{const r=partyShortcutList.querySelector('button').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
      await call('Input.dispatchMouseEvent', {type:'mouseMoved',...hoverPoint});
      assert.equal(await evaluate(`getComputedStyle(partyShortcutList.querySelector('button')).backgroundColor`), 'rgb(242, 231, 217)');
      await call('Input.dispatchMouseEvent', {type:'mouseMoved',x:width-30,y:height-30});
      await evaluate(`document.activeElement.blur();partyChatLog.querySelector('.party-answer-toggle').click();partyChatLog.scrollTop=0;`);
      await delay(300);
      const screenshot = await call('Page.captureScreenshot', {format:'png'});
      fs.writeFileSync(path.join(output, width + '-party-navigation.png'), Buffer.from(screenshot.data,'base64'));
    }
    console.log(JSON.stringify({passed:'All eight booths, seven shortcuts, separate conversations/drafts/scroll positions, read-more state, restored hearts, picker return, keyboard focus, hover, and no overlap in either laptop viewport.',output,layouts:layouts.map(item=>({width:item.width,height:item.height,nav:item.withMessages.nav,chat:item.withMessages.chat,form:item.withMessages.form}))},null,2));
  } finally {
    if (socket) {try {await call('Browser.close',{},null);} catch {} socket.close();}
    chrome.kill();
  }
})().catch(error => {console.error(error);process.exitCode=1;});
