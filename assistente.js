"use strict";

/*
 * Assistente informativo locale – nessuna API, cookie, analisi, salvataggio
 * o invio delle domande. Non è un sistema di AI generativa o un servizio clinico.
 */
(() => {
  const topics = [
    {
      label: "Come funziona il primo colloquio?",
      keys: ["primo colloquio", "primi colloqui", "primo incontro", "iniziare", "cominciare"],
      answer: "Il percorso inizia con un breve contatto telefonico o via email per concordare un appuntamento. I primi colloqui servono a conoscere la richiesta; obiettivi, modalità e frequenza vengono poi definiti insieme.",
      link: "Scopri come lavoro",
      href: "#metodo"
    },
    {
      label: "Con chi lavora Silvia?",
      keys: ["adolesc", "ragazz", "genitor", "adult", "student", "insegnant", "counseling", "scuol", "chi segue", "chi puo", "per chi"],
      answer: "Silvia Dierico è psicologa clinica e psicoterapeuta psicoanalitica. Lavora con adolescenti e adulti; si occupa anche di counseling scolastico, promozione della salute psicologica e progetti di comunità.",
      link: "Esplora le aree di intervento",
      href: "#aree"
    },
    {
      label: "Qual è il suo approccio?",
      keys: ["psicoanal", "approccio", "metodo terapeut", "psicoterap", "terapia", "relazione terapeutica", "come lavora"],
      answer: "L'approccio psicoterapeutico è psicoanalitico: valorizza l'ascolto, la relazione terapeutica, l'esperienza soggettiva e la costruzione condivisa dei significati. Ogni percorso viene definito insieme alla persona.",
      link: "Approfondisci l'approccio",
      href: "psicoterapia-psicoanalitica.html"
    },
    {
      label: "Che cos'è il metodo PdT?",
      keys: ["pdt", "storytelling", "carte", "narrazione", "fotografia"],
      answer: "Silvia è cofondatrice di PdT Storytelling Cards, un progetto che integra fotografia e narrazione per favorire l'esplorazione e la costruzione di significati in contesti professionali.",
      link: "Scopri il metodo PdT",
      href: "pdt.html"
    },
    {
      label: "Dove si trova lo studio?",
      keys: ["dove", "indirizzo", "sede", "raggiung", "mappa", "ponteranica", "bergamo"],
      answer: "Lo Studio Dierico si trova in Via Ramera 3, 24010 Ponteranica (BG). Nella sezione contatti trovi anche il collegamento alla mappa.",
      link: "Vai ai contatti",
      href: "#contatti"
    },
    {
      label: "Come posso contattare lo studio?",
      keys: ["contatt", "prenot", "appuntament", "disponibil", "orari", "telefon", "email", "mail", "scriv", "messaggi"],
      answer: "Puoi richiedere un primo contatto tramite il modulo del sito, via email a silviadierico.psicologa@gmail.com oppure al numero +39 347 908 4617. La disponibilità viene concordata direttamente con lo studio.",
      link: "Apri il modulo contatti",
      href: "#secure-contact-title"
    }
  ];

  const root = document.createElement("div");
  root.className = "sd-assistant";
  root.innerHTML =
    '<section class="sd-assistant__panel" id="sd-assistant-panel" aria-label="Guida informativa Studio Dierico" hidden>' +
      '<div class="sd-assistant__header">' +
        '<div><span class="sd-assistant__eyebrow">Studio Dierico</span><strong>Come posso aiutarti?</strong></div>' +
        '<button class="sd-assistant__close" type="button" aria-label="Chiudi la guida">×</button>' +
      '</div>' +
      '<div class="sd-assistant__body">' +
        '<p class="sd-assistant__intro">Sono una <strong>guida automatica, non un assistente AI né una psicologa</strong>. Posso orientarti tra le informazioni pubblicate sul sito.</p>' +
        '<div class="sd-assistant__choices" aria-label="Domande frequenti"></div>' +
        '<div class="sd-assistant__reply" aria-live="polite" aria-atomic="true" hidden></div>' +
        '<form class="sd-assistant__form" autocomplete="off">' +
          '<label for="sd-assistant-question">Oppure scrivi una domanda generale</label>' +
          '<div class="sd-assistant__form-row">' +
            '<input id="sd-assistant-question" type="text" maxlength="160" placeholder="Es. come posso prenotare?" autocomplete="off" required />' +
            '<button type="submit">Invia</button>' +
          '</div>' +
        '</form>' +
        '<p class="sd-assistant__note">Non inserire dati personali o sanitari: questo strumento non offre diagnosi, consulenza clinica o assistenza in emergenza. Le domande non vengono inviate né memorizzate.</p>' +
      '</div>' +
    '</section>' +
    '<button class="sd-assistant__toggle" type="button" aria-expanded="false" aria-controls="sd-assistant-panel" aria-label="Apri la guida informativa">' +
      '<span class="sd-assistant__toggle-icon" aria-hidden="true">?</span>' +
      '<span class="sd-assistant__toggle-label">Hai una domanda?</span>' +
    '</button>';

  document.body.appendChild(root);

  const panel = root.querySelector(".sd-assistant__panel");
  const toggle = root.querySelector(".sd-assistant__toggle");
  const closeButton = root.querySelector(".sd-assistant__close");
  const choices = root.querySelector(".sd-assistant__choices");
  const reply = root.querySelector(".sd-assistant__reply");
  const form = root.querySelector(".sd-assistant__form");
  const input = root.querySelector("#sd-assistant-question");

  const compact = (value) => value.toLocaleLowerCase("it")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  function showAnswer(answer, linkText, href) {
    reply.replaceChildren();
    const text = document.createElement("p");
    text.textContent = answer;
    reply.appendChild(text);
    if (href && linkText) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = linkText;
      reply.appendChild(link);
    }
    reply.hidden = false;
  }

  function respond(question) {
    const text = compact(question);
    const urgent = /suicid|farla finita|ucciderm|farmi del male|autolesion|pericolo immediato|emergenz|tentato suicid/.test(text);
    const clinical = /diagnos|farmac|antidepress|sintom|depression|disturb|sto male|attacc[oh] di panico/.test(text);

    if (urgent) {
      showAnswer(
        "Questa guida non gestisce emergenze. Se tu o qualcun altro siete in pericolo immediato, chiama il 112 o rivolgiti al pronto soccorso. Non attendere una risposta online.",
        null, null
      );
      return;
    }
    if (clinical) {
      showAnswer(
        "Non posso valutare situazioni personali, sintomi o terapie. Per una richiesta di primo colloquio puoi contattare direttamente lo studio, senza descrivere qui dati sanitari.",
        "Come contattare lo studio", "#contatti"
      );
      return;
    }
    if (/costo|prezzo|tariff|onorari|pagament|quanto costa/.test(text)) {
      showAnswer(
        "Il sito non indica una tariffa da confermare qui. Per informazioni aggiornate sui colloqui puoi rivolgerti direttamente allo studio.",
        "Contatta lo studio", "#contatti"
      );
      return;
    }
    const found = topics.find((topic) => topic.keys.some((key) => text.includes(key)));
    if (found) {
      showAnswer(found.answer, found.link, found.href);
    } else {
      showAnswer(
        "Posso fornire informazioni generali su primo colloquio, attività professionale, approccio, PdT, sede e contatti. Seleziona un argomento oppure scrivi una domanda su questi temi.",
        "Visita la sezione contatti", "#contatti"
      );
    }
  }

  topics.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = topic.label;
    button.addEventListener("click", () => {
      showAnswer(topic.answer, topic.link, topic.href);
    });
    choices.appendChild(button);
  });

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Chiudi la guida informativa" : "Apri la guida informativa");
    if (open) {
      closeButton.focus();
    } else {
      input.value = "";
      reply.hidden = true;
      reply.replaceChildren();
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  closeButton.addEventListener("click", () => setOpen(false));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    respond(question);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });

  root.addEventListener("click", (event) => {
    if (event.target.closest(".sd-assistant__reply a[href^='#']")) {
      setOpen(false);
    }
  });
})();
