// Energy summaries checked against the linked national party pages on 2026-10-15.
// School/climate reuse the source-checked material in party-answers.js.
const debateEnergyAnswers = {
  Socialdemokraterna: {
    summary: "Socialdemokraterna vill bygga ut kärnkraft, vindkraft och solenergi samt utveckla vattenkraften. Partiet vill öka vindkraften även till havs.",
    sources: [{publisher:"Socialdemokraterna",title:"Energi",url:"https://www.socialdemokraterna.se/var-politik/a-till-o/energi"}],
    checkedAt: "2026-10-15",
  },
  Moderaterna: {
    summary: "Moderaterna vill framför allt bygga ut ny kärnkraft, även små modulära reaktorer. Vattenkraft, vindkraft och kraftvärme ska också bidra till den fossilfria elproduktionen.",
    sources: [{publisher:"Moderaterna",title:"Kärnkraft",url:"https://moderaterna.se/var-politik/karnkraft-2/"}],
    checkedAt: "2026-10-15",
  },
  Sverigedemokraterna: {
    summary: "Sverigedemokraterna vill prioritera ny kärnkraft och vattenkraft som bas i ett stabilt och planerbart energisystem. Partiet motsätter sig statliga stöd till vindkraft.",
    sources: [{publisher:"Sverigedemokraterna",title:"Energipolitik",url:"https://www.sd.se/a-till-o/energipolitik/"}],
    checkedAt: "2026-10-15",
  },
  Centerpartiet: {
    summary: "Centerpartiet vill bygga ut sol- och vindkraft samt trygga och utveckla vattenkraften. Partiet accepterar ny kärnkraft på marknadsmässiga villkor utan statliga subventioner.",
    sources: [{publisher:"Centerpartiet",title:"Energi",url:"https://www.centerpartiet.se/centerpartiets-politik/centerpartiets-politik-a-o/energi"}],
    checkedAt: "2026-10-15",
  },
  Vänsterpartiet: {
    summary: "Vänsterpartiet vill satsa på förnybar energi från sol, vind, bioenergi och geoenergi. Partiet vill också energieffektivisera och investera i elnäten för att klara elektrifieringen.",
    sources: [{publisher:"Vänsterpartiet",title:"Energi",url:"https://www.vansterpartiet.se/var-politik/politik-a-o/energi/"}],
    checkedAt: "2026-10-15",
  },
  Kristdemokraterna: {
    summary: "Kristdemokraterna vill investera i ny kärnkraft och öka stödet till kärnkraftsforskning. Partiet välkomnar alla fossilfria kraftslag men betonar behovet av stabil baskraft.",
    sources: [
      {publisher:"Kristdemokraterna",title:"Kärnkraft",url:"https://kristdemokraterna.se/var-politik/politik-a-till-o/karnkraft"},
      {publisher:"Kristdemokraterna",title:"Miljö & energi",url:"https://kristdemokraterna.se/var-politik/politikomraden/miljo--energi"},
    ],
    checkedAt: "2026-10-15",
  },
  Liberalerna: {
    summary: "Liberalerna vill bygga ut fossilfri energi med kärnkraft, vattenkraft, solkraft och vindkraft. Partiet ger ny kärnkraft en särskild roll för en stabil elförsörjning och vill effektivisera befintliga vattenkraftverk.",
    sources: [{publisher:"Liberalerna",title:"Energi",url:"https://www.liberalerna.se/politik/energi-2"}],
    checkedAt: "2026-10-15",
  },
  Miljöpartiet: {
    summary: "Miljöpartiet vill bygga ut sol- och vindkraft i ett helt förnybart energisystem. För elförsörjningen när vädret varierar vill partiet bland annat höja effekten i befintlig vattenkraft och satsa på kraftvärme, biogasturbiner och energilagring.",
    sources: [{publisher:"Miljöpartiet",title:"Energi och energieffektivisering",url:"https://www.mp.se/politik/energi/"}],
    checkedAt: "2026-10-15",
  },
};

function interpretDebateQuestion(input) {
  const text = input.trim();
  const normalized = text.normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase("sv-SE");
  const topics = [
    {key:"energy", question:"Vilka energislag vill ni använda och satsa på?", matches:/(?:^|[^a-z])(?:energi[a-z]*|el|elektricitet|elproduktion[a-z]*|elforsorjning[a-z]*|elsystem[a-z]*|kraftslag[a-z]*|karnkraft[a-z]*|vindkraft[a-z]*|vattenkraft[a-z]*|solkraft[a-z]*|solenergi[a-z]*|solel)(?:$|[^a-z])/u},
    {key:"school", question:"Hur vill ni förbättra skolan?", matches:/(?:^|[^a-z])(?:skol[a-z]*|grundskol[a-z]*|larar[a-z]*|utbildning[a-z]*|elev[a-z]*|studiero)(?:$|[^a-z])/u},
    {key:"climate", question:"Vad vill ni göra åt klimatförändringarna?", matches:/(?:^|[^a-z])(?:klimat[a-z]*|utslapp[a-z]*|vaxthusgas[a-z]*|koldioxid[a-z]*)(?:$|[^a-z])/u},
  ].filter(topic => topic.matches.test(normalized));
  // Never silently choose one subject when a question mentions several.
  return topics.length === 1
    ? {input:text, topic:topics[0].key, question:topics[0].question}
    : {input:text, topic:null, question:text};
}

function getPreparedDebateAnswer(partyName, topic) {
  const answer = topic === "energy" ? debateEnergyAnswers[partyName]
    : ["school","climate"].includes(topic) && typeof partyPreparedAnswers !== "undefined"
      ? partyPreparedAnswers[partyName]?.[topic] : null;
  if (typeof answer?.summary !== "string" || !answer.summary || !Array.isArray(answer.sources) || !answer.sources.length
    || !answer.sources.every(source => source?.publisher === partyName && source.title && /^https:\/\//.test(source.url))) return null;
  const sentences = answer.summary.split(/(?<=[.!?])\s+/u);
  if (sentences.length < 2) return null;
  return {...answer, summary:sentences.slice(0,3).join(" ")};
}
