window.siteContent = window.siteContent || {};

Object.assign(window.siteContent, {
  contactSection: {
    title: 'Angebot<br>anfragen',
    subtitle: 'Kostenlos & unverbindlich. Wir melden uns innerhalb von 24 Stunden mit einem transparenten Kostenvoranschlag.',
    responseHint: 'Antwort innerhalb 24 Stunden',
    formTitle: 'Ihre Anfrage',
    uploadLabel: 'Dateien hochladen',
    uploadHint: 'Optional: Fahrzeugschein, Schadensbilder oder Fotos vom Motor als JPG, PNG, WEBP oder PDF. Maximal 4 Dateien, 3,5 MB pro Datei und 14 MB insgesamt.',
    submitLabel: 'Angebot anfragen →',
    note: 'Kostenlos & unverbindlich · Keine Datenweitergabe',
    successTitle: 'Anfrage gesendet!',
    successText: 'Vielen Dank für Ihre Kontaktanfrage. Wir prüfen Ihr Anliegen und melden uns schnellstmöglich bei Ihnen zurück.'
  },
  contactPreview: {
    label: 'Kontakt',
    title: 'Anfrage, Kontaktdaten und Anfahrt auf eigener Seite',
    body: 'Die vollständige Kontaktseite bündelt Anfrageformular, direkte Kontaktdaten und den schnellsten Weg zu unserer Werkstatt in Bielefeld.',
    primaryButton: 'Zur Kontaktseite →',
    secondaryButton: 'Route planen'
  },
  mapSection: {
    label: 'Standort',
    title: 'Werkstatt in<br>Bielefeld finden',
    routeLabel: 'Route planen',
    whatsappLabel: 'WhatsApp',
    routeHref: 'https://www.google.com/maps/dir/?api=1&destination=Artur-Ladebeck-Stra%C3%9Fe+181,+33647+Bielefeld',
    iframeTitle: 'Google Maps Standort Teuto Motoren',
    iframeSrc: 'https://www.google.com/maps?q=Artur-Ladebeck-Stra%C3%9Fe%20181,%2033647%20Bielefeld&z=15&output=embed'
  },
  engineOptions: ['R4 – Reihenmotor', 'R6 – Reihenmotor', 'V6 – V-Motor', 'V8 – V-Motor', 'V10 – V-Motor', 'V12 – V-Motor', 'Sonstiges'],
  contactItems: [
    { icon: '📍', label: 'Adresse', value: 'Artur-Ladebeck-Straße 181, 33647 Bielefeld' },
    { icon: '📞', label: 'Telefon', value: '0521 92373519', href: 'tel:+4952192373519' },
    { icon: '📞', label: 'Telefon', value: '0521 89739151', href: 'tel:+4952189739151' },
    { icon: '💬', label: 'WhatsApp', value: 'Direkt Anfrage senden', href: 'pages/kontakt.html', className: 'js-whatsapp-link' },
    { icon: '✉️', label: 'E-Mail', value: 'info@teutomotoren.de', href: 'mailto:info@teutomotoren.de' }
  ],
  mapPoints: [
    { title: 'Adresse', body: 'Artur-Ladebeck-Straße 181<br>33647 Bielefeld' }
  ]
});
