const body = document.body;
const menuButton = document.getElementById("menuButton");
const siteMenu = document.getElementById("siteMenu");
const siteShell = document.getElementById("siteShell");
const sidebarScrim = document.getElementById("sidebarScrim");
const homeView = document.getElementById("homeView");
const mindmapPage = document.getElementById("mindmapPage");
const partyView = document.getElementById("partyView");
const debateView = document.getElementById("debateView");
const homeLink = document.getElementById("homeLink");
const mobileNavigation = window.matchMedia("(max-width: 760px)");
const themeToggle = document.getElementById("themeToggle");
const questionForm = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const questionMessage = document.getElementById("questionMessage");
const partyRows = document.querySelectorAll(".party-row");
const compareButton = document.getElementById("compareButton");
const aboutDialog = document.getElementById("aboutDialog");
const openRankingOnboarding = document.getElementById("openRankingOnboarding");
const openPartyRankingOnboarding = document.getElementById("openPartyRankingOnboarding");
const openSubcategoryRankingPersonal = document.getElementById("openSubcategoryRankingPersonal");
const openSubcategoryRankingParty = document.getElementById("openSubcategoryRankingParty");
const rankingOnboarding = document.getElementById("rankingOnboarding");
const onboardingCategoryList = document.getElementById("onboardingCategoryList");
const rankingOnboardingTitle = document.getElementById("rankingOnboardingTitle");
const rankingOnboardingDescription = document.getElementById("rankingOnboardingDescription");
const closeRankingOnboardingButton = document.getElementById("closeRankingOnboarding");
const cancelRankingOnboardingButton = document.getElementById("cancelRankingOnboarding");
const saveRankingOnboardingButton = document.getElementById("saveRankingOnboarding");
const aboutButtons = [
  document.getElementById("aboutButton"),
  document.getElementById("aboutButtonSecondary"),
];
const closeDialog = document.getElementById("closeDialog");
const mindmapButton = document.getElementById("mindmapButton");
const partyViewButton = document.getElementById("partyViewButton");
const debateViewButton = document.getElementById("debateViewButton");
const connectionForm = document.getElementById("connectionForm");
const connectionInput = document.getElementById("connectionInput");
const connectionMessage = document.getElementById("connectionMessage");
const conversation = document.getElementById("conversation");
const askSection = document.getElementById("ask");
const newConversationButton = document.getElementById("newConversationButton");
const sourcesButton = document.getElementById("sourcesButton");
const sourcesPanel = document.getElementById("sourcesPanel");
const closeSources = document.getElementById("closeSources");
const sourceList = document.getElementById("sourceList");
const openNodeSources = document.getElementById("openNodeSources");
const nodeTitle = document.getElementById("nodeTitle");
const nodeDescription = document.getElementById("nodeDescription");
const nodeSource = document.getElementById("nodeSource");
const nodeSourceMeta = document.getElementById("nodeSourceMeta");
const nodeHistory = document.getElementById("nodeHistory");
const nodeFacts = document.getElementById("nodeFacts");
const nodeEvidence = document.getElementById("nodeEvidence");
const railToggle = document.getElementById("railToggle");
const partyRail = document.getElementById("compare");
const viewButtons = document.querySelectorAll(".view-switcher [data-view]");
const partyPicker = document.getElementById("partyPicker");
const partyOptions = document.querySelectorAll(".party-option");
const partyChat = document.getElementById("partyChat");
const partyBack = document.getElementById("partyBack");
const partyChatNavigation = document.getElementById("partyChatNavigation");
const partyShortcutList = document.getElementById("partyShortcutList");
const partyChatLogo = document.getElementById("partyChatLogo");
const partyChatTitle = document.getElementById("partyChatTitle");
const partyChatLog = document.getElementById("partyChatLog");
const partyChatForm = document.getElementById("partyChatForm");
const partyChatInput = document.getElementById("partyChatInput");
const debateForm = document.getElementById("debateForm");
const debateInput = document.getElementById("debateInput");
const debateLog = document.getElementById("debateLog");
const debateFeedback = document.getElementById("debateFeedback");
const debatePartyCount = document.getElementById("debatePartyCount");
const debatePartyOptions = document.querySelectorAll(".debate-party-option input");
const likedDebateList = document.getElementById("likedDebateList");
const likedDebateStorageKey = "kompass_liked_debate_messages";
let likedDebateMessages = [];
try {
  const storedLikedMessages = JSON.parse(localStorage.getItem(likedDebateStorageKey) || "[]");
  if (Array.isArray(storedLikedMessages)) {
    likedDebateMessages = storedLikedMessages.filter((message) =>
      message && typeof message.id === "string"
      && typeof message.partyName === "string"
      && typeof message.text === "string",
    );
  }
} catch (error) {
  likedDebateMessages = [];
}
// Keep earlier saved responses consistent with the current product name.
likedDebateMessages = likedDebateMessages.map(message => ({
  ...message,
  partyName: message.partyName.replace(/kompass/gi, "Valkompanjonen"),
  text: message.text.replace(/kompass/gi, "Valkompanjonen")
}));
const mapCanvas = document.querySelector(".map-canvas");
const mapScene = document.getElementById("mapScene");
const mapSceneFrame = document.getElementById("mapSceneFrame");
const partyMapCanvas = document.getElementById("partyMapCanvas");
const partyMapScene = document.getElementById("partyMapScene");
const partyMapSceneFrame = document.getElementById("partyMapSceneFrame");
const mapZoomInButton = document.getElementById("mapZoomIn");
const mapZoomOutButton = document.getElementById("mapZoomOut");
const mapZoomLabel = document.getElementById("mapZoomLabel");
const mapShowAllButton = document.getElementById("mapShowAll");
const mapPartyTabs = document.querySelectorAll(".map-party-tab");
const mapHeading = document.getElementById("mapHeading");
const mapCenterNode = mapScene?.querySelector('[data-node="start"]');
const mapCenterLabel = document.getElementById("mapCenterLabel");
const mapCenterCaption = document.getElementById("mapCenterCaption");
const partyMapHeading = document.getElementById("partyMapHeading");
const partyMapPanel = document.querySelector(".party-map-panel");
const partyMapZoomInButton = document.getElementById("partyMapZoomIn");
const partyMapZoomOutButton = document.getElementById("partyMapZoomOut");
const partyMapZoomLabel = document.getElementById("partyMapZoomLabel");
const partyMapShowAllButton = document.getElementById("partyMapShowAll");

const partyProfiles = {
  Socialdemokraterna: { abbreviation: "S", logo: "assets/parties/socialdemokraterna.png", url: "https://www.socialdemokraterna.se/", tint: "#f5d6d1" },
  Moderaterna: { abbreviation: "M", logo: "assets/parties/moderaterna.png", url: "https://moderaterna.se/", tint: "#d9e6f2" },
  Sverigedemokraterna: { abbreviation: "SD", logo: "assets/parties/sverigedemokraterna.png", url: "https://sd.se/", tint: "#f5e7af" },
  Centerpartiet: { abbreviation: "C", logo: "assets/parties/centerpartiet.png", url: "https://www.centerpartiet.se/", tint: "#dcebd7" },
  Vänsterpartiet: { abbreviation: "V", logo: "assets/parties/vänsterpartiet.png", url: "https://www.vansterpartiet.se/", tint: "#f5d6d1" },
  Kristdemokraterna: { abbreviation: "KD", logo: "assets/parties/kristdemokraterna.png", url: "https://kristdemokraterna.se/", tint: "#d9e6f2" },
  Liberalerna: { abbreviation: "L", logo: "assets/parties/Liberalerna.png", url: "https://www.liberalerna.se/", tint: "#d9e6f2" },
  Miljöpartiet: { abbreviation: "MP", logo: "assets/parties/miljöpartiet.png", url: "https://www.mp.se/", tint: "#dcebd7" },
};
let selectedParty = "";
const partyConversations = new Map();

const categoryBadges = document.getElementById("categoryBadges");
const categoryList = document.getElementById("categoryList");
const subcategoryList = document.getElementById("subcategoryList");

const categoryDefinitions = [
  {
    id: "ekonomi",
    title: "Ekonomi & skatter",
    shortTitle: "Ekonomi",
    subcategories: ["Skatter", "Statsbudget", "Företagande"],
    description: "Hur skatter, statsbudget och företagsklimat påverkar människors vardag och samhällsutvecklingen.",
    source: "Ekonomi & skatter",
    meta: "Skatter • Statsbudget • Företagande",
    history: "Det här området fokuserar på hur staten finansierar verksamhet, vilka skatter som tas ut och hur företagarna påverkas.",
    facts: [
      "Skattesystemet och statsbudgeten avgör hur mycket som kan användas till välfärd, infrastruktur och investeringar.",
      "Företagande påverkas av skatter, regleringar och hur offentliga investeringar prioriteras.",
    ],
    sources: [
      { title: "Riksdagen · Budget och skatter", url: "https://www.riksdagen.se/sv/" },
      { title: "Skatteverket", url: "https://www.skatteverket.se/" },
    ],
  },
  {
    id: "valfard",
    title: "Välfärd",
    shortTitle: "Välfärd",
    subcategories: ["Sjukvård", "Skola", "Äldreomsorg"],
    description: "Välfärd handlar om hur samhället organiserar sjukvård, skola och stöd till äldre och utsatta grupper.",
    source: "Välfärd",
    meta: "Sjukvård • Skola • Äldreomsorg",
    history: "Det här området jämför hur olika politiska förslag påverkar tillgänglighet, kvalitet och kostnader inom välfärden.",
    facts: [
      "Hälso- och sjukvård, skola och äldreomsorg är centrala för social trygghet och lika möjligheter.",
      "Tillgänglighet och resurser avgör hur väl välfärden fungerar i praktiken.",
    ],
    sources: [
      { title: "Socialstyrelsen", url: "https://www.socialstyrelsen.se/" },
      { title: "Skolverket", url: "https://www.skolverket.se/" },
    ],
  },
  {
    id: "lag",
    title: "Lag & rätt",
    shortTitle: "Lag & rätt",
    subcategories: ["Polis", "Domstolar", "Kriminalpolitik"],
    description: "Omfattar rättssäkerhet, polisens arbete, domstolar och hur brott och straff ska hanteras i samhället.",
    source: "Lag & rätt",
    meta: "Polis • Domstolar • Kriminalpolitik",
    history: "Detta politikområde behandlar trygghet, rättssäkerhet, rättsväsendets resurser och hur brottslighet ska förebyggas.",
    facts: [
      "Rättssystemet bygger på legalitet, rättssäkerhet och lika behandling inför lagen.",
      "Polis, domstolar och kriminalpolitik är centrala för trygghet och förtroende i samhället.",
    ],
    sources: [
      { title: "Brottsförebyggande rådet", url: "https://bra.se/" },
      { title: "Riksdagen · Rättsväsen", url: "https://www.riksdagen.se/sv/" },
    ],
  },
  {
    id: "migration",
    title: "Migration & integration",
    shortTitle: "Migration",
    subcategories: ["Asyl", "Integration", "Medborgarskap"],
    description: "Här ingår hur asyl, migration och integration ska organiseras samt hur medborgarskap och inkludering formas.",
    source: "Migration & integration",
    meta: "Asyl • Integration • Medborgarskap",
    history: "Detta område handlar om ansvar, rättigheter, integration och hur ett land förhåller sig till invandring och inkludering.",
    facts: [
      "Integration kräver både individuella stödinsatser och ett fungerande samhälls- och arbetsmarknadsperspektiv.",
      "Medborgarskap, asylregler och integration är nära kopplade till demokrati och rättigheter.",
    ],
    sources: [
      { title: "Migrationsverket", url: "https://www.migrationsverket.se/" },
      { title: "Integrationsverket", url: "https://www.integrationsverket.se/" },
    ],
  },
  {
    id: "miljo",
    title: "Miljö & energi",
    shortTitle: "Miljö",
    subcategories: ["Klimatpolitik", "Elförsörjning", "Naturvård"],
    description: "Rör klimatpolitik, energiförsörjning och naturvårdsfrågor i syfte att skapa ett hållbart samhälle.",
    source: "Miljö & energi",
    meta: "Klimatpolitik • Elförsörjning • Naturvård",
    history: "Det här området fokuserar på hur samhällsekonomin, energisystemet och klimatmålen samspelar i omställningen.",
    facts: [
      "Energi- och klimatpolitiken påverkar både ekonomi och livskvalitet i vardagen.",
      "Naturvård och klimatarbete hänger nära ihop med hur Sverige gör hållbara investeringar.",
    ],
    sources: [
      { title: "Naturvårdsverket", url: "https://www.naturvardsverket.se/" },
      { title: "Energimyndigheten", url: "https://www.energimyndigheten.se/" },
    ],
  },
  {
    id: "arbetsmarknad",
    title: "Arbetsmarknad & socialpolitik",
    shortTitle: "Arbetsmarknad",
    subcategories: ["Sysselsättning", "A-kassa", "Socialförsäkringar"],
    description: "Detta området handlar om jobb, arbetsvillkor, social trygghet och hur samhället stödjer arbetande människor.",
    source: "Arbetsmarknad & socialpolitik",
    meta: "Sysselsättning • A-kassa • Socialförsäkringar",
    history: "Här jämförs hur olika politiska reformer påverkar tillväxt, trygghet och möjligheten att få arbete och försörjning.",
    facts: [
      "Sysselsättning och social trygghet hänger ihop med både ekonomisk tillväxt och livssituationer för familjer.",
      "A-kassa och socialförsäkringar hjälper människor vid arbetslöshet, sjukdom och ekonomisk utsatthet.",
    ],
    sources: [
      { title: "Arbetsförmedlingen", url: "https://www.arbetsformedlingen.se/" },
      { title: "Försäkringskassan", url: "https://www.forsakringskassan.se/" },
    ],
  },
  {
    id: "forsvar",
    title: "Försvar & utrikespolitik",
    shortTitle: "Försvar",
    subcategories: ["Försvar", "EU", "Internationella relationer"],
    description: "Handlar om säkerhetspolitik, Sveriges försvar, EU-samarbete och relationer med andra länder.",
    source: "Försvar & utrikespolitik",
    meta: "Försvar • EU • Internationella relationer",
    history: "Det här området omfattar säkerhet, utrikespolitik, internationellt samarbete och Sveriges roll i Europa och världen.",
    facts: [
      "Försvar och utrikespolitik påverkar både säkerhet, handel och Sveriges ställning i världen.",
      "EU-samarbetet påverkar lagstiftning, ekonomi och samverkan i frågor som säkerhet och utrikespolitik.",
    ],
    sources: [
      { title: "Utrikesdepartementet", url: "https://www.government.se/" },
      { title: "EU-kommissionen", url: "https://ec.europa.eu/" },
    ],
  },
];

const nodeContent = {
  start: {
    title: "Din politiska karta",
    description: "Skapa din prioritering av viktiga politikområden från topp till botten.",
    source: "Ekonomi & skatter",
    meta: "Övergripande prioritering · 7 kategorier",
    history: "Använd listan för att rangordna de frågor som är viktigast för dig just nu.",
    facts: [
      "Det här diagrammet låter dig sätta din egen prioritering bland de viktigaste samhällsområdena.",
      "Du kan flytta de olika kategorierna upp eller ner med hjälp av listan i högerkolumnen.",
    ],
    sources: categoryDefinitions.flatMap((category) => category.sources),
  },
  ...Object.fromEntries(categoryDefinitions.map((category) => [category.id, {
    title: category.title,
    description: category.description,
    source: category.source,
    meta: category.meta,
    history: category.history,
    facts: category.facts,
    sources: category.sources,
  }])),
};

const subcategoryParents = {};
const customSubcategoryStorageKey = "kompass_custom_subcategories";
const defaultSubcategoryCounts = Object.fromEntries(
  categoryDefinitions.map((category) => [category.id, category.subcategories.length]),
);

function registerSubcategory(category, subcategory, nodeId) {
  if (!nodeId) {
    category.subcategories.push(subcategory);
    nodeId = `${category.id}-sub-${category.subcategories.length}`;
  }

  subcategoryParents[nodeId] = category.id;
  nodeContent[nodeId] = {
    title: subcategory,
    description: `${subcategory} är en del av ${category.title}. ${category.description}`,
    source: category.title,
    meta: `Underkategori · ${category.title}`,
    history: category.history,
    facts: category.facts,
    sources: category.sources,
  };
  return nodeId;
}

categoryDefinitions.forEach((category) => {
  category.subcategories.forEach((subcategory, index) => {
    registerSubcategory(category, subcategory, `${category.id}-sub-${index + 1}`);
  });
});

function loadCustomSubcategories() {
  try {
    const stored = localStorage.getItem(customSubcategoryStorageKey);
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;

    categoryDefinitions.forEach((category) => {
      const savedNames = parsed[category.id];
      if (!Array.isArray(savedNames)) return;
      savedNames.forEach((name) => {
        if (typeof name !== "string" || !name.trim()) return;
        const subcategory = name.trim();
        const duplicate = category.subcategories.some(
          (existing) => existing.toLocaleLowerCase("sv-SE") === subcategory.toLocaleLowerCase("sv-SE"),
        );
        if (!duplicate) registerSubcategory(category, subcategory);
      });
    });
  } catch (error) {
    console.error("Kunde inte läsa sparade underkategorier.", error);
  }
}

function saveCustomSubcategories() {
  const customNames = Object.fromEntries(categoryDefinitions.map((category) => [
    category.id,
    category.subcategories.slice(defaultSubcategoryCounts[category.id]),
  ]));
  try {
    localStorage.setItem(customSubcategoryStorageKey, JSON.stringify(customNames));
    return true;
  } catch (error) {
    console.error("Kunde inte spara underkategorier.", error);
    return false;
  }
}

loadCustomSubcategories();

const categoryIds = categoryDefinitions.map((category) => category.id);
const categoryRankingStorageKey = "kompass_category_rankings";
const categoryOrders = Object.fromEntries(
  ["", ...Object.keys(partyProfiles)].map((partyName) => [partyName, [...categoryIds]]),
);
try {
  const storedCategoryOrders = JSON.parse(localStorage.getItem(categoryRankingStorageKey) || "{}");
  if (storedCategoryOrders && typeof storedCategoryOrders === "object" && !Array.isArray(storedCategoryOrders)) {
    Object.keys(categoryOrders).forEach((partyName) => {
      const storedOrder = storedCategoryOrders[partyName];
      if (!Array.isArray(storedOrder)) return;
      const validStoredIds = storedOrder.filter((id) => categoryIds.includes(id));
      categoryOrders[partyName] = [...new Set([...validStoredIds, ...categoryIds])];
    });
  }
} catch (error) {
  console.error("Kunde inte läsa sparade kategorirangordningar.", error);
}
const categoryOrder = categoryOrders[""];
let activeMapParty = "";
let onboardingCategoryOrder = [];
const subcategoryRankingStorageKey = "kompass_subcategory_rankings";
const allSubcategoryIds = Object.keys(subcategoryParents);
const subcategoryOrders = Object.fromEntries(
  ["", ...Object.keys(partyProfiles)].map((partyName) => [partyName, [...allSubcategoryIds]]),
);
try {
  const storedSubcategoryOrders = JSON.parse(localStorage.getItem(subcategoryRankingStorageKey) || "{}");
  if (storedSubcategoryOrders && typeof storedSubcategoryOrders === "object" && !Array.isArray(storedSubcategoryOrders)) {
    Object.keys(subcategoryOrders).forEach((partyName) => {
      const storedOrder = storedSubcategoryOrders[partyName];
      if (!Array.isArray(storedOrder)) return;
      const validStoredIds = storedOrder.filter((id) => allSubcategoryIds.includes(id));
      subcategoryOrders[partyName] = [...new Set([...validStoredIds, ...allSubcategoryIds])];
    });
  }
} catch (error) {
  console.error("Kunde inte läsa sparade underkategorirangordningar.", error);
}
const subcategoryOrder = subcategoryOrders[""];
let onboardingSubcategoryOrder = [];
let rankingKind = "category";
let rankingSubcategoryPartyName = "";
const sources = [];
const conversationMessages = [];
let conversationTypingTimer = null;
let conversationTypingMessage = null;
let activeNodeKey = "ekonomi";
let rankingPartyName = "";
let rankingTrigger = openRankingOnboarding;
const mapContexts = [
  {
    canvas: mapCanvas,
    scene: mapScene,
    frame: mapSceneFrame,
    zoomIn: mapZoomInButton,
    zoomOut: mapZoomOutButton,
    zoomLabel: mapZoomLabel,
    showAll: mapShowAllButton,
    partyName: "",
    zoom: 0.85,
    cameraX: 0,
    cameraY: 0,
    viewMode: "all",
    focusedNode: null,
    hasFitted: false,
  },
  {
    canvas: partyMapCanvas,
    scene: partyMapScene,
    frame: partyMapSceneFrame,
    zoomIn: partyMapZoomInButton,
    zoomOut: partyMapZoomOutButton,
    zoomLabel: partyMapZoomLabel,
    showAll: partyMapShowAllButton,
    partyName: "Socialdemokraterna",
    zoom: 0.85,
    cameraX: 0,
    cameraY: 0,
    viewMode: "all",
    focusedNode: null,
    hasFitted: false,
  },
];

