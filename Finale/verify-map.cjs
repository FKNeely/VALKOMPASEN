const fs = require('fs'), vm = require('vm'), assert = require('assert');
class Element {
 constructor(tag='div') { this.tag=tag; this.children=[]; this.style={}; this.dataset={}; this.classList={add(){},toggle(){},remove(){}}; this.parentElement={appendChild(item){this.lastChild=item;}}; this.listeners={}; this.scrollTop=0; this.textContent=''; }
 setAttribute(k,v){this[k]=v;} append(...items){this.children.push(...items);} appendChild(i){this.append(i);return i;} replaceChildren(...i){this.children=i;this.textContent='';} addEventListener(name, callback){this.listeners[name]=callback;} querySelector(q){return this.children.find(x=>x.tag===q)||new Element(q);} querySelectorAll(){return [];} focus(){} }
const elements = new Map(); const document={getElementById(id){if(!elements.has(id))elements.set(id,new Element());return elements.get(id);},createElement:t=>new Element(t),createElementNS:(ns,t)=>new Element(t)};
const code=fs.readFileSync('script.js','utf8').replace(/\r\n/g,'\n');
const section=code.slice(code.indexOf('const myMapStorageKey'),code.indexOf('loadMyMap();\nrenderMyMapParties();'));
const openEditorHandler=code.slice(code.indexOf('myMapAddToggle.addEventListener("click"'),code.indexOf('document.getElementById("myMapEditorClose").addEventListener'));
assert(openEditorHandler.includes('myMapEditor.hidden = !open'));
const html=fs.readFileSync('index.html','utf8');
for(const id of ['myMapSubjectPicker','myMapCustomForm']) {
 const tag=html.match(new RegExp('<[^>]+\\bid="'+id+'"[^>]*>'))?.[0];
 assert(tag && !/\shidden(?:\s|=|>)/.test(tag), id+' must be available in the add-nodes view');
}
const rankingMarkup=html.match(/<section\b[^>]*\bid="myMapRanking"[^>]*>[\s\S]*?<\/section>/)?.[0];
assert(rankingMarkup && /<section\b[^>]*\shidden(?:\s|=|>)/.test(rankingMarkup), 'The ranking view must start hidden');
const rankingEntryMarkup=html.match(/<button\b[^>]*\bid="myMapOpenRanking"[^>]*>\s*Gör en rangordning\s*<\/button>/)?.[0];
assert(rankingEntryMarkup && !/\shidden(?:\s|=|>)/.test(rankingEntryMarkup), 'The ranking entry button must remain visible');
assert(/\baria-expanded="false"/.test(rankingEntryMarkup));
assert(!rankingMarkup.includes('myMapOpenRanking'), 'The ranking entry button must stay outside the initially hidden ranking view');
const rankingListMarkup=html.match(/<ol\b[^>]*\bid="myMapRankingList"[^>]*>[\s\S]*?<\/ol>/)?.[0];
assert(rankingListMarkup && !rankingListMarkup.includes('myMapOpenRanking'), 'The ranking entry button must stay outside the scrolling list');
const context={document,console,setMyMapSavedOpen(){},partyProfiles:{Socialdemokraterna:{abbreviation:'S'}},localStorage:{setItem(k,v){this[k]=v;},getItem(k){return this[k];}}};
vm.runInNewContext(section+openEditorHandler+`
assert(myMapOrder.length===0);
assert(new Set(myMapTopics.map(topic=>getMyMapTopicRadius(topic))).size===1);
myMapOrder=['klimat','ekonomi','skola','migration','sjukhus'];
renderAllMyMaps();
assert(myMapComparePartySvg.children.filter(x=>x['data-topic-id']).length===8);
const initial=myMapTopics.length;
addMyMapTopic(myMapSubjects.find(t=>t.id==='bostader'));
assert(myMapTopics.length===initial+1 && myMapOpenInfo===null);
addMyMapTopic(myMapSubjects.find(t=>t.id==='bostader'));
assert(myMapTopics.length===initial+1);
addMyMapTopic(myMapSubjects.find(t=>t.id==='sjukvard'));
assert(myMapTopics.length===initial+1);
openMyMapTopicInfo('klimat','Energi',true);
assert(myMapInfoTitle.textContent==='Energi');
assert(myMapCompareOwnSvg.parentElement.lastChild===myMapInfo);
assert(myMapInfoSummary.textContent.includes('Energisystemet'));
assert(myMapInfoSources.children.length===1);
assert(document.getElementById('myMapInfoParent').textContent==='Undernod till Klimat');
assert(!document.getElementById('myMapInfoBack').hidden);
document.getElementById('myMapInfoBack').onclick();
assert(myMapInfoTitle.textContent==='Klimat');
assert(document.getElementById('myMapInfoBack').hidden);
assert(myMapInfoSubtopics.children.some(b=>b.textContent.includes('Transporter')));
let topic=getMyMapTopic('klimat');
let toggle=myMapInfoSubtopics.children.find(b=>b.textContent.includes('Energi'));
toggle.onclick(); assert(!topic.subtopics.includes('Energi'));
toggle=myMapInfoSubtopics.children.find(b=>b.textContent.includes('Energi'));
toggle.onclick(); assert(topic.subtopics.includes('Energi'));
assert(addMyMapSubtopic(topic,' Egen undernod '));
assert(getMyMapTopic('klimat')===topic);
const form=document.getElementById('myMapSubtopicForm');
const input=document.getElementById('myMapSubtopicInput');
input.value='Ny undernod från formulär';
form.listeners.submit({preventDefault(){}});
assert(topic.subtopics.includes('Ny undernod från formulär'));
assert(input.value==='');
assert(myMapInfoSubtopics.children.some(b=>b.textContent==='✓ Ny undernod från formulär'));
input.value='  ny undernod från formulär  ';
form.listeners.submit({preventDefault(){}});
assert(topic.subtopics.filter(t=>t==='Ny undernod från formulär').length===1);
input.value='   '; form.listeners.submit({preventDefault(){}});
assert(document.getElementById('myMapSubtopicMessage').textContent==='Skriv ett namn först.');
assert(!addMyMapSubtopic(topic,'egen undernod'));
assert(!addMyMapSubtopic(topic,'   '));
openMyMapTopicInfo('klimat','Egen undernod');
assert(myMapInfoSummary.textContent==='Ingen beskrivning tillagd ännu');
assert(myMapComparison(getMyMapTopic('skola')).symbol==='✓');
assert(myMapComparison(topic).symbol==='↕');
assert(myMapComparison(getMyMapTopic('migration')).symbol==='−');
assert(myMapComparison(getMyMapTopic('socialforsakringar')).symbol==='+');
moveMyMapTopic('klimat',1);
assert(myMapComparison(topic).text.includes('plats 2'));
saveMyMap(); topic.subtopics=[]; loadMyMap();
assert(getMyMapTopic('klimat').subtopics.includes('Egen undernod'));
// Exercise actual pointer handlers: short clicks open the correct node;
// drags and cancelled gestures preserve the card's closed state.
pointToMapWorld = (svg, event) => ({x:event.clientX, y:event.clientY});
myMapSvg.setPointerCapture=()=>{};
myMapSvg.hasPointerCapture=()=>false;
bindMyMapCanvas(myMapSvg);
let handle={dataset:{topicId:'klimat',dragKind:'subtopic',subtopicIndex:String(getMyMapTopic('klimat').subtopics.indexOf('Energi'))}};
document.elementFromPoint=()=>({closest:()=>handle});
const pointer=(x,y,type)=>({button:0,pointerId:1,clientX:x,clientY:y,type,target:{closest:()=>handle},preventDefault(){}});
myMapInfo.hidden=true;
myMapSvg.listeners.pointerdown(pointer(100,100,'pointerdown'));
myMapSvg.listeners.pointerup(pointer(100,100,'pointerup'));
assert(myMapInfoTitle.textContent==='Energi' && !myMapInfo.hidden);
handle={dataset:{topicId:'klimat',dragKind:'topic'}};
myMapInfo.hidden=true;
myMapSvg.listeners.pointerdown(pointer(100,100,'pointerdown'));
myMapSvg.listeners.pointermove(pointer(120,120,'pointermove'));
myMapSvg.listeners.pointerup(pointer(120,120,'pointerup'));
assert(myMapInfo.hidden && myMapPositions.klimat);
myMapSvg.listeners.pointerdown(pointer(100,100,'pointerdown'));
myMapSvg.listeners.pointercancel(pointer(100,100,'pointercancel'));
assert(myMapInfo.hidden);
myMapSvg.listeners.pointerdown(pointer(100,100,'pointerdown'));
myMapSvg.listeners.pointerup(pointer(100,100,'pointerup'));
assert(!myMapInfo.hidden && myMapInfoTitle.textContent==='Klimat');
// Every rendered personal map node supports keyboard activation.
renderMyMap(myMapSvg);
for (const group of myMapSvg.children.filter(node=>node['data-topic-id'])) {
  for (const node of group.children.filter(child=>child.role==='button')) {
    node.listeners.keydown({key:'Enter',preventDefault(){}});
    assert(myMapOpenInfo.topicId===node['data-topic-id']);
    if(node['data-drag-kind']==='subtopic') assert(myMapInfoTitle.textContent===getMyMapTopic(node['data-topic-id']).subtopics[Number(node['data-subtopic-index'])]);
    else assert(myMapInfoTitle.textContent===getMyMapTopic(node['data-topic-id']).title);
  }
}
// Filled subject buttons remove the topic, its children and saved ordering.
openMyMapTopicInfo('klimat');
renderMyMapSubjects();
let climateButton=myMapSubjectChoices.children.find(button=>button.textContent==='Klimat');
assert(climateButton['aria-pressed']==='true' && !climateButton.disabled);
climateButton.listeners.click();
assert(!myMapTopics.some(topic=>topic.id==='klimat'));
assert(!myMapOrder.includes('klimat') && !myMapPositions.klimat && !myMapSubtopicOffsets.klimat);
assert(myMapInfo.hidden && myMapOpenInfo===null);
assert(!myMapSvg.children.some(node=>node['data-topic-id']==='klimat'));
loadMyMap();
assert(!myMapTopics.some(topic=>topic.id==='klimat'));
climateButton=myMapSubjectChoices.children.find(button=>button.textContent==='Klimat');
assert(climateButton['aria-pressed']==='false');
climateButton.listeners.click();
assert(myMapTopics.filter(topic=>topic.id==='klimat').length===1);
renderMyMapSubjects();
myMapSubjectChoices.children.find(button=>button.textContent==='Sjukvård').listeners.click();
assert(!myMapTopics.some(topic=>canonicalMyMapId(topic.id)==='sjukhus'));
const colors=[];
myMapSubjects.forEach(subject=>{
  colors.push(getMyMapNodeColor(subject.id));
});
assert(new Set(colors).size===colors.length);
const stableColor=getMyMapNodeColor('klimat');
moveMyMapTopic('klimat',-1);
assert(getMyMapNodeColor('klimat')===stableColor);
saveMyMap(); myMapNodeColors={}; loadMyMap();
assert(getMyMapNodeColor('klimat')===stableColor);
renderMyMap(myMapSvg);
const renderedColors=[];
for(const group of myMapSvg.children.filter(node=>node['data-topic-id'])) {
  const parentColor=getMyMapNodeColor(group['data-topic-id']);
  for(const node of group.children) {
    for(const shape of node.children || []) {
      if(shape.class==='my-map-topic-circle') renderedColors.push(shape.fill);
      if(shape.class==='my-map-topic-circle' || shape.class==='my-map-sub-pill') assert(shape.fill===parentColor);
    }
  }
}
assert(renderedColors.length>0 && new Set(renderedColors).size===renderedColors.length);
function assertNoOverlap(layout) {
  const boxes=layout.boxes;
  for(let i=0;i<boxes.length;i++) for(let j=i+1;j<boxes.length;j++) {
    const a=boxes[i], b=boxes[j];
    assert(Math.abs(a.x-b.x)>=a.hw+b.hw+11.99 || Math.abs(a.y-b.y)>=a.hh+b.hh+11.99, 'Nodes overlap: '+i+', '+j);
  }
}
assertNoOverlap(getMyMapLayout(getMyMapLayoutTopics()));
assertNoOverlap(getMyMapLayout(getMyMapLayoutTopics(true)));
const previousPositions=myMapPositions;
const crowdedTopics=[...myMapSubjects, ...Array.from({length:12},(_,i)=>({id:'crowded-'+i,title:'Ett mycket långt huvudämne '+i,subtopics:['En lång undernod med flera ord '+i,'Andra undernoden '+i]}))];
myMapPositions=Object.fromEntries(crowdedTopics.map(topic=>[topic.id,{x:500,y:350}]));
const crowdedLayout=getMyMapLayout(crowdedTopics);
assertNoOverlap(crowdedLayout);
assert(crowdedLayout.boxes.length===1+crowdedTopics.length+crowdedTopics.reduce((sum,t)=>sum+t.subtopics.length,0));
myMapPositions=previousPositions;
// Only the party side uses comparison fills; subnodes inherit their parent fill.
myMapTopics=getMyMapExampleTopics();
myMapOrder=[...myMapExampleOrder];
function assertPartyFill(id, expected) {
  const group=myMapComparePartySvg.children.find(node=>node['data-topic-id']===id);
  assert(group);
  for(const node of group.children) for(const shape of node.children || []) {
    if(shape.class==='my-map-topic-circle' || shape.class==='my-map-sub-pill') assert(shape.fill===expected);
  }
}
renderAllMyMaps();
assertPartyFill('klimat','#8bcf9f');
moveMyMapTopic('klimat',-1);
assertPartyFill('klimat','#f6d56d');
removeMyMapTopic('klimat');
assertPartyFill('klimat','#ef969b');
for(const svg of [myMapSvg,myMapCompareOwnSvg]) {
  for(const group of svg.children.filter(node=>node['data-topic-id'])) {
    for(const node of group.children) for(const shape of node.children || []) {
      if(shape.class==='my-map-topic-circle' || shape.class==='my-map-sub-pill') assert(shape.fill===getMyMapNodeColor(group['data-topic-id']));
      assert(shape.class!=='my-map-missing-marker');
    }
  }
}
function assertPrioritySizes() {
  for(let i=1;i<myMapOrder.length;i++) assert(getMyMapTopicRadius(getMyMapTopic(myMapOrder[i-1])) > getMyMapTopicRadius(getMyMapTopic(myMapOrder[i])));
  for(const svg of [myMapSvg,myMapCompareOwnSvg]) {
    for(const group of svg.children.filter(node=>node['data-topic-id'])) {
      const main=group.children.find(node=>node['data-drag-kind']==='topic');
      const circle=main.children.find(shape=>shape.class==='my-map-topic-circle');
      assert(circle.r===String(getMyMapTopicRadius(getMyMapTopic(group['data-topic-id']))));
      assert(main.children.some(node=>node.class==='my-map-node-rank' && node.textContent==='#'+(myMapOrder.indexOf(group['data-topic-id'])+1)));
    }
  }
  assertNoOverlap(getMyMapLayout(getMyMapLayoutTopics()));
  assertNoOverlap(getMyMapLayout(getMyMapLayoutTopics(true),true));
}
assertPrioritySizes();
const lastId=myMapOrder[myMapOrder.length-1];
const beforeRadius=getMyMapTopicRadius(getMyMapTopic(lastId));
moveMyMapTopicBefore(lastId,myMapOrder[0]);
assert(getMyMapTopicRadius(getMyMapTopic(lastId))>beforeRadius);
assert(myMapEditorMessage.textContent.includes('plats 1'));
assertPrioritySizes();
moveMyMapTopic(lastId,1);
assertPrioritySizes();
myMapRankingDrag={id:lastId,pointerId:7};
myMapDropTarget={id:myMapOrder[myMapOrder.length-1],after:true};
finishMyMapRankingDrag({pointerId:7});
assert(myMapOrder[myMapOrder.length-1]===lastId);
assertPrioritySizes();
const ownPositionsBefore=JSON.stringify(myMapPositions);
const circular=getMyMapPartyCircularLayout();
assertNoOverlap(circular);
const ringDistances=Object.values(circular.positions).map(point=>Math.hypot(point.x-500,point.y-350));
assert(ringDistances.length===8 && Math.max(...ringDistances)-Math.min(...ringDistances)<0.00001);
const ringDistance=ringDistances[0];
for(const topic of getMyMapExampleTopics()) {
  for(const point of Object.values(circular.subtopics[topic.id])) assert(Math.hypot(point.x-500,point.y-350)>ringDistance);
}
renderMyMap(myMapComparePartySvg,{partyName:'Socialdemokraterna'});
for(const group of myMapComparePartySvg.children.filter(node=>node['data-topic-id'])) {
  const main=group.children.find(node=>node['data-drag-kind']==='topic');
  const circle=main.children.find(shape=>shape.class==='my-map-topic-circle');
  const position=circular.positions[group['data-topic-id']];
  assert(Number(circle.cx)===position.x && Number(circle.cy)===position.y);
}
assert(JSON.stringify(myMapPositions)===ownPositionsBefore);
// Personal maps open a new concentric ring at the 9th and 21st topics.
myMapPositions={}; myMapSubtopicOffsets={};
const ringTestTopics=Array.from({length:32},(_,i)=>({id:'ring-'+i,title:'Ämne '+i,color:'#fff',subtopics:['Första undernoden','Andra undernoden']}));
for(const count of [1,5,8,9,20,21,32]) {
  myMapTopics=ringTestTopics.slice(0,count);
  myMapOrder=myMapTopics.map(topic=>topic.id);
  const layout=getMyMapLayout(myMapTopics);
  assertNoOverlap(layout);
  const distances=myMapTopics.map(topic=>Math.hypot(layout.positions[topic.id].x-500,layout.positions[topic.id].y-350));
  let start=0, ring=0, previous=0;
  while(start<count) {
    const values=distances.slice(start,start+8+ring*4);
    assert(Math.max(...values)-Math.min(...values)<0.00001);
    assert(values[0]>previous);
    previous=values[0]; start+=values.length; ring++;
  }
  const repeat=getMyMapLayout(myMapTopics);
  assert(JSON.stringify(layout.positions)===JSON.stringify(repeat.positions));
}
saveMyMap();
const savedRings=JSON.stringify(getMyMapLayout(myMapTopics).positions);
loadMyMap();
assert(JSON.stringify(getMyMapLayout(myMapTopics).positions)===savedRings);
const legacy=JSON.parse(localStorage.getItem(myMapStorageKey));
delete legacy.layoutVersion; legacy.positions={'ring-0':{x:500,y:350}};
localStorage.setItem(myMapStorageKey,JSON.stringify(legacy)); loadMyMap();
assert(Object.keys(myMapPositions).length===0 && myMapTopics.length===32);
assertNoOverlap(getMyMapLayout(myMapTopics));
const editorOrderBefore=JSON.stringify(myMapOrder);
myMapEditor.hidden=true;
myMapAddToggle.listeners.click();
assert(!myMapEditor.hidden && myMapAddToggle['aria-expanded']==='true');
assert(!document.getElementById('myMapSubjectPicker').hidden && !myMapCustomForm.hidden);
assert(document.getElementById('myMapRanking').hidden);
assert(document.getElementById('myMapOpenRanking')['aria-expanded']==='false');
assert(JSON.stringify(myMapOrder)===editorOrderBefore);
assert(typeof document.getElementById('myMapOpenRanking').listeners.click==='function');
assert(typeof document.getElementById('myMapEditorBack').listeners.click==='function');
const editorSizesBefore=JSON.stringify(myMapTopics.map(topic=>getMyMapTopicRadius(topic)));
document.getElementById('myMapOpenRanking').listeners.click();
assert(document.getElementById('myMapSubjectPicker').hidden && myMapCustomForm.hidden);
assert(!document.getElementById('myMapRanking').hidden);
assert(document.getElementById('myMapOpenRanking').hidden);
assert(document.getElementById('myMapOpenRanking')['aria-expanded']==='true');
assert(!document.getElementById('myMapEditorBack').hidden);
assert(document.getElementById('myMapEditorTitle').textContent==='Rangordning');
assert(JSON.stringify(myMapOrder)===editorOrderBefore);
assert(JSON.stringify(myMapTopics.map(topic=>getMyMapTopicRadius(topic)))===editorSizesBefore);
document.getElementById('myMapEditorBack').listeners.click();
assert(!document.getElementById('myMapSubjectPicker').hidden && !myMapCustomForm.hidden);
assert(document.getElementById('myMapRanking').hidden);
assert(!document.getElementById('myMapOpenRanking').hidden);
assert(document.getElementById('myMapOpenRanking')['aria-expanded']==='false');
assert(document.getElementById('myMapEditorBack').hidden);
assert(document.getElementById('myMapEditorTitle').textContent==='Lägg till noder');
assert(JSON.stringify(myMapOrder)===editorOrderBefore);
assert(JSON.stringify(myMapTopics.map(topic=>getMyMapTopicRadius(topic)))===editorSizesBefore);
myMapAddToggle.listeners.click();
assert(myMapEditor.hidden && myMapAddToggle['aria-expanded']==='false');
assert(JSON.stringify(myMapOrder)===editorOrderBefore);
myMapCompareView.hidden=true;
function assertAllNodesVisible() {
  const view=myMapViewBox();
  for(const box of getMyMapLayout(myMapTopics).boxes) {
    assert(box.x-box.hw>=view.x && box.x+box.hw<=view.x+view.width);
    assert(box.y-box.hh>=view.y && box.y+box.hh<=view.y+view.height);
  }
}
fitMyMapToView(); assertAllNodesVisible();
moveMyMapTopic(myMapOrder[0],1); assertAllNodesVisible();
myMapRankingDrag={id:myMapOrder[0],pointerId:9};
myMapDropTarget={id:myMapOrder[myMapOrder.length-1],after:true};
finishMyMapRankingDrag({pointerId:9}); assertAllNodesVisible();
// Adding a topic is separate from assigning a priority, including after reload.
myMapTopics=[]; myMapOrder=[]; myMapPositions={}; myMapSubtopicOffsets={};
for(const id of ['skola','klimat','ekonomi']) addMyMapTopic(myMapSubjects.find(t=>t.id===id));
assert(myMapOrder.length===0);
assert(myMapTopics.every(topic=>getMyMapTopicRadius(topic)===70));
saveMyMap(); loadMyMap(); assert(myMapOrder.length===0);
myMapEditor.hidden=true;
myMapAddToggle.listeners.click();
assert(!myMapEditor.hidden && myMapOrder.length===0);
document.getElementById('myMapOpenRanking').listeners.click();
assert(myMapOrder.length===0 && myMapTopics.every(topic=>getMyMapTopicRadius(topic)===70));
document.getElementById('myMapEditorBack').listeners.click();
assert(myMapOrder.length===0 && myMapTopics.every(topic=>getMyMapTopicRadius(topic)===70));
renderMyMapRanking();
const schoolRow=myMapRankingList.children.find(row=>row.dataset.topicId==='skola');
assert(schoolRow.children[0].textContent==='—');
schoolRow.children[3].children[0].listeners.click();
assert(myMapOrder.length===1 && myMapOrder[0]==='skola');
assert(getMyMapTopicRadius(getMyMapTopic('skola'))>70);
assert(getMyMapTopicRadius(getMyMapTopic('klimat'))===70);
const schoolSize=getMyMapTopicRadius(getMyMapTopic('skola'));
addMyMapTopic({id:'custom-neutral',title:'EttMycketLångtEgetHuvudämnesnamn',color:'#fff',subtopics:[]});
assert(myMapOrder.length===1 && getMyMapTopicRadius(getMyMapTopic('custom-neutral'))===70);
assert(getMyMapTopicRadius(getMyMapTopic('skola'))===schoolSize);
assert(myMapComparison(getMyMapTopic('klimat')).symbol==='↕');
assert(myMapComparison(getMyMapTopic('klimat')).text.includes('ännu inte rangordnat'));
assert(myMapComparison(getMyMapTopic('bostader')).symbol==='+');
myMapRankingDrag={id:'klimat',pointerId:11};myMapDropTarget={id:'skola',after:false};
finishMyMapRankingDrag({pointerId:11});
assert(myMapOrder.join(',')==='klimat,skola');
assert(getMyMapTopicRadius(getMyMapTopic('klimat'))>getMyMapTopicRadius(getMyMapTopic('skola')));
assert(getMyMapTopicRadius(getMyMapTopic('skola'))>70);
saveMyMap();loadMyMap();assert(myMapOrder.join(',')==='klimat,skola');
assert(getMyMapTopicRadius(getMyMapTopic('ekonomi'))===70);
removeMyMapTopic('skola');addMyMapTopic(myMapSubjects.find(t=>t.id==='skola'));
assert(!myMapOrder.includes('skola') && getMyMapTopicRadius(getMyMapTopic('skola'))===70);
myMapRankingDrag={id:'ekonomi',pointerId:12};myMapDropTarget={id:'skola',after:true};
finishMyMapRankingDrag({pointerId:12});assert(myMapOrder.join(',')==='klimat,ekonomi');
const beforeCancel=myMapOrder.join(',');
myMapRankingDrag={id:'skola',pointerId:13};myMapDropTarget={id:'klimat',after:false};
finishMyMapRankingDrag({pointerId:13,type:'pointercancel'});assert(myMapOrder.join(',')===beforeCancel);
assertNoOverlap(getMyMapLayout(myMapTopics));assertAllNodesVisible();
console.log('Passed: restored ranking entry/back controls without priority changes, neutral equal-size additions, explicit button/drag ranking, partial-rank persistence, comparison status, removal/re-addition, cancellation, collision-free circles and existing map functions.');
`,{...context,assert});


