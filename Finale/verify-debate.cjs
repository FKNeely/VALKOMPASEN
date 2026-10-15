const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let lastFocused=null,uuid=0;
class Element {
  constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.attrs={};this.listeners={};this.style={setProperty(k,v){this[k]=v;}};}
  append(...items){items.forEach(item=>{item.parent=this;this.children.push(item);});}
  appendChild(item){this.append(item);return item;}
  setAttribute(k,v){this.attrs[k]=String(v);} getAttribute(k){return this.attrs[k]??null;}
  addEventListener(k,fn){this.listeners[k]=fn;} focus(){lastFocused=this;} scrollIntoView(){}
  querySelector(selector){return this.children.find(el=>el.className?.split(' ').includes(selector.slice(1)))||null;}
  remove(){this.parent.children.splice(this.parent.children.indexOf(this),1);}
  get scrollHeight(){return this.children.length*100;}
}
const ids=new Map();
const document={createElement:tag=>new Element(tag),getElementById(id){if(!ids.has(id))ids.set(id,new Element());return ids.get(id);}};
const code=fs.readFileSync('script.js','utf8').replace(/\r\n/g,'\n');
const profileCode=code.slice(code.indexOf('const partyProfiles ='),code.indexOf('let selectedParty ='));
const profiles=vm.runInNewContext(profileCode+'\npartyProfiles;');
const options=Object.keys(profiles).map(value=>{const el=new Element('input');el.value=value;el.checked=false;return el;});
const form=new Element('form'),input=new Element('input'),log=new Element(),feedback=new Element(),count=new Element();
const handler=code.slice(code.indexOf('function updateDebatePartyCount()'),code.indexOf('function createSavedMessageLikeButton('));
const accent=code.slice(code.indexOf('function getPartyChatAccent('),code.indexOf('function applyPartyChatTheme('));
const helpers=code.slice(code.indexOf('function createPartyMessageAvatar('),code.indexOf('function appendPreparedPartyAnswer('));
const context={document,assert,console,partyProfiles:profiles,debatePartyOptions:options,debateForm:form,debateInput:input,debateLog:log,debateFeedback:feedback,debatePartyCount:count,
  window:{crypto:{randomUUID:()=>String(++uuid)},setTimeout(){throw new Error('Prepared debate replies should not interleave through timers');}},
  createSavedMessageLikeButton(data){const button=new Element('button');button.className='debate-like-button';button.saved=data;return button;},
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('party-answers.js','utf8')+fs.readFileSync('debate-answers.js','utf8')+handler+accent+helpers,context);
const interpret=text=>context.interpretDebateQuestion(text);
const answer=(party,topic)=>context.getPreparedDebateAnswer(party,topic);
function submit(question,parties,clear=true){
  if(clear)log.children=[];
  options.forEach(option=>option.checked=parties.includes(option.value));
  input.value=question;
  form.listeners.submit({preventDefault(){}});
  return log.children;
}
function contentOf(message){return message.children.find(el=>el.className?.includes('debate-answer-content'));}
assert.equal(interpret('  ENERGIKRAFT! ').topic,'energy');
assert.equal(interpret('energikraft').question,'Vilka energislag vill ni använda och satsa på?');
for(const text of ['energislag','Vilka kraftslag vill ni satsa på?','Hur vill ni använda kärnkraft?','solkraft'])assert.equal(interpret(text).topic,'energy');
for(const text of ['skola','Hur vill ni förbättra skolan?','Vad vill ni göra för lärarna?'])assert.equal(interpret(text).topic,'school');
for(const text of ['klimatförändringarna','Hur vill ni minska utsläppen?'])assert.equal(interpret(text).topic,'climate');
for(const text of ['energikraft och skolan','klimat och energi','sjukvård','blah blah blah'])assert.equal(interpret(text).topic,null);
assert.equal(submit('energikraft',[]).length,0);assert(feedback.textContent.includes('Välj minst'));assert.equal(lastFocused,options[0]);
assert.equal(submit('   ',['Moderaterna']).length,0);assert(feedback.textContent.includes('Skriv en fråga'));assert.equal(lastFocused,input);