function buildDefaultMapNodePositions() {
  const centerX = 1200;
  const centerY = 900;
  const nodeSize = 118;
  const categoryRadius = 220;
  const subRadius = 150;
  const positions = {
    start: { left: centerX - nodeSize / 2, top: centerY - nodeSize / 2 },
  };

  categoryOrder.forEach((categoryId, index) => {
    const angle = (Math.PI * 2 * index) / categoryOrder.length - Math.PI / 2;
    const x = centerX + Math.cos(angle) * categoryRadius;
    const y = centerY + Math.sin(angle) * categoryRadius;
    positions[categoryId] = {
      left: x - nodeSize / 2,
      top: y - nodeSize / 2,
    };
  });

  subcategoryOrder.forEach((nodeId) => {
    const parentId = subcategoryParents[nodeId];
    const parentIndex = categoryOrder.indexOf(parentId);
    if (parentIndex === -1) return;

    const parentPosition = positions[parentId];
    const parentCenterX = parentPosition.left + nodeSize / 2;
    const parentCenterY = parentPosition.top + nodeSize / 2;
    const parentAngle = (Math.PI * 2 * parentIndex) / categoryOrder.length - Math.PI / 2;
    const relativeIndex = subcategoryOrder.filter((id) => subcategoryParents[id] === parentId).indexOf(nodeId);
    const offsetAngle = parentAngle + (relativeIndex - (subcategoryOrder.filter((id) => subcategoryParents[id] === parentId).length - 1) / 2) * 0.9;
    const x = parentCenterX + Math.cos(offsetAngle) * subRadius;
    const y = parentCenterY + Math.sin(offsetAngle) * subRadius;
    positions[nodeId] = {
      left: x - nodeSize / 2,
      top: y - nodeSize / 2,
    };
  });

  return positions;
}

const defaultMapNodePositions = buildDefaultMapNodePositions();

const nodePalette = {
  start: { from: "#1f2937", to: "#4b5563", text: "#f8f9ff", subtext: "rgba(255,255,255,.78)" },
  ekonomi: { from: "#f9d7a5", to: "#f0a65b", text: "#4a2b10", subtext: "rgba(74,43,16,.7)" },
  valfard: { from: "#bfe7d9", to: "#7ac4ad", text: "#1b3d34", subtext: "rgba(27,61,52,.7)" },
  lag: { from: "#d8d0ff", to: "#8d82df", text: "#271f4a", subtext: "rgba(39,31,74,.7)" },
  migration: { from: "#f7c6d9", to: "#e689b0", text: "#4d1c2d", subtext: "rgba(77,28,45,.7)" },
  miljo: { from: "#d6f5c6", to: "#7ac77f", text: "#1f4024", subtext: "rgba(31,64,36,.7)" },
  arbetsmarknad: { from: "#ffd3be", to: "#f29a82", text: "#402217", subtext: "rgba(64,34,23,.7)" },
  forsvar: { from: "#cfe8ff", to: "#7fa9de", text: "#18314d", subtext: "rgba(24,49,77,.7)" },
};

function applyNodePalette() {
  document.querySelectorAll(".map-node").forEach((node) => {
    node.title = "Dra för att flytta. Dubbelklicka för att zooma in och centrera.";
    const palette = nodePalette[node.dataset.categoryId || node.dataset.node] || nodePalette.ekonomi;
    node.style.background = `linear-gradient(135deg, ${palette.from}, ${palette.to})`;
    node.style.borderColor = "rgba(255,255,255,.72)";
    node.style.color = palette.text;
    const label = node.querySelector("small");
    if (label) {
      label.style.color = palette.subtext;
    }
  });
}

function applyCategoryColor(element, categoryId) {
  const palette = nodePalette[categoryId];
  if (!palette) return;
  element.style.borderLeftColor = palette.to;
  element.style.borderLeftWidth = "4px";
}

function applyCategoryBadgeColor(element, categoryId) {
  const palette = nodePalette[categoryId];
  if (!palette) return;
  element.style.backgroundColor = palette.from;
  element.style.borderColor = palette.to;
  element.style.color = palette.text;
}

function createSubcategoryNodes() {
  if (!mapScene || !partyMapScene) return;

  categoryDefinitions.forEach((category) => {
    category.subcategories.forEach((subcategory, index) => {
      const nodeId = `${category.id}-sub-${index + 1}`;
      createSubcategoryNode(category, subcategory, nodeId, mapScene);
      createSubcategoryNode(category, subcategory, nodeId, partyMapScene);
    });
  });
}

function createSubcategoryNode(category, subcategory, nodeId, scene = mapScene) {
  const svg = scene?.querySelector(".map-connections");
  if (!scene || !svg) return;
  const node = document.createElement("button");
  node.type = "button";
  node.className = "map-node map-subcategory-node";
  node.dataset.node = nodeId;
  node.dataset.categoryId = category.id;
  node.setAttribute("aria-pressed", "false");
  node.setAttribute("aria-label", `${subcategory}, underkategori till ${category.title}`);

  const label = document.createElement("span");
  label.textContent = subcategory;
  node.appendChild(label);
  scene.appendChild(node);
  applyNodePalette();

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.dataset.from = category.id;
  line.dataset.connection = nodeId;
  svg.appendChild(line);
}

function openSubcategoryForm(categoryId, card, addButton) {
  const category = categoryDefinitions.find((item) => item.id === categoryId);
  if (!category) return;

  card.querySelector(".subcategory-add-form")?.remove();
  const form = document.createElement("form");
  form.className = "subcategory-add-form";

  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 60;
  input.required = true;
  input.placeholder = "Ny underkategori";
  input.setAttribute("aria-label", `Namn på underkategori i ${category.title}`);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "subcategory-add-submit";
  submitButton.textContent = "Lägg till";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "subcategory-add-cancel";
  cancelButton.textContent = "Avbryt";
  cancelButton.addEventListener("click", () => {
    form.remove();
    addButton.focus();
  });

  const message = document.createElement("p");
  message.className = "subcategory-add-message";
  message.setAttribute("aria-live", "polite");

  form.append(input, submitButton, cancelButton, message);
  form.addEventListener("click", (event) => event.stopPropagation());
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const subcategory = input.value.trim();
    if (!subcategory) {
      message.textContent = "Skriv ett namn på underkategorin.";
      input.focus();
      return;
    }

    const duplicate = category.subcategories.some(
      (existing) => existing.toLocaleLowerCase("sv-SE") === subcategory.toLocaleLowerCase("sv-SE"),
    );
    if (duplicate) {
      message.textContent = "Den underkategorin finns redan i huvudkategorin.";
      input.focus();
      return;
    }

    const nodeId = registerSubcategory(category, subcategory);
    Object.values(subcategoryOrders).forEach((order) => order.push(nodeId));
    saveSubcategoryOrders();
    createSubcategoryNode(category, subcategory, nodeId, mapScene);
    createSubcategoryNode(category, subcategory, nodeId, partyMapScene);
    updateRankedNodeSizes();
    updateRankedNodeSizes(partyMapScene, categoryOrders[activeMapParty], subcategoryOrders[activeMapParty]);
    const saved = saveCustomSubcategories();
    selectMindmapNode(nodeId);
    if (!saved) {
      connectionMessage.textContent = "Underkategorin lades till, men kunde inte sparas i webbläsaren.";
    }
  });
  card.appendChild(form);
  input.focus();
}

function renderCategoryBadges(category) {
  if (!categoryBadges) return;
  categoryBadges.replaceChildren();
  category.subcategories.forEach((item) => {
    const badge = document.createElement("span");
    badge.className = "category-badge";
    badge.textContent = item;
    applyCategoryBadgeColor(badge, category.id);
    categoryBadges.appendChild(badge);
  });
}
function renderCategoryCards(resizeNodes = true) {
  if (!categoryList) return;
  categoryList.replaceChildren();

  categoryOrder.forEach((id, index) => {
    const category = categoryDefinitions.find((item) => item.id === id);
    if (!category) return;

    const card = document.createElement("article");
    const selectedCategory = subcategoryParents[activeNodeKey] || activeNodeKey;
    card.className = `category-card${selectedCategory === id ? " is-selected" : ""}`;
    card.draggable = true;
    card.dataset.categoryId = id;
    applyCategoryColor(card, id);

    const header = document.createElement("div");
    header.className = "category-card-header";

    const title = document.createElement("p");
    title.className = "category-card-title";
    title.textContent = category.title;

    const rank = document.createElement("span");
    rank.className = "category-card-rank";
    rank.textContent = `#${index + 1}`;

    const badges = document.createElement("div");
    badges.className = "category-card-badges";
    category.subcategories.forEach((item) => {
      const badge = document.createElement("span");
      badge.className = "category-card-badge";
      badge.textContent = item;
      applyCategoryBadgeColor(badge, id);
      badges.appendChild(badge);
    });

    const actions = document.createElement("div");
    actions.className = "category-card-actions";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.className = "category-card-button";
    upButton.setAttribute("aria-label", `Flytta ${category.title} upp`);
    upButton.textContent = "↑";
    upButton.disabled = index === 0;
    upButton.addEventListener("click", (event) => {
      event.stopPropagation();
      moveCategory(id, -1);
    });

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.className = "category-card-button";
    downButton.setAttribute("aria-label", `Flytta ${category.title} ner`);
    downButton.textContent = "↓";
    downButton.disabled = index === categoryOrder.length - 1;
    downButton.addEventListener("click", (event) => {
      event.stopPropagation();
      moveCategory(id, 1);
    });

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "category-card-button";
    addButton.setAttribute("aria-label", `Lägg till underkategori i ${category.title}`);
    addButton.title = `Lägg till underkategori i ${category.title}`;
    addButton.textContent = "+";
    addButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openSubcategoryForm(id, card, addButton);
    });

    actions.append(upButton, downButton, addButton);
    header.append(title, rank);
    card.append(header, badges, actions);

    card.addEventListener("click", () => selectMindmapNode(id));
    card.addEventListener("dragstart", (event) => {
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", id);
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      document.querySelectorAll(".category-card").forEach((node) => node.classList.remove("drag-over"));
    });
    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      card.classList.add("drag-over");
    });
    card.addEventListener("dragleave", () => card.classList.remove("drag-over"));
    card.addEventListener("drop", (event) => {
      event.preventDefault();
      card.classList.remove("drag-over");
      const draggedId = event.dataTransfer.getData("text/plain");
      reorderCategory(draggedId, id);
    });

    categoryList.appendChild(card);
  });

  if (resizeNodes) {
    updateRankedNodeSizes();
    if (mapContexts[0].viewMode === "all") fitMapToView(mapContexts[0]);
  }
}

function renderSubcategoryCards(resizeNodes = true) {
  if (!subcategoryList) return;
  subcategoryList.replaceChildren();

  subcategoryOrder.forEach((id, index) => {
    const content = nodeContent[id];
    const parentId = subcategoryParents[id];
    const parent = categoryDefinitions.find((category) => category.id === parentId);
    if (!content || !parent) return;

    const card = document.createElement("article");
    card.className = `category-card subcategory-card${activeNodeKey === id ? " is-selected" : ""}`;
    card.draggable = true;
    card.dataset.subcategoryId = id;
    card.dataset.categoryId = parentId;
    applyCategoryColor(card, parentId);

    const header = document.createElement("div");
    header.className = "category-card-header";

    const title = document.createElement("p");
    title.className = "category-card-title";
    title.textContent = content.title;

    const rank = document.createElement("select");
    rank.className = "subcategory-rank-select";
    rank.dataset.rankId = id;
    rank.setAttribute("aria-label", `Placering för ${content.title}`);
    subcategoryOrder.forEach((subcategoryId, rankIndex) => {
      const option = document.createElement("option");
      option.value = String(rankIndex + 1);
      option.textContent = `#${rankIndex + 1}`;
      option.selected = rankIndex === index;
      rank.appendChild(option);
    });
    rank.addEventListener("click", (event) => event.stopPropagation());
    rank.addEventListener("change", () => {
      const requestedRank = Number(rank.value);
      moveSubcategoryToRank(id, requestedRank - 1);
    });

    const parentLabel = document.createElement("small");
    parentLabel.className = "subcategory-parent";
    parentLabel.textContent = parent.title;
    applyCategoryBadgeColor(parentLabel, parentId);

    const actions = document.createElement("div");
    actions.className = "category-card-actions";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.className = "category-card-button";
    upButton.setAttribute("aria-label", `Flytta ${content.title} upp`);
    upButton.textContent = "↑";
    upButton.disabled = index === 0;
    upButton.addEventListener("click", (event) => {
      event.stopPropagation();
      moveSubcategory(id, -1);
    });

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.className = "category-card-button";
    downButton.setAttribute("aria-label", `Flytta ${content.title} ner`);
    downButton.textContent = "↓";
    downButton.disabled = index === subcategoryOrder.length - 1;
    downButton.addEventListener("click", (event) => {
      event.stopPropagation();
      moveSubcategory(id, 1);
    });

    actions.append(upButton, downButton);
    header.append(title, rank);
    card.append(header, parentLabel, actions);

    card.addEventListener("click", () => selectMindmapNode(id));
    card.addEventListener("dragstart", (event) => {
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", id);
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      document.querySelectorAll(".subcategory-card").forEach((node) => node.classList.remove("drag-over"));
    });
    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      card.classList.add("drag-over");
    });
    card.addEventListener("dragleave", () => card.classList.remove("drag-over"));
    card.addEventListener("drop", (event) => {
      event.preventDefault();
      card.classList.remove("drag-over");
      reorderSubcategory(event.dataTransfer.getData("text/plain"), id);
    });

    subcategoryList.appendChild(card);
  });

  if (resizeNodes) updateRankedNodeSizes();
}

function moveCategory(id, direction) {
  const currentIndex = categoryOrder.indexOf(id);
  const nextIndex = currentIndex + direction;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= categoryOrder.length) return;

  const [movedItem] = categoryOrder.splice(currentIndex, 1);
  categoryOrder.splice(nextIndex, 0, movedItem);
  saveCategoryOrders();
  renderCategoryCards();
}

function moveSubcategory(id, direction) {
  const currentIndex = subcategoryOrder.indexOf(id);
  const nextIndex = currentIndex + direction;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= subcategoryOrder.length) return;

  const [movedItem] = subcategoryOrder.splice(currentIndex, 1);
  subcategoryOrder.splice(nextIndex, 0, movedItem);
  saveSubcategoryOrders();
  renderSubcategoryCards();
}

function moveSubcategoryToRank(id, targetIndex) {
  const currentIndex = subcategoryOrder.indexOf(id);
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= subcategoryOrder.length) return;

  const [movedItem] = subcategoryOrder.splice(currentIndex, 1);
  subcategoryOrder.splice(targetIndex, 0, movedItem);
  saveSubcategoryOrders();
  renderSubcategoryCards();
  subcategoryList.querySelector(`[data-rank-id="${id}"]`)?.focus();
}

function reorderCategory(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return;
  const from = categoryOrder.indexOf(sourceId);
  const to = categoryOrder.indexOf(targetId);
  if (from === -1 || to === -1) return;

  const [movedItem] = categoryOrder.splice(from, 1);
  categoryOrder.splice(to, 0, movedItem);
  saveCategoryOrders();
  renderCategoryCards();
}

function saveCategoryOrders() {
  try {
    localStorage.setItem(categoryRankingStorageKey, JSON.stringify(categoryOrders));
  } catch (error) {
    console.error("Kunde inte spara kategorirangordningarna.", error);
  }
}

function saveSubcategoryOrders() {
  try {
    localStorage.setItem(subcategoryRankingStorageKey, JSON.stringify(subcategoryOrders));
    return true;
  } catch (error) {
    console.error("Kunde inte spara underkategorirangordningarna.", error);
    return false;
  }
}

function reorderSubcategory(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return;
  const from = subcategoryOrder.indexOf(sourceId);
  const to = subcategoryOrder.indexOf(targetId);
  if (from === -1 || to === -1) return;

  const [movedItem] = subcategoryOrder.splice(from, 1);
  subcategoryOrder.splice(to, 0, movedItem);
  saveSubcategoryOrders();
  renderSubcategoryCards();
}

function updateMapConnections(scene = mapScene) {
  const svg = scene?.querySelector(".map-connections");
  if (!scene || !svg || scene.clientWidth === 0) return;

  svg.setAttribute("viewBox", `0 0 ${scene.clientWidth} ${scene.clientHeight}`);

  svg.querySelectorAll("[data-connection]").forEach((line) => {
    const source = scene.querySelector(`[data-node="${line.dataset.from || "start"}"]`);
    const target = scene.querySelector(`[data-node="${line.dataset.connection}"]`);
    if (!source || !target) return;
    line.setAttribute("x1", source.offsetLeft + source.offsetWidth / 2);
    line.setAttribute("y1", source.offsetTop + source.offsetHeight / 2);
    line.setAttribute("x2", target.offsetLeft + target.offsetWidth / 2);
    line.setAttribute("y2", target.offsetTop + target.offsetHeight / 2);
  });
}

function preventNodeOverlap(node, nextLeft, nextTop) {
  const scene = node.closest(".map-scene");
  if (!scene) return { left: nextLeft, top: nextTop };

  const canvasWidth = scene.clientWidth;
  const canvasHeight = scene.clientHeight;
  const nodeWidth = node.offsetWidth;
  const nodeHeight = node.offsetHeight;
  const edgePadding = 12;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const hasOverlap = (left, top) => {
    const rect = {
      left,
      top,
      right: left + nodeWidth,
      bottom: top + nodeHeight,
    };

    return [...scene.querySelectorAll(".map-node")].some((other) => {
      if (other === node) return false;
      const otherRect = {
        left: other.offsetLeft,
        top: other.offsetTop,
        right: other.offsetLeft + other.offsetWidth,
        bottom: other.offsetTop + other.offsetHeight,
      };

      const clearance = 8;
      return rect.right + clearance > otherRect.left
        && rect.left - clearance < otherRect.right
        && rect.bottom + clearance > otherRect.top
        && rect.top - clearance < otherRect.bottom;
    });
  };

  const candidate = {
    left: clamp(nextLeft, edgePadding, canvasWidth - nodeWidth - edgePadding),
    top: clamp(nextTop, edgePadding, canvasHeight - nodeHeight - edgePadding),
  };

  if (!hasOverlap(candidate.left, candidate.top)) {
    return candidate;
  }

  for (let distance = 8; distance <= Math.max(canvasWidth, canvasHeight); distance += 8) {
    for (let dx = -distance; dx <= distance; dx += 8) {
      const dy = distance - Math.abs(dx);
      const verticalOffsets = dy === 0 ? [0] : [-dy, dy];
      for (const offsetY of verticalOffsets) {
        const testLeft = clamp(candidate.left + dx, edgePadding, canvasWidth - nodeWidth - edgePadding);
        const testTop = clamp(candidate.top + offsetY, edgePadding, canvasHeight - nodeHeight - edgePadding);
        if (!hasOverlap(testLeft, testTop)) {
          return { left: testLeft, top: testTop };
        }
      }
    }
  }

  return candidate;
}

