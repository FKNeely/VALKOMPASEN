import { useState } from 'react'
import './App.css'

const parties = [
  { slug: 'centerpartiet', name: 'Centerpartiet', logo: '/loggor/Centerpartiet.png', chatName: 'centerpartist', shortName: 'C', match: 57, color: '#84593D', softColor: '#B7957F', chatColor: '#159447', chatSoftColor: '#eef7e9' },
  { slug: 'socialdemokraterna', name: 'Socialdemokraterna', logo: '/loggor/Socialdemokraterna.png', chatName: 'sosse', shortName: 'S', match: 62, color: '#84593D', softColor: '#B7957F', chatColor: '#e21d48', chatSoftColor: '#fff0f1' },
  { slug: 'miljopartiet', name: 'Miljöpartiet', logo: '/loggor/Miljöpartiet.png', chatName: 'miljöpartist', shortName: 'MP', match: 66, color: '#84593D', softColor: '#B7957F', chatColor: '#2f9b58', chatSoftColor: '#eff8ed' },
  { slug: 'vansterpartiet', name: 'Vänsterpartiet', logo: '/loggor/Vänsterpartiet.png', chatName: 'vänsterpartist', shortName: 'V', match: 71, color: '#84593D', softColor: '#B7957F', chatColor: '#d92438', chatSoftColor: '#fff0ee' },
  { slug: 'moderaterna', name: 'Moderaterna', logo: '/loggor/Moderaterna.png', chatName: 'moderat', shortName: 'M', match: 48, color: '#84593D', softColor: '#B7957F', chatColor: '#2f6da8', chatSoftColor: '#edf4fb' },
  { slug: 'kristdemokraterna', name: 'Kristdemokraterna', logo: '/loggor/Kristdemokraterna.png', chatName: 'kristdemokrat', shortName: 'KD', match: 43, color: '#84593D', softColor: '#B7957F', chatColor: '#6e45a8', chatSoftColor: '#f4effb' },
  { slug: 'liberalerna', name: 'Liberalerna', logo: '/loggor/Liberalerna.png', chatName: 'liberal', shortName: 'L', match: 39, color: '#84593D', softColor: '#B7957F', chatColor: '#368bc7', chatSoftColor: '#edf7fc' },
  { slug: 'sverigedemokraterna', name: 'Sverigedemokraterna', logo: '/loggor/Svergiedemokraterna.png', chatName: 'sverigedemokrat', shortName: 'SD', match: 34, color: '#84593D', softColor: '#B7957F', chatColor: '#244d89', chatSoftColor: '#edf2fa' },
]

const logoMetrics = {
  centerpartiet: { contentHeight: 247, centerX: 1003, centerY: 528 },
  kristdemokraterna: { contentHeight: 281, centerX: 957, centerY: 537 },
  liberalerna: { contentHeight: 263, centerX: 959.5, centerY: 539 },
  miljopartiet: { contentHeight: 255, centerX: 954, centerY: 547 },
  moderaterna: { contentHeight: 278, centerX: 945.5, centerY: 539.5 },
  socialdemokraterna: { contentHeight: 325, centerX: 953, centerY: 529 },
  sverigedemokraterna: { contentHeight: 275, centerX: 959.5, centerY: 539 },
  vansterpartiet: { contentHeight: 270, centerX: 959.5, centerY: 539.5 },
}

const partyTopics = [
  { title: 'Vård och omsorg', detail: 'Fråga om partiets prioriteringar inom vården.', prompt: (name) => `Vad är ${name}s politik för vård och omsorg?` },
  { title: 'Skola och utbildning', detail: 'Fråga om partiets förslag för skolan.', prompt: (name) => `Vad vill ${name} göra för skolan?` },
  { title: 'Jobb och ekonomi', detail: 'Fråga om partiets förslag för jobb och ekonomi.', prompt: (name) => `Hur vill ${name} skapa fler jobb?` },
  { title: 'Trygghet och rättsväsende', detail: 'Fråga om partiets prioriteringar för trygghet.', prompt: (name) => `Vad vill ${name} göra för att öka tryggheten?` },
  { title: 'Klimat och energi', detail: 'Fråga om partiets förslag för klimat och energi.', prompt: (name) => `Hur vill ${name} minska utsläppen?` },
]

