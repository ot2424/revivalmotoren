window.projectsPageContent = {
  // Hero / Einstieg für die separate Projekte-Seite
  hero: {
    label: 'Referenzen & Projekte',
    title: 'Abgeschlossene Projekte aus unserer Werkstatt',
    body: 'Bilder sagen mehr als tausend Worte – besonders wenn es um Technik geht. In unserer Projektgalerie dokumentieren wir ausgewählte Motor-Instandsetzungen und technische Generalüberholungen. Erleben Sie Schritt für Schritt, wie wir defekte Motoren mit Präzision und Originalteilen zu neuem Leben erwecken. Von der ersten Diagnose über die mechanische Bearbeitung bis hin zum finalen Testlauf zeigen wir Ihnen hier unsere Leidenschaft für Motorentechnik.',
    primaryAction: 'Anfrage senden',
    secondaryAction: 'Zur Startseite'
  },

  // Einleitung für das Projekt-Grid
  intro: {
    title: 'Projekt-Highlights',
    body: 'Wir lassen Ergebnisse sprechen. Hier finden Sie Einblicke in unsere tägliche Arbeit an Zylinderköpfen, Motorblöcken und kompletten Aggregaten. Jedes Bild steht für eine erfolgreiche Rückkehr auf die Straße.'
  },

  // Projekt-Sektionen
  // Pro Eintrag kann entweder ein einzelnes `image` genutzt werden
  // oder mehrere Bilder über `images`. Bei mehreren Bildern wird
  // auf der Projekte-Seite automatisch eine Slideshow aufgebaut.
  showcases: [
    {
      slug: 'jeep-projekt',
      placement: 'bottom-right',
      category: 'SUV · Offroad',
      title: 'Jeep Wrangler',
      excerpt: 'Teilzerlegung des Aggregats, technische Befundung und Vorbereitung für die saubere Instandsetzung.',
      images: [
        {
          src: 'assets/images/projects/projekte/jeep/jeep-project-1.png',
          alt: 'Jeep Wrangler vor der Werkstatt von Teuto Motoren',
          style: 'object-fit:contain;object-position:center center;'
        },
        {
          src: 'assets/images/projects/projekte/jeep/jeep-project-2.png',
          alt: 'Jeep Wrangler während der Demontage mit Motorbauteilen',
          style: 'object-fit:contain;object-position:center center;'
        },
        {
          src: 'assets/images/projects/projekte/jeep/jeep-project-3.png',
          alt: 'Jeep Wrangler nach dem Werkstatttermin vor dem Betrieb',
          style: 'object-fit:contain;object-position:center center;'
        }
      ],
      stats: ['Demontage', 'Befundung', 'Instandsetzung']
    },
    {
      slug: 'bmw-x5-projekt',
      placement: 'top-right',
      category: 'BMW · SUV',
      title: 'BMW X5',
      excerpt: 'Motor geöffnet, Komponenten geprüft und das Aggregat für die fachgerechte Instandsetzung vorbereitet.',
      images: [
        {
          src: 'assets/images/projects/projekte/bmw-x5/bmw-x5-project-1.png',
          alt: 'BMW X5 in der Werkstatt von Teuto Motoren',
          style: 'object-fit:contain;object-position:center center;'
        },
        {
          src: 'assets/images/projects/projekte/bmw-x5/bmw-x5-project-2.png',
          alt: 'BMW X5 mit geöffnetem Motor und ausgelegten Bauteilen',
          style: 'object-fit:contain;object-position:center center;'
        }
      ],
      stats: ['Öffnung', 'Bauteilprüfung', 'Aufbau']
    },
  ],

  // Fallback-/Kollagenbilder für den Abschlussbereich
  closingImages: [
    {
      src: 'assets/images/projects/projekte/img-block.jpg',
      alt: 'Projektbild Zylinderkopf'
    },
    {
      src: 'assets/images/projects/projekte/Motorblock.jpg',
      alt: 'Projektbild Motorblock'
    },
    {
      src: 'assets/images/projects/projekte/Motor.jpg',
      alt: 'Projektbild Reihenmotor'
    },
    {
      src: 'assets/images/projects/projekte/Motor1.jpg',
      alt: 'Projektbild V-Motor'
    },
    {
      src: 'assets/images/projects/messen.png',
      alt: 'Projektbild Messprozess'
    }
  ],

  // CTA-Bereich am Ende
  closing: {
    label: 'Nächstes Projekt',
    title: 'Bringen wir Ihren Motor gemeinsam zurück auf die Straße',
    body: 'Haben Sie bereits eine Diagnose, Fotos vom Schaden oder ein Video der Motorgeräusche? Senden Sie uns Ihre Daten und die Fahrgestellnummer (VIN) zu. Unser Expertenteam analysiert Ihren Fall und erstellt Ihnen eine transparente, fachgerechte Einschätzung für Ihre Instandsetzung.',
    action: 'Jetzt unverbindlich anfragen'
  }
};