const parties=Object.keys(profiles),combinations=parties.map(p=>[p]);
for(let a=0;a<parties.length;a++)for(let b=a+1;b<parties.length;b++)combinations.push([parties[a],parties[b]]);
combinations.push(parties);
const prompts={energy:'energikraft',school:'Hur vill ni förbättra skolan?',climate:'klimatförändringarna'};
for(const [topic,question] of Object.entries(prompts))for(const selected of combinations){
  const messages=submit(question,selected);
  assert.equal(messages.length,selected.length+1);
  assert.equal(log.scrollTop,log.scrollHeight);
  assert.equal(input.value,'');assert.equal(feedback.textContent,'');
  assert.equal(messages[0].className,'debate-user-message');
  assert.equal(messages[0].children[0].children[0].textContent,question);
  const expected=parties.filter(p=>selected.includes(p));
  messages.slice(1).forEach((message,index)=>{
    const party=expected[index],data=answer(party,topic),content=contentOf(message);
    assert.equal(message.dataset.party,party);assert.equal(message.dataset.question,interpret(question).question);
    const logo=message.children[0];assert.equal(logo.tag,'img');assert.equal(logo.src,profiles[party].logo);assert(logo.alt.includes(party));
    assert.equal(content.children[0].textContent,party);
    const summary=content.children.find(el=>el.className==='party-answer-summary').textContent;
    assert.equal(summary,data.summary);const sentenceCount=summary.split(/(?<=[.!?])\s+/u).length;assert(sentenceCount>=2&&sentenceCount<=3);
    assert(!/prototyp|demosvar|exempelsvar|blah blah/i.test(summary));
    const footer=content.children.at(-1);assert.equal(footer.className,'party-answer-sources');assert.equal(footer.children[0].textContent,'Källor:');
    const links=footer.children[1].children.map(item=>item.children[0]);assert.equal(links.length,data.sources.length);
    links.forEach((link,n)=>{assert.equal(link.href,data.sources[n].url);assert.equal(link.target,'_blank');assert.equal(link.rel,'noopener noreferrer');assert(link.textContent.startsWith(party+' – '));});
    const heart=content.children.find(el=>el.saved);assert.equal(heart.saved.sources.length,data.sources.length);assert.equal(heart.saved.partyName,party);
    assert.equal(message.style['--party-chat-accent'],context.getPartyChatAccent(party));
  });
}
submit('energikraft',['Moderaterna','Socialdemokraterna']);
assert(log.children[0].children[0].children.some(el=>el.className==='debate-question-interpretation'&&el.textContent.includes('Vilka energislag')));
assert.equal(context.getPartyChatAccent('Moderaterna'),'#24528a');assert.equal(context.getPartyChatAccent('Socialdemokraterna'),'#a91e40');
submit('skola',['Centerpartiet'],false);assert.equal(log.children.length,5);assert.equal(log.children[3].className,'debate-user-message');assert.equal(log.children[4].dataset.party,'Centerpartiet');
const missing=submit('sjukvård',['Socialdemokraterna','Moderaterna']);
for(const message of missing.slice(1)){const content=contentOf(message);assert(content.children.find(el=>el.tag==='p').textContent.includes('inget källbelagt svar'));assert(!content.children.some(el=>el.className==='party-answer-sources'));assert(!content.children.some(el=>el.saved));}
vm.runInContext('globalThis.savedEnergy=debateEnergyAnswers.Moderaterna; debateEnergyAnswers.Moderaterna=null;',context);
const partial=submit('energikraft',['Socialdemokraterna','Moderaterna']);
assert(contentOf(partial[1]).children.some(el=>el.className==='party-answer-sources'));
assert(contentOf(partial[2]).children.find(el=>el.tag==='p').textContent.includes('inget källbelagt svar'));
vm.runInContext('debateEnergyAnswers.Moderaterna=savedEnergy;',context);
assert.equal(answer('Okänt parti','energy'),null);
options.forEach(option=>option.checked=false);options[0].checked=true;options[2].checked=true;options[0].listeners.change();assert.equal(count.textContent,'2 av 8 partier valda');
console.log('Passed: 24 sourced short answers, all single/pair selections and all-eight selection, common question interpretation, sources last/new-tab, party logos/colors, saved-source payloads, input validation, non-interleaved questions and honest missing-answer fallback.');
