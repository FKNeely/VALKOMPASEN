# Valkompanjonen

Fristående statisk prototyp. Öppna `index.html` i webbläsaren och välj **Politisk karta**.

Min karta behåller laptoplayout med minsta bredd 1200 px. Panelen är 380 px bred och fyller den återstående fönsterhöjden under verktygsraden, med 14 px marginal till nederkanten. Förslag och rangordning har separata scrollområden. Ämnesförslag läggs till direkt. Dra noder för att flytta dem och använd draghandtag eller pilar för rangordning. Zoomkontrollerna har en egen plats under kartan bredvid panelen. Zoomning, panorering och sparande i webbläsaren finns kvar.

Klicka på huvudnoder eller undernoder för information. Informationskortets knappar växlar undernoder av och på. Egna undernoder läggs till med Enter eller Lägg till. Noder utan faktaunderlag visar att källbelagd sammanfattning saknas.

Jämför visar två kartor bredvid varandra. Socialdemokraternas karta är ett tydligt märkt, påhittat exempel med åtta ämnen. På partiets sida färgas hela huvudnoden och dess undernoder: grönt vid samma rangplats, gult vid olika rangplats och rött när ämnet saknas i användarens karta. Symbolerna finns kvar som komplement. Den personliga kartan behåller sina ämnesfärger på båda vyerna. Sjukhus och Sjukvård behandlas som samma område. Andra partier saknar jämförelseunderlag. Ingen procentsats visas. Jämförelsen gäller ämnesval och prioriteringar, inte politiska åsikter.

Google Fonts laddas från nätet med systemtypsnitt som reserv. Ingen byggprocess krävs.

I Valstugor skickar frågeknapparna om skola och klimat frågan direkt och visar ett förberett svar för valt parti. Alla åtta partier har varsin kort sammanfattning och fördjupning under **Läs mer / Visa mindre**. Källorna ligger sist i båda lägena och öppnas i ny flik. Underlaget i `party-answers.js` bygger på partiernas egna sidor, kontrollerade den 15 oktober 2026. Ett saknat underlag ger ett tydligt besked utan att ersättas med ett annat partis politik. Svaren sammanfattar källorna och är inte meddelanden från partierna.

Till höger om chatten finns en separat 214 px bred kolumn med genvägar till de sju andra valstugorna. Knapparna är 38 px höga med 24 × 24 px logotyper. Hela listan ryms utan scrollning och chatten behåller sin bredd på 760 px vid de två laptopstorlekarna. Samtal, utkast, scrolläge och öppnade fördjupningar bevaras separat per parti under den aktuella sidans session, även när man återvänder via partiväljaren. En omladdning startar nya samtal; hjärtmarkerade svar finns som tidigare kvar i Sparade chattar. `node verify-party-navigation.cjs` kontrollerar partibyten, knappstorlekar och att hela sidan ryms vid 1440 × 900 och 1366 × 768 i lokalt installerad Chrome.

I Debatt kan flera partier väljas för en gemensam fråga. Exempelvis tolkas **energikraft** som **Vilka energislag vill ni använda och satsa på?** Tolkningen visas med frågan. Varje valt parti får en egen bubbla med partifärg, riktig logotyp, namn, 2–3 meningar och källor sist. Svaren läggs till tillsammans så att upprepade frågor inte blandas ihop. Alla åtta partier har underlag för energi, skola och klimat. Energikällorna i `debate-answers.js` kontrollerades den 15 oktober 2026; skola och klimat återanvänder underlaget i `party-answers.js`. Saknat underlag eller flera ämnen i samma fråga ger ett tydligt besked, utan påhittade partipositioner. Sökfält och laptoplayout behålls. `node verify-debate.cjs` testar frågetolkning, partival, korta svar, källor och reservbeteende.

I Samtal visas svar som löpande text utan bubbla, med gradvis utskrift av prototypens svar. Källor och hjärtknapp visas när utskriften är klar. En ny fråga eller ny konversation avbryter pågående skrivanimation. Användarens egna meddelanden behåller sina bubblor.

**Sparade chattar**, bredvid **Lägg till nod…**, visar hjärtmarkerade svar från Samtal, Debatt och Valstuga. Varje svar visar sitt ursprung och sina källor. Hjärtknapparna sparar lokalt i webbläsaren; tidigare sparade debattsvar finns kvar. Klicka på hjärtat igen i chatten eller i sparlistan för att ta bort markeringen.

Nodpanelen visar ämnesförslag, fältet för egna ämnen och knappen **Gör en rangordning**. I startläget tar rangordningsområdet bara knappens höjd. Klick öppnar rangordningsvyn med rubrik, instruktioner och nodlista. Pilen tillbaka döljer dessa igen. Vybytet ändrar inte sparad prioritet eller nodstorlek. Rangordning med draghandtag, knappar och pilar finns kvar i rangordningsvyn. Båda vyerna har intern listscrollning och behåller laptoplayouten.

Min karta placerar huvudnoder i koncentriska cirklar: åtta i den inre, tolv i nästa och sexton i den tredje. Nya ämnen hamnar på nästa cirkel när den föregående är full. Undernoder placeras ut från sin huvudnod med kollisionskontroll. Äldre placeringar ordnas om vid första laddningen av denna layout; därefter sparas manuella förflyttningar som vanligt. Ämnen, undernoder, färger och rangordning bevaras.

Socialdemokraternas exempelkarta placerar de åtta huvudnoderna i en cirkel runt partiloggan, i rangordning med start överst och sedan medurs. Undernoderna ligger utanför cirkeln. Jämförelsens gemensamma utsnitt omfattar båda kartorna; den personliga kartans sparade placeringar ändras inte.

Nya huvudnoder har samma neutrala storlek och saknar prioritet. De visas under **Ej rangordnade** tills användaren väljer **Rangordna** eller drar dem till en plats. För rangordnade noder är plats 1 störst och varje efterföljande plats mindre; orankade noder behåller grundstorleken. Sparande bevarar skillnaden mellan orankade och rangordnade ämnen. Befintliga sparade rangordningar behålls. I jämförelsen visas ett gemensamt men orankat ämne gult med en förklaring. Partikartans bubblor följer exempelkartans egen ordning.

Kartans placeringar kontrolleras mot nodernas storlek med minst 12 enheters mellanrum. Huvudnoder, undernoder och mittnoden hålls isär även vid dragning och i jämförelsevyn. Nya noder kan utöka kartytan; utsnittet anpassas vid tillägg och med **Visa alla noder**. Undernoder har samma färg som sin huvudnod, och huvudnodernas färger är unika.
