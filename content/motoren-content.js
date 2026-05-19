window.siteContent = window.siteContent || {};

Object.assign(window.siteContent, {
  generalBrandsPanel: {
    label: 'Weitere Marken',
    title: 'Auch für Golf, Toyota, Skoda und viele weitere Motoren',
    body: 'Neben den gezeigten Performance- und Oberklasse-Motoren betreuen wir selbstverständlich auch gängige Serienfahrzeuge und Alltagsmotoren. Ob VW Golf, Toyota, Ford, Opel, Skoda, Seat oder andere Modelle: Wir unterstützen Sie bei Diagnose, Instandsetzung und Reparatur mit derselben Sorgfalt, Präzision und OEM-orientierten Arbeitsweise.',
    button: 'Service anfragen →',
    images: [
      { src: 'assets/images/brands/general/gtr.jpg', alt: 'Nisan GTR' },
      { src: 'assets/images/brands/general/golf.avif', alt: 'VW Golf' },
      { src: 'assets/images/brands/general/seat.jpg', alt: 'Seat Leon' },
      { src: 'assets/images/brands/general/skoda.jpg', alt: 'Skoda Octavia VRS' },
      { src: 'assets/images/brands/general/supra.jpg', alt: 'Toyota Supra' }
    ]
  },
  brandScenes: [
    {
      sceneId: 'brandAudiScene',
      mobileImage: 'assets/images/brands/audi/mobile.jpg',
      heroImage: 'assets/images/brands/audi/Audi R8-optimized.jpg',
      heroAlt: 'Audi R8 Performance Fahrzeug',
      chip: 'Germany · Audi',
      name: 'Audi',
      teaser: 'R8, RS-Modelle und High-Performance-Antriebe mit klarer Linienführung, präziser Technik und ikonischem Klangbild.',
      title: 'Audi Motoren',
      subtitle: 'Vier Hochleistungsaggregate von FSI bis BiTDI.',
      intro: 'Vom ikonischen Fünfzylinder bis zum hochdrehenden V10 zeigt diese Auswahl die charakterstarken Audi-Performance-Motoren mit Fokus auf Klang, Drehmoment, Aufladung und technische Eigenständigkeit.',
      slides: [
        { src: 'assets/images/brands/audi/motoren/2.5 TFSI R5 TURBO.jpg', caption: 'EA855 EVO' },
        { src: 'assets/images/brands/audi/motoren/4.0 TFSI V8 BITURBO.jpg', caption: 'EA825' },
        { src: 'assets/images/brands/audi/motoren/Audi V6 TDI.jpg', caption: 'EA897evo3' },
        { src: 'assets/images/brands/audi/motoren/audi v10.jpg', caption: 'EA824 / FSI' }
      ],
      motors: [
        { name: 'EA855 EVO', meta: '2.5 TFSI R5 TURBO', copy: 'Die Ikone mit der markanten 1-2-4-5-3 Zündfolge. Dieser mehrfache "Engine of the Year"-Sieger liefert bis zu 400 PS und bietet eine unverwechselbare Klangkulisse. Kompakte Bauweise trifft auf Rennsport-Performance, perfektioniert für Modelle wie den RS 3 und TT RS.' },
        { name: 'EA825', meta: '4.0 TFSI V8 BITURBO', copy: 'Das High-End-Aggregat der Oberklasse. Mit zwei im heißen Innen-V liegenden Turboladern und Zylinderabschaltung (COD) vereint dieser Motor brachiale 630 PS mit modernster Effizienztechnologie. Er bildet das emotionale Herzstück der RS 6, RS 7 und RS Q8 Modelle.' },
        { name: 'EA897evo3', meta: '3.0 V6 BiTDI QUATTRO', copy: 'Die Speerspitze der Audi Diesel-Technologie. Dank Biturbo-Aufladung und massiver Durchzugskraft von bis zu 700 Nm Drehmoment definiert dieser V6 Langstrecken-Performance neu. Ein hocheffizientes Kraftpaket, das souveräne Kraftentfaltung mit beeindruckender Reichweite in den S-Modellen kombiniert.' },
        { name: 'EA824 / FSI', meta: '5.2 V10 SAUGMOTOR', copy: 'Ein akustisches und mechanisches Spektakel. Dieser hochdrehende Zehnzylinder verzichtet auf Aufladung und setzt stattdessen auf ein direktes Ansprechverhalten und einen unvergleichlichen, kreischenden Sound. Das Herzstück des Audi R8 – ein technisches Vermächtnis, das für puristische Sportwagen-Performance steht.' }
      ]
    },
    {
      sceneId: 'brandBmwScene',
      mobileImage: 'assets/images/brands/bmw/bmw_m6_portrait_mobile-optimized.jpg',
      heroImage: 'assets/images/brands/bmw/bmw m6-optimized.jpg',
      heroAlt: 'BMW M Performance Fahrzeug',
      chip: 'Germany · BMW M',
      name: 'BMW',
      teaser: 'M-Modelle mit präzisem Fahrgefühl, hochdrehenden Ikonen und Biturbo-Wucht zwischen Reihensechser, V8 und V10.',
      title: 'BMW Motoren',
      subtitle: 'Vier Hochleistungsaggregate von Reihensechszylinder bis V10.',
      intro: 'Vom aktuell leistungsstarken M-Reihensechszylinder bis zum ikonischen Hochdrehzahl-V10 zeigt diese Auswahl die prägendsten BMW Performance-Motoren mit Fokus auf Präzision, Biturbo-Wucht und emotionale Drehfreude.',
      slides: [
        { src: 'assets/images/brands/bmw/motoren/BMW S58 Motor.jpg', caption: 'S58' },
        { src: 'assets/images/brands/bmw/motoren/BMW S63 Motor.jpg', caption: 'S63' },
        { src: 'assets/images/brands/bmw/motoren/BMW_B57_engine.jpg', caption: 'B57D30S0' },
        { src: 'assets/images/brands/bmw/motoren/bmw s65.jpg', caption: 'S85B50' }
      ],
      motors: [
        { name: 'S58', meta: '3.0 M TWINPOWER TURBO R6', copy: 'Der aktuell leistungsstärkste Reihensechszylinder von BMW M. Mit zwei Monoscroll-Ladern und bis zu 550 PS bietet er eine Drehfreude, die fast an Saugmotoren erinnert. Er ist das technische Kraftzentrum des aktuellen M3 und M4 und steht für unerreichte Präzision.' },
        { name: 'S63', meta: '4.4 V8 M TWINPOWER TURBO', copy: 'Ein legendäres Kraftpaket mit dem charakteristischen bankübergreifenden Abgaskrümmer. In Modellen wie dem M5 Competition liefert er bis zu 625 PS. Die extrem kurzen Wege zwischen Brennraum und Turbolader sorgen für ein explosives Ansprechverhalten und brachiale Beschleunigungswerte.' },
        { name: 'B57D30S0', meta: '3.0 M50d QUAD-TURBO R6', copy: 'Ein technisches Unikat: Der einzige Pkw-Dieselmotor der Welt mit vier Turboladern. Mit 400 PS und massiven 760 Nm Drehmoment verbindet er die Souveränität eines V8 mit der Effizienz eines Reihensechszylinders. Ein Meisterwerk der Ingenieurskunst für maximale Langstrecken-Performance.' },
        { name: 'S85B50', meta: '5.0 V10 HOCHDREHZAHL-SAUGER', copy: 'Das ikonische Herzstück der M-High-Performance-Serie. Mit zehn Einzeldrosselklappen und einer Maximaldrehzahl von 8.250 U/min bietet dieser 507 PS starke V10 eine unvergleichliche Aggressivität. Sein kreischender Sound macht ihn zum emotionalsten Saugmotor der BMW-Geschichte.' }
      ]
    },
    {
      sceneId: 'brandMercedesScene',
      mobileImage: 'assets/images/brands/mercedes/mercedes_portrait_mobile-optimized.jpg',
      heroImage: 'assets/images/brands/mercedes/s63 amg-optimized.jpg',
      heroAlt: 'Mercedes AMG Performance Fahrzeug',
      chip: 'Germany · AMG',
      name: 'Mercedes',
      teaser: 'AMG-Charakter von modernem Vierzylinder bis monumentalem V12 mit Langstrecken-Souveränität und markantem Sound.',
      title: 'Mercedes Motoren',
      subtitle: 'Vier Hochleistungsaggregate von AMG-Vierzylinder bis V12 Biturbo.',
      intro: 'Vom stärksten Serien-Vierzylinder der Welt bis zum monumentalen V12 zeigt diese Auswahl die prägendsten Mercedes Performance-Motoren mit Fokus auf AMG-Charakter, moderne Aufladung und maximale Souveränität.',
      slides: [
        { src: 'assets/images/brands/mercedes/motoren/mercedes m139.jpg', caption: 'M139' },
        { src: 'assets/images/brands/mercedes/motoren/mercedes m177:m178.jpg', caption: 'M177 / M178' },
        { src: 'assets/images/brands/mercedes/motoren/mercedes OM656.jpg', caption: 'OM656' },
        { src: 'assets/images/brands/mercedes/motoren/Mercedes_M279_engine.jpg', caption: 'M279' }
      ],
      motors: [
        { name: 'M139', meta: '2.0 L 4-ZYLINDER TURBO (AMG)', copy: 'Der stärkste Serien-Vierzylinder der Welt. Mit bis zu 421 PS setzt dieses Triebwerk neue Maßstäbe in Sachen Literleistung. Durch den gedrehten Einbau und den Twin-Scroll-Lader liefert er eine Performance, die man früher nur von großen V8-Motoren kannte – das Herzstück der aktuellen A 45 und C 63 Modelle.' },
        { name: 'M177 / M178', meta: '4.0 V8 BITURBO (AMG)', copy: 'Das Synonym für modernen AMG-Sound. Mit den Turboladern im heißen Innen-V für extrem direktes Ansprechverhalten. Ob im GT-Supersportwagen oder in der G-Klasse: Dieser Motor ist berühmt für seine brutale Leistungsentfaltung von bis zu 730 PS und seinen tief grollenden Charakter.' },
        { name: 'OM656', meta: '3.0 R6 TURBODIESEL', copy: 'Das effiziente Kraftpaket der Oberklasse. Dieser Reihensechszylinder-Diesel nutzt ein Stufenaufladungskonzept und das innovative CAMTRONIC-Ventilhubsystem. Mit bis zu 340 PS und 700 Nm Drehmoment kombiniert er seidenweichen Lauf mit einer Durchzugskraft, die Mercedes zur ersten Wahl für Langstrecken-Performance macht.' },
        { name: 'M279', meta: '6.0 V12 BITURBO', copy: 'Das Maximum an automobiler Souveränität. Während andere auf Downsizing setzen, bietet dieser V12 ein Drehmomentplateau, das sich wie eine endlose Kraftwelle anfühlt. Verbaut in der Maybach-Klasse und den legendären 65er AMG-Modellen, steht dieser Motor für absoluten Luxus und unerschöpfliche Reserven.' }
      ]
    },
    {
      sceneId: 'brandRangeScene',
      mobileImage: 'assets/images/brands/range/range rover mobile.jpg',
      heroImage: 'assets/images/brands/range/range rover.jpg',
      heroAlt: 'Range Rover Performance Fahrzeug',
      chip: 'United Kingdom · Range Rover',
      name: 'Range Rover',
      teaser: 'SV-Modelle mit unerschütterlichem Durchzug, legendärem Klangcharakter und massiver Biturbo-Wucht zwischen High-Performance-Diesel und High-End-V8.',
      title: 'Range Rover Motoren',
      subtitle: 'Vier Hochleistungsaggregate von britischer Souveränität bis zur V8-Kompressor-Gewalt.',
      intro: 'Vom modernen Twin-Turbo V8 der neuesten Generation bis zum ikonischen Kompressor-V8 zeigt diese Auswahl die prägendsten Range Rover Performance-Motoren. Unser Fokus liegt auf der technischen Perfektionierung dieser Triebwerke, um die Balance zwischen monumentaler Kraft und ultimativer Laufruhe dauerhaft zu bewahren.',
      slides: [
        { src: 'assets/images/brands/range/motor/AJ133.jpg', caption: 'AJ133' },
        { src: 'assets/images/brands/range/motor/N63.jpg', caption: 'N63 (P530)' },
        { src: 'assets/images/brands/range/motor/448DT.webp', caption: '448DT' },
        { src: 'assets/images/brands/range/motor/AJ33S.jpg', caption: 'AJ33S' }
      ],
      motors: [
        { name: 'AJ133', meta: '5.0 V8 SUPERCHARGED', copy: 'Das emotionale Kraftzentrum der SVR-Reihe. Dieser V8 mit Twin-Vortex-Kompressor leistet bis zu 575 PS und ist weltberühmt für sein aggressives, mechanisches Brüllen. Als Spezialisten fokussieren wir uns bei der Instandsetzung auf die Optimierung des Kettentriebs und der Kompressor-Lagerung, um die brutale Performance dauerhaft zu sichern.' },
        { name: 'N63 (P530)', meta: '4.4 V8 TWIN-TURBO', copy: 'Die neue Speerspitze der modernen Range Rover Generation. Durch das „Hot V"-Layout der Turbolader liefert dieses Aggregat 530 PS mit einer Effizienz und einem Ansprechverhalten, das neue Maßstäbe setzt. Unsere Expertise umfasst das präzise thermische Management dieses Hochleistungsmotors für maximale Standfestigkeit unter Extrembedingungen.' },
        { name: '448DT', meta: '4.4 SDV8 BITURBO DIESEL', copy: 'Das Drehmoment-Monument. Mit massiven 740 Nm ist dieser V8-Diesel der Inbegriff für unerschütterliche Souveränität. Er kombiniert die Kraft eines Schleppers mit der Laufruhe einer Luxuslimousine. Wir beheben die typischen Schwachstellen des Biturbo-Systems und der Ölkühlung, damit dieser Langstreckenkönig seine Zuverlässigkeit behält.' },
        { name: 'AJ33S', meta: '4.2 V8 SUPERCHARGED', copy: 'Die unverwüstliche Legende aus der Ära der L322-Modelle. Mit 396 PS gilt dieser Kompressor-V8 als einer der robustesten Motoren, die je britischen Boden verlassen haben. Eine professionelle Revision dieses Klassikers in unserem Haus garantiert den Erhalt echter Automobilgeschichte mit der Zuverlässigkeit eines Neuwagens.' }
      ]
    }
  ]
});