function updateRankedNodeSizes(scene = mapScene, ranking = categoryOrder, subcategoryRanking = subcategoryOrder) {
  if (!scene || scene.clientWidth === 0) return;

  const scale = Math.min(1, Math.max(0.8, scene.clientWidth / 700));
  const uniformNodeSize = Math.round(118 * scale);
  const nodes = [...scene.querySelectorAll(".map-node")];
  const centerNode = nodes.find((node) => node.dataset.node === "start");
  if (centerNode) {
    centerNode.style.width = `${uniformNodeSize}px`;
    centerNode.style.height = `${uniformNodeSize}px`;
    if (!centerNode.dataset.userMoved) {
      centerNode.style.left = `${(scene.clientWidth - uniformNodeSize) / 2}px`;
      centerNode.style.top = `${(scene.clientHeight - uniformNodeSize) / 2}px`;
    }
  }

  ranking.forEach((id, index) => {
    const node = nodes.find((item) => item.dataset.node === id);
    if (!node) return;
    const size = Math.max(86, Math.round((150 - index * 8) * scale));
    const centerX = node.offsetLeft + node.offsetWidth / 2;
    const centerY = node.offsetTop + node.offsetHeight / 2;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.left = `${centerX - size / 2}px`;
    node.style.top = `${centerY - size / 2}px`;
  });

  nodes.forEach((node) => {
    if (node.dataset.defaultPositioned) return;
    const position = defaultMapNodePositions[node.dataset.node];
    if (!position) return;
    const sizeOffset = node.dataset.node === "start" ? 0 : (uniformNodeSize - node.offsetWidth) / 2;
    node.style.left = `${position.left + sizeOffset}px`;
    node.style.top = `${position.top + sizeOffset}px`;
    node.dataset.defaultPositioned = "true";
  });

  nodes.filter((node) => !node.dataset.categoryId && node !== centerNode).forEach((node) => {
    const position = preventNodeOverlap(node, node.offsetLeft, node.offsetTop);
    node.style.left = `${position.left}px`;
    node.style.top = `${position.top}px`;
  });

  const subcategoryNodes = nodes.filter((node) => node.dataset.categoryId);
  subcategoryNodes.forEach((node) => {
    const rank = subcategoryRanking.indexOf(node.dataset.node);
    const progress = subcategoryRanking.length > 1
      ? Math.max(0, rank) / (subcategoryRanking.length - 1)
      : 0;
    const size = Math.round((128 - progress * 52) * scale);
    const centerX = node.offsetLeft + node.offsetWidth / 2;
    const centerY = node.offsetTop + node.offsetHeight / 2;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    if (node.style.left) {
      node.style.left = `${centerX - size / 2}px`;
      node.style.top = `${centerY - size / 2}px`;
    }
  });

  subcategoryNodes.forEach((node) => {
    if (node.style.left) return;
    const parent = nodes.find((item) => item.dataset.node === node.dataset.categoryId);
    if (!parent) return;
    const parentCenterX = parent.offsetLeft + parent.offsetWidth / 2;
    const parentCenterY = parent.offsetTop + parent.offsetHeight / 2;
    const centerX = centerNode.offsetLeft + centerNode.offsetWidth / 2;
    const centerY = centerNode.offsetTop + centerNode.offsetHeight / 2;
    let angle = Math.atan2(parentCenterY - centerY, parentCenterX - centerX);
    if (Math.hypot(parentCenterX - centerX, parentCenterY - centerY) < 1) {
      angle = ranking.indexOf(node.dataset.categoryId) * (Math.PI * 2 / ranking.length);
    }

    const subcategoryIndex = Number(node.dataset.node.split("-sub-")[1]) - 1;
    angle += (subcategoryIndex - 1) * 0.9;
    const radius = Math.round(150 * scale);
    node.style.left = `${parentCenterX + Math.cos(angle) * radius - node.offsetWidth / 2}px`;
    node.style.top = `${parentCenterY + Math.sin(angle) * radius - node.offsetHeight / 2}px`;
  });

  subcategoryNodes.forEach((node) => {
    const position = preventNodeOverlap(node, node.offsetLeft, node.offsetTop);
    node.style.left = `${position.left}px`;
    node.style.top = `${position.top}px`;
  });
  updateMapConnections(scene);
}

function applyMapCamera(context, animate = true) {
  if (!animate) context.scene.style.transition = "none";
  context.scene.style.transform = `translate(${context.cameraX}px, ${context.cameraY}px) scale(${context.zoom})`;
  context.zoomLabel.textContent = `${Math.round(context.zoom * 100)}%`;
  context.zoomIn.disabled = context.zoom >= 1.8;
  context.zoomOut.disabled = context.zoom <= 0.2;
  if (!animate) {
    context.scene.getBoundingClientRect();
    context.scene.style.removeProperty("transition");
  }
}

function setMapZoom(context, nextZoom, anchorX = context.canvas.clientWidth / 2, anchorY = context.canvas.clientHeight / 2) {
  const worldX = (anchorX - context.cameraX) / context.zoom;
  const worldY = (anchorY - context.cameraY) / context.zoom;
  context.zoom = Math.min(1.8, Math.max(0.2, Number(nextZoom.toFixed(2))));
  context.cameraX = anchorX - worldX * context.zoom;
  context.cameraY = anchorY - worldY * context.zoom;
  context.viewMode = "zoom";
  context.focusedNode = null;
  applyMapCamera(context);
}

function fitMapToView(context = mapContexts[0]) {
  if (!context.canvas.clientWidth || !context.canvas.clientHeight) return;
  const nodes = [...context.scene.querySelectorAll(".map-node")];
  if (!nodes.length) return;
  const padding = 36;
  const bounds = nodes.reduce((result, node) => ({
    left: Math.min(result.left, node.offsetLeft),
    top: Math.min(result.top, node.offsetTop),
    right: Math.max(result.right, node.offsetLeft + node.offsetWidth),
    bottom: Math.max(result.bottom, node.offsetTop + node.offsetHeight),
  }), { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity });
  const boundsWidth = bounds.right - bounds.left;
  const boundsHeight = bounds.bottom - bounds.top;
  context.zoom = Math.min(
    1.8,
    (context.canvas.clientWidth - padding * 2) / boundsWidth,
    (context.canvas.clientHeight - padding * 2) / boundsHeight,
  );
  context.zoom = Math.max(0.2, context.zoom);
  context.cameraX = (context.canvas.clientWidth - boundsWidth * context.zoom) / 2 - bounds.left * context.zoom;
  context.cameraY = (context.canvas.clientHeight - boundsHeight * context.zoom) / 2 - bounds.top * context.zoom;
  context.viewMode = "all";
  context.focusedNode = null;
  applyMapCamera(context, context.hasFitted);
  context.hasFitted = true;
}

function focusMapNode(context, node) {
  const isCenterNode = node.dataset.node === "start";
  const zoom = isCenterNode
    ? Math.max(context.zoom, 0.7)
    : node.dataset.categoryId
      ? Math.max(context.zoom, 1.25)
      : Math.max(context.zoom, 0.95);
  context.zoom = Math.min(1.65, zoom);
  const nodeCenterX = node.offsetLeft + node.offsetWidth / 2;
  const nodeCenterY = node.offsetTop + node.offsetHeight / 2;
  context.cameraX = context.canvas.clientWidth / 2 - nodeCenterX * context.zoom;
  context.cameraY = context.canvas.clientHeight / 2 - nodeCenterY * context.zoom;
  context.viewMode = "node";
  context.focusedNode = node;
  applyMapCamera(context);
}

function bindMapCameraControls(context) {
  context.zoomIn.addEventListener("click", () => setMapZoom(context, context.zoom + 0.15));
  context.zoomOut.addEventListener("click", () => setMapZoom(context, context.zoom - 0.15));
  context.showAll.addEventListener("click", () => fitMapToView(context));
  context.canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const canvasRect = context.canvas.getBoundingClientRect();
    const anchorX = event.clientX - canvasRect.left;
    const anchorY = event.clientY - canvasRect.top;
    setMapZoom(context, context.zoom * Math.exp(-event.deltaY * 0.001), anchorX, anchorY);
  }, { passive: false });
  context.scene.addEventListener("dblclick", (event) => {
    const node = event.target.closest(".map-node");
    if (!node) return;
    event.preventDefault();
    selectMindmapNode(node.dataset.node, context.scene);
    focusMapNode(context, node);
  });
}

mapContexts.forEach(bindMapCameraControls);

function setMenu(open) {
  siteShell.classList.toggle("nav-open", open);
  sidebarScrim.hidden = !open;
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute("aria-label", open ? "Stäng navigation" : "Öppna navigation");
}

function renderOnboardingCategoryOrder() {
  onboardingCategoryList.replaceChildren();
  onboardingCategoryOrder.forEach((id, index) => {
    const category = categoryDefinitions.find((item) => item.id === id);
    if (!category) return;

    const item = document.createElement("li");
    item.className = "onboarding-category-item";
    item.draggable = true;
    item.dataset.categoryId = id;

    item.addEventListener("dragstart", (event) => {
      item.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", id);
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("is-dragging");
      onboardingCategoryList.querySelectorAll(".is-drop-target").forEach((row) => {
        row.classList.remove("is-drop-target");
      });
    });
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      item.classList.add("is-drop-target");
    });
    item.addEventListener("dragleave", (event) => {
      if (!item.contains(event.relatedTarget)) item.classList.remove("is-drop-target");
    });
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      item.classList.remove("is-drop-target");
      const draggedId = event.dataTransfer.getData("text/plain");
      const fromIndex = onboardingCategoryOrder.indexOf(draggedId);
      const toIndex = onboardingCategoryOrder.indexOf(id);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

      const [movedCategory] = onboardingCategoryOrder.splice(fromIndex, 1);
      const targetRect = item.getBoundingClientRect();
      const insertAfter = event.clientY >= targetRect.top + targetRect.height / 2;
      const adjustedIndex = onboardingCategoryOrder.indexOf(id) + (insertAfter ? 1 : 0);
      onboardingCategoryOrder.splice(adjustedIndex, 0, movedCategory);
      renderOnboardingCategoryOrder();
    });

    const rank = document.createElement("span");
    rank.className = "onboarding-category-rank";
    rank.textContent = `#${index + 1}`;

    const title = document.createElement("p");
    title.className = "onboarding-category-title";
    title.textContent = category.title;

    const actions = document.createElement("div");
    actions.className = "onboarding-category-actions";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.textContent = "↑";
    upButton.setAttribute("aria-label", `Flytta ${category.title} upp`);
    upButton.disabled = index === 0;
    upButton.addEventListener("click", () => moveOnboardingCategory(id, -1));

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.textContent = "↓";
    downButton.setAttribute("aria-label", `Flytta ${category.title} ner`);
    downButton.disabled = index === onboardingCategoryOrder.length - 1;
    downButton.addEventListener("click", () => moveOnboardingCategory(id, 1));

    actions.append(upButton, downButton);
    item.append(rank, title, actions);
    onboardingCategoryList.appendChild(item);
  });
}

function renderOnboardingSubcategoryOrder() {
  onboardingCategoryList.replaceChildren();
  onboardingSubcategoryOrder.forEach((id, index) => {
    const content = nodeContent[id];
    const parent = categoryDefinitions.find((category) => category.id === subcategoryParents[id]);
    if (!content || !parent) return;

    const item = document.createElement("li");
    item.className = "onboarding-category-item";
    item.draggable = true;
    item.dataset.categoryId = id;

    item.addEventListener("dragstart", (event) => {
      item.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", id);
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("is-dragging");
      onboardingCategoryList.querySelectorAll(".is-drop-target").forEach((row) => {
        row.classList.remove("is-drop-target");
      });
    });
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      item.classList.add("is-drop-target");
    });
    item.addEventListener("dragleave", (event) => {
      if (!item.contains(event.relatedTarget)) item.classList.remove("is-drop-target");
    });
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      item.classList.remove("is-drop-target");
      const draggedId = event.dataTransfer.getData("text/plain");
      const fromIndex = onboardingSubcategoryOrder.indexOf(draggedId);
      const toIndex = onboardingSubcategoryOrder.indexOf(id);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

      const [movedId] = onboardingSubcategoryOrder.splice(fromIndex, 1);
      const targetRect = item.getBoundingClientRect();
      const insertAfter = event.clientY >= targetRect.top + targetRect.height / 2;
      const adjustedIndex = onboardingSubcategoryOrder.indexOf(id) + (insertAfter ? 1 : 0);
      onboardingSubcategoryOrder.splice(adjustedIndex, 0, movedId);
      renderOnboardingSubcategoryOrder();
    });

    const rank = document.createElement("span");
    rank.className = "onboarding-category-rank";
    rank.textContent = `#${index + 1}`;

    const title = document.createElement("p");
    title.className = "onboarding-category-title";
    title.textContent = `${content.title} · ${parent.shortTitle}`;

    const actions = document.createElement("div");
    actions.className = "onboarding-category-actions";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.textContent = "↑";
    upButton.setAttribute("aria-label", `Flytta ${content.title} upp`);
    upButton.disabled = index === 0;
    upButton.addEventListener("click", () => moveOnboardingSubcategory(id, -1));

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.textContent = "↓";
    downButton.setAttribute("aria-label", `Flytta ${content.title} ner`);
    downButton.disabled = index === onboardingSubcategoryOrder.length - 1;
    downButton.addEventListener("click", () => moveOnboardingSubcategory(id, 1));

    actions.append(upButton, downButton);
    item.append(rank, title, actions);
    onboardingCategoryList.appendChild(item);
  });
}

function moveOnboardingCategory(id, direction) {
  const currentIndex = onboardingCategoryOrder.indexOf(id);
  const nextIndex = currentIndex + direction;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= onboardingCategoryOrder.length) return;

  const [movedItem] = onboardingCategoryOrder.splice(currentIndex, 1);
  onboardingCategoryOrder.splice(nextIndex, 0, movedItem);
  renderOnboardingCategoryOrder();
  onboardingCategoryList.children[nextIndex]
    ?.querySelector(direction < 0 ? "button:last-child" : "button:first-child")
    ?.focus();
}

function moveOnboardingSubcategory(id, direction) {
  const currentIndex = onboardingSubcategoryOrder.indexOf(id);
  const nextIndex = currentIndex + direction;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= onboardingSubcategoryOrder.length) return;

  const [movedItem] = onboardingSubcategoryOrder.splice(currentIndex, 1);
  onboardingSubcategoryOrder.splice(nextIndex, 0, movedItem);
  renderOnboardingSubcategoryOrder();
  onboardingCategoryList.children[nextIndex]
    ?.querySelector(direction < 0 ? "button:last-child" : "button:first-child")
    ?.focus();
}

function closeRankingOnboarding() {
  rankingOnboarding.hidden = true;
  rankingTrigger.focus();
}

function showRankingOnboarding(partyName, trigger) {
  rankingKind = "category";
  rankingPartyName = partyName;
  rankingTrigger = trigger;
  onboardingCategoryOrder = [...categoryOrders[partyName]];
  rankingOnboardingTitle.textContent = partyName
    ? `Rangordna ${partyName}s kategorier`
    : "Vad är viktigast för dig?";
  rankingOnboardingDescription.textContent = "Flytta områdena så att det viktigaste hamnar högst. Kartan anpassas efter ordningen.";
  renderOnboardingCategoryOrder();
  rankingOnboarding.hidden = false;
  closeRankingOnboardingButton.focus();
}

function showSubcategoryRanking(partyName, trigger) {
  rankingKind = "subcategory";
  rankingSubcategoryPartyName = partyName;
  rankingTrigger = trigger;
  onboardingSubcategoryOrder = [...subcategoryOrders[partyName]];
  rankingOnboardingTitle.textContent = partyName
    ? `Rangordna ${partyName}s underkategorier`
    : "Rangordna underkategorier";
  rankingOnboardingDescription.textContent = "Dra underkategorierna eller använd pilarna. Ordningen sparas separat för den här kartan.";
  renderOnboardingSubcategoryOrder();
  rankingOnboarding.hidden = false;
  closeRankingOnboardingButton.focus();
}

function setView(view, updateHistory = true) {
  const showMindmap = view === "mindmap";
  const showPartyView = view === "party";
  const showDebateView = view === "debate";
  siteShell.classList.toggle("party-mode", showPartyView);
  const hideHome = showMindmap || showPartyView || showDebateView;
  siteShell.classList.toggle("home-mode", !hideHome);
  const viewChanged = homeView.hidden !== hideHome
    || mindmapPage.hidden !== !showMindmap
    || partyView.hidden !== !showPartyView
    || debateView.hidden !== !showDebateView;
  homeView.hidden = hideHome;
  mindmapPage.hidden = !showMindmap;
  partyView.hidden = !showPartyView;
  debateView.hidden = !showDebateView;
  if (showMindmap) {
    mapContexts.forEach((context) => {
      updateRankedNodeSizes(context.scene, categoryOrders[context.partyName], subcategoryOrders[context.partyName]);
      fitMapToView(context);
    });
  }
  body.classList.toggle("chat-active", !hideHome && conversationMessages.length > 0);
  document.querySelectorAll(".sidebar-link[data-view]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.view === view);
  });
  setMenu(false);
  if (updateHistory) {
    const hash = showMindmap ? "#top" : showPartyView ? "#party-stugor" : showDebateView ? "#debatt" : "#samtal";
    if (window.location.hash !== hash) window.history.pushState({ view }, "", hash);
  }
  siteShell.classList.toggle("mindmap-mode", showMindmap);
  if (viewChanged) window.scrollTo(0, 0);
}

function selectMapParty(partyName) {
  const profile = partyName ? partyProfiles[partyName] : null;
  if (!profile) return;
  activeMapParty = partyName;
  const partyContext = mapContexts[1];
  partyContext.partyName = partyName;

  const activeTab = [...mapPartyTabs].find((tab) => tab.dataset.mapParty === partyName);
  mapPartyTabs.forEach((tab) => {
    const selected = tab.dataset.mapParty === partyName;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  partyMapHeading.textContent = `${partyName}s karta`;
  const partyCenterNode = partyMapScene.querySelector('[data-node="start"]');
  partyCenterNode.querySelector("span").textContent = profile.abbreviation;
  partyCenterNode.querySelector("small").textContent = partyName;
  partyCenterNode.setAttribute("aria-label", `Politisk karta för ${partyName}`);
  partyMapCanvas.setAttribute("aria-labelledby", activeTab.id);
  partyMapCanvas.setAttribute("aria-label", `${partyName}s politiska karta. Dubbelklicka på en nod för att zooma in.`);
  partyMapPanel.style.setProperty("--party-tint", profile.tint);
  updateRankedNodeSizes(partyMapScene, categoryOrders[partyName], subcategoryOrders[partyName]);
  openPartyRankingOnboarding.textContent = `Rangordna ${partyName}`;
  if (!mindmapPage.hidden) fitMapToView(partyContext);
}

mapPartyTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectMapParty(tab.dataset.mapParty));
  tab.addEventListener("keydown", (event) => {
    const tabs = [...mapPartyTabs];
    const currentIndex = tabs.indexOf(tab);
    const nextIndex = event.key === "ArrowRight"
      ? (currentIndex + 1) % tabs.length
      : event.key === "ArrowLeft"
        ? (currentIndex - 1 + tabs.length) % tabs.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    tabs[nextIndex].focus();
    selectMapParty(tabs[nextIndex].dataset.mapParty);
  });
});

function renderSourceList(sourceItems) {
  sourceList.replaceChildren();
  if (sourceItems.length === 0) {
    const empty = document.createElement("div");
    empty.className = "source-empty";
    empty.textContent = "Ställ en fråga för att bygga din källista.";
    sourceList.appendChild(empty);
    return;
  }

  sourceItems.forEach((source) => {
    const entry = document.createElement("article");
    entry.className = "source-entry";
    const title = document.createElement("a");
    title.href = source.url;
    title.target = "_blank";
    title.rel = "noopener noreferrer";
    title.textContent = source.title;
    const detail = document.createElement("span");
    detail.textContent = source.detail;
    entry.append(title, detail);
    sourceList.appendChild(entry);
  });
}

function selectMindmapNode(nodeKey, sourceScene = mapScene) {
  const content = nodeContent[nodeKey];
  if (!content) return;
  activeNodeKey = nodeKey;
  const categoryId = subcategoryParents[nodeKey] || nodeKey;
  const category = categoryDefinitions.find((item) => item.id === categoryId) || categoryDefinitions[0];

  nodeTitle.textContent = content.title;
  nodeDescription.textContent = content.description;
  nodeSource.textContent = content.source;
  nodeSourceMeta.textContent = content.meta;
  nodeHistory.textContent = content.history;
  renderCategoryBadges(category);
  renderCategoryCards(false);
  renderSubcategoryCards(false);

  nodeFacts.replaceChildren();
  content.facts.forEach((fact) => {
    const item = document.createElement("li");
    item.textContent = fact;
    nodeFacts.appendChild(item);
  });
  nodeEvidence.replaceChildren();
  content.sources.forEach((source) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.title;
    item.appendChild(link);
    nodeEvidence.appendChild(item);
  });
  connectionMessage.textContent = "";
  sourceScene.querySelectorAll(".map-node").forEach((node) => {
    const selected = node.dataset.node === nodeKey;
    node.classList.toggle("is-selected", selected);
    node.setAttribute("aria-pressed", String(selected));
  });
}

function setSources(open) {
  sourcesPanel.hidden = !open;
  if (open) {
    setMenu(false);
    closeSources.focus();
  } else {
    body.classList.remove("modal-open");
  }

}

menuButton?.addEventListener("click", () => {
  setMenu(!siteShell.classList.contains("nav-open"));
});

sidebarScrim.addEventListener("click", () => setMenu(false));

partyMapScene.replaceChildren(...[...mapScene.children].map((child) => child.cloneNode(true)));
partyMapScene.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
createSubcategoryNodes();
renderLikedDebateMessages();
partyRows.forEach((row) => row.setAttribute("aria-pressed", "false"));
mapContexts.forEach((context) => {
  context.scene.querySelectorAll(".map-node").forEach((node) => node.setAttribute("aria-pressed", "false"));
});
applyNodePalette();
renderCategoryCards();
selectMapParty("Socialdemokraterna");
updateRankedNodeSizes(partyMapScene, categoryOrders.Socialdemokraterna, subcategoryOrders.Socialdemokraterna);
selectMindmapNode("start");

