import React, { useState } from "react";
import jsPDF from "jspdf";

const PHRASES = {
  business: [
    {
      english: "Hello, nice to meet you.",
      spanish: "Hola, mucho gusto.",
      french: "Bonjour, ravi de vous rencontrer.",
      german: "Hallo, schön dich zu treffen.",
      japanese: "こんにちは、お会いできてうれしいです。",
      italian: "Ciao, piacere di conoscerti.",
      pronunciation: "OH-lah, MOO-cho GOO-stoh",
      notes: "Formal greeting",
    },
    {
      english: "Where is the conference room?",
      spanish: "¿Dónde está la sala de conferencias?",
      french: "Où est la salle de conférence ?",
      german: "Wo ist der Konferenzraum?",
      japanese: "会議室はどこですか？",
      italian: "Dove è la sala conferenze?",
      pronunciation: "DOHN-deh es-TAH lah SAH-lah deh con-feh-REN-syas",
      notes: "Useful at hotel or office",
    },
    {
      english: "I would like to schedule a meeting.",
      spanish: "Me gustaría programar una reunión.",
      french: "Je voudrais planifier une réunion.",
      german: "Ich möchte ein Meeting planen.",
      japanese: "会議を予定したいです。",
      italian: "Vorrei programmare una riunione.",
      pronunciation: "Meh goo-stah-REE-ah pro-grah-MAR oo-nah reh-oo-nee-ON",
      notes: "Business context",
    },
    {
      english: "Can I get a business card?",
      spanish: "¿Puedo tener una tarjeta de presentación?",
      french: "Puis-je avoir une carte de visite ?",
      german: "Kann ich eine Visitenkarte bekommen?",
      japanese: "名刺をもらえますか？",
      italian: "Posso avere un biglietto da visita?",
      pronunciation: "PWEH-doh teh-NEHR oo-nah tar-HEH-tah deh preh-sen-tah-SYON",
      notes: "Networking request",
    },
  ],
  leisure: [
    {
      english: "Where is the nearest restaurant?",
      spanish: "¿Dónde está el restaurante más cercano?",
      french: "Où est le restaurant le plus proche ?",
      german: "Wo ist das nächste Restaurant?",
      japanese: "一番近いレストランはどこですか？",
      italian: "Dove è il ristorante più vicino?",
      pronunciation: "DOHN-deh es-TAH el rehs-tow-RAHN-teh mahs sehr-KAH-noh",
      notes: "To ask for food places",
    },
    {
      english: "How much does this cost?",
      spanish: "¿Cuánto cuesta esto?",
      french: "Combien ça coûte ?",
      german: "Wie viel kostet das?",
      japanese: "これはいくらですか？",
      italian: "Quanto costa questo?",
      pronunciation: "KWAHN-toh KWEHS-tah ES-toh",
      notes: "Shopping phrase",
    },
    {
      english: "Can you recommend a good museum?",
      spanish: "¿Puede recomendar un buen museo?",
      french: "Pouvez-vous recommander un bon musée ?",
      german: "Können Sie ein gutes Museum empfehlen?",
      japanese: "良い博物館をおすすめできますか？",
      italian: "Puoi raccomandare un buon museo?",
      pronunciation: "PWEH-deh reh-koh-mehn-DAHR oon bwehn moo-SEH-oh",
      notes: "Sightseeing",
    },
    {
      english: "What time does the show start?",
      spanish: "¿A qué hora empieza el espectáculo?",
      french: "À quelle heure commence le spectacle ?",
      german: "Wann beginnt die Vorstellung?",
      japanese: "ショーは何時に始まりますか？",
      italian: "A che ora inizia lo spettacolo?",
      pronunciation: "AH keh OH-rah em-PYEH-sah el es-peh-TAH-koo-loh",
      notes: "Entertainment",
    },

  ],
  vacation: [
    {
      english: "Where is the beach?",
      spanish: "¿Dónde está la playa?",
      french: "Où est la plage ?",
      german: "Wo ist der Strand?",
      japanese: "ビーチはどこですか？",
      italian: "Dove è la spiaggia?",
      pronunciation: "DOHN-deh es-TAH lah PLAH-yah",
      notes: "For seaside vacations",
    },
    {
      english: "Is there a good hotel nearby?",
      spanish: "¿Hay un buen hotel cerca?",
      french: "Y a-t-il un bon hôtel à proximité ?",
      german: "Gibt es ein gutes Hotel in der Nähe?",
      japanese: "近くに良いホテルはありますか？",
      italian: "C'è un buon hotel qui vicino?",
      pronunciation: "AHY oon bwehn oh-TEL SEHR-kah",
      notes: "Accommodation inquiry",
    },
    {
      english: "What time is check-out?",
      spanish: "¿A qué hora es la salida?",
      french: "À quelle heure est le départ ?",
      german: "Wann ist der Check-out?",
      japanese: "チェックアウトは何時ですか？",
      italian: "A che ora è il check-out?",
      pronunciation: "AH keh OH-rah es lah sah-LEE-dah",
      notes: "Hotel checkout time",
    },
    {
      english: "Do you have beach towels?",
      spanish: "¿Tienen toallas de playa?",
      french: "Avez-vous des serviettes de plage ?",
      german: "Haben Sie Strandtücher?",
      japanese: "ビーチタオルはありますか？",
      italian: "Avete asciugamani da spiaggia?",
      pronunciation: "TYEH-nen toh-AH-yas deh PLAH-yah",
      notes: "Hotel/beach inquiry",
    },
  ],
  study: [
    {
      english: "Where is the library?",
      spanish: "¿Dónde está la biblioteca?",
      french: "Où est la bibliothèque ?",
      german: "Wo ist die Bibliothek?",
      japanese: "図書館はどこですか？",
      italian: "Dove è la biblioteca?",
      pronunciation: "DOHN-deh es-TAH lah bee-blyoh-TEH-kah",
      notes: "Campus location",
    },
    {
      english: "When is the next lecture?",
      spanish: "¿Cuándo es la próxima clase?",
      french: "Quand est le prochain cours ?",
      german: "Wann ist die nächste Vorlesung?",
      japanese: "次の講義はいつですか？",
      italian: "Quando è la prossima lezione?",
      pronunciation: "KWAHN-doh es lah PROH-see-mah KLAH-seh",
      notes: "Class schedule",
    },
    {
      english: "Can I borrow this book?",
      spanish: "¿Puedo tomar prestado este libro?",
      french: "Puis-je emprunter ce livre ?",
      german: "Kann ich dieses Buch ausleihen?",
      japanese: "この本を借りてもいいですか？",
      italian: "Posso prendere in prestito questo libro?",
      pronunciation: "PWEH-doh toh-MAR pres-TAH-doh ES-teh LEE-broh",
      notes: "Library request",
    },
    {
      english: "Can you help me with this assignment?",
      spanish: "¿Puedes ayudarme con esta tarea?",
      french: "Peux-tu m'aider avec ce devoir ?",
      german: "Kannst du mir bei dieser Aufgabe helfen?",
      japanese: "この課題を手伝ってくれますか？",
      italian: "Puoi aiutarmi con questo compito?",
      pronunciation: "PWEH-des ah-yoo-DAR-meh con ES-tah tah-REH-ah",
      notes: "Student help request",
    },

  ],
  adventure: [
    {
      english: "Is it safe to hike here?",
      spanish: "¿Es seguro hacer senderismo aquí?",
      french: "Est-il sûr de faire de la randonnée ici ?",
      german: "Ist es sicher hier wandern zu gehen?",
      japanese: "ここでハイキングは安全ですか？",
      italian: "È sicuro fare escursioni qui?",
      pronunciation: "Es seh-GOO-roh ah-SEHR sen-deh-REES-moh ah-KEE",
      notes: "Outdoor safety question",
    },
    {
      english: "Where can I rent climbing gear?",
      spanish: "¿Dónde puedo alquilar equipo de escalada?",
      french: "Où puis-je louer du matériel d'escalade ?",
      german: "Wo kann ich Kletterausrüstung mieten?",
      japanese: "クライミング装備はどこで借りられますか？",
      italian: "Dove posso noleggiare l'attrezzatura da arrampicata?",
      pronunciation: "DOHN-deh PWEH-doh al-kee-LAR eh-KEE-poh deh es-kah-LAH-dah",
      notes: "Equipment rental",
    },
    {
      english: "What wildlife can I see here?",
      spanish: "¿Qué fauna puedo ver aquí?",
      french: "Quelle faune puis-je voir ici ?",
      german: "Welche Wildtiere kann ich hier sehen?",
      japanese: "ここでどんな野生動物が見られますか？",
      italian: "Quale fauna posso vedere qui?",
      pronunciation: "KEH FAU-nah PWEH-doh vehr ah-KEE",
      notes: "Nature inquiry",
    },
    {
      english: "What should I pack for the trip?",
      spanish: "¿Qué debo empacar para el viaje?",
      french: "Que dois-je emporter pour le voyage ?",
      german: "Was soll ich für die Reise einpacken?",
      japanese: "旅行には何を持って行けばいいですか？",
      italian: "Cosa devo mettere in valigia per il viaggio?",
      pronunciation: "KEH DEH-bo em-pah-KAR PAH-rah el VYAH-heh",
      notes: "Packing advice",
    },
  ],
  family: [
    {
      english: "Is there a playground nearby?",
      spanish: "¿Hay un parque infantil cerca?",
      french: "Y a-t-il un terrain de jeux à proximité ?",
      german: "Gibt es einen Spielplatz in der Nähe?",
      japanese: "近くに遊び場はありますか？",
      italian: "C'è un parco giochi vicino?",
      pronunciation: "AHY oon PAR-keh een-fan-TEEL SEHR-kah",
      notes: "Kids activity",
    },
    {
      english: "Are there family-friendly restaurants?",
      spanish: "¿Hay restaurantes aptos para familias?",
      french: "Y a-t-il des restaurants adaptés aux familles ?",
      german: "Gibt es familienfreundliche Restaurants?",
      japanese: "家族向けのレストランはありますか？",
      italian: "Ci sono ristoranti adatti alle famiglie?",
      pronunciation: "AHY rehs-tow-RAHN-tes AP-tohs PAH-rah fah-MEE-lyahs",
      notes: "Dining options",
    },
    {
      english: "Where is the nearest hospital?",
      spanish: "¿Dónde está el hospital más cercano?",
      french: "Où est l'hôpital le plus proche ?",
      german: "Wo ist das nächste Krankenhaus?",
      japanese: "一番近い病院はどこですか？",
      italian: "Dove è l'ospedale più vicino?",
      pronunciation: "DOHN-deh es-TAH el ohs-pee-TAHL mahs sehr-KAH-noh",
      notes: "Emergency",
    },
    {
      english: "Do you have a high chair?",
      spanish: "¿Tienen una silla alta para niños?",
      french: "Avez-vous une chaise haute pour enfant ?",
      german: "Haben Sie einen Hochstuhl?",
      japanese: "子供用の椅子はありますか？",
      italian: "Avete un seggiolone?",
      pronunciation: "TYEH-nen oo-nah SEE-yah AHL-tah pah-rah NEEN-yos",
      notes: "Dining with children",
    },

  ],
  cultural: [
    {
      english: "Where is the nearest museum?",
      spanish: "¿Dónde está el museo más cercano?",
      french: "Où est le musée le plus proche ?",
      german: "Wo ist das nächste Museum?",
      japanese: "一番近い博物館はどこですか？",
      italian: "Dove è il museo più vicino?",
      pronunciation: "DOHN-deh es-TAH el moo-SEH-oh mahs sehr-KAH-noh",
      notes: "Sightseeing",
    },
    {
      english: "When are the traditional festivals?",
      spanish: "¿Cuándo son los festivales tradicionales?",
      french: "Quand ont lieu les festivals traditionnels ?",
      german: "Wann sind die traditionellen Feste?",
      japanese: "伝統的な祭りはいつですか？",
      italian: "Quando sono i festival tradizionali?",
      pronunciation: "KWAHN-doh son los fes-tee-VAH-les tra-dee-syo-NAH-les",
      notes: "Local events",
    },
    {
      english: "Can I take photos here?",
      spanish: "¿Puedo tomar fotos aquí?",
      french: "Puis-je prendre des photos ici ?",
      german: "Darf ich hier Fotos machen?",
      japanese: "ここで写真を撮ってもいいですか？",
      italian: "Posso fare foto qui?",
      pronunciation: "PWEH-doh toh-MAR FOH-tos ah-KEE",
      notes: "Photography rules",
    },
    {
      english: "Is there a dress code for the event?",
      spanish: "¿Hay un código de vestimenta para el evento?",
      french: "Y a-t-il un code vestimentaire pour l'événement ?",
      german: "Gibt es einen Dresscode für die Veranstaltung?",
      japanese: "イベントに服装規定はありますか？",
      italian: "C'è un codice di abbigliamento per l'evento?",
      pronunciation: "AHY oon KOH-dee-go deh ves-tee-MEN-tah",
      notes: "Attending a cultural event",
    },
  ],
};

