window.siteContent = window.siteContent || {};

Object.assign(window.siteContent, {
  about: {
    label: 'Über uns',
    title: 'Teuto Motoren –<br>Bielefeld',
    subtitle: 'Spezialisierte Werkstatt für Motorinstandsetzung und Motorreparatur. Traditionelles Handwerk trifft modernste Technik – für langlebige und zuverlässige Ergebnisse.',
    images: [
      { src: 'assets/images/placeholders/placeholder.png', alt: 'Frontansicht der Werkstatt', speed: 14, style: 'height:100%;width:100%;object-fit:cover;object-position:center;filter:brightness(.82) saturate(.82)' },
      { src: 'assets/images/projects/ueber-uns/block-floor.jpg', alt: 'Motorblock in der Werkstatt', speed: 10, style: 'height:100%;width:100%;object-fit:cover;object-position:center;filter:brightness(.9) saturate(.2);--ps:1.08' },
      { src: 'assets/images/projects/ueber-uns/Motorblock1.jpg', alt: 'Motorblock Detail in der Werkstatt', speed: 8, style: 'height:100%;width:100%;object-fit:cover;object-position:center;filter:brightness(.9) saturate(.2);--ps:1.06' }
    ],
    slideshowImages: [ //TODO: replace with real images
      { src: 'assets/images/projects/ueber-uns/messen.jpg', alt: 'Mess- und Diagnosearbeit in der Werkstatt' },
      { src: 'assets/images/projects/ueber-uns/Motorblock1.jpg', alt: 'Motorblock in der Werkstatt' },
      { src: 'assets/images/projects/ueber-uns/Motorblock mit Kette und Ölwannne.jpg', alt: 'Motorblock mit Kette und Ölwanne' }
    ],
    slideshowTitle: 'Einblicke in Werkstatt und Motorenarbeit',
    officeSlideshowTitle: 'Büro & Kundenbereich',
    officeSlideshowImages: [ // TODO
      { src: 'assets/images/placeholders/placeholder.png', alt: 'Platzhalter Büro und Kundenbereich 1' },
      { src: 'assets/images/placeholders/placeholder.png', alt: 'Platzhalter Büro und Kundenbereich 2' },
      { src: 'assets/images/placeholders/placeholder.png', alt: 'Platzhalter Büro und Kundenbereich 3' }
    ]
  },
  aboutPreview: {
    label: 'Über uns',
    title: 'Werkstatt, Anspruch und Einblicke auf eigener Seite',
    body: 'Erfahren Sie mehr über Teuto Motoren, unsere Werkstatt in Bielefeld und unseren Anspruch an präzise Diagnose, saubere Instandsetzung und langlebige Ergebnisse.',
    button: 'Zur Über-uns-Seite →'
  },
  whyFeatures: [
    { icon: '🔬', title: 'Präzise Diagnose', body: 'Modernste OBD-Messtechnik identifiziert jedes Problem exakt.' },
    { icon: '🛡️', title: '12 Monate Gewährleistung', body: 'Jede Reparatur ist vollständig abgesichert.' },
    { icon: '🔩', title: 'OEM-Ersatzteile', body: 'Ausschließlich Original- und OEM-Qualitätsteile.' },
    { icon: '⚡', title: '7–15 Werktage', body: 'Schnelle Reparatur – Ihr Motor wieder einsatzbereit.' }
  ],
  aboutSpecs: [
    { value: '12<em>M</em>', label: 'Gewährleistung auf alle Reparaturen' },
    { value: '7–<em>15</em>', label: 'Werktage Reparaturdauer' },
    { value: '100<em>%</em>', label: 'OEM-Qualitätsstandard' },
    { value: 'EU-<em style="font-size:.8em">weit</em>', label: 'Fahrzeugabholung', style: 'font-size:22px;letter-spacing:-.02em' }
  ]
});