function bindMapPointerInteractions(context) {
  let dragState = null;
  let panState = null;
  let suppressMapNodeClick = null;

  context.canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest(".map-node, .map-zoom-controls")) return;
    panState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      cameraX: context.cameraX,
      cameraY: context.cameraY,
    };
    context.canvas.classList.add("is-panning");
    try {
      context.canvas.setPointerCapture(event.pointerId);
    } catch {
      // Window-level pointer handlers still support panning without capture.
    }
  });

  context.scene.addEventListener("pointerdown", (event) => {
    const node = event.target.closest(".map-node");
    if (!node || event.button !== 0) return;
    const canvasRect = context.canvas.getBoundingClientRect();
    dragState = {
      node,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: (event.clientX - canvasRect.left - context.cameraX) / context.zoom - node.offsetLeft,
      offsetY: (event.clientY - canvasRect.top - context.cameraY) / context.zoom - node.offsetTop,
      moved: false,
    };
    if (node.setPointerCapture && !node.hasPointerCapture?.(event.pointerId)) {
      try {
        node.setPointerCapture(event.pointerId);
      } catch {
        // Window-level pointer handlers still support dragging without capture.
      }
    }
  });

  context.scene.addEventListener("click", (event) => {
    const node = event.target.closest(".map-node");
    if (!node) return;
    if (suppressMapNodeClick === node) {
      suppressMapNodeClick = null;
      return;
    }
    selectMindmapNode(node.dataset.node, context.scene);
  });

  function stopPointerInteraction(event) {
    if (panState && event.pointerId === panState.pointerId) {
      panState = null;
      context.canvas.classList.remove("is-panning");
    }
    if (dragState && event.pointerId === dragState.pointerId) {
      if (dragState.moved) suppressMapNodeClick = dragState.node;
      dragState = null;
    }
  }

  window.addEventListener("pointermove", (event) => {
    if (panState && event.pointerId === panState.pointerId) {
      context.cameraX = panState.cameraX + event.clientX - panState.startX;
      context.cameraY = panState.cameraY + event.clientY - panState.startY;
      context.viewMode = "pan";
      context.focusedNode = null;
      applyMapCamera(context);
      return;
    }
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const { node, offsetX, offsetY } = dragState;
    if (!dragState.moved && Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY) < 4) return;
    dragState.moved = true;
    node.dataset.userMoved = "true";
    const canvasRect = context.canvas.getBoundingClientRect();
    const nextLeft = (event.clientX - canvasRect.left - context.cameraX) / context.zoom - offsetX;
    const nextTop = (event.clientY - canvasRect.top - context.cameraY) / context.zoom - offsetY;
    const adjusted = preventNodeOverlap(node, nextLeft, nextTop);
    node.style.left = `${adjusted.left}px`;
    node.style.top = `${adjusted.top}px`;
    updateMapConnections(context.scene);
  });

  window.addEventListener("pointerup", stopPointerInteraction);
  window.addEventListener("pointercancel", stopPointerInteraction);
  context.canvas.addEventListener("pointerleave", () => {
    if (!panState) context.canvas.classList.remove("is-panning");
  });

  const observer = new ResizeObserver(() => {
    if (context.canvas.clientWidth === 0 || context.canvas.clientHeight === 0) return;
    if (context.viewMode === "all") fitMapToView(context);
    else if (context.viewMode === "node" && context.focusedNode) focusMapNode(context, context.focusedNode);
  });
  observer.observe(context.canvas);
}

mapContexts.forEach(bindMapPointerInteractions);

const myMapStorageKey = "kompass_min_karta_v1";
const myMapSvg = document.getElementById("myMapSvg");
const myMapCompareOwnSvg = document.getElementById("myMapCompareOwnSvg");
const myMapComparePartySvg = document.getElementById("myMapComparePartySvg");
const myMapPersonalView = document.getElementById("myMapPersonalView");
const myMapCompareView = document.getElementById("myMapCompareView");
const myMapPersonalLayout = document.getElementById("myMapPersonalLayout");
const myMapAddToggle = document.getElementById("myMapAddToggle");
const myMapEditor = document.getElementById("myMapEditor");
const myMapEditorMessage = document.getElementById("myMapEditorMessage");
const myMapCustomForm = document.getElementById("myMapCustomForm");
const myMapCustomInput = document.getElementById("myMapCustomInput");
const myMapStatus = document.getElementById("myMapStatus");
const myMapRankingList = document.getElementById("myMapRankingList");
const myMapSubjectChoices = document.getElementById("myMapSubjectChoices");
const myMapPartyChoices = document.getElementById("myMapPartyChoices");
const myMapZoomLabel = document.getElementById("myMapZoomLabel");
const myMapInfo = document.getElementById("myMapInfo");
const myMapInfoTitle = document.getElementById("myMapInfoTitle");
const myMapInfoSummary = document.getElementById("myMapInfoSummary");
const myMapInfoSources = document.getElementById("myMapInfoSources");
const myMapInfoSubtopics = document.getElementById("myMapInfoSubtopics");
const myMapInfoComparison = document.getElementById("myMapInfoComparison");
const myMapInfoAddTopic = document.getElementById("myMapInfoAddTopic");
const myMapPalette = ["#f8f3b9", "#67a12b", "#f2bdc4", "#ffd36a", "#62bfcc", "#e9c3a6"];
const myMapSubjects = [
  { id: "skola", title: "Skola", color: myMapPalette[0], subtopics: ["Lärande", "Likvärdig skola"], summary: "Skolpolitiken omfattar undervisningens kvalitet, elevers stöd och trygghet samt skolans likvärdighet. Kommuner, staten och fristående huvudmän har olika ansvar.", sources: [["Skolverket", "Skolverket", "https://www.skolverket.se/"]] },
  { id: "sjukhus", title: "Sjukhus", color: myMapPalette[1], subtopics: ["Vård", "Tillgänglighet"], summary: "Hälso- och sjukvården omfattar bland annat förebyggande insatser, primärvård och sjukhusvård. Regionerna ansvarar för huvuddelen av vården, inom ramar som beslutas nationellt.", sources: [["1177", "Så fungerar vården", "https://www.1177.se/sa-fungerar-varden/"]] },
  { id: "sjukvard", title: "Sjukvård", color: myMapPalette[1], subtopics: ["Primärvård", "Sjukhusvård"], summary: "Hälso- och sjukvården omfattar bland annat förebyggande insatser, primärvård och sjukhusvård. Regionerna ansvarar för huvuddelen av vården, inom ramar som beslutas nationellt.", sources: [["1177", "Så fungerar vården", "https://www.1177.se/sa-fungerar-varden/"]] },
  { id: "klimat", title: "Klimat", color: myMapPalette[4], subtopics: ["Utsläpp", "Energi", "Transporter"], summary: "Klimatpolitiken rör utsläpp av växthusgaser, klimatanpassning och omställningen till ett samhälle med lägre klimatpåverkan. Området berör bland annat transporter, energi och industri.", sources: [["Sveriges miljömål", "Miljömålen", "https://www.sverigesmiljomal.se/"]] },
  { id: "miljo", title: "Miljö", color: myMapPalette[1], subtopics: ["Naturvård", "Miljögifter"], summary: "Miljöområdet omfattar bland annat biologisk mångfald, naturvård, luft och vatten samt påverkan från kemikalier och annan mänsklig verksamhet.", sources: [["Sveriges miljömål", "Miljömålen", "https://www.sverigesmiljomal.se/"]] },
  { id: "ekonomi", title: "Ekonomi", color: myMapPalette[3], subtopics: ["Statsbudget", "Företagande"], summary: "Samhällsekonomi behandlar hur resurser, produktion, inkomster och offentliga utgifter utvecklas. Ekonomiska beslut påverkar bland annat hushåll, företag och offentlig verksamhet.", sources: [["Statistiska centralbyrån", "Nationalräkenskaper, tidigare definitioner", "https://www.scb.se/hitta-statistik/statistik-efter-amne/nationalrakenskaper/"]] },
  { id: "skatter", title: "Skatter", color: myMapPalette[3], subtopics: ["Inkomstskatt", "Skatteintäkter"], summary: "Skatter finansierar offentliga verksamheter och påverkar hushållens och företagens ekonomi. Skattesystemet består av flera olika skatter och avgifter.", sources: [["Skatteverket", "Skatter", "https://www.skatteverket.se/foretag/skatterochavdrag"]] },
  { id: "migration", title: "Migration", color: myMapPalette[2], subtopics: ["Asyl", "Mottagande"], summary: "Migration omfattar människors flytt över nationsgränser, exempelvis för arbete, studier, familjeanknytning eller skydd. Regler och processer skiljer sig mellan olika grunder för uppehållstillstånd.", sources: [["Migrationsverket", "Om Migrationsverket", "https://www.migrationsverket.se/om-migrationsverket.html"]] },
  { id: "integration", title: "Integration", color: myMapPalette[5], subtopics: ["Språk", "Arbete", "Utbildning", "Delaktighet"], summary: "Integration kan beskrivas som processer som ger människor möjlighet att delta i samhällslivet. Språk, utbildning, arbete och delaktighet är exempel på områden som ofta ingår.", sources: [["Arbetsförmedlingen", "Etableringsprogrammet", "https://arbetsformedlingen.se/for-arbetssokande/extra-stod/stod-a-o/etableringsprogrammet"], ["Skolverket", "Utbildning och nyanlända", "https://www.skolverket.se/"]] },
  { id: "bostader", title: "Bostäder", color: myMapPalette[5], subtopics: ["Bostadsbyggande", "Boendeförhållanden"], summary: "Bostadsfrågor omfattar tillgång till bostäder, bostadsbyggande och människors boendeförhållanden. Planering och bostadsförsörjning berör flera offentliga nivåer.", sources: [["Boverket", "Bostadsmarknad", "https://www.boverket.se/sv/samhallsplanering/bostadsmarknad/"]] },
  { id: "arbetsmarknad", title: "Arbetsmarknad", color: myMapPalette[0], subtopics: ["Sysselsättning", "Arbetsvillkor"], summary: "Arbetsmarknaden omfattar hur människor och arbetsgivare möts, arbetsvillkor och utvecklingen av sysselsättning. Myndigheter följer bland annat arbetslöshet och arbetsmarknadspolitiska insatser.", sources: [["Arbetsförmedlingen", "Arbetsmarknad och prognoser", "https://arbetsformedlingen.se/statistik"]] },
  { id: "lag-ratt", title: "Lag och rätt", color: myMapPalette[2], subtopics: ["Rättsväsende", "Brottsförebyggande arbete"], summary: "Rättsområdet omfattar lagstiftning, rättsväsendets institutioner och arbetet med att förebygga och hantera brott. Rättssäkerhet är en central princip.", sources: [["Brottsförebyggande rådet", "Kunskapsstöd", "https://bra.se/kunskapsstod"]] },
  { id: "forsvar", title: "Försvar", color: myMapPalette[1], subtopics: ["Totalförsvar", "Säkerhet"], summary: "Försvarspolitiken omfattar Sveriges militära försvar och totalförsvaret, där även civilt försvar ingår. Ansvar och uppgifter är fördelade mellan flera myndigheter.", sources: [["Försvarsmakten", "Om Försvarsmakten", "https://www.forsvarsmakten.se/"]] },
  { id: "energi", title: "Energi", color: myMapPalette[3], subtopics: ["Energiförsörjning", "Energieffektivisering"], summary: "Energifrågor omfattar tillförsel, användning och distribution av energi. Tillförlitlighet, kostnad och miljöpåverkan är exempel på perspektiv i energisystemet.", sources: [["Energimyndigheten", "Energisystemet", "https://www.energimyndigheten.se/energisystemet/"]] },
  { id: "kollektivtrafik", title: "Kollektivtrafik", color: myMapPalette[4], subtopics: ["Trafikutbud", "Tillgänglighet"], summary: "Kollektivtrafik innefattar offentligt organiserade resor med exempelvis buss, tåg och spårtrafik. Tillgänglighet och resmönster följs i nationell statistik.", sources: [["Trafikanalys", "Kollektivtrafik", "https://www.trafa.se/kollektivtrafik/"]] },
  { id: "landsbygd", title: "Landsbygd", color: myMapPalette[5], subtopics: ["Service", "Regional utveckling"], summary: "Landsbygdsfrågor rör förutsättningar för boende, arbete, service och företagande i områden med olika befolkningstäthet. Offentliga insatser och ansvar varierar mellan sakområden.", sources: [["Jordbruksverket", "Jordbruk, landsbygd och livsmedel", "https://jordbruksverket.se/"]] },
  { id: "jamstalldhet", title: "Jämställdhet", color: myMapPalette[2], subtopics: ["Makt och inflytande", "Ekonomisk jämställdhet"], summary: "Jämställdhet handlar om kvinnors och mäns lika rättigheter, möjligheter och skyldigheter. Området omfattar bland annat makt, ekonomi, utbildning och hälsa.", sources: [["Jämställdhetsmyndigheten", "Jämställdhet i Sverige", "https://jamstalldhetsmyndigheten.se/jamstalldhet-i-sverige/"]] },
  { id: "kultur", title: "Kultur", color: myMapPalette[0], subtopics: ["Kulturutbud", "Kulturarv"], summary: "Kulturpolitik omfattar villkor för konst och kultur, delaktighet i kulturlivet och bevarande av kulturarv. Statliga myndigheter och andra offentliga aktörer har olika uppdrag.", sources: [["Kulturrådet", "Om Kulturrådet", "https://www.kulturradet.se/om-oss/"]] },
  { id: "aldreomsorg", title: "Äldreomsorg", color: myMapPalette[1], subtopics: ["Hemtjänst", "Särskilt boende"], summary: "Äldreomsorg omfattar stöd och omsorg för äldre personer, exempelvis hemtjänst och särskilt boende. Kommunerna ansvarar för en stor del av omsorgen.", sources: [["Socialstyrelsen", "Äldre", "https://www.socialstyrelsen.se/kunskapsstod-och-regler/omraden/aldre/"]] },
  { id: "socialforsakringar", title: "Socialförsäkringar", color: myMapPalette[3], subtopics: ["Sjukförsäkring", "Föräldraförsäkring"], summary: "Socialförsäkringen ger ekonomiskt skydd i vissa livssituationer, exempelvis vid sjukdom eller föräldraskap. Försäkringskassan administrerar flera av förmånerna.", sources: [["Försäkringskassan", "Försäkringskassans webbplats", "https://www.forsakringskassan.se/"]] },
  { id: "eu", title: "EU", color: myMapPalette[4], subtopics: ["EU-samarbete", "Beslutsfattande"], summary: "Europeiska unionen är ett politiskt och ekonomiskt samarbete mellan medlemsländer. EU:s institutioner och medlemsländer delar på beslutsfattandet inom olika politikområden.", sources: [["Europeiska unionen", "Så fungerar EU", "https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies/types-institutions-and-bodies_sv"]] },
  { id: "digitalisering", title: "Digitalisering", color: myMapPalette[5], subtopics: ["Digital offentlig service", "Informationssäkerhet"], summary: "Digitalisering innebär att digital teknik och information används för att förändra tjänster, verksamheter och arbetssätt. Offentlig digitalisering berör bland annat tillgänglighet och informationssäkerhet.", sources: [["Myndigheten för digital förvaltning", "Om Digg", "https://www.digg.se/om-oss"]] },
];
const myMapDefaultTopics = ["skola", "migration", "sjukhus", "klimat", "ekonomi"]
  .map((id) => myMapSubjects.find((subject) => subject.id === id));
const myMapPartyFiles = {
  Socialdemokraterna: "socialdemokraterna.png",
  Moderaterna: "moderaterna.png",
  Sverigedemokraterna: "sverigedemokraterna.png",
  Centerpartiet: "centerpartiet.png",
  Vänsterpartiet: "vänsterpartiet.png",
  Kristdemokraterna: "kristdemokraterna.png",
  Liberalerna: "Liberalerna.png",
  Miljöpartiet: "miljöpartiet.png",
};
const myMapDefaultPositions = {
  skola: { x: 300, y: 305 },
  sjukhus: { x: 455, y: 165 },
  migration: { x: 650, y: 175 },
  integration: { x: 240, y: 150 },
  ekonomi: { x: 700, y: 395 },
  klimat: { x: 450, y: 515 },
};
const myMapAdditionalPositions = [
  { x: 835, y: 275 },
  { x: 215, y: 535 },
  { x: 800, y: 565 },
  { x: 145, y: 355 },
  { x: 350, y: 80 },
  { x: 870, y: 90 },
  { x: 500, y: 610 },
  { x: 110, y: 210 },
  { x: 900, y: 470 },
  { x: 700, y: 60 },
];
let myMapTopics = myMapDefaultTopics.map((topic) => ({ ...topic, subtopics: [...topic.subtopics] }));
let myMapOrder = [];
let myMapPositions = {};
let myMapSubtopicOffsets = {};
let myMapNodeColors = {};
let myMapSelectedParty = "Socialdemokraterna";
let myMapSelectedTopic = "";
let myMapZoom = 1;
let myMapAutoFit = true;
let myMapCamera = { x: 500, y: 350 };
let myMapOpenInfo = null;
let myMapSuppressClickUntil = 0;
let myMapRankingDrag = null;
let myMapDropTarget = null;

myMapTopics = myMapTopics.map((topic) => ({
  ...topic,
  availableSubtopics: [...topic.subtopics],
}));

function setMyMapMessage(message) {
  myMapEditorMessage.textContent = message;
  myMapStatus.textContent = message;
}

function getMyMapTopic(id) {
  return myMapTopics.find((topic) => topic.id === id)
    || myMapSubjects.find((topic) => topic.id === id)
    || null;
}

