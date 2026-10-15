const fs=require('fs'),vm=require('vm'),assert=require('assert');
const all=[]; class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.attrs={};this.style={setProperty(k,v){this[k]=v;}};this.hidden=false;this.listeners={};const classes=new Set();this.classList={toggle(name,on){if(on===undefined)on=!classes.has(name);if(on)classes.add(name);else classes.delete(name);},contains:name=>classes.has(name),add:name=>classes.add(name),remove:name=>classes.delete(name)};all.push(this);}
 append(...items){this.children.push(...items);} appendChild(item){this.append(item);return item;} replaceChildren(...items){this.children=items;}
 setAttribute(k,v){this.attrs[k]=String(v);} getAttribute(k){return this.attrs[k]??null;} addEventListener(k,v){this.listeners[k]=v;} focus(){} scrollIntoView(){} querySelector(){return null;}
}
const suggestionButtons=['Hur vill ni förbättra skolan?','Vad vill ni göra åt klimatförändringarna?'].map(text=>{const button=new Element('button');button.textContent=text;return button;});
const ids=new Map(); const document={getElementById(id){const rendered=[...all].reverse().find(el=>el.id===id);if(rendered)return rendered;if(!ids.has(id))ids.set(id,new Element());return ids.get(id);},createElement:t=>new Element(t),createTextNode:t=>({textContent:t}),querySelectorAll:selector=>selector==="[data-party-question]"?suggestionButtons:all.filter(el=>el.dataset?.savedMessageId)};
let uuid=0,timerId=0;const timers=new Map();const runNextTimer=()=>{const next=timers.entries().next().value;if(next){timers.delete(next[0]);next[1]();}};const localStorage={getItem(k){return this[k]||null;},setItem(k,v){this[k]=v;}};
const code=fs.readFileSync('script.js','utf8').replace(/\r\n/g,'\n');
const partyProfiles=vm.runInNewContext(code.slice(code.indexOf('const partyProfiles ='),code.indexOf('let selectedParty ='))+'\npartyProfiles;');
assert(Object.keys(partyProfiles).length===8);
Object.values(partyProfiles).forEach(profile=>assert(fs.existsSync(profile.logo),`Missing party logo: ${profile.logo}`));
const init=code.slice(code.indexOf('const likedDebateStorageKey'),code.indexOf('const mapCanvas'));
const functions=code.slice(code.indexOf('function appendDebateMessage('),code.indexOf('partyOptions.forEach((option) => {',code.indexOf('function renderLikedDebateMessages')));
const send=code.slice(code.indexOf('function getPreparedPartyAnswer('),code.indexOf('function appendPartyMessage('));
const party=code.slice(code.indexOf('function appendPartyMessage('),code.indexOf('railToggle.addEventListener',code.indexOf('function appendPartyMessage(')));
const conversation=code.slice(code.indexOf('function finishConversationTyping()'),code.indexOf('function setPartyRailCollapsed'));
const bindingStart=code.indexOf('document.querySelectorAll("[data-party-question]")');
const questionBindings=code.slice(bindingStart,code.indexOf('partyChatInput.addEventListener("input"',bindingStart));
const elements={};for(const id of ['likedDebateList','debateLog','debateFeedback','partyChatLog','conversation','myMapEditor','myMapAddToggle','myMapPersonalLayout','partyChat','partyChatInput','partyView'])elements[id]=document.getElementById(id);
vm.runInNewContext(fs.readFileSync('party-answers.js','utf8')+init+functions+send+party+conversation+questionBindings+`
renderLikedDebateMessages(); assert(likedDebateList.children[0].textContent.includes('inga sparade'));
appendDebateMessage('Debattsvar','debate-party-message','Socialdemokraterna',{sources:[{publisher:'Socialdemokraterna',title:'Energi',url:'https://example.com/debatt'},{publisher:'Socialdemokraterna',title:'Vindkraft',url:'https://example.com/vindkraft'}]});
const debateHeart=debateLog.children[0].children.find(el=>el.className.includes('party-answer-content')).children.find(el=>el.dataset.savedMessageId);
debateHeart.listeners.click(); assert(likedDebateMessages.length===1 && debateHeart.getAttribute('aria-pressed')==='true');
assert(likedDebateMessages[0].sources.length===2 && likedDebateMessages[0].sources[1].url==='https://example.com/vindkraft');
appendPartyMessage('Svar i valstuga','assistant-message','https://example.com/valstuga','Moderaterna');
partyChatLog.children[0].children.find(el=>el.dataset.savedMessageId).listeners.click();
conversationMessages.push({role:'assistant',content:'Ett samtalssvar',sources:[{title:'Källa ett',url:'https://example.com/1'},{title:'Källa två',url:'https://example.com/2'}]});
renderConversation();
conversation.children[0].children.find(el=>el.dataset.savedMessageId).listeners.click();
assert(likedDebateMessages.length===3 && new Set(likedDebateMessages.map(m=>m.context)).size===3);
assert(likedDebateList.children.length===3);
assert(likedDebateList.children[0].children.filter(el=>el.tag==='a').length===2);
assert(document.getElementById('myMapSavedCount').textContent==='3');
renderConversation(); assert(conversation.children[0].children.find(el=>el.dataset.savedMessageId).getAttribute('aria-pressed')==='true');
setMyMapSavedOpen(true,false); assert(!document.getElementById('myMapSavedPanel').hidden && myMapEditor.hidden);
assert(document.getElementById('myMapSavedToggle').getAttribute('aria-expanded')==='true');
likedDebateList.children[2].children[0].children[1].listeners.click();
assert(likedDebateMessages.length===2 && debateHeart.getAttribute('aria-pressed')==='false');
assert(JSON.parse(localStorage.getItem(likedDebateStorageKey)).length===2);
setMyMapSavedOpen(false,false); assert(document.getElementById('myMapSavedPanel').hidden);
const legacy={id:'old',partyName:'Äldre debattsvar',text:'Tidigare sparat',sourceUrl:'https://example.com/old'};
setDebateMessageLiked(legacy,true);
assert(likedDebateList.children[0].children[0].children[0].textContent==='Debatt · Äldre debattsvar');
assert(likedDebateList.children[0].children.some(el=>el.tag==='a' && el.href===legacy.sourceUrl));
const typed={role:'assistant',content:'Ett **tydligt** svar som visas lite i taget.',sources:[{title:'Källa',url:'https://example.com'}]};
conversationMessages.push(typed);
animateConversationAnswer(typed);
assert(typed.streaming && typed.revealed===0);
assert(!conversation.children[conversation.children.length-1].children.some(el=>el.dataset?.savedMessageId));
runNextTimer(); assert(typed.revealed===2 && typed.streaming);
while(timers.size)runNextTimer();
assert(!typed.streaming && typed.revealed===typed.content.length);
const finalText=conversation.children[conversation.children.length-1].children.find(el=>el.className==='chat-message-text');
assert(finalText.children.some(el=>el.tag==='strong' && el.textContent==='tydligt'));
assert(conversation.children[conversation.children.length-1].children.some(el=>el.dataset?.savedMessageId));
const interrupted={role:'assistant',content:'Nästa svar',sources:[]};conversationMessages.push(interrupted);
animateConversationAnswer(interrupted); runNextTimer(); finishConversationTyping();
assert(!interrupted.streaming && timers.size===0);
const nextResponse={role:'assistant',content:'En ny fråga',sources:[]};conversationMessages.push(nextResponse);
animateConversationAnswer(nextResponse);
conversationMessages.length=0;finishConversationTyping();
assert(timers.size===0);
partyChat.hidden=false; partyChatLog.replaceChildren();
const prompts={school:'Hur vill ni förbättra skolan?',climate:'Vad vill ni göra åt klimatförändringarna?'};
assert(Object.keys(partyPreparedAnswers).length===8);
for(const [partyName, topics] of Object.entries(partyPreparedAnswers)) {
  selectedParty=partyName;
  for(const [topicKey, question] of Object.entries(prompts)) {
    partyChatLog.replaceChildren();
    const answer=getPreparedPartyAnswer(partyName,question);
    assert(answer===topics[topicKey]);
    assert(answer.summary.split(/[.!?]+/).filter(s=>s.trim()).length>=3);
    assert(answer.summary.split(/[.!?]+/).filter(s=>s.trim()).length<=5);
    assert(!/demosvar|exempelsvar|påhittat/i.test(answer.summary+answer.details.join(' ')));
    assert(answer.sources.every(source=>source.publisher===partyName && source.title && source.url.startsWith('https://')));
    document.querySelectorAll('[data-party-question]').find(button=>button.textContent===question).listeners.click();
    assert(partyChatLog.children.length===2 && timers.size===0);
    assert(partyChatLog.children[0].children.find(el=>el.tag==='p').textContent===question);
    const response=partyChatLog.children[1];
    const avatar=response.children.find(el=>el.className==='party-message-avatar');
    assert(avatar.tag==='img' && avatar.src===partyProfiles[partyName].logo);
    assert(avatar.alt===partyName+' – logotyp');
    const content=response.children.find(el=>el.className==='party-answer-content');
    assert(content.children[0].textContent===answer.summary);
    const toggle=content.children.find(el=>el.className==='party-answer-toggle');
    const details=content.children.find(el=>el.className==='party-answer-details');
    const footer=content.children[content.children.length-1];
    assert(footer.className==='party-answer-sources' && footer.children[0].textContent==='Källor:');
    assert(details.hidden && toggle.textContent==='Läs mer…');
    const initialCount=partyChatLog.children.length;
    toggle.listeners.click();
    assert(!details.hidden && toggle.textContent==='Visa mindre' && toggle.getAttribute('aria-expanded')==='true');
    assert(partyChatLog.children.length===initialCount && content.children[content.children.length-1]===footer);
    toggle.listeners.click();
    assert(details.hidden && toggle.textContent==='Läs mer…' && content.children[content.children.length-1]===footer);
    const links=footer.children[1].children.map(item=>item.children[0]);
    assert(links.length===answer.sources.length);
    links.forEach((link,index)=>{
      assert(link.href===answer.sources[index].url && link.target==='_blank' && link.rel==='noopener noreferrer');
      assert(link.textContent===partyName+' – '+answer.sources[index].title);
    });
  }
}
selectedParty='Okänt parti'; partyChatLog.replaceChildren();
assert(getPreparedPartyAnswer(selectedParty,prompts.school)===null);
sendPartyQuestion(prompts.school);
assert(partyChatLog.children[1].children.find(el=>el.tag==='p').textContent.includes('inget källbelagt svar'));
selectedParty='Socialdemokraterna';partyChatLog.replaceChildren();
sendPartyQuestion('En fråga utan förberett svar');
const missing=partyChatLog.children[1].children.find(el=>el.tag==='p');
const missingAvatar=partyChatLog.children[1].children.find(el=>el.className==='party-message-avatar');
assert(missingAvatar.tag==='img' && missingAvatar.src===partyProfiles.Socialdemokraterna.logo && missingAvatar.alt==='Socialdemokraterna – logotyp');
assert(missing.textContent.includes('Socialdemokraterna') && missing.textContent.includes('inget källbelagt svar'));
assert(!missing.children.some(el=>el.tag==='a'));
console.log('Passed: hearts in all three chats, saved panel open/close, message sources, counts, persistence, legacy likes, duplicate prevention and synchronized unlike, progressive typing, 16 sourced party answers with real party logos, instant responses, read-more toggles, sources last and missing-answer fallback.');
`,{document,localStorage,console,assert,...elements,selectedParty:"Socialdemokraterna",partyProfiles,conversationMessages:[],conversationTypingTimer:null,conversationTypingMessage:null,runNextTimer,timers,requestAnimationFrame:f=>f(),window:{crypto:{randomUUID:()=>String(++uuid)},setTimeout:callback=>{timers.set(++timerId,callback);return timerId;},clearTimeout:id=>timers.delete(id)}});