const LANGUAGES = [
  { code: "spanish", label: "Spanish", langTag: "es-ES", flag: "🇪🇸" },
  { code: "french", label: "French", langTag: "fr-FR", flag: "🇫🇷" },
  { code: "german", label: "German", langTag: "de-DE", flag: "🇩🇪" },
  { code: "japanese", label: "Japanese", langTag: "ja-JP", flag: "🇯🇵" },
  { code: "italian", label: "Italian", langTag: "it-IT", flag: "🇮🇹" },
];

function Label({ children }) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 14,
        color: "#5b21b6",
      }}
    >
      {children}
    </label>
  );
}

function Select({ options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "8px",
        borderRadius: 6,
        border: "2px solid #a78bfa",
        fontSize: 16,
        fontWeight: "500",
        color: "#4c1d95",
        outlineColor: "#7c3aed",
        cursor: "pointer",
        transition: "border-color 0.3s",
      }}
    >
      {options.map(({ code, label, flag }) => (
        <option key={code} value={code}>
          {flag ? `${flag} ` : ""}
          {label}
        </option>
      ))}
    </select>
  );
}

function Button({ children, onClick, disabled, style }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: disabled ? "#ddd" : "#7c3aed",
        color: disabled ? "#999" : "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: 8,
        fontSize: 18,
        fontWeight: "600",
        cursor: disabled ? "default" : "pointer",
        boxShadow: "0 3px 8px rgba(124, 58, 237, 0.5)",
        transition: "background-color 0.3s",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#6b21a8";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#7c3aed";
      }}
    >
      {children}
    </button>
  );
}

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      style={{
        width: "100%",
        borderRadius: 6,
        border: "2px solid #a78bfa",
        fontSize: 16,
        padding: 10,
        resize: "vertical",
        color: "#4c1d95",
        fontWeight: "500",
        outlineColor: "#7c3aed",
      }}
    />
  );
}

export default function TravelLanguageCheatSheet() {
  const travelTypes = Object.keys(PHRASES);
  const [travelType, setTravelType] = useState("business");
  const [language, setLanguage] = useState("spanish");
  const [thoughts, setThoughts] = useState({});

  const phrases = PHRASES[travelType];
  const selectedLanguage = LANGUAGES.find((l) => l.code === language);

  const generateCheatSheet = () => {
    if (!phrases) return;
    alert("Cheat sheet generated below! You can listen, add thoughts, or export PDF.");
  };

  const exportToPDF = () => {
    if (!phrases) return;
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.setTextColor("#5b21b6");
    doc.text(
      `${travelType.charAt(0).toUpperCase() + travelType.slice(1)} Travel Cheat Sheet`,
      14,
      20
    );

    doc.setFontSize(16);
    doc.setTextColor("#312e81");

    let yPos = 30;
    phrases.forEach((phrase, idx) => {
      doc.setFontSize(14);
      doc.setFont("normal");
      doc.text(`English: ${phrase.english}`, 14, yPos);
      yPos += 8;
      doc.text(`${selectedLanguage.flag} ${selectedLanguage.label}: ${phrase[language]}`, 14, yPos);
      yPos += 8;
      doc.text(`Pronunciation: ${phrase.pronunciation}`, 14, yPos);
      yPos += 8;
      doc.text(`Notes: ${phrase.notes}`, 14, yPos);
      yPos += 8;
      const thoughtText = thoughts[idx] || "";
      if (thoughtText.trim() !== "") {
        doc.setFont("italic");
        doc.text(`Thoughts: ${thoughtText}`, 14, yPos);
        doc.setFont("normal");
        yPos += 12;
      }
      yPos += 10;

      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save(`${travelType}_cheat_sheet.pdf`);
  };

  const speak = (text) => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage.langTag || "en-US";
    speechSynthesis.speak(utterance);
  };

  const handleThoughtChange = (idx, value) => {
    setThoughts((prev) => ({ ...prev, [idx]: value }));
  };

  return (
    <div
      style={{
       
        // background:"red",
        minHeight: "100vh",
        padding: "3rem 1.5rem 6rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#312e81",
        maxWidth: 1000,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}

     
    >
      <header
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: 32,
          color: "#5b21b6",
          userSelect: "none",
          borderBottom: "4px solid #7c3aed",
          paddingBottom: 12,
          letterSpacing: "0.06em",
          textShadow: "0 2px 6px rgba(124, 58, 237, 0.4)",
        }}
      >
        Language Cheat Sheet Generator
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div>
          <Label>Travel Type</Label>
          <Select
            options={travelTypes.map((t) => ({
              code: t,
              label: t.charAt(0).toUpperCase() + t.slice(1),
            }))}
            value={travelType}
            onChange={(e) => {
              setTravelType(e.target.value);
              setThoughts({}); // clear thoughts on change
            }}
          />
        </div>

        <div>
          <Label>Language</Label>
          <Select
            options={LANGUAGES}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
      </section>

      <section
        style={{
          textAlign: "center",
          marginTop: 10,
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Button onClick={generateCheatSheet}>Generate Cheat Sheet</Button>
        <Button
          onClick={exportToPDF}
          disabled={phrases.length === 0}
          title={phrases.length === 0 ? "Generate cheat sheet first" : "Export cheat sheet to PDF"}
        >
          Export to PDF
        </Button>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 28,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {phrases.length === 0 ? (
          <p
            style={{
              fontStyle: "italic",
              color: "#6b7280",
              fontSize: 20,
              textAlign: "center",
              userSelect: "none",
              gridColumn: "1 / -1",
            }}
          >
            Your cheat sheet will appear here after you generate it.
          </p>
        ) : (
          phrases.map((phrase, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(124, 58, 237, 0.1)",
                userSelect: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(124, 58, 237, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(124, 58, 237, 0.1)";
              }}
            >
              <p>
                <strong>English:</strong> {phrase.english}
              </p>
              <p>
                <strong>{selectedLanguage.flag} {selectedLanguage.label}:</strong> {phrase[language]}
              </p>
              <p>
                <strong>Pronunciation:</strong> {phrase.pronunciation}
              </p>
              <p>
                <strong>Notes:</strong> {phrase.notes}
              </p>

              <div
                style={{
                  marginTop: 18,
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => speak(phrase[language])}
                  style={{ padding: "10px 20px", fontSize: 16 }}
                >
                  🔊 Play Pronunciation
                </Button>

                <div style={{ flex: 1 }}>
                  <Label>Your Thoughts</Label>
                  <TextArea
                    placeholder="Add your personal notes or thoughts..."
                    value={thoughts[idx] || ""}
                    onChange={(e) => handleThoughtChange(idx, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