const myMapSubtopicEvidence = {
  "Energi": { summary: "Energisystemet omfattar hur energi tillförs, omvandlas och används i samhället. Förändringar i en del av systemet kan påverka andra delar.", sources: [["Energimyndigheten", "Så fungerar energisystemet", "https://www.energimyndigheten.se/energisystem-och-analys/sveriges-energisystem/hur-fungerar-energisystemet/"]] },
  "Utsläpp": { summary: "Växthusgasutsläpp följs inom bland annat transporter, industri och jordbruk. Naturvårdsverket sammanställer Sveriges officiella statistik om utsläpp och upptag av växthusgaser.", sources: [["Naturvårdsverket", "Sveriges utsläpp av växthusgaser", "https://www.naturvardsverket.se/data-och-statistik/klimat/sveriges-utslapp-och-upptag-av-vaxthusgaser/"]] },
  "Transporter": { summary: "Transporter av människor och gods påverkar klimatet genom utsläpp av växthusgaser. Utsläppen från inrikes transporter domineras av vägtrafiken.", sources: [["Naturvårdsverket", "Klimatet och transporterna", "https://www.naturvardsverket.se/amnesomraden/klimatomstallningen/omraden/klimatet-och-transporterna"]] }
};
function canonicalMyMapId(id) { return id === "sjukvard" ? "sjukhus" : id; }
const myMapExampleOrder = ["sjukhus", "arbetsmarknad", "skola", "socialforsakringar", "bostader", "klimat", "ekonomi", "integration"];
function getMyMapExampleTopics() {
  return myMapExampleOrder.map(id => {
    const subject = myMapSubjects.find(t => t.id === id);
    return { ...subject, title: id === "sjukhus" ? "Sjukvård" : subject.title,
      subtopics: id === "sjukhus" ? ["Vårdköer", "Personal"] : [...subject.subtopics] };
  });
}
function myMapComparison(topic) {
  const own = myMapOrder.findIndex(id => canonicalMyMapId(id) === canonicalMyMapId(topic.id));
  const other = myMapExampleOrder.indexOf(canonicalMyMapId(topic.id));
  const exists = myMapTopics.some(item => canonicalMyMapId(item.id) === canonicalMyMapId(topic.id));
  if (!exists) return { color: "#b83c42", symbol: "+", text: `${topic.title} finns i exempelkartan men har inte lagts till i din karta.` };
  if (other < 0) return { color: "#b83c42", symbol: "−", text: `${topic.title} finns i din karta men inte i exempelkartan.` };
  if (own < 0) return {color:"#b78610",symbol:"↕",text:`${topic.title} finns i båda kartorna men är ännu inte rangordnat i din karta. I exempelkartan ligger ämnet på plats ${other + 1}.`};
  return { color: own === other ? "#27834b" : "#b78610", symbol: own === other ? "✓" : "↕", text: own === other ? `${topic.title} ligger på plats ${own + 1} i båda kartorna.` : `${topic.title} ligger på plats ${own + 1} i din karta och plats ${other + 1} i exempelkartan.` };
}
function openMyMapTopicInfo(topicId, selectedSubtopic = "", compare = false) {
  const topic = getMyMapTopic(topicId);
  if (!topic) return;
  myMapOpenInfo = { topicId, selectedSubtopic, compare };
  myMapSelectedTopic = topicId;
  const evidence = selectedSubtopic ? myMapSubtopicEvidence[selectedSubtopic] || myMapSubjects.find(t => t.title.toLocaleLowerCase("sv") === selectedSubtopic.toLocaleLowerCase("sv")) : topic;
  myMapInfoTitle.textContent = selectedSubtopic || topic.title;
  document.getElementById("myMapInfoParent").textContent = selectedSubtopic ? `Undernod till ${topic.title}` : "";
  myMapInfoSummary.textContent = evidence?.sources?.length && evidence.summary
    ? evidence.summary : "Ingen beskrivning tillagd ännu";
  const back = document.getElementById("myMapInfoBack");
  back.hidden = !selectedSubtopic;
  back.textContent = `← Tillbaka till ${topic.title}`;
  back.onclick = () => openMyMapTopicInfo(topicId, "", compare);
  document.getElementById("myMapInfoSubtopicsHeading").textContent = selectedSubtopic
    ? `Välj undernoder till ${topic.title}` : "Välj undernoder";
  const previousTopic = myMapInfo.dataset.parentTopic;
  if (previousTopic !== topicId) {
    document.getElementById("myMapSubtopicInput").value = "";
    document.getElementById("myMapSubtopicMessage").textContent = "";
  }
  myMapInfo.dataset.parentTopic = topicId;
  document.getElementById("myMapSubtopicInput").setAttribute("aria-label", `Egen undernod till ${topic.title}`);
  // Anchor the unscaled HTML card to the visible map, outside the SVG camera.
  const stage = (compare ? myMapCompareOwnSvg : myMapSvg).parentElement;
  if (myMapInfo.parentElement !== stage) stage.appendChild(myMapInfo);
  myMapInfoSources.replaceChildren();
  for (const [publisher, title, url] of evidence?.sources || []) {
    const item = document.createElement("li"), link = document.createElement("a");
    link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
    link.textContent = `${publisher} – ${title}`; item.append(link); myMapInfoSources.append(item);
  }
  if (!myMapInfoSources.children.length) myMapInfoSources.textContent = "Källunderlag saknas för denna nod.";
  myMapInfoAddTopic.parentElement.hidden = true;
  myMapInfoSubtopics.replaceChildren();
  const actual = myMapTopics.find(t => t.id === topicId);
  const available = [...new Set([...(topic.availableSubtopics || []), ...(compare ? getMyMapExampleTopics().find(t => t.id === topicId)?.subtopics || [] : []), ...(myMapSubjects.find(t => t.id === topicId)?.subtopics || []), ...(topic.subtopics || [])])];
  available.forEach(label => {
    const button = document.createElement("button");
    const added = actual?.subtopics.includes(label) || false;
    button.type = "button"; button.textContent = `${added ? "✓" : "×"} ${label}`;
    button.setAttribute("aria-pressed", String(added));
    button.title = `${added ? "Ta bort" : "Lägg till"} ${label}`;
    button.onclick = () => {
      if (added) {
        const index = actual.subtopics.indexOf(label);
        actual.subtopics.splice(index, 1);
        myMapSubtopicOffsets[topicId]?.splice(index, 1);
        saveMyMap();
      } else addMyMapSubtopic(topic, label);
      openMyMapTopicInfo(topicId, selectedSubtopic, compare);
    };
    myMapInfoSubtopics.append(button);
  });
  myMapInfoComparison.hidden = !compare;
  if (compare) myMapInfoComparison.textContent = myMapSelectedParty === "Socialdemokraterna" ? myMapComparison(topic).text : "Jämförelseunderlag saknas för detta parti.";
  myMapInfo.hidden = false;
  renderAllMyMaps();
}
function addMyMapSubtopic(subject, label) {
  label = label.normalize("NFC").trim().replace(/\s+/g, " ");
  if (!label) return false;
  let topic = myMapTopics.find(t => t.id === subject.id);
  if (!topic) { addMyMapTopic(subject); topic = myMapTopics.find(t => t.id === subject.id); }
  if (topic.subtopics.some(t => t.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("sv") === label.toLocaleLowerCase("sv"))) {
    document.getElementById("myMapSubtopicMessage").textContent = `${label} finns redan.`;
    return false;
  }
  topic.subtopics.push(label);
  topic.availableSubtopics = [...new Set([...(topic.availableSubtopics || []), label])];
  saveMyMap(); renderAllMyMaps(); fitMyMapToView(); return true;
}

function saveMyMap() {
  myMapTopics.forEach(topic => {
    getMyMapNodeColor(topic.id);
  });
  try {
    localStorage.setItem(myMapStorageKey, JSON.stringify({
      topics: myMapTopics,
      order: myMapOrder,
      layoutVersion: "concentric-v1",
      positions: myMapPositions,
      subtopicOffsets: myMapSubtopicOffsets,
      nodeColors: myMapNodeColors,
    }));
    return true;
  } catch (error) {
    console.error("Kunde inte spara Min karta.", error);
    setMyMapMessage("Ändringen visas, men kunde inte sparas i den här webbläsaren.");
    return false;
  }
}

function loadMyMap() {
  let saved;
  try {
    saved = localStorage.getItem(myMapStorageKey);
  } catch (error) {
    console.error("Kunde inte läsa Min karta från webbläsaren.", error);
    setMyMapMessage("Sparade ämnen kunde inte läsas. Exempelvyn visas i stället.");
    return;
  }
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    if (parsed.nodeColors && typeof parsed.nodeColors === "object" && !Array.isArray(parsed.nodeColors)) {
      const used = new Set();
      myMapNodeColors = Object.fromEntries(Object.entries(parsed.nodeColors).filter(([, color]) => {
        if (typeof color !== "string" || !/^hsl\(\d+(?:\.\d+)? \d+% \d+%\)$/.test(color) || used.has(color)) return false;
        used.add(color);
        return true;
      }));
    }
    if (!Array.isArray(parsed.topics) || !Array.isArray(parsed.order)) throw new Error("Ogiltigt kartformat");
    const validTopics = parsed.topics.filter((topic) =>
      topic && typeof topic.id === "string"
      && typeof topic.title === "string"
      && typeof topic.color === "string"
      && Array.isArray(topic.subtopics)
      && topic.subtopics.every((label) => typeof label === "string"),
    );
    if (validTopics.length !== parsed.topics.length) throw new Error("Ogiltigt ämne i kartan");
    myMapTopics = validTopics.map((topic) => {
      const known = myMapSubjects.find((subject) => subject.id === topic.id);
      return {
        ...known,
        ...topic,
        summary: known?.summary || topic.summary || "Ingen sammanfattning finns för det egna ämnet.",
        sources: known?.sources || topic.sources || [],
        availableSubtopics: [...new Set([...(known?.subtopics || []), ...(topic.availableSubtopics || []), ...topic.subtopics])],
        subtopics: [...topic.subtopics],
      };
    });
    const ids = new Set(myMapTopics.map((topic) => topic.id));
    myMapOrder = [...new Set(parsed.order.filter((id) => ids.has(id)))];
    // Earlier freeform placements are reflowed once into the new circular structure.
    if (parsed.layoutVersion !== "concentric-v1") { myMapPositions = {}; myMapSubtopicOffsets = {}; }
    if (parsed.layoutVersion === "concentric-v1" && parsed.positions && typeof parsed.positions === "object" && !Array.isArray(parsed.positions)) {
      myMapPositions = Object.fromEntries(Object.entries(parsed.positions).filter(([, position]) =>
        position && Number.isFinite(position.x) && Number.isFinite(position.y)));
    }
    if (parsed.layoutVersion === "concentric-v1" && parsed.subtopicOffsets && typeof parsed.subtopicOffsets === "object" && !Array.isArray(parsed.subtopicOffsets)) {
      myMapSubtopicOffsets = Object.fromEntries(Object.entries(parsed.subtopicOffsets).map(([id, offsets]) => [
        id,
        Array.isArray(offsets) ? offsets.map((offset) => ({
          x: Number.isFinite(offset?.x) ? offset.x : 0,
          y: Number.isFinite(offset?.y) ? offset.y : 0,
        })) : [],
      ]));
    }
  } catch (error) {
    console.error("Kunde inte tolka sparade ämnen i Min karta.", error);
    setMyMapMessage("Sparade ämnen kunde inte läsas. Exempelvyn visas i stället.");
  }
}

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, String(value)));
  return element;
}

function getMyMapPositions(topics) {
  const positions = {};
  let start = 0, ring = 0, previousRadius = 0, previousSize = 0;
  while (start < topics.length) {
    const capacity = 8 + ring * 4;
    const members = topics.slice(start, start + capacity);
    const directions = members.map((topic,index) => {
      const angle = -Math.PI/2 + index*2*Math.PI/members.length;
      return {topic, x:Math.cos(angle), y:Math.sin(angle), size:getMyMapTopicRadius(topic)+8};
    });
    const largest = Math.max(...directions.map(node=>node.size));
    let radius = ring === 0 ? Math.max(260,largest+100)
      : previousRadius + Math.SQRT2*(previousSize+largest+12) + 160;
    for (let i=0; i<directions.length; i++) for (let j=i+1; j<directions.length; j++) {
      const a=directions[i], b=directions[j];
      const delta=Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y));
      radius=Math.max(radius,(a.size+b.size+12)/delta+1);
    }
    directions.forEach(node => {
      positions[node.topic.id] = myMapPositions[node.topic.id] || {x:500+node.x*radius,y:350+node.y*radius};
    });
    start += members.length;
    ring += 1;
    previousRadius = radius;
    previousSize = largest;
  }
  return positions;
}

function myMapSvgPoint(svg, event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function myMapViewBox() {
  const width = 1000 / myMapZoom;
  const height = 700 / myMapZoom;
  return { x: myMapCamera.x - width / 2, y: myMapCamera.y - height / 2, width, height };
}

function applyMyMapZoom() {
  const box = myMapViewBox();
  const viewBox = `${box.x} ${box.y} ${box.width} ${box.height}`;
  [myMapSvg, myMapCompareOwnSvg, myMapComparePartySvg].forEach((svg) => {
    svg.setAttribute("viewBox", viewBox);
  });
  myMapZoomLabel.textContent = `${Math.round(myMapZoom * 100)} %`;
  document.getElementById("myMapZoomIn").disabled = myMapZoom >= 3;
  document.getElementById("myMapZoomOut").disabled = myMapZoom <= 0.05;
}

function pointToMapWorld(svg, event) {
  return myMapSvgPoint(svg, event);
}

function addSvgTextLines(parent, text, x, y, className, maxLineLength = 11) {
  const label = createSvgElement("text", { x, y, class: className });
  if (text.length > maxLineLength - 2) label.classList.add("is-long");
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";
  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxLineLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  const lineHeight = 17;
  lines.forEach((line, index) => {
    const span = createSvgElement("tspan", { x, dy: index === 0 ? `${-((lines.length - 1) * lineHeight) / 2}` : lineHeight });
    if (className === "my-map-topic-label" && line.length * 7 > 120) {
      span.setAttribute("textLength", 120);
      span.setAttribute("lengthAdjust", "spacingAndGlyphs");
    }
    span.textContent = line;
    label.appendChild(span);
  });
  parent.appendChild(label);
}

function getMyMapSubtopicPosition(topic, index, parentPosition, parentRadius) {
  const angle = Math.atan2(parentPosition.y - 350, parentPosition.x - 500);
  const itemOffset = index - (topic.subtopics.length - 1) / 2;
  const storedOffset = myMapSubtopicOffsets[topic.id]?.[index];
  return {
    x: parentPosition.x + Math.cos(angle) * (parentRadius + 76) + Math.sin(angle) * itemOffset * 32 + (storedOffset?.x || 0),
    y: parentPosition.y + Math.sin(angle) * (parentRadius + 76) - Math.cos(angle) * itemOffset * 32 + (storedOffset?.y || 0),
  };
}

function getMyMapTopicRadius(topic, order = myMapOrder) {
  // Neutral size is fixed: adding another topic must not assign weight to it.
  const minimum = 70;
  const rank = order.findIndex(id => canonicalMyMapId(id) === canonicalMyMapId(topic.id));
  if (rank < 0) return minimum;
  return minimum + 12 + 36 * (order.length <= 1 ? 1 : 1 - rank / (order.length - 1));
}
function announceMyMapPriority(id) {
  const topic = getMyMapTopic(id);
  const rank = myMapOrder.indexOf(id);
  if (topic && rank >= 0) setMyMapMessage(`${topic.title} är nu på plats ${rank + 1} av ${myMapOrder.length}. Bubblornas storlek har uppdaterats – plats 1 är störst.`);
}

function getMyMapPillWidth(label) { return Math.max(76, label.length * 7 + 22); }
function getMyMapLayoutTopics() {
  return myMapTopics;
}

function getMyMapLayout(topics, compare = false) {
  const desired = getMyMapPositions(topics);
  const positions = {}, subtopics = {}, boxes = [];
  const gap = 12;
  const radiusFor = topic => getMyMapTopicRadius(topic);
  const overlaps = (a, b) => Math.abs(a.x-b.x) < a.hw+b.hw+gap && Math.abs(a.y-b.y) < a.hh+b.hh+gap;
  function place(x, y, hw, hh) {
    const candidate = {x, y, hw, hh};
    if (boxes.some(box => overlaps(candidate, box))) {
      // Search outward from the requested position; never clamp nodes to an edge.
      let found = false;
      for (let ring=1; ring<=60 && !found; ring++) {
        const distance = ring * 16;
        const steps = Math.max(16, Math.ceil(2*Math.PI*distance/24));
        for (let step=0; step<steps; step++) {
          const angle = step * Math.PI*2/steps;
          candidate.x = x + Math.cos(angle)*distance;
          candidate.y = y + Math.sin(angle)*distance;
          if (!boxes.some(box => overlaps(candidate, box))) { found=true; break; }
        }
      }
      if (!found) {
        candidate.x = Math.max(...boxes.map(box=>box.x+box.hw)) + hw + gap;
        candidate.y = y;
      }
    }
    boxes.push(candidate);
    return {x:candidate.x, y:candidate.y};
  }
  boxes.push({x:500,y:350,hw:66,hh:72});
  topics.forEach(topic => {
    const radius = radiusFor(topic);
    positions[topic.id] = place(desired[topic.id].x, desired[topic.id].y, radius+8, radius+8);
  });
  topics.forEach(topic => {
    subtopics[topic.id] = {};
    topic.subtopics.forEach((label,index) => {
      const desiredSub = getMyMapSubtopicPosition(topic,index,positions[topic.id],radiusFor(topic));
      subtopics[topic.id][label] = place(desiredSub.x,desiredSub.y,getMyMapPillWidth(label)/2+2,14);
    });
  });
  return {positions, subtopics, boxes};
}

function getMyMapPartyCircularLayout() {
  const topics = getMyMapExampleTopics();
  const positions = {}, subtopics = {};
  const boxes = [{x:500, y:350, hw:66, hh:72}];
  const gap = 12;
  const directions = topics.map((topic, index) => {
    const angle = -Math.PI / 2 + index * 2 * Math.PI / topics.length;
    return {x:Math.cos(angle), y:Math.sin(angle), radius:getMyMapTopicRadius(topic, myMapExampleOrder) + 8};
  });
  let ringRadius = Math.max(260, ...directions.map(node => node.radius + 100));
  // Expand one shared radius until every pair of main-node bounds is separated.
  for (let i=0; i<directions.length; i++) {
    for (let j=i+1; j<directions.length; j++) {
      const a=directions[i], b=directions[j], clearance=a.radius+b.radius+gap;
      const delta=Math.max(Math.abs(a.x-b.x), Math.abs(a.y-b.y));
      ringRadius=Math.max(ringRadius, clearance/delta + 1);
    }
  }
  topics.forEach((topic,index) => {
    const direction=directions[index];
    const position={x:500+direction.x*ringRadius, y:350+direction.y*ringRadius};
    positions[topic.id]=position;
    boxes.push({...position, hw:direction.radius, hh:direction.radius});
  });
  const maxRadius=Math.max(...directions.map(node=>node.radius));
  topics.forEach((topic,index) => {
    const direction=directions[index];
    subtopics[topic.id]={};
    topic.subtopics.forEach(label => {
      const hw=getMyMapPillWidth(label)/2+2;
      let distance=ringRadius+maxRadius+hw+32;
      let candidate;
      do {
        candidate={x:500+direction.x*distance, y:350+direction.y*distance, hw, hh:14};
        distance+=24;
      } while (boxes.some(box => Math.abs(box.x-candidate.x)<box.hw+hw+gap && Math.abs(box.y-candidate.y)<box.hh+14+gap));
      boxes.push(candidate);
      subtopics[topic.id][label]={x:candidate.x,y:candidate.y};
    });
  });
  return {positions,subtopics,boxes};
}

function getMyMapNodeColor(topicId) {
  const key = JSON.stringify([topicId, ""]);
  if (!Object.prototype.hasOwnProperty.call(myMapNodeColors, key)) {
    const used = new Set(Object.values(myMapNodeColors));
    let index = used.size;
    let color;
    do {
      color = `hsl(${((index * 137.508) % 360).toFixed(3)} ${55 + index % 4 * 7}% ${72 + index % 3 * 5}%)`;
      index += 1;
    } while (used.has(color));
    myMapNodeColors[key] = color;
  }
  return myMapNodeColors[key];
}

function renderMyMap(svg, { partyName = "" } = {}) {
  if (!svg) return;
  svg.replaceChildren();
  svg.setAttribute("aria-label", partyName
    ? `${partyName}: ${partyName === "Socialdemokraterna" ? "illustrativ exempelkarta" : "partiuppgifter saknas"}.`
    : "Interaktiv tankekarta över dina politiska prioriteringar");
  const example = partyName === "Socialdemokraterna";
  const topics = partyName ? (example ? getMyMapExampleTopics() : []) : myMapTopics;
  const comparing = Boolean(partyName) && example;
  const layout = example ? getMyMapPartyCircularLayout() : getMyMapLayout(getMyMapLayoutTopics(svg !== myMapSvg), svg !== myMapSvg);
  const positions = layout.positions;
  const center = { x: 500, y: 350 };

  topics.forEach((topic) => {
    const position = positions[topic.id];
    svg.appendChild(createSvgElement("line", {
      x1: center.x, y1: center.y, x2: position.x, y2: position.y, class: "my-map-connection",
    }));
  });
  svg.appendChild(createSvgElement("circle", { cx: center.x, cy: center.y, r: 54, class: "my-map-root" }));
  if (!partyName) {
    addSvgTextLines(svg, "MIN", center.x, center.y - 8, "my-map-root-label");
    addSvgTextLines(svg, "KARTA", center.x, center.y + 19, "my-map-root-label");
  }
  if (partyName) {
    svg.appendChild(createSvgElement("image", {
      href: `assets/parties/${myMapPartyFiles[partyName]}`,
      x: center.x - 35, y: center.y - 35, width: 70, height: 70,
      preserveAspectRatio: "xMidYMid meet",
      class: "my-map-party-logo",
      role: "img", "aria-label": `${partyName}s logga`,
      "pointer-events": "none",
    }));
    const missing = createSvgElement("text", {
      x: center.x, y: center.y + 58, class: "my-map-center-missing",
    });
    missing.textContent = example ? "Illustrativt exempel" : "Uppgift saknas";
    svg.appendChild(missing);
  }
  topics.forEach((topic) => {
    const position = positions[topic.id];
    const order = partyName ? myMapExampleOrder : myMapOrder;
    const radius = getMyMapTopicRadius(topic, order);
    const rank = order.findIndex(id => canonicalMyMapId(id) === canonicalMyMapId(topic.id));
    const comparison = comparing ? myMapComparison(topic) : null;
    const nodeFill = comparison
      ? (comparison.symbol === "✓" ? "#8bcf9f" : comparison.symbol === "↕" ? "#f6d56d" : "#ef969b")
      : getMyMapNodeColor(topic.id);
    const group = createSvgElement("g", {
      class: `my-map-topic${myMapSelectedTopic === topic.id ? " is-selected" : ""}${partyName ? " is-comparison" : ""}`,
      "data-topic-id": topic.id,
      style: `--node-ring: color-mix(in srgb, ${nodeFill} 72%, black)`,
    });
    const mainNode = createSvgElement("g", {
      class: "my-map-topic-main my-map-topic-handle",
      role: "button",
      tabindex: 0,
      "aria-label": comparison
        ? comparison.text
        : rank >= 0 ? `${topic.title}, prioritet ${rank + 1}` : `${topic.title}, inte rangordnad`,
      "aria-pressed": myMapSelectedTopic === topic.id,
      "data-topic-id": topic.id,
      "data-drag-kind": "topic",
    });
    mainNode.appendChild(createSvgElement("circle", {
      cx: position.x, cy: position.y, r: radius, fill: nodeFill, class: "my-map-topic-circle",
    }));
    addSvgTextLines(mainNode, topic.title, position.x, position.y + 14, "my-map-topic-label");
    drawMyMapIcon(mainNode, topic.id, position.x, position.y - 23);
    const rankLabel = createSvgElement("text", {x:position.x, y:position.y + radius - 17, class:"my-map-node-rank", "aria-hidden":"true"});
    rankLabel.textContent = rank >= 0 ? `#${rank + 1}` : "";
    mainNode.appendChild(rankLabel);
    if (comparing) {
      mainNode.appendChild(createSvgElement("circle", {
        cx: position.x + radius * .72, cy: position.y - radius * .72, r: 12, class: "my-map-missing-marker",
      }));
      const marker = createSvgElement("text", {
        x: position.x + radius * .72, y: position.y - radius * .72 + 4, class: "my-map-missing-glyph",
      });
      const state = comparison;
      marker.textContent = state.symbol;
      mainNode.querySelector("circle").style.stroke = "var(--node-ring)";
      mainNode.querySelector("circle").style.strokeWidth = "5";
      mainNode.appendChild(marker);
      const missingLabel = createSvgElement("text", {
        x: position.x, y: position.y + radius + 16, class: "my-map-missing-label",
      });
      missingLabel.textContent = "";
      mainNode.appendChild(missingLabel);
    }
    group.appendChild(mainNode);

    topic.subtopics.forEach((label, subIndex) => {
      const subPosition = layout.subtopics[topic.id][label];
      const pillWidth = getMyMapPillWidth(label);
      const pillX = subPosition.x - pillWidth / 2;
      const pillY = subPosition.y - 12;
      const subtopic = createSvgElement("g", {
        class: "my-map-subtopic my-map-topic-handle",
        role: "button",
        tabindex: 0,
        "aria-label": `${label}, delområde under ${topic.title}`,
        "data-topic-id": topic.id,
        "data-subtopic-index": subIndex,
        "data-drag-kind": "subtopic",
      });
      svg.appendChild(createSvgElement("line", {
        x1: position.x + Math.cos(Math.atan2(subPosition.y - position.y, subPosition.x - position.x)) * radius,
        y1: position.y + Math.sin(Math.atan2(subPosition.y - position.y, subPosition.x - position.x)) * radius,
        x2: subPosition.x,
        y2: subPosition.y,
        class: "my-map-sub-connection",
      }));
      subtopic.appendChild(createSvgElement("rect", {
        x: pillX, y: pillY, width: pillWidth, height: 24, rx: 12, fill: nodeFill, class: "my-map-sub-pill",
      }));
      const subLabel = createSvgElement("text", {
        x: pillX + pillWidth / 2, y: pillY + 12, class: "my-map-sub-label",
      });
      subLabel.textContent = label;
      subtopic.appendChild(subLabel);
      subtopic.addEventListener("click", () => {
        if (Date.now() < myMapSuppressClickUntil) return;
        openMyMapTopicInfo(topic.id, label, svg !== myMapSvg);
      });
      subtopic.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openMyMapTopicInfo(topic.id, label, svg !== myMapSvg);
      });
      group.appendChild(subtopic);
    });
    mainNode.addEventListener("click", () => {
      if (Date.now() < myMapSuppressClickUntil) return;
      openMyMapTopicInfo(topic.id, "", svg !== myMapSvg);
    });
    mainNode.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openMyMapTopicInfo(topic.id, "", svg !== myMapSvg);
    });
    svg.appendChild(group);
  });
}