function PartyLogo({ party, size }) {
  const [hasFailed, setHasFailed] = useState(false)

  if (!party.logo || hasFailed) return null

  const targetHeight = { menu: 22, card: 56, panel: 46, hero: 64, pattern: 18 }[size]
  const metrics = logoMetrics[party.slug]
  const scale = targetHeight / metrics.contentHeight
  const imageHeight = 1080 * scale

  return (
    <span className={`party-logo-frame party-logo-frame--${size}`}>
      <img
        className="party-logo"
        src={party.logo}
        alt={party.name}
        style={{
          width: `${imageHeight * (1920 / 1080)}px`,
          height: `${imageHeight}px`,
          left: `calc(50% + ${(960 - metrics.centerX) * scale}px)`,
          top: `calc(50% + ${(540 - metrics.centerY) * scale}px)`,
        }}
        onError={() => setHasFailed(true)}
      />
    </span>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMatchesView, setIsMatchesView] = useState(false)
  const [selectedPartySlug, setSelectedPartySlug] = useState(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [neutralConversation, setNeutralConversation] = useState([])
  const [partyConversations, setPartyConversations] = useState({})

  const selectedParty = parties.find((party) => party.slug === selectedPartySlug)
  const conversation = selectedParty
    ? partyConversations[selectedParty.slug] || []
    : neutralConversation

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion) return

    const answer = selectedParty
      ? `Demosvar för partiperspektivet: Jag är ännu inte kopplad till en AI-agent. Den här chatten är en förklaring av ${selectedParty.name}s perspektiv, men inga dokumenterade källor är anslutna ännu.`
      : 'Demosvar: Jag är ännu inte kopplad till en AI-agent. När kopplingen finns kan jag analysera din fråga och jämföra den med partiernas politik.'
    const entry = { question: trimmedQuestion, answer }

    if (selectedParty) {
      setPartyConversations((currentConversations) => ({
        ...currentConversations,
        [selectedParty.slug]: [...(currentConversations[selectedParty.slug] || []), entry],
      }))
    } else {
      setNeutralConversation((currentConversation) => [...currentConversation, entry])
    }
    setQuestion('')
  }

  function applyExample(example) {
    setQuestion(example)
  }

  function askUserQuestion() {
    setNeutralConversation((currentConversation) => [
      ...currentConversation,
      { assistantQuestion: 'Demosvar: Vilken politisk sakfråga tycker du är viktigast att lösa under de kommande åren, och varför?' },
    ])
    setQuestion('')
  }

  function goToHome() {
    setSelectedPartySlug(null)
    setIsMatchesView(false)
    setIsMenuOpen(false)
  }

  function startNewQuestion() {
    setNeutralConversation([])
    setQuestion('')
    setSelectedPartySlug(null)
    setIsMatchesView(false)
    setIsMenuOpen(false)
  }

  function goToMatches() {
    setSelectedPartySlug(null)
    setIsMatchesView(true)
    setIsMenuOpen(false)
  }

  function goToParty(partySlug) {
    setSelectedPartySlug(partySlug)
    setIsMatchesView(false)
    setIsSettingsOpen(false)
    setQuestion('')
    setIsMenuOpen(false)
  }

  return (
    <main className={`app-shell ${isMatchesView ? 'matches-view' : selectedParty ? 'party-view' : 'home-view'} ${isMenuOpen ? 'menu-open' : ''}`}>
      {isMenuOpen && (
        <aside className="side-menu" aria-label="Navigationsmeny">
          <div className="side-menu-header">
            <span className="menu-kicker">Valkompanjonen</span>
            <span className="mode-label">{selectedParty ? `Partichatt: ${selectedParty.name}` : isMatchesView ? 'Din karta' : 'Neutral chatt'}</span>
          </div>
          <div className="side-menu-actions">
            <button className="menu-link" type="button" onClick={startNewQuestion}>Ny fråga</button>
            <button className="menu-link" type="button" onClick={() => setIsSettingsOpen((open) => !open)}>Inställningar <span className="coming-soon">Kommer snart</span></button>
            <button className="menu-link" type="button" onClick={goToMatches}>Din karta</button>
          </div>
          {isSettingsOpen && (
            <div className="settings-note">
              <strong>Inställningar</strong>
              <p>Kommande funktion. Här samlas språk och chatpreferenser senare.</p>
            </div>
          )}
          <h2>Chatta med ett parti:</h2>
          <div className="party-menu-list">
            {parties.map((party) => (
              <button
                className={`party-menu-item ${selectedPartySlug === party.slug ? 'is-selected' : ''}`}
                type="button"
                key={party.slug}
                title={party.name}
                aria-label={`Chatta med ${party.name}`}
                onClick={() => goToParty(party.slug)}
              >
                <PartyLogo party={party} size="menu" />
                <span>{party.name}</span>
              </button>
            ))}
          </div>
        </aside>
      )}
      <section className="main-area">
        <button
          className={`menu-button ${isMenuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {isMatchesView ? (
          <div className="matches-content">
            <div className="matches-heading">
              <button className="back-button" type="button" onClick={goToHome}>
                <span aria-hidden="true">←</span> Till startsidan
              </button>
              <h1>Överensstämmelser:</h1>
              <p>Exempelvärden tills din politiska matchning har beräknats.</p>
            </div>
            <div className="party-grid">
              {parties.map((party) => (
                <article className="party-card" key={party.name}>
                  <div className="party-visuals">
                    <PartyLogo party={party} size="card" />
                    <div className="match-wrap">
                      <span className="match-line" />
                      <div
                        className="match-chart"
                        style={{ '--match': `${party.match * 3.6}deg`, '--party-color': party.color }}
                        aria-label={`${party.match} procent överensstämmelse, exempelvärde`}
                      >
                        <span>{party.match}%</span>
                      </div>
                      <span className="match-line" />
                    </div>
                  </div>
                  <h2>{party.name}</h2>
                  <span className="example-badge">Exempelvärde</span>
                </article>
              ))}
            </div>
          </div>
        ) : selectedParty ? (
          <div className="party-chat-layout" style={{ '--party-color': selectedParty.chatColor, '--party-soft': selectedParty.chatSoftColor }}>
            <div className="party-pattern" aria-hidden="true">
              {Array.from({ length: 28 }, (_, index) => (
                <span key={index}>
                  <PartyLogo party={selectedParty} size="pattern" />
                </span>
              ))}
            </div>
            <section className="party-chat-main">
              {conversation.length === 0 && (
                <div className="party-intro">
                  <PartyLogo party={selectedParty} size="hero" />
                  <p className="eyebrow">Förklaring av partiets perspektiv</p>
                  <h1>{selectedParty.slug === 'socialdemokraterna' ? 'Fråga en Sosse…' : `Fråga en ${selectedParty.chatName}...`}</h1>
                  <p className="subtitle">
                    {selectedParty.slug === 'socialdemokraterna'
                      ? 'Ställ en fråga, börja en diskussion eller fråga om din personliga politiska karta.'
                      : <>Ställ frågor om {selectedParty.name}s politik.<br />Detta är en demo, inte en verklig partiföreträdare.</>}
                  </p>
                </div>
              )}
              <div className={`conversation-area ${conversation.length ? 'has-conversation' : ''}`}>
                {conversation.length > 0 && (
                  <div className="conversation-list" aria-live="polite">
                    {conversation.map((entry, index) => (
                      <article className="conversation-entry" key={`${entry.question}-${index}`}>
                        <p className="user-message">{entry.question}</p>
                        <div className="assistant-response">
                          <span className="answer-label">Demosvar för {selectedParty.name}</span>
                          <p>{entry.answer.replace(`Demosvar för partiperspektivet: `, '').replace('Demosvar: ', '')}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                <form className="question-form" onSubmit={handleSubmit}>
                  <span className="plus" aria-hidden="true">+</span>
                  <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Fråga om partiets politik..." aria-label={`Skriv en fråga till ${selectedParty.name}`} />
                  <button className="send-button" type="submit" aria-label="Skicka fråga">Skicka</button>
                </form>
              </div>
            </section>
            <aside className="party-info-panel">
              <span className="party-panel-kicker">{selectedParty.name}s politik</span>
              <div className="party-info-heading">
                <PartyLogo party={selectedParty} size="panel" />
                <h2>Välj en fråga</h2>
              </div>
              <div className="party-topic-list">
                {partyTopics.map((topic) => {
                  const prompt = topic.prompt(selectedParty.name)
                  return (
                    <button
                      className={`party-topic ${question === prompt ? 'is-selected' : ''}`}
                      type="button"
                      key={topic.title}
                      aria-pressed={question === prompt}
                      onClick={() => setQuestion(prompt)}
                    >
                      <span className="party-topic-icon" aria-hidden="true">♥</span>
                      <span className="party-topic-copy">
                        <strong>{topic.title}</strong>
                        <small>{topic.detail}</small>
                      </span>
                    </button>
                  )
                })}
              </div>
            </aside>
          </div>
        ) : (
          <>
            <button className="matches-link" type="button" onClick={() => setIsMatchesView(true)}>
              Se dina<br />överensstämmelser
            </button>
            {conversation.length === 0 && (
              <div className="intro">
                <p className="eyebrow">Din politiska kompass</p>
                <h1>Ställ en fråga till din<br />valkompanjon</h1>
                <p className="subtitle">
                  Ställ en fråga, börja en diskussion eller fråga<br className="desktop-break" /> om din personliga politiska kart...
                </p>
              </div>
            )}

            <div className={`conversation-area ${conversation.length ? 'has-conversation' : ''}`} id="fraga">
              {conversation.length > 0 && (
                <div className="conversation-list" aria-live="polite">
                  {conversation.map((entry, index) => (
                    <article className="conversation-entry" key={`${entry.question}-${index}`}>
                      {entry.assistantQuestion ? (
                        <div className="assistant-question">
                          <span className="answer-label">Demosvar: AI-fråga</span>
                          <p>{entry.assistantQuestion.replace('Demosvar: ', '')}</p>
                        </div>
                      ) : (
                        <>
                          <p className="user-message">{entry.question}</p>
                          <div className="assistant-response">
                            <span className="answer-label">Demosvar</span>
                            <p>{entry.answer.replace('Demosvar: ', '')}</p>
                          </div>
                        </>
                      )}
                    </article>
                  ))}
                </div>
              )}
              {conversation.length === 0 && (
                <div className="example-buttons" aria-label="Exempelfrågor">
                  <button type="button" onClick={askUserQuestion}>Få en fråga</button>
                  <button type="button" onClick={() => applyExample('Vad är skillnaden mellan partiernas syn på skolan?')}>Exempelfråga</button>
                </div>
              )}
              <form className="question-form" onSubmit={handleSubmit}>
                <span className="plus" aria-hidden="true">+</span>
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Skriv din fråga här..."
                  aria-label="Skriv din fråga"
                />
                <button className="send-button" type="submit" aria-label="Skicka fråga">Skicka</button>
              </form>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App