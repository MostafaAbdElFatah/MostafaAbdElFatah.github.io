/* Portfolio content. f: 1 = featured card, otherwise listed in the index. */
window.PROJECTS = [
    {
        f: 1, c: "gov", t: "Nusuk", ar: "نسك", y: "May 2024 – Oct 2025", o: "Arabia IT Company",
        m: ["10M+ downloads", "4.7 ★ · 185K ratings", "35 languages"],
        d: "The Ministry of Hajj and Umrah's official pilgrimage platform. Eighteen months of feature development across the app's Islamic-services expansion.",
        p: ["Engineered <b>global prayer-time calculation</b> with location-aware alerts and Qibla direction, accurate across major calculation methods and time zones.",
            "Built the <b>Al-Haramain audio library</b> — recitations, lectures and lessons from the Imams of the Two Holy Mosques, streaming and offline-capable.",
            "Developed the <b>watchOS companion and home-screen widgets</b> surfacing prayer times, adhkar and Quran content.",
            "Expanded the Quran module with reading, tafsir and persistent bookmarking; built the digital tasbeeh counter and curated hadith collection."],
        s: "Swift · SwiftUI · WidgetKit · watchOS",
        l: "https://apps.apple.com/us/app/nusuk-%D9%86%D8%B3%D9%83/id6469515422"
    },

    {
        f: 1, c: "gov", t: "Mushaf Al-Haramain", ar: "مصحف الحرمين", y: "Jan – Mar 2021", o: "Arabia IT Company",
        m: ["Official state app", "Hafs 'an 'Asim"],
        d: "The official electronic application of the General Presidency for the Affairs of the Grand Mosque and the Prophet's Mosque, delivering the authorized Madinah Mushaf printed by the King Fahd Complex.",
        p: ["Built a <b>high-fidelity Mushaf viewer</b> preserving the exact page geometry and verse numbering of the printed original — a state-authorized religious text leaves no margin for rendering drift.",
            "Implemented a <b>multi-mode search engine</b> across word, phrase, surah, page and juz' with sub-second response over the full text.",
            "Integrated the Haramain recitation library including complete Taraweeh recordings from the Imams of both mosques (1441 AH), with offline playback.",
            "Added Tafsir Al-Muyassar with verse-linked highlighting, bookmarking, night mode and sharing."],
        s: "Swift · UIKit · Core Data · AVFoundation",
        l: "https://apps.apple.com/us/app/-/id1558424738"
    },

    {
        f: 1, c: "edu", t: "Al-Mushaf Al-Madrasy", ar: "المصحف المدرسي", y: "Mar – Jun 2025", o: "Arabia IT Company",
        m: ["4 national curricula", "4.1 ★ · 1K+ ratings"],
        d: "An interactive Quran curriculum app aligned to the official syllabi approved by the ministries of education of Saudi Arabia, Kuwait, Bahrain and Oman.",
        p: ["Modelled a <b>curriculum engine</b> mapping recitation and memorization assignments to each grade and class level across four distinct national syllabi.",
            "Built <b>multi-profile account management</b> so several students at different educational stages share one device with independent progress tracking.",
            "Integrated an offline-capable audio library of ten renowned reciters, among them Al-Minshawi, Al-Sudais, Al-Shuraim, Al-Afasy and Al-Muaiqly.",
            "Developed a memorization assistant with configurable verse repetition, plus achievement badges, resume-bookmarking and four page themes for young learners."],
        g: "https://play.google.com/store/apps/details?id=com.devlabs.quran",
        s: "Swift · SwiftUI · macOS · Windows · Linux",
        l: "https://apps.apple.com/app/id1177013583"
    },

    {
        f: 1, c: "quran", t: "Jami' Al-Kutub Al-Tis'a", ar: "جامع الكتب التسعة", y: "Oct 2023 – Feb 2024", o: "Arabia IT Company",
        m: ["9 canonical collections", "Tens of thousands of narrations"],
        d: "The nine canonical hadith collections — Bukhari, Muslim, Abu Dawood, Al-Tirmidhi, Al-Nasa'i, Ibn Majah, Al-Darimi, Musnad Ahmad and Muwatta Malik — with full classical commentary, in one searchable application.",
        p: ["Designed an <b>indexed search system</b> supporting keyword, partial-text, hadith-number and chapter queries across tens of thousands of narrations, tuned for instant on-device results.",
            "Built the <b>thematic classification tree</b> (الشجرة الموضوعية) enabling scholarly navigation by subject rather than book order.",
            "Integrated narrator records, authenticity grading — sahih, hasan, da'if — attribution type, gharib glossing and takhrij with corroborating chains.",
            "Delivered reading customization, favourites, personal annotations and sharing for students and researchers."],
        g: "https://play.google.com/store/apps/details?id=com.arabiait.sunna",
        s: "Swift · SQLite · full-text indexing · macOS · Windows · Linux",
        l: "https://apps.apple.com/us/app/%D8%AC%D8%A7%D9%85%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%A8-%D8%A7%D9%84%D8%AA%D8%B3%D8%B9%D8%A9/id1149785262"
    },

    {
        f: 1, c: "gov", t: "Mushaf Al-Awqaf Al-Libya 2.0", ar: "مصحف الأوقاف الليبية", y: "Aug – Sep 2023", o: "Arabia IT Company",
        m: ["Official state app", "Qalun 'an Nafi'"],
        d: "The official digital Quran of the General Authority of Awqaf and Islamic Affairs, Libya — Qalun 'an Nafi' narration in the Imam Al-Dani script, certified by the Authority's standing Mushaf review committee.",
        p: ["Adapted the Mushaf rendering engine to the <b>Qalun layout and Al-Dani orthography</b>, a materially different typographic system from the Hafs / Madinah standard most Quran apps are built on.",
            "Integrated a Libyan reciters' audio library with verse-level selection, configurable repeat counts and progress tracking.",
            "Built a <b>personalized Khatmah planner</b> computing daily portion and days-to-completion from a user-set goal.",
            "Added multi-language translations, a tafsir library, verse-level reflections, daily reminders, and linkage to the Imam Al-Dani distance-learning platform."],
        s: "Swift · UIKit",
        l: "https://apps.apple.com/us/app/id6741798282"
    },

    {
        f: 1, c: "edu", t: "Alfatihah.ind", ar: "", y: "Oct – Dec 2024", o: "Arabia IT Company",
        m: ["Speech recognition", "Indonesian market"],
        d: "An AI-assisted application teaching and correcting the recitation of Surah Al-Fatihah for Indonesian speakers, combining automated feedback with certified human instruction.",
        p: ["Integrated <b>speech-recognition pronunciation correction</b>, evaluating learner recitation against correct makhraj and returning targeted feedback.",
            "Built the interactive learning flow pairing audio guides with visual recitation demonstrations, word-by-word translation and tafsir.",
            "Delivered a <b>certification pathway</b> issuing official certificates of mastery from accredited institutions.",
            "Localized the full experience for Indonesian learners, tuned to non-native Arabic phonology throughout."],
        s: "Swift · Speech / ML integration",
        l: "https://apps.apple.com/us/app/-/id6741386382"
    },

    {
        f: 1, c: "quran", t: "Bilal", ar: "بلال", y: "Nov 2019 – Apr 2020", o: "Arabia IT Company",
        m: ["60+ muezzin voices", "No ads, permanently"],
        d: "A free, permanently ad-free prayer and azan companion, named for the Prophet's words, \u201CRelieve us with it, O Bilal.\u201D",
        p: ["Implemented <b>worldwide prayer-time computation</b> with city-level accuracy and Qibla direction from any location.",
            "Built the azan notification system supporting <b>60+ authentic muezzin recordings</b>, configurable pre-Fajr alerts, and Ramadan iftar and suhoor reminders.",
            "Developed the Apple Watch app and home-screen widgets for prayer times at a glance.",
            "Shipped cross-platform from a single Flutter codebase with a native watchOS extension."],
        g: "https://play.google.com/store/apps/details?id=com.arabiait.belal",
        s: "Flutter · Dart · watchOS · WidgetKit",
        l: "https://apps.apple.com/us/app/-bilal/id1461237208"
    },

    {
        f: 1, c: "quran", t: "Great Quran", ar: "القرآن العظيم", y: "Nov 2022 – Feb 2023", o: "Arabia IT Company",
        m: ["40+ tafsir works", "30+ recitations", "Ten-qira'at review board"],
        d: "A flagship Mushaf certified against the King Fahd Complex and Al-Azhar editions, reviewed verse by verse by a scientific committee licensed in the ten recitations.",
        p: ["Worked inside a codebase with a decade of production history, first released in 2014 — feature development in a mature, heavily used application.",
            "Extended the <b>Quranic search engine</b>: full-corpus search in seconds, tolerant of common spelling errors, with surah-name and verse-number lookup, result counts and highlighting.",
            "Expanded the library to more than forty works of tafsir and Quranic sciences, and thirty audio recitations across multiple qira'at.",
            "Built recitation and memorization tracking with daily progress statistics."],
        g: "https://play.google.com/store/apps/details?id=com.arabiait.quran.v2",
        s: "Swift · UIKit · AVFoundation",
        l: "https://apps.apple.com/us/app/-/id792049888"
    },

    {
        f: 1, c: "consumer", t: "URPASS", ar: "يورباس", y: "Apr – Jun 2026", o: "Freelance",
        m: ["iOS and Android", "Most recent engagement"],
        g: "https://play.google.com/store/apps/details?id=com.urpass.plus",
        d: "A cross-platform product delivered end to end as a freelance engagement, shipping to both the App Store and Google Play from a single codebase.",
        p: ["Owned the engagement end to end as sole engineer: architecture, implementation, store configuration and release.",
            "Shipped <b>iOS and Android in parallel</b> from one codebase, holding feature parity while respecting each platform's navigation and interaction conventions."],
        s: "Cross-platform · iOS &amp; Android",
        l: "https://apps.apple.com/sa/app/id6720758472"
    },

    {
        f: 1, c: "edu", t: "Lights of Life", ar: "", y: "Nov – Dec 2022", o: "EkadSoft",
        m: ["Assessment and coursework"],
        d: "A student assessment and academic task platform bringing formal testing, performance tracking and daily coursework into a single account.",
        p: ["Built the <b>assessment module</b>: timed tests, answer submission and scoring against the course question bank.",
            "Developed <b>performance tracking</b> giving students a running view of results across subjects and terms rather than isolated scores.",
            "Implemented daily coursework and task assignment, so routine work and formal examination share one interface and one progress record."],
        s: "Swift · REST APIs",
        l: "https://apps.apple.com/sa/app/lights-of-life/id6444769251"
    },

    {
        f: 1, c: "consumer", t: "HomeMade", ar: "", y: "May – Sep 2021", o: "ArabApps Company",
        m: ["Two-sided marketplace", "Customer client"],
        d: "The customer application for a marketplace of home-made goods, handicrafts and micro-businesses, connecting small independent producers to buyers.",
        p: ["Built the <b>buyer experience</b>: category browsing, search, seller storefronts and product detail across a catalogue of independent makers.",
            "Implemented cart, checkout and order tracking against the shared marketplace backend used by both clients.",
            "Handled <b>full Arabic and RTL layout</b> across catalogue, product and checkout flows, including mixed-direction pricing and address entry."],
        s: "Swift · UIKit · REST APIs",
        l: "https://apps.apple.com/sa/app/homemade/id6758558656"
    },

    {
        f: 1, c: "consumer", t: "HomeMade Vendor", ar: "", y: "Jul – Sep 2021", o: "ArabApps Company",
        m: ["Seller client", "Shared API layer"],
        d: "The seller-side counterpart to HomeMade, giving micro-businesses the tools to run a storefront from a phone.",
        p: ["Built <b>listing and inventory management</b>: product creation, imagery, pricing and availability, with storefront presentation controls.",
            "Developed the <b>order pipeline</b> — incoming orders, status transitions and fulfilment updates that surface live in the customer app.",
            "Shipped as a separate client sharing the marketplace data model and API layer, keeping both sides consistent as the schema evolved."],
        s: "Swift · UIKit · REST APIs", l: ""
    },

    {
        f: 1, c: "consumer", t: "Floria", ar: "", y: "Apr – May 2021", o: "ArabApps Company",
        m: ["Scheduled delivery", "Secure payments"],
        d: "A florist e-commerce application built around gifting, where the delivery window matters as much as the product.",
        p: ["Built the storefront and product catalogue, including arrangement selection and gifting options at the point of purchase.",
            "Implemented <b>scheduled delivery</b>, carrying date and time-window selection through checkout into the fulfilment record.",
            "Integrated secure payment processing with order confirmation and post-purchase tracking."],
        s: "Swift · UIKit · payment SDK", l: ""
    },

    {
        f: 1, c: "consumer", t: "Homy", ar: "", y: "Apr – May 2021", o: "ArabApps Company",
        m: ["On-demand services", "Provider ratings"],
        d: "An on-demand home services marketplace spanning trades, cleaning, remote tutoring, childcare and nursing — one booking surface over a wide range of provider types.",
        p: ["Built <b>provider discovery</b> with ratings, reviews and service-category filtering across professions with very different booking shapes.",
            "Implemented booking against provider availability, covering both scheduled and same-day requests.",
            "Developed the full <b>request lifecycle</b> from booking to completion, with push notification of every status change on both sides."],
        s: "Swift · UIKit · Firebase", l: ""
    },

    {
        f: 1, c: "consumer", t: "YallaDealz", ar: "", y: "Jul – Aug 2019", o: "Independent",
        m: ["Deals aggregator", "Earliest shipped product"],
        d: "A location-based deals aggregator pulling offers across hospitality, dining, retail and entertainment into one feed.",
        p: ["Built a <b>location-aware offers feed</b>, surfacing deals by proximity and category rather than as an undifferentiated list.",
            "Implemented merchant detail pages and the redemption flow, with filtering across four commercial verticals.",
            "The earliest shipped product in the portfolio, and where the location and REST patterns reused across later consumer work were established."],
        s: "Swift · Core Location · REST APIs", l: ""
    },

    {
        f: 1, c: "health", t: "Rubikcare", ar: "", y: "2022 – 2023", o: "EkadSoft",
        m: ["4 interoperating apps", "Zoom API telehealth"],
        d: "A four-application healthcare platform connecting patients, doctors, pharmacies and pharmaceutical sales representatives in one coordinated system.",
        p: ["Built the <b>patient application</b>: appointment booking, proximity-based pharmacy discovery, medicine comparison, and multi-pharmacy ordering with or without a prescription.",
            "Integrated the <b>Zoom API</b> for remote consultations between patients and physicians.",
            "Developed digital prescription creation and management in the physician app, flowing directly into the patient and pharmacy clients.",
            "Delivered the pharmacy order-management app and the sales-representative client with activity tracking."],
        s: "Swift · UIKit · REST APIs · Zoom SDK", l: ""
    },

    /* ---------- index ---------- */
    {
        c: "quran", t: "Convey", ar: "بلغوا", y: "Dec 2019 – Apr 2020", o: "Arabia IT Company",
        d: "Verse-design and sharing tool for preachers and da'wah offices. 300 templates, four-language translations, full customization before export.",
        l: "https://apps.apple.com/app/id1463949765"
    },
    {
        c: "quran", t: "Rusel", ar: "رسل", y: "Jan – Mar 2025", o: "Arabia IT Company",
        d: "Da'wah sharing platform with 6,000 designs and 4,000 short videos, verified by the Sharia Committee of the Al-Rawdah Da'wah Association."
    },
    {
        c: "quran", t: "Sheikh Ibn Uthaymeen", ar: "تطبيق الشيخ ابن عثيمين", y: "Jun – Aug 2023", o: "Arabia IT Company",
        d: "Digital library of the scholar's works, lessons and fatwas."
    },
    {
        c: "quran", t: "Mushaf Ibn Uthaymeen &amp; Tafsir", ar: "مصحف ابن عثيمين وتفسيره", y: "Mar – Apr 2023", o: "Arabia IT Company",
        d: "Quran reader with integrated Ibn Uthaymeen commentary."
    },
    {
        c: "consumer", t: "Farra", ar: "فرة", y: "Sep 2022", o: "Independent",
        d: "Location-based guide to nearby entertainment and leisure venues, filtered for families, women and groups."
    },
    {
        c: "quran", t: "Awrady", ar: "أورادي", y: "Feb – Mar 2022", o: "Arabia IT Company",
        d: "Personal daily adhkar and wird tracking."
    },
    {
        c: "quran", t: "AlQuran AlMubeen", ar: "القرآن المبين", y: "Jan – Feb 2022", o: "Arabia IT Company",
        d: "Quran reader with clarified script rendering."
    },
    {
        c: "quran", t: "Mushaf Al-Tadabbur", ar: "مصحف التدبر", y: "Nov – Dec 2021", o: "Arabia IT Company",
        d: "Reflection-oriented Mushaf with contemplation aids."
    },
    {
        c: "quran", t: "Quran Hakeem", ar: "القرآن الحكيم", y: "Jul – Sep 2021", o: "Arabia IT Company",
        d: "Quran reader with integrated recitation library."
    },
    {
        c: "quran", t: "Lawami' Al-Adhkar", ar: "لوامع الأذكار", y: "Jun – Jul 2021", o: "Arabia IT Company",
        d: "Comprehensive adhkar collection with scheduled reminders."
    },
    {
        c: "quran", t: "Mushaf AlHilal", ar: "مصحف الهلال", y: "Jun 2021", o: "Arabia IT Company",
        d: "Branded Mushaf edition."
    },
    {
        c: "quran", t: "AlQuran AlHakeem", ar: "القرآن الحكيم", y: "May 2021", o: "Arabia IT Company",
        d: "Quran reader build."
    },
    {
        c: "quran", t: "Ayat Bayyinat", ar: "آيات بينات", y: "Jan – Apr 2021", o: "Arabia IT Company",
        d: "Quran study app with verse-level research tools."
    },
    {
        c: "quran", t: "Sakinah", ar: "سكينة", y: "Aug – Nov 2020", o: "Arabia IT Company",
        d: "Spiritual wellbeing and remembrance app."
    },
    {
        c: "consumer", t: "KeesApp", ar: "", y: "Dec 2019", o: "Independent",
        d: "Grocery and supermarket delivery with live order tracking and multiple payment options."
    },
    {
        c: "consumer", t: "ArabicArduino News", ar: "", y: "Mar 2019", o: "Independent",
        d: "Arabic-language Arduino, electronics and IoT news, tutorials and component guides."
    },
    {
        c: "health", t: "PharmacyApp", ar: "", y: "Jan – Feb 2019", o: "Independent",
        d: "Prescription upload and pharmacy ordering, the early prototype of what later became Rubikcare."
    }
];