function renderMyMapSubjects() {
  const scrollTop = myMapSubjectChoices.scrollTop;
  myMapSubjectChoices.replaceChildren();
  myMapSubjects.forEach((subject) => {
    const alreadyAdded = myMapTopics.some((topic) => canonicalMyMapId(topic.id) === canonicalMyMapId(subject.id));
    const button = document.createElement("button");
    button.type = "button";
    button.className = alreadyAdded ? "is-added" : "";
    button.textContent = subject.title;
    if (alreadyAdded) {
      const check = document.createElement("span");
      check.className = "my-map-subject-check";
      check.setAttribute("aria-hidden", "true");
      check.textContent = "\u2713";
      button.appendChild(check);
    }
    button.setAttribute("aria-label", `${alreadyAdded ? "Ta bort" : "Lägg till"} ${subject.title}`);
    button.title = `${alreadyAdded ? "Ta bort" : "Lägg till"} ${subject.title}`;
    button.setAttribute("aria-pressed", String(alreadyAdded));
    button.addEventListener("click", () => {
      if (alreadyAdded) removeMyMapTopic(subject.id);
      else addMyMapTopic(subject);
    });
    myMapSubjectChoices.appendChild(button);
  });
  myMapSubjectChoices.scrollTop = scrollTop;
}

function renderMyMapRanking() {
  const scrollTop = myMapRankingList.scrollTop;
  myMapRankingList.replaceChildren();
  const pending = myMapTopics.filter(topic => !myMapOrder.includes(topic.id));
  const rows = [...myMapOrder, ...pending.map(topic => topic.id)];
  rows.forEach((id, index) => {
    const ranked = index < myMapOrder.length;
    if (index === myMapOrder.length && pending.length) {
      const heading = document.createElement("li");
      heading.className = "my-map-unranked-heading";
      heading.textContent = "Ej rangordnade";
      myMapRankingList.appendChild(heading);
    }
    const topic = myMapTopics.find((item) => item.id === id);
    if (!topic) return;
    const row = document.createElement("li");
    row.className = "my-map-ranking-item";
    row.dataset.topicId = id;
    const rank = document.createElement("span");
    rank.className = "my-map-rank-number";
    rank.textContent = ranked ? String(index + 1) : "—";
    const handle = document.createElement("span");
    handle.className = "my-map-drag-handle";
    handle.setAttribute("role", "button");
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("aria-label", `Dra för att flytta ${topic.title}`);
    handle.textContent = "⠿";
    handle.addEventListener("pointerdown", (event) => startMyMapRankingDrag(event, id, row));
    handle.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveMyMapTopic(id, -1);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveMyMapTopic(id, 1);
      }
    });
    const name = document.createElement("span");
    name.className = "my-map-rank-name";
    name.textContent = topic.title;
    const actions = document.createElement("div");
    actions.className = "my-map-rank-actions";
    if (!ranked) {
      const place = document.createElement("button");
      place.type = "button";
      place.className = "my-map-rank-place";
      place.textContent = "Rangordna";
      place.setAttribute("aria-label", `Rangordna ${topic.title}`);
      place.addEventListener("click", () => rankMyMapTopic(id, myMapOrder.length));
      actions.appendChild(place);
    } else {
      const up = document.createElement("button");
      up.type = "button";
      up.textContent = "↑";
      up.disabled = index === 0;
      up.setAttribute("aria-label", `Flytta ${topic.title} upp`);
      up.addEventListener("click", () => moveMyMapTopic(id, -1));
      const down = document.createElement("button");
      down.type = "button";
      down.textContent = "↓";
      down.disabled = index === myMapOrder.length - 1;
      down.setAttribute("aria-label", `Flytta ${topic.title} ned`);
      down.addEventListener("click", () => moveMyMapTopic(id, 1));
      actions.append(up, down);
    }
    row.append(rank, handle, name, actions);
    myMapRankingList.appendChild(row);
  });
  myMapRankingList.scrollTop = scrollTop;
  updateMyMapDropIndicator();
}

function renderMyMapParties() {
  myMapPartyChoices.replaceChildren();
  Object.entries(myMapPartyFiles).forEach(([partyName, filename]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "my-map-party-choice";
    button.title = partyName;
    button.setAttribute("aria-label", partyName);
    button.setAttribute("aria-pressed", String(myMapSelectedParty === partyName));
    const image = document.createElement("img");
    image.src = `assets/parties/${filename}`;
    image.alt = "";
    button.appendChild(image);
    button.addEventListener("click", () => {
      myMapSelectedParty = partyName;
      renderMyMapParties();
      renderAllMyMaps();
    });
    myMapPartyChoices.appendChild(button);
  });
}

function renderAllMyMaps() {
  renderMyMapCanvases();
  renderMyMapRanking();
  renderMyMapSubjects();
  const example = myMapSelectedParty === "Socialdemokraterna";
  document.getElementById("myMapPartyHeading").textContent = example ? "Socialdemokraterna – illustrativ exempelkarta" : `${myMapSelectedParty} – uppgifter saknas`;
  document.getElementById("myMapAgreement").textContent = example ? "Jämförelse av ämnesval och prioriteringar" : "Jämförelseunderlag saknas";
  document.getElementById("myMapAgreementCoverage").textContent = "Ett saknat ämne innebär inte att du är emot ämnet eller partiets politik.";
  if (myMapOpenInfo?.compare) myMapInfoComparison.textContent = example ? myMapComparison(getMyMapTopic(myMapOpenInfo.topicId)).text : "Jämförelseunderlag saknas för detta parti.";

}

function renderMyMapCanvases() {
  renderMyMap(myMapSvg);
  renderMyMap(myMapCompareOwnSvg);
  renderMyMap(myMapComparePartySvg, { partyName: myMapSelectedParty });
  applyMyMapZoom();
}

const myMapVerifiedPartyRanks = {};

function calculateMyMapAgreement(partyName) {
  const ranks = myMapVerifiedPartyRanks[partyName] || {};
  const comparable = myMapOrder.filter((id) => Number.isInteger(ranks[id]));
  if (comparable.length < 2) return null;
  const comparableUserOrder = myMapOrder.filter((id) => Number.isInteger(ranks[id]));
  const maxDifference = comparable.length - 1;
  const distance = comparable.reduce((sum, id) =>
    sum + Math.abs(comparableUserOrder.indexOf(id) - ranks[id]), 0);
  return Math.round((1 - distance / (comparable.length * maxDifference)) * 100);
}

function updateMyMapDropIndicator() {
  myMapRankingList.querySelectorAll(".my-map-ranking-item").forEach((row) => {
    row.classList.toggle("is-drop-before", Boolean(myMapDropTarget && row.dataset.topicId === myMapDropTarget.id && !myMapDropTarget.after));
    row.classList.toggle("is-drop-after", Boolean(myMapDropTarget && row.dataset.topicId === myMapDropTarget.id && myMapDropTarget.after));
    row.classList.toggle("is-dragging", Boolean(myMapRankingDrag && row.dataset.topicId === myMapRankingDrag.id));
  });
}

function startMyMapRankingDrag(event, id, row) {
  if (event.button !== 0) return;
  event.preventDefault();
  myMapRankingDrag = { id, pointerId: event.pointerId };
  row.classList.add("is-dragging");
  event.currentTarget.setPointerCapture?.(event.pointerId);
  updateMyMapDropIndicator();
}

function updateMyMapRankingDrag(event) {
  if (!myMapRankingDrag || event.pointerId !== myMapRankingDrag.pointerId) return;
  const rect = myMapRankingList.getBoundingClientRect();
  const edge = 38;
  if (event.clientY < rect.top + edge) {
    myMapRankingList.scrollTop -= Math.max(5, Math.round((rect.top + edge - event.clientY) / 3));
  } else if (event.clientY > rect.bottom - edge) {
    myMapRankingList.scrollTop += Math.max(5, Math.round((event.clientY - (rect.bottom - edge)) / 3));
  }
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".my-map-ranking-item");
  if (target && target.dataset.topicId !== myMapRankingDrag.id) {
    const targetRect = target.getBoundingClientRect();
    myMapDropTarget = { id: target.dataset.topicId, after: event.clientY > targetRect.top + targetRect.height / 2 };
  } else {
    myMapDropTarget = null;
  }
  updateMyMapDropIndicator();
}

function finishMyMapRankingDrag(event) {
  if (!myMapRankingDrag || (event.pointerId != null && event.pointerId !== myMapRankingDrag.pointerId)) return;
  const drag = myMapRankingDrag;
  const target = myMapDropTarget;
  myMapRankingDrag = null;
  myMapDropTarget = null;
  if (target && event.type !== "pointercancel") {
    const without = myMapOrder.filter(id => id !== drag.id);
    const targetIndex = without.indexOf(target.id);
    rankMyMapTopic(drag.id, targetIndex < 0 ? without.length : targetIndex + (target.after ? 1 : 0));
  } else renderAllMyMaps();
}

function bindMyMapCanvas(svg, { isPartyMap = false } = {}) {
  const pointers = new Map();
  let interaction = null;
  let suppressClick = false;

  svg.addEventListener("wheel", (event) => {
    myMapAutoFit = false;
    event.preventDefault();
    const rect = svg.getBoundingClientRect();
    if (!event.ctrlKey && event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
      && (event.deltaX !== 0 || Math.abs(event.deltaY) < 60)) {
      myMapCamera = {
        x: myMapCamera.x + event.deltaX * 1000 / myMapZoom / rect.width,
        y: myMapCamera.y + event.deltaY * 700 / myMapZoom / rect.height,
      };
      applyMyMapZoom();
      return;
    }
    const oldBox = myMapViewBox();
    const focus = pointToMapWorld(svg, event);
    const ratioX = (focus.x - oldBox.x) / oldBox.width;
    const ratioY = (focus.y - oldBox.y) / oldBox.height;
    myMapZoom = Math.min(3, Math.max(.05, myMapZoom * Math.exp(-event.deltaY * .002)));
    const nextWidth = 1000 / myMapZoom;
    const nextHeight = 700 / myMapZoom;
    myMapCamera = {
      x: focus.x - (ratioX - .5) * nextWidth,
      y: focus.y - (ratioY - .5) * nextHeight,
    };
    if (rect.width > 0) applyMyMapZoom();
  }, { passive: false });

  svg.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const point = pointToMapWorld(svg, event);
    pointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
    svg.setPointerCapture(event.pointerId);
    if (pointers.size >= 2) {
      const [first, second] = [...pointers.values()];
      const midpoint = { x: (first.clientX + second.clientX) / 2, y: (first.clientY + second.clientY) / 2 };
      const oldBox = myMapViewBox();
      const midpointEvent = { clientX: midpoint.x, clientY: midpoint.y };
      const focal = pointToMapWorld(svg, midpointEvent);
      interaction = {
        kind: "pinch",
        startZoom: myMapZoom,
        startDistance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
        startMidpoint: midpoint,
        focal,
        ratioX: (focal.x - oldBox.x) / oldBox.width,
        ratioY: (focal.y - oldBox.y) / oldBox.height,
      };
      event.preventDefault();
      return;
    }
    const handle = event.target.closest(".my-map-topic-handle");
    if (handle) {
      const topic = isPartyMap ? getMyMapExampleTopics().find(item => item.id === handle.dataset.topicId) : getMyMapTopic(handle.dataset.topicId);
      if (!topic) return;
      if (handle.dataset.dragKind === "subtopic") {
        interaction = {
          kind: "subtopic",
          id: topic.id,
          index: Number(handle.dataset.subtopicIndex),
          label: topic.subtopics[Number(handle.dataset.subtopicIndex)],
          startClientX: event.clientX,
          startClientY: event.clientY,
          start: point,
          moved: false,
        };
      } else {
        interaction = { kind: "topic", id: topic.id, start: point, startClientX: event.clientX, startClientY: event.clientY, moved: false };
      }
    } else {
      interaction = {
        kind: "pan",
        startClientX: event.clientX,
        startClientY: event.clientY,
        startCamera: { ...myMapCamera },
        zoom: myMapZoom,
      };
    }
    event.preventDefault();
  });

  svg.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
    if (!interaction) return;
    if (interaction.kind === "pinch" && pointers.size >= 2) {
      myMapAutoFit = false;
      const [first, second] = [...pointers.values()];
      const distance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
      const midpointX = (first.clientX + second.clientX) / 2;
      const midpointY = (first.clientY + second.clientY) / 2;
      const rect = svg.getBoundingClientRect();
      myMapZoom = Math.min(3, Math.max(.05, interaction.startZoom * distance / interaction.startDistance));
      const nextWidth = 1000 / myMapZoom;
      const nextHeight = 700 / myMapZoom;
      const focalX = interaction.focal.x - (midpointX - interaction.startMidpoint.x) * 1000 / interaction.startZoom / rect.width;
      const focalY = interaction.focal.y - (midpointY - interaction.startMidpoint.y) * 700 / interaction.startZoom / rect.height;
      myMapCamera = {
        x: focalX - (interaction.ratioX - .5) * nextWidth,
        y: focalY - (interaction.ratioY - .5) * nextHeight,
      };
      applyMyMapZoom();
      event.preventDefault();
      return;
    }
    if (interaction.kind === "pan") {
      myMapAutoFit = false;
      const rect = svg.getBoundingClientRect();
      myMapCamera = {
        x: interaction.startCamera.x - (event.clientX - interaction.startClientX) * 1000 / interaction.zoom / rect.width,
        y: interaction.startCamera.y - (event.clientY - interaction.startClientY) * 700 / interaction.zoom / rect.height,
      };
      applyMyMapZoom();
      event.preventDefault();
      return;
    }
    const point = pointToMapWorld(svg, event);
    const dx = point.x - interaction.start.x;
    const dy = point.y - interaction.start.y;
    if (!interaction.moved && Math.hypot(event.clientX - interaction.startClientX, event.clientY - interaction.startClientY) < 5) return;
    interaction.moved = true;
    if (isPartyMap) return;
    if (interaction.kind === "topic") {
      const original = getMyMapLayout(getMyMapLayoutTopics(svg !== myMapSvg), svg !== myMapSvg).positions[interaction.id];
      myMapPositions[interaction.id] = { x: original.x + dx, y: original.y + dy };
    } else if (interaction.kind === "subtopic") {
      const offsets = myMapSubtopicOffsets[interaction.id] || [];
      const offset = offsets[interaction.index] || { x: 0, y: 0 };
      const layoutTopics = getMyMapLayoutTopics(svg !== myMapSvg);
      const layout = getMyMapLayout(layoutTopics, svg !== myMapSvg);
      const topic = layoutTopics.find(item => item.id === interaction.id);
      const baseRadius = getMyMapTopicRadius(topic);
      const base = getMyMapSubtopicPosition(topic, topic.subtopics.indexOf(interaction.label), layout.positions[topic.id], baseRadius);
      const displayed = layout.subtopics[topic.id][interaction.label];
      offsets[interaction.index] = {
        x: offset.x + displayed.x - base.x + dx,
        y: offset.y + displayed.y - base.y + dy,
      };
      myMapSubtopicOffsets[interaction.id] = offsets;
    }
    interaction.start = point;
    renderMyMapCanvases();
    event.preventDefault();
  });

  function finishPointer(event) {
    pointers.delete(event.pointerId);
    if (event.type === "pointercancel") {
      if (interaction?.moved && !isPartyMap) saveMyMap();
      interaction = null;
      myMapSuppressClickUntil = Date.now() + 350;
      if (svg.hasPointerCapture?.(event.pointerId)) svg.releasePointerCapture(event.pointerId);
      return;
    }
    if (interaction?.kind === "pinch") {
      if (pointers.size === 1) {
        const remaining = [...pointers.values()][0];
        interaction = {
          kind: "pan",
          startClientX: remaining.clientX,
          startClientY: remaining.clientY,
          startCamera: { ...myMapCamera },
          zoom: myMapZoom,
        };
      } else {
        interaction = null;
      }
    } else if (interaction && ["topic", "subtopic"].includes(interaction.kind)) {
      if (interaction.moved) {
        myMapSuppressClickUntil = Date.now() + 350;
        saveMyMap();
        if (!isPartyMap) fitMyMapToView();
      } else {
        const releasedHandle = document.elementFromPoint(event.clientX, event.clientY)?.closest(".my-map-topic-handle");
        if (releasedHandle?.dataset.topicId === interaction.id
          && releasedHandle.dataset.dragKind === interaction.kind) {
          const selectedSubtopic = interaction.kind === "subtopic"
            ? interaction.label || ""
            : "";
          openMyMapTopicInfo(interaction.id, selectedSubtopic, svg !== myMapSvg);
          myMapSuppressClickUntil = Date.now() + 350;
        }
      }
      interaction = null;
    } else {
      interaction = null;
    }
    if (svg.hasPointerCapture?.(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  }

  svg.addEventListener("pointerup", finishPointer);
  svg.addEventListener("pointercancel", finishPointer);
}

function addMyMapTopic(subject) {
  if (myMapTopics.some((topic) => canonicalMyMapId(topic.id) === canonicalMyMapId(subject.id))) {

    setMyMapMessage(`${subject.title} finns redan i din karta.`);
    return;
  }
  myMapTopics.push({
    ...subject,
    summary: subject.summary || "Ingen sammanfattning finns för det egna ämnet.",
    sources: subject.sources || [],
    availableSubtopics: [...(subject.availableSubtopics || subject.subtopics || [])],
    subtopics: [],
  });
  saveMyMap();
  renderAllMyMaps();
  myMapSelectedTopic = subject.id;
  renderAllMyMaps();
  setMyMapMessage(`${subject.title} har lagts till utan prioritet. Rangordna ämnet för att ändra bubblans storlek.`);
  fitMyMapToView();

}

function removeMyMapTopic(id) {
  const removed = myMapTopics.filter(topic => canonicalMyMapId(topic.id) === canonicalMyMapId(id));
  if (!removed.length) return;
  const ids = new Set(removed.map(topic => topic.id));
  myMapTopics = myMapTopics.filter(topic => !ids.has(topic.id));
  myMapOrder = myMapOrder.filter(topicId => !ids.has(topicId));
  ids.forEach(topicId => {
    delete myMapPositions[topicId];
    delete myMapSubtopicOffsets[topicId];
  });
  if (ids.has(myMapSelectedTopic)) myMapSelectedTopic = "";
  if (myMapOpenInfo && ids.has(myMapOpenInfo.topicId)) {
    myMapOpenInfo = null;
    myMapInfo.hidden = true;
  }
  saveMyMap();
  renderAllMyMaps();
  setMyMapMessage(`${removed[0].title} och dess undernoder har tagits bort från din karta.`);
}

function rankMyMapTopic(id, index) {
  if (!myMapTopics.some(topic => topic.id === id)) return;
  const nextOrder = myMapOrder.filter(topicId => topicId !== id);
  nextOrder.splice(Math.max(0, Math.min(nextOrder.length, index)), 0, id);
  myMapOrder = nextOrder;
  saveMyMap();
  renderAllMyMaps();
  announceMyMapPriority(id);
  fitMyMapToView();
}
function moveMyMapTopic(id, direction) {
  const from = myMapOrder.indexOf(id);
  if (from < 0) { rankMyMapTopic(id, myMapOrder.length); return; }
  const to = from + direction;
  if (to < 0 || to >= myMapOrder.length) return;
  rankMyMapTopic(id, to);
}
function moveMyMapTopicBefore(sourceId, targetId) {
  if (sourceId === targetId) return;
  const without = myMapOrder.filter(id => id !== sourceId);
  const index = without.indexOf(targetId);
  rankMyMapTopic(sourceId, index < 0 ? without.length : index);
}

function fitMyMapToView() {
  myMapAutoFit = true;
  const layout = getMyMapLayout(getMyMapLayoutTopics(!myMapCompareView.hidden), !myMapCompareView.hidden);
  const boxes = !myMapCompareView.hidden && myMapSelectedParty === "Socialdemokraterna"
    ? [...layout.boxes, ...getMyMapPartyCircularLayout().boxes] : layout.boxes;
  const bounds = boxes.map(box => ({left:box.x-box.hw, right:box.x+box.hw, top:box.y-box.hh, bottom:box.y+box.hh}));
  if (bounds.length) {
    const left = Math.min(...bounds.map((item) => item.left)) - 40;
    const right = Math.max(...bounds.map((item) => item.right)) + 40;
    const top = Math.min(...bounds.map((item) => item.top)) - 35;
    const bottom = Math.max(...bounds.map((item) => item.bottom)) + 35;
    const width = Math.max(250, right - left);
    const height = Math.max(200, bottom - top);
    myMapCamera = { x: left + width / 2, y: top + height / 2 };
    myMapZoom = Math.min(3, Math.max(.05, Math.min(1000 / width, 700 / height)));
  } else {
    myMapCamera = { x: 500, y: 350 };
    myMapZoom = 1;
  }
  applyMyMapZoom();
}

function setMyMapView(compare) {
  myMapInfo.hidden = true;
  myMapOpenInfo = null;
  myMapPersonalView.hidden = compare;
  myMapCompareView.hidden = !compare;
  document.getElementById("myMapViewButton").setAttribute("aria-pressed", String(!compare));
  document.getElementById("myCompareViewButton").setAttribute("aria-pressed", String(compare));
  fitMyMapToView();
}

function drawMyMapIcon(parent, id, x, y) {
  const paths = {
    skola: "M-12 -8Q-6 -11 0 -7Q6 -11 12 -8V9Q6 6 0 10Q-6 6 -12 9Z M0 -7V10",
    sjukhus: "M-4 -12H4V-4H12V4H4V12H-4V4H-12V-4H-4Z",
    klimat: "M-12 0A12 12 0 1 0 12 0A12 12 0 1 0 -12 0 M-12 0H12 M0 -12Q-9 0 0 12Q9 0 0 -12",
    ekonomi: "M-11 10V0H-5V10 M-3 10V-6H3V10 M5 10V-12H11V10",
    bostader: "M-13 0L0 -12L13 0 M-10 -2V12H10V-2 M-3 12V4H3V12",
    arbetsmarknad: "M-12 -5H12V11H-12Z M-5 -5V-11H5V-5 M-12 1H12",
    jamstalldhet: "M-12 -5H12 M-12 5H12",
    migration: "M-10 -7A4 4 0 1 0 -2 -7A4 4 0 1 0 -10 -7 M-13 11V5Q-6 -2 1 5V11 M2 -6H13 M8 -11L13 -6L8 -1",
    integration: "M-12 -6A4 4 0 1 0 -4 -6A4 4 0 1 0 -12 -6 M4 -6A4 4 0 1 0 12 -6A4 4 0 1 0 4 -6 M-14 11V5Q-8 -1 -2 5L2 5Q8 -1 14 5V11",
    socialforsakringar: "M0 -13L12 -8V1Q11 10 0 14Q-11 10 -12 1V-8Z M-3 -3A3 3 0 1 0 3 -3A3 3 0 1 0 -3 -3 M-6 7Q0 0 6 7"
  };
  parent.append(createSvgElement("path", {d: paths[canonicalMyMapId(id)] || "M-10 -8H10V10H-10Z M-6 -3H6 M-6 3H6", transform: `translate(${x} ${y})`, fill: "none", stroke: "#302c27", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round", "pointer-events": "none"}));
}
document.getElementById("myMapSubtopicForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("myMapSubtopicInput");
  if (!input.value.trim()) { document.getElementById("myMapSubtopicMessage").textContent = "Skriv ett namn först."; return; }
  const info = myMapOpenInfo;
  if (info && addMyMapSubtopic(getMyMapTopic(info.topicId), input.value)) {
    input.value = ""; document.getElementById("myMapSubtopicMessage").textContent = "Undernoden har lagts till.";
    openMyMapTopicInfo(info.topicId, info.selectedSubtopic, info.compare);
  }
});
function setMyMapEditorMode(ranking, moveFocus = true) {
  myMapEditor.classList.toggle("is-ranking", ranking);
  document.getElementById("myMapSubjectPicker").hidden = ranking;
  myMapCustomForm.hidden = ranking;
  document.getElementById("myMapOpenRanking").hidden = ranking;
  document.getElementById("myMapOpenRanking").setAttribute("aria-expanded", String(ranking));
  document.getElementById("myMapRanking").hidden = !ranking;
  document.getElementById("myMapEditorBack").hidden = !ranking;
  document.getElementById("myMapEditorTitle").textContent = ranking ? "Rangordning" : "Lägg till noder";
  myMapEditor.setAttribute("aria-label", ranking ? "Rangordna dina noder" : "Lägg till och rangordna ämnen");
  if (moveFocus) {
    const target = document.getElementById(ranking ? "myMapEditorBack" : "myMapOpenRanking");
    target.focus({ preventScroll: true });
  }
}
document.getElementById("myMapOpenRanking").addEventListener("click", () => setMyMapEditorMode(true));
document.getElementById("myMapEditorBack").addEventListener("click", () => setMyMapEditorMode(false));

loadMyMap();
renderMyMapParties();
renderAllMyMaps();
fitMyMapToView();
bindMyMapCanvas(myMapSvg);
bindMyMapCanvas(myMapCompareOwnSvg);
bindMyMapCanvas(myMapComparePartySvg, { isPartyMap: true });
const myMapViewportObserver = new ResizeObserver(() => {
  if (!mindmapPage.hidden && myMapAutoFit) fitMyMapToView();
});
[myMapSvg, myMapCompareOwnSvg, myMapComparePartySvg].forEach(svg => myMapViewportObserver.observe(svg));
document.addEventListener("pointermove", updateMyMapRankingDrag);
document.addEventListener("pointerup", finishMyMapRankingDrag);
document.addEventListener("pointercancel", finishMyMapRankingDrag);
document.getElementById("myMapViewButton").addEventListener("click", () => setMyMapView(false));
document.getElementById("myCompareViewButton").addEventListener("click", () => setMyMapView(true));
myMapAddToggle.addEventListener("click", () => {
  const open = myMapEditor.hidden;
  if (open) setMyMapSavedOpen(false, false);
  myMapEditor.hidden = !open;
  myMapPersonalLayout.classList.toggle("has-editor", open);
  myMapAddToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    setMyMapEditorMode(false, false);
    myMapSubjectChoices.querySelector("button:not(:disabled)")?.focus();
  }
});
document.getElementById("myMapEditorClose").addEventListener("click", () => {
  myMapEditor.hidden = true;
  myMapPersonalLayout.classList.remove("has-editor");
  myMapAddToggle.setAttribute("aria-expanded", "false");
  myMapAddToggle.focus();
});
document.getElementById("myMapInfoClose").addEventListener("click", () => {
  myMapInfo.hidden = true;
  myMapOpenInfo = null;
});
myMapCustomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = myMapCustomInput.value.trim();
  if (!title) {
    setMyMapMessage("Skriv ett ämne innan du lägger till det.");
    myMapCustomInput.focus();
    return;
  }
  if (myMapTopics.some((topic) => topic.title.toLocaleLowerCase("sv") === title.toLocaleLowerCase("sv"))) {
    setMyMapMessage(`${title} finns redan i din karta.`);
    myMapCustomInput.focus();
    return;
  }
  const id = `eget-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const subject = {
    id,
    title,
    color: myMapPalette[myMapTopics.length % myMapPalette.length],
    summary: "Ett eget ämne som du har lagt till. Sammanfattning och verifierade källor saknas.",
    sources: [],
    availableSubtopics: ["Viktiga frågor"],
    subtopics: [],
  };
  addMyMapTopic(subject);
  myMapCustomInput.value = "";
});
document.getElementById("myMapShowAll").addEventListener("click", () => {
  fitMyMapToView();
});
document.getElementById("myMapZoomIn").addEventListener("click", () => {
  myMapAutoFit = false;
  myMapZoom = Math.min(3, Math.round((myMapZoom * 1.2) * 10) / 10);
  applyMyMapZoom();
});
document.getElementById("myMapZoomOut").addEventListener("click", () => {
  myMapAutoFit = false;
  myMapZoom = Math.max(0.05, Math.round((myMapZoom / 1.2) * 10) / 10);
  applyMyMapZoom();
});

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    setMenu(false);
    if (link.dataset.view === "home") {
      event.preventDefault();
      setView("home");
      window.scrollTo(0, 0);
    } else if (homeView.hidden) {
      event.preventDefault();
      const target = document.querySelector(link.hash);
      setView("home");
      window.setTimeout(() => target?.scrollIntoView({ behavior: "smooth" }), 0);
    }
  });
});

homeLink?.addEventListener("click", (event) => {
  event.preventDefault();
  setView("home");
  window.scrollTo(0, 0);
});

mindmapButton.addEventListener("click", () => setView("mindmap"));
partyViewButton.addEventListener("click", () => {
  resetPartyPicker();
  setView("party");
});
debateViewButton.addEventListener("click", () => setView("debate"));

sourcesButton.addEventListener("click", () => {
  renderSourceList(sources);
  setSources(true);
});
closeSources.addEventListener("click", () => setSources(false));
sourcesPanel.addEventListener("click", (event) => {
  if (event.target === sourcesPanel) setSources(false);
});

openNodeSources.addEventListener("click", () => {
  renderSourceList(nodeContent[activeNodeKey].sources.map((source) => ({
    ...source,
    detail: `Källa kopplad till ämnet ${nodeContent[activeNodeKey].title}.`,
  })));
  setSources(true);
});

function updateDebatePartyCount() {
  const selectedCount = [...debatePartyOptions].filter((option) => option.checked).length;
  debatePartyCount.textContent = `${selectedCount} av ${debatePartyOptions.length} partier valda`;
}

debatePartyOptions.forEach((option) => {
  option.addEventListener("change", updateDebatePartyCount);
});

debateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = debateInput.value.trim();
  const selectedParties = [...debatePartyOptions]
    .filter((option) => option.checked)
    .map((option) => option.value);

  if (selectedParties.length === 0) {
    debateFeedback.textContent = "Välj minst ett parti som ska delta.";
    debatePartyOptions[0].focus();
    return;
  }
  if (!question) {
    debateFeedback.textContent = "Skriv en fråga till debatten.";
    debateInput.focus();
    return;
  }

  debateLog.querySelector(".debate-empty")?.remove();
  const interpreted = interpretDebateQuestion(question);
  appendDebateMessage(question, "debate-user-message", "", interpreted);
  debateFeedback.textContent = "";
  debateInput.value = "";

  // Prepared replies are appended together, so consecutive questions cannot interleave.
  selectedParties.forEach((partyName) => {
    const answer = getPreparedDebateAnswer(partyName, interpreted.topic);
    const summary = answer?.summary || `Det finns ännu inget källbelagt svar på den här frågan för ${partyName} i underlaget. Prova att fråga om enbart energi, skola eller klimat.`;
    appendDebateMessage(summary, "debate-party-message", partyName, {
      sources: answer?.sources || [], question: interpreted.question, topic: interpreted.topic,
    });
  });
  debateLog.scrollTop = debateLog.scrollHeight;
});

function appendDebateMessage(text, className, partyName = "", answer = null) {
  const isPartyAnswer = className === "debate-party-message";
  if (isPartyAnswer) {
    const message = createPartyAnswerMessage(partyName, {summary:text, sources:answer?.sources || []}, {
      className, context:"Debatt", showName:true,
    });
    message.dataset.debateMessageId = message.dataset.answerId;
    message.dataset.party = partyName;
    message.dataset.question = answer?.question || "";
    debateLog.append(message);
    return;
  }

  const message = document.createElement("article");
  message.className = className;
  const content = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  content.append(paragraph);
  if (answer?.question && answer.question.toLocaleLowerCase("sv") !== text.toLocaleLowerCase("sv")) {
    const interpretation = document.createElement("p");
    interpretation.className = "debate-question-interpretation";
    interpretation.textContent = `Tolkat som: ${answer.question}`;
    content.appendChild(interpretation);
  }
  message.append(content);
  debateLog.append(message);
}

function createSavedMessageLikeButton(savedMessage) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "debate-like-button";
  button.dataset.savedMessageId = savedMessage.id;
  setDebateLikeButtonState(button, savedMessage.partyName, likedDebateMessages.some(item => item.id === savedMessage.id));
  button.addEventListener("click", () => setDebateMessageLiked(savedMessage, button.getAttribute("aria-pressed") !== "true"));
  return button;
}
function setMyMapSavedOpen(open, moveFocus = true) {
  const panel = document.getElementById("myMapSavedPanel");
  panel.hidden = !open;
  document.getElementById("myMapSavedToggle").setAttribute("aria-expanded", String(open));
  if (open) {
    myMapEditor.hidden = true;
    myMapAddToggle.setAttribute("aria-expanded", "false");
    renderLikedDebateMessages();
  }
  myMapPersonalLayout.classList.toggle("has-editor", open || !myMapEditor.hidden);
  myMapPersonalLayout.classList.toggle("has-saved", open);
  if (moveFocus) document.getElementById(open ? "myMapSavedClose" : "myMapSavedToggle").focus();
}
document.getElementById("myMapSavedToggle").addEventListener("click", () => setMyMapSavedOpen(document.getElementById("myMapSavedPanel").hidden));
document.getElementById("myMapSavedClose").addEventListener("click", () => setMyMapSavedOpen(false));
document.getElementById("myMapSavedPanel").addEventListener("keydown", event => {
  if (event.key === "Escape") setMyMapSavedOpen(false);
});

function setDebateLikeButtonState(button, partyName, liked) {
  button.textContent = liked ? "♥" : "♡";
  button.classList.toggle("is-liked", liked);
  button.setAttribute("aria-pressed", String(liked));
  const label = `${liked ? "Ta bort gilla-markering från" : "Gilla"} ${partyName}s svar`;
  button.setAttribute("aria-label", label);
  button.title = label;
}

function saveLikedDebateMessages() {
  try {
    localStorage.setItem(likedDebateStorageKey, JSON.stringify(likedDebateMessages));
  } catch (error) {
    debateFeedback.textContent = "Det gillade svaret kunde inte sparas i den här webbläsaren.";
  }
}

function setDebateMessageLiked(message, liked) {
  likedDebateMessages = likedDebateMessages.filter((item) => item.id !== message.id);
  if (liked) likedDebateMessages.unshift(message);
  saveLikedDebateMessages();

  document.querySelectorAll("[data-saved-message-id]").forEach(button => {
    if (button.dataset.savedMessageId === message.id) setDebateLikeButtonState(button, message.partyName, liked);
  });
  renderLikedDebateMessages();
}

function renderLikedDebateMessages() {
  if (!likedDebateList) return;
  likedDebateList.replaceChildren();

  const examples = document.getElementById("myMapSavedExamples");
  if (examples) examples.hidden = likedDebateMessages.length > 0;
  const count = document.getElementById("myMapSavedCount");
  if (count) { count.textContent = String(likedDebateMessages.length); count.hidden = !likedDebateMessages.length; }
  if (likedDebateMessages.length === 0) {
    const empty = document.createElement("p");
    empty.className = "mindmap-liked-empty";
    empty.textContent = "Du har inga sparade chattar ännu. Tryck på hjärtat vid ett svar i samtal, debatt eller en valstuga för att spara det här.";
    likedDebateList.appendChild(empty);
    return;
  }

  likedDebateMessages.forEach((savedMessage) => {
    const entry = document.createElement("article");
    entry.className = "mindmap-liked-entry";

    const header = document.createElement("header");
    header.className = "mindmap-liked-entry-header";
    const partyName = document.createElement("strong");
    partyName.textContent = `${savedMessage.context || "Debatt"} · ${savedMessage.partyName}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "mindmap-liked-remove";
    removeButton.textContent = "♥";
    removeButton.setAttribute("aria-label", `Ta bort gillning från ${savedMessage.partyName}s svar`);
    removeButton.title = "Ta bort gillning";
    removeButton.addEventListener("click", () => setDebateMessageLiked(savedMessage, false));
    header.append(partyName, removeButton);

    const text = document.createElement("p");
    text.textContent = savedMessage.text;
    entry.append(header, text);

    const sources = Array.isArray(savedMessage.sources) ? savedMessage.sources : savedMessage.sourceUrl ? [{title:savedMessage.partyName,url:savedMessage.sourceUrl}] : [];
    sources.forEach(item => {
      if (!/^https?:\/\//i.test(item.url || "")) return;
      const source = document.createElement("a");
      source.href=item.url; source.target="_blank"; source.rel="noopener noreferrer";
      source.textContent=`Källa: ${item.title} ↗`;
      entry.appendChild(source);
    });

    likedDebateList.appendChild(entry);
  });
}

function getPartyChatAccent(partyName) {
  return {
    Socialdemokraterna: "#a91e40",
    Moderaterna: "#24528a",
    Sverigedemokraterna: "#786017",
    Centerpartiet: "#286b42",
    Vänsterpartiet: "#a32835",
    Kristdemokraterna: "#215189",
    Liberalerna: "#26708a",
    Miljöpartiet: "#526f25",
  }[partyName] || "#875f46";
}

function applyPartyChatTheme(partyName) {
  if (!partyProfiles[partyName]) return;
  // These darker party shades all have at least 4.5:1 contrast with white text.
  partyView.style.setProperty("--party-chat-accent", getPartyChatAccent(partyName));
  partyView.classList.add("is-private");
}

function savePartyConversation() {
  if (!partyProfiles[selectedParty]) return;
  // Keep the actual messages, including read-more state and button listeners.
  partyConversations.set(selectedParty, {
    messages: Array.from(partyChatLog.childNodes),
    draft: partyChatInput.value,
    scrollTop: partyChatLog.scrollTop,
  });
}

function renderPartyShortcuts() {
  partyShortcutList.replaceChildren();
  Object.entries(partyProfiles).forEach(([partyName, profile]) => {
    if (partyName === selectedParty) return;
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "party-shortcut";
    button.dataset.partyShortcut = partyName;
    const logo = document.createElement("img");
    logo.src = profile.logo;
    logo.alt = "";
    logo.width = 24;
    logo.height = 24;
    logo.draggable = false;
    const name = document.createElement("span");
    name.textContent = partyName;
    button.append(logo, name);
    button.addEventListener("click", () => openPartyChat(partyName));
    item.appendChild(button);
    partyShortcutList.appendChild(item);
  });
}

function openPartyChat(partyName) {
  const profile = partyProfiles[partyName];
  if (!profile) return;
  savePartyConversation();
  selectedParty = partyName;
  partyView.style.setProperty("--party-tint", profile.tint);
  applyPartyChatTheme(partyName);
  partyOptions.forEach(option => option.setAttribute("aria-pressed", String(option.dataset.party === partyName)));
  partyChatLogo.src = profile.logo;
  partyChatLogo.alt = `${partyName}s logotyp`;
  partyChatTitle.textContent = `${partyName} Valstuga`;
  const saved = partyConversations.get(partyName);
  partyChatLog.replaceChildren(...(saved?.messages || []));
  partyChatInput.value = saved?.draft || "";
  partyPicker.hidden = true;
  partyChat.hidden = false;
  partyChatNavigation.hidden = false;
  updatePartyChatPosition();
  renderPartyShortcuts();
  // A like may have been removed in Saved chats while this conversation was away.
  partyChatLog.querySelectorAll("[data-saved-message-id]").forEach(button => {
    setDebateLikeButtonState(button, partyName, likedDebateMessages.some(item => item.id === button.dataset.savedMessageId));
  });
  partyChatLog.scrollTop = saved?.scrollTop || 0;
  partyChatInput.focus({preventScroll:true});
}

partyOptions.forEach((option) => {
  option.addEventListener("click", () => openPartyChat(option.dataset.party));
});

function resetPartyPicker() {
  savePartyConversation();
  partyView.classList.remove("is-chatting");
  partyView.classList.remove("is-private");
  partyChat.hidden = true;
  partyChatNavigation.hidden = true;
  partyPicker.hidden = false;
  selectedParty = "";
  partyChatInput.value = "";
  partyChatLog.replaceChildren();
  partyChatLogo.removeAttribute("src");
  partyChatLogo.alt = "";
  partyChatTitle.textContent = "";
  partyView.style.removeProperty("--party-tint");
  partyOptions.forEach((option) => option.setAttribute("aria-pressed", "false"));
}

partyBack.addEventListener("click", resetPartyPicker);

partyChatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendPartyQuestion(partyChatInput.value);
});
document.querySelectorAll("[data-party-question]").forEach(button => {
  button.addEventListener("click", () => sendPartyQuestion(button.textContent));
});
partyChatInput.addEventListener("input", updatePartyChatPosition);
partyChatInput.addEventListener("beforeinput", () => partyView.classList.add("is-chatting"));

function getPreparedPartyAnswer(partyName, question) {
  const normalized = question.toLocaleLowerCase("sv").replace(/[?!.]+$/, "").trim();
  const key = {
    "hur vill ni förbättra skolan": "school",
    "vad vill ni göra åt klimatförändringarna": "climate",
  }[normalized];
  const answer = typeof partyPreparedAnswers === "undefined" ? null : partyPreparedAnswers[partyName]?.[key];
  if (!answer?.summary || !Array.isArray(answer.details) || !Array.isArray(answer.sources) || !answer.sources.length
    || !answer.sources.every(source => source.publisher && source.title && /^https:\/\//.test(source.url))) return null;
  return answer;
}

function updatePartyChatPosition() {
  partyView.classList.toggle("is-chatting", partyChatInput.value.trim().length > 0 || partyChatLog.children.length > 0);
}

function sendPartyQuestion(value) {
  const question = value.trim();
  if (!selectedParty || !question) return;
  const replyingParty = selectedParty;
  appendPartyMessage(question, "user-message");
  partyChatInput.value = "";
  updatePartyChatPosition();
  const answer = getPreparedPartyAnswer(replyingParty, question);
  if (answer) appendPreparedPartyAnswer(replyingParty, answer);
  else appendPartyMessage(`Det finns ännu inget källbelagt svar på den här frågan för ${replyingParty}.`, "assistant-message", "", replyingParty);
}

function createPartyMessageAvatar(partyName) {
  const profile = partyProfiles[partyName];
  const avatar = document.createElement(profile?.logo ? "img" : "span");
  avatar.className = "party-message-avatar";
  if (profile?.logo) {
    avatar.src = profile.logo;
    avatar.alt = `${partyName} – logotyp`;
    avatar.draggable = false;
  } else {
    avatar.setAttribute("aria-label", "Partilogotyp saknas");
  }
  return avatar;
}

function createPartyAnswerSources(answerSources) {
  const sources = document.createElement("footer");
  sources.className = "party-answer-sources";
  const heading = document.createElement("h3");
  heading.textContent = "Källor:";
  sources.appendChild(heading);
  const list = document.createElement("ul");
  answerSources.forEach(source => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${source.publisher} – ${source.title}`;
    item.appendChild(link);
    list.appendChild(item);
  });
  sources.appendChild(list);
  return sources;
}

function createPartyAnswerMessage(partyName, answer, {className = "party-message assistant-message", context = "Valstuga", showName = false} = {}) {
  const message = document.createElement("article");
  message.className = `${className} party-prepared-answer`;
  message.style.setProperty("--party-chat-accent", getPartyChatAccent(partyName));
  message.setAttribute("aria-label", `Svar om ${partyName}s politik`);
  message.appendChild(createPartyMessageAvatar(partyName));

  const content = document.createElement("div");
  content.className = showName ? "party-answer-content debate-answer-content" : "party-answer-content";
  if (showName) {
    const heading = document.createElement("strong");
    heading.className = "party-answer-name";
    heading.textContent = partyName;
    content.appendChild(heading);
  }
  const summary = document.createElement("p");
  summary.className = "party-answer-summary";
  summary.textContent = answer.summary;
  content.appendChild(summary);

  const id = window.crypto?.randomUUID?.() || `answer-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  message.dataset.answerId = id;
  if (answer.details?.length) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "party-answer-toggle";
    toggle.textContent = "Läs mer…";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", `party-answer-details-${id}`);
    content.appendChild(toggle);
    const details = document.createElement("div");
    details.id = `party-answer-details-${id}`;
    details.className = "party-answer-details";
    details.hidden = true;
    answer.details.forEach(text => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      details.appendChild(paragraph);
    });
    content.appendChild(details);
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") !== "true";
      details.hidden = !expanded;
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.textContent = expanded ? "Visa mindre" : "Läs mer…";
    });
  }
  if (answer.sources.length) {
    content.appendChild(createSavedMessageLikeButton({
      id, partyName, context, text:[answer.summary,...(answer.details || [])].join("\n\n"),
      sources:answer.sources.map(source => ({title:`${source.publisher} – ${source.title}`,url:source.url}))
    }));

    // Keep source links last in both collapsed and expanded states.
    content.appendChild(createPartyAnswerSources(answer.sources));
  }
  message.appendChild(content);
  return message;
}

function appendPreparedPartyAnswer(partyName, answer) {
  const message = createPartyAnswerMessage(partyName, answer);
  partyChatLog.appendChild(message);
  message.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function appendPartyMessage(text, className, sourceUrl = "", sourceName = "") {
  const message = document.createElement("div");
  message.className = `party-message ${className}`;

  if (className === "assistant-message") {
    message.append(createPartyMessageAvatar(sourceName || selectedParty));
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  if (className === "assistant-message" && sourceUrl) {
    const source = document.createElement("a");
    source.className = "party-source-bubble";
    source.href = sourceUrl;
    source.target = "_blank";
    source.rel = "noreferrer";
    source.textContent = `Källa: ${sourceName} ↗`;
    paragraph.append(source);
  }

  message.append(paragraph);
  if (className === "assistant-message") message.append(createSavedMessageLikeButton({
    id: window.crypto?.randomUUID?.() || `valstuga-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    partyName: sourceName || "Valstuga", text, sourceUrl, context:"Valstuga"
  }));
  partyChatLog.append(message);
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

railToggle.addEventListener("click", () => {
  const isExpanded = railToggle.getAttribute("aria-expanded") === "true";
  setPartyRailCollapsed(isExpanded);
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    partyRail.dataset.view = button.dataset.view;
    viewButtons.forEach((viewButton) => {
      viewButton.setAttribute("aria-pressed", String(viewButton === button));
    });
  });
});

document.querySelectorAll(".party-row").forEach((row) => {
  row.style.setProperty("--match", `${row.dataset.match}%`);
});

connectionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const connection = connectionInput.value.trim();
  if (!connection) {
    connectionMessage.textContent = "Skriv något att koppla till kartan.";
    connectionInput.focus();
    return;
  }
  connectionMessage.textContent = `“${connection}” har lagts till i din karta.`;
  connectionInput.value = "";
});

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.setAttribute(
    "aria-label",
    body.classList.contains("dark-mode") ? "Byt till ljust tema" : "Byt till mörkt tema",
  );
});
// Wallahi
function askQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    questionMessage.textContent = "Skriv en fråga så börjar vi utforska.";
    questionInput.focus();
    return;
  }

  if (conversationMessages.length === 0) {
    askSection.classList.add("is-chat-active");
    body.classList.add("chat-active");
    newConversationButton.hidden = false;
    window.scrollTo(0, 0);
    questionInput.placeholder = "Ställ en följdfråga...";
    if (mobileNavigation.matches && !partyRail.classList.contains("is-collapsed")) {
      setPartyRailCollapsed(true);
    }
  }

  questionMessage.textContent = "";
  const normalizedQuestion = cleanQuestion.toLocaleLowerCase("sv-SE");
  let answer = "Jag vet tyvärr ingen om det än. Ställ en ny fråga";
  let answerSources = [];
  if (normalizedQuestion === "vilka frågor kan jag ställa") {
    answer = [
      "Här är alla frågor med hårdkodade svar:",
      "• Bensinskatt",
      "• vad är yttrandefrihetsgrundlagen",
      "• vad är tryckfrihetsförordningen",
      "• funkar det hära",
    ].join("\n");
  } else if (normalizedQuestion === "bensinskatt") {
    answer = "Skatten på bensin i Sverige består av tre delar: **energiskatt**, **koldioxidskatt** och **moms**";
    answerSources = [{
      title: "Ekonomifakta · Bensinskatt",
      url: "https://www.ekonomifakta.se/sakomraden/energi/styrmedel/bensinskatt_1208679.html",
    }];
  } else if (normalizedQuestion === "vad är energiskatt") {
    answer = "**Energiskatt:** 1,52 kr per liter (ordinarie nivå), men har varit tillfälligt sänkt. Den sänkningen upphörde den 1 oktober 2026, vilket höjde skatten med cirka 1 krona per liter inklusive moms";
    answerSources = [{
      title: "Ekonomifakta · Bensinskatt",
      url: "https://www.ekonomifakta.se/sakomraden/energi/styrmedel/bensinskatt_1208679.html",
    }];
  } else if (normalizedQuestion === "vad är koldioxidskatt") {
    answer = "**Koldioxidskatt:** 0,87 kr per liter (ordinarie nivå), men är för tillfället nedsatt med 2,40 kr per liter fram till den 30 november 2026. Den återgår till ordinarie nivå den 1 december 2026.";
    answerSources = [{
      title: "Ekonomifakta · Bensinskatt",
      url: "https://www.ekonomifakta.se/sakomraden/energi/styrmedel/bensinskatt_1208679.html",
    }];
  } else if (normalizedQuestion === "vad är moms") {
    answer = "**Moms:** 25% på bensinpriset inklusive skatter. Momsen beräknas på priset inklusive energiskatt och koldioxidskatt.";
    answerSources = [{
      title: "Ekonomifakta · Bensinskatt",
      url: "https://www.ekonomifakta.se/sakomraden/energi/styrmedel/bensinskatt_1208679.html",
    }];
  } else if (normalizedQuestion === "funkar det hära") {
    answer = "Ja, det funkar!";
  } else if (normalizedQuestion === "vad är yttrandefrihetsgrundlagen") {
    answer = "Yttrandefrihetsgrundlagen är en del av Sveriges konstitution och garanterar rätten till frihet i uttryck och tänkande.";
    answerSources = [{
      title: "Regeringen · Yttrandefrihetsgrundlagen",
      url: "https://www.regeringen.se/artiklar/2023/01/yttrande--och-demonstrationsfrihet-i-sverige/",
    }];
  } else if (normalizedQuestion === "vad är tryckfrihetsförordningen") {
    answer = "Tryckfrihetsförordningen är en del av Sveriges konstitution och reglerar tryckfriheten, inklusive rätten att publicera och sprida information i tryckt form.";
    answerSources = [{
      title: "Regeringen · Tryckfrihetsförordningen",
      url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/tryckfrihetsforordning-1949105_sfs-1949-105/",
    }];
  } 

  finishConversationTyping();
  const response = {role:"assistant", content:answer, sources:answerSources};
  conversationMessages.push({role:"user", content:cleanQuestion, sources:[]}, response);
  animateConversationAnswer(response);
  questionInput.value = "";
}

function finishConversationTyping() {
  if (conversationTypingTimer !== null) window.clearTimeout(conversationTypingTimer);
  if (conversationTypingMessage) {
    conversationTypingMessage.streaming = false;
    conversationTypingMessage.revealed = conversationTypingMessage.content.length;
  }
  conversationTypingTimer = null;
  conversationTypingMessage = null;
}
function renderConversationMessageText(element, content) {
  element.replaceChildren();
  // Avoid displaying an unfinished bold marker while a sentence is appearing.
  const display = (content.match(/\*\*/g) || []).length % 2 ? content.replace(/\*\*([^*]*)$/, "$1") : content;
  display.split(/(\*\*.+?\*\*)/g).forEach(part => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const strong = document.createElement("strong");
      strong.textContent = part.slice(2,-2);
      element.appendChild(strong);
    } else element.appendChild(document.createTextNode(part));
  });
}
function animateConversationAnswer(message) {
  finishConversationTyping();
  message.streaming = true;
  message.revealed = 0;
  conversationTypingMessage = message;
  renderConversation();
  function typeNext() {
    if (conversationTypingMessage !== message || !conversationMessages.includes(message)) return;
    const follow = conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight < 100;
    message.revealed = Math.min(message.content.length, message.revealed + 2);
    const text = document.getElementById(`conversation-text-${message.id}`);
    if (text) renderConversationMessageText(text, message.content.slice(0,message.revealed));
    if (message.revealed >= message.content.length) {
      finishConversationTyping();
      renderConversation(follow);
    } else {
      if (follow) conversation.scrollTop = conversation.scrollHeight;
      conversationTypingTimer = window.setTimeout(typeNext,24);
    }
  }
  conversationTypingTimer = window.setTimeout(typeNext,24);
}

function renderConversation(scrollToLatest = true) {
  conversation.replaceChildren();
  if (conversationMessages.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "conversation-empty";
    emptyState.textContent = "Din dialog visas här.";
    conversation.appendChild(emptyState);
    return;
  }

  conversationMessages.forEach(messageData => {
    const {role, content, sources:messageSources} = messageData;
    messageData.id ||= window.crypto?.randomUUID?.() || `samtal-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const element = document.createElement("article");
    element.className = `chat-message ${role}`;
    const speaker = document.createElement("span");
    speaker.className = "chat-message-speaker";
    speaker.textContent = role === "user" ? "Du" : "Valkompanjonen";
    element.appendChild(speaker);

    const messageText = document.createElement("p");
    messageText.className = "chat-message-text";
    messageText.id = `conversation-text-${messageData.id}`;
    element.classList.toggle("is-typing", Boolean(messageData.streaming));
    element.setAttribute("aria-busy", String(Boolean(messageData.streaming)));
    renderConversationMessageText(messageText, messageData.streaming ? content.slice(0,messageData.revealed) : content);
    element.appendChild(messageText);

    if (role === "assistant" && !messageData.streaming && messageSources.length > 0) {
      const sourceRow = document.createElement("div");
      sourceRow.className = "chat-sources";
      const label = document.createElement("span");
      label.className = "chat-sources-label";
      label.textContent = "Källor";
      sourceRow.appendChild(label);
      messageSources.forEach((source) => {
        const link = document.createElement("a");
        link.className = "chat-source";
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = source.title;
        sourceRow.appendChild(link);
      });
      element.appendChild(sourceRow);
    }
    if (role === "assistant" && !messageData.streaming) element.appendChild(createSavedMessageLikeButton({
      id:messageData.id, partyName:"Valkompanjonen", text:content, sources:messageSources || [], context:"Samtal"
    }));
    conversation.appendChild(element);
  });
  requestAnimationFrame(() => {
    if (scrollToLatest) conversation.scrollTop = conversation.scrollHeight;
  });
}

function setPartyRailCollapsed(collapsed) {
  partyRail.classList.toggle("is-collapsed", collapsed);
  railToggle.setAttribute("aria-expanded", String(!collapsed));
  railToggle.querySelector(".rail-toggle-label").textContent = collapsed
    ? "Visa jämförelse"
    : "Dölj jämförelse";
}

function startNewConversation() {
  finishConversationTyping();
  conversationMessages.length = 0;
  sources.length = 0;
  renderConversation();
  renderSourceList(sources);
  askSection.classList.remove("is-chat-active");
  body.classList.remove("chat-active");
  newConversationButton.hidden = true;
  questionInput.value = "";
  questionInput.placeholder = "Vad vill du veta mer om?";
  questionMessage.textContent = "";
  if (partyRail.classList.contains("is-collapsed")) {
    setPartyRailCollapsed(false);
  }
  window.scrollTo(0, 0);
  questionInput.focus();
}

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askQuestion(questionInput.value);
});

newConversationButton.addEventListener("click", startNewConversation);

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => askQuestion(button.dataset.question));
});

partyRows.forEach((row) => {
  row.addEventListener("click", () => {
    partyRows.forEach((item) => item.classList.remove("is-selected"));
    row.classList.add("is-selected");
    const match = row.dataset.match;
    questionMessage.textContent = `${row.dataset.party} matchar ${match}% av dina markerade frågor.`;
    document.getElementById("ask").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

compareButton.addEventListener("click", () => {
  questionMessage.textContent = "Jämförelsen är redo att utforskas — välj ett parti i listan.";
  document.getElementById("compare").scrollIntoView({ behavior: "smooth", block: "center" });
});

function toggleDialog(open) {
  aboutDialog.hidden = !open;
}

aboutButtons.forEach((button) => button?.addEventListener("click", () => toggleDialog(true)));
closeDialog.addEventListener("click", () => toggleDialog(false));
aboutDialog.addEventListener("click", (event) => {
  if (event.target === aboutDialog) toggleDialog(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    toggleDialog(false);
    setSources(false);
    if (!rankingOnboarding.hidden) closeRankingOnboarding();
  }
});

openRankingOnboarding.addEventListener("click", () => showRankingOnboarding("", openRankingOnboarding));
openPartyRankingOnboarding.addEventListener("click", () => {
  showRankingOnboarding(activeMapParty, openPartyRankingOnboarding);
});
openSubcategoryRankingPersonal.addEventListener("click", () => {
  showSubcategoryRanking("", openSubcategoryRankingPersonal);
});
openSubcategoryRankingParty.addEventListener("click", () => {
  showSubcategoryRanking(activeMapParty, openSubcategoryRankingParty);
});
closeRankingOnboardingButton.addEventListener("click", closeRankingOnboarding);
cancelRankingOnboardingButton.addEventListener("click", closeRankingOnboarding);
rankingOnboarding.addEventListener("click", (event) => {
  if (event.target === rankingOnboarding) closeRankingOnboarding();
});
saveRankingOnboardingButton.addEventListener("click", () => {
  if (rankingKind === "subcategory") {
    subcategoryOrders[rankingSubcategoryPartyName] = [...onboardingSubcategoryOrder];
    saveSubcategoryOrders();
    const context = mapContexts.find((item) => item.partyName === rankingSubcategoryPartyName);
    if (context) {
      updateRankedNodeSizes(
        context.scene,
        categoryOrders[rankingSubcategoryPartyName],
        subcategoryOrders[rankingSubcategoryPartyName],
      );
      if (context.viewMode === "all") fitMapToView(context);
    }
    if (rankingSubcategoryPartyName === "") renderSubcategoryCards();
  } else if (rankingPartyName === "") {
    categoryOrder.splice(0, categoryOrder.length, ...onboardingCategoryOrder);
    categoryOrders[""] = categoryOrder;
    saveCategoryOrders();
    renderCategoryCards();
  } else {
    categoryOrders[rankingPartyName] = [...onboardingCategoryOrder];
    saveCategoryOrders();
    updateRankedNodeSizes(
      partyMapScene,
      categoryOrders[rankingPartyName],
      subcategoryOrders[rankingPartyName],
    );
    if (mapContexts[1].viewMode === "all") fitMapToView(mapContexts[1]);
  }
  closeRankingOnboarding();
});

mobileNavigation.addEventListener("change", (event) => {
  setMenu(false);
});
window.addEventListener("popstate", () => {
  const hash = window.location.hash;
  setView(hash === "#samtal" ? "home" : hash === "#party-stugor" ? "party" : hash === "#debatt" ? "debate" : "mindmap", false);
});
const initialHash = window.location.hash;
setView(initialHash === "#party-stugor" ? "party" : initialHash === "#debatt" ? "debate" : initialHash === "#top" ? "mindmap" : "home", false);
