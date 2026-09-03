import os
import re

replacements = {
    "src/app/layout.tsx": [
        (r'description: "Expert Vedic Astrology guidance by Pandit Rahul Bali Ji\. Get personalized horoscopes, birth chart readings, and spiritual consultations to align with your true purpose\."', r'description: "Vedic Astrology guidance by Rahul Bali. Get horoscopes, birth chart readings, and consultations."'),
        (r'description: "Expert Vedic Astrology guidance by Pandit Rahul Bali Ji\. Get personalized horoscopes, birth chart readings, and spiritual consultations\."', r'description: "Vedic Astrology guidance by Rahul Bali. Get horoscopes, birth chart readings, and consultations."')
    ],
    "src/app/page.tsx": [
        (r'title: "Best Vedic Astrologer Online \| Pandit Rahul Bali Astrology"', r'title: "Vedic Astrology Consultations | Rahul Bali Astrology"'),
        (r'description: "Consult with Pandit Rahul Bali Ji, a leading Vedic Astrologer\. Get accurate Janam Kundli readings, 17 varga charts, Panch Pakshi & Biorhythm\."', r'description: "Consult with Rahul Bali for Vedic Astrology. Get Janam Kundli readings, varga charts, Panch Pakshi & Biorhythm."')
    ],
    "src/app/about/page.tsx": [
        (r'description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology providing spiritual insights and practical life remedies rooted in Jyotish Shastra\."', r'description: "Learn about Rahul Bali, providing insights and life remedies rooted in Vedic Astrology."')
    ],
    "src/app/free-horoscope/page.tsx": [
        (r'description: "Generate your Free Kundli online with Pandit Rahul Bali\. Get accurate Janam Kundali, detailed Vedic horoscope charts \(D1, D3, D9\), and planetary positions using precise Lahiri Ayanamsa\."', r'description: "Generate your Free Kundli online. Get Janam Kundali, Vedic horoscope charts, and planetary positions."'),
        (r'description: "Generate your Free Kundli online with Pandit Rahul Bali\. Get accurate Janam Kundali, detailed Vedic horoscope charts \(D1, D3, D9\), and planetary positions\."', r'description: "Generate your Free Kundli online. Get Janam Kundali, Vedic horoscope charts, and planetary positions."')
    ],
    "src/app/btr/page.tsx": [
        (r'description: \'Interactive Birth Time Rectification \(BTR\) tool to accurately determine and adjust your birth time using Vedic Astrology techniques like Kunda, Tattva Siddhanta, Gulika, and Pranapada Lagna\.\'', r'description: \'Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.\''),
        (r'description: \'Interactive Birth Time Rectification \(BTR\) tool to accurately determine and adjust your birth time using Vedic Astrology techniques\.\'', r'description: \'Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.\'')
    ],
    "src/app/terms/page.tsx": [
        (r'description: "Read our Terms of Service\. Learn about astrological disclaimers, accurate birth inputs, and voluntary contributions for Rahul Bali Astrology\."', r'description: "Read our Terms of Service. Learn about astrological disclaimers, birth inputs, and voluntary contributions."'),
        (r'description: "Read our Terms of Service\. Learn about astrological disclaimers, accurate birth inputs, and voluntary contributions\."', r'description: "Read our Terms of Service. Learn about astrological disclaimers, birth inputs, and voluntary contributions."')
    ],
    "src/app/terms/TermsContent.tsx": [
        (r'description: "Please read our Terms of Service and Astrological Disclaimers carefully before using our digital tools and booking consultations\."', r'description: "Please read our Terms of Service and disclaimers before using our tools and booking consultations."')
    ],
    "src/app/panchang/page.tsx": [
        (r'description: "Get the most accurate Daily Panchang for today\. Detailed Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal\. Align your day with Vedic wisdom\."', r'description: "Get the Daily Panchang for today. View Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal."'),
        (r'description: "Get the most accurate Daily Panchang for today\. Detailed Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal\."', r'description: "Get the Daily Panchang for today. View Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal."')
    ],
    "src/app/panchang/PanchangClientPage.tsx": [
        (r'heroDesc: "Align your daily activities with the cosmic rhythm\. Accurate Vedic Panchang details for New Delhi, India\."', r'heroDesc: "View Vedic Panchang details for New Delhi, India."')
    ],
    "src/app/faq/page.tsx": [
        (r'description: "Explore frequently asked questions about Vedic Astrology, all 17 Divisional Varga charts, Panch Pakshi, and Biorhythm cycles by Pandit Rahul Bali\."', r'description: "Explore frequently asked questions about Vedic Astrology, Divisional Varga charts, Panch Pakshi, and Biorhythm."')
    ],
    "src/app/faq/FAQContent.tsx": [
        (r'subtitle: "Knowledge & Wisdom"', r'subtitle: "Questions & Answers"'),
        (r'description: "Explore detailed answers regarding Vedic Astrology, Shodashavarga \(Divisional\) Charts, the Panch Pakshi system, and personal Biorhythm tracking\."', r'description: "Explore answers regarding Vedic Astrology, Divisional Charts, the Panch Pakshi system, and Biorhythm."')
    ],
    "src/app/hora/page.tsx": [
        (r'description: "Calculate real-time Vedic planetary hours \(Hora\) based on Brihat Parasara Hora Shastra\. Find the active Hora lord and select auspicious timings \(Muhurtas\) for your tasks\."', r'description: "Calculate Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord."')
    ],
    "src/app/hora/HoraClientPage.tsx": [
        (r'heroDesc: "Align your actions with cosmic alignments based on Brihat Parasara Hora Shastra\. Every hour of the day is ruled by a planet, determining the auspiciousness of your endeavors\."', r'heroDesc: "Calculate Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra."')
    ],
    "src/app/horoscope/compact/page.tsx": [
        (r'description: "A professional, high-density dashboard for your Vedic birth chart \(Kundli\)\. All divisional charts, planetary positions, and dasha details on a single screen\."', r'description: "A compact dashboard for your Vedic birth chart (Kundli). View charts, planetary positions, and dasha details."')
    ],
    "src/app/horoscope/page.tsx": [
        (r'description: "Generate your free Vedic astrology birth chart \(Kundli\) with Pandit Rahul Bali Ji\. Get detailed planetary positions, divisional charts \(D1, D3, D9\), and Vimshottari Dasha\."', r'description: "Generate your free Vedic astrology birth chart (Kundli). Get planetary positions, divisional charts, and Vimshottari Dasha."'),
        (r'description: "Generate your free Vedic astrology birth chart \(Kundli\) with Pandit Rahul Bali Ji\."', r'description: "Generate your free Vedic astrology birth chart (Kundli)."')
    ],
    "src/app/transits/page.tsx": [
        (r"description: 'Track the past and future movements \(Gochara\) of all nine Vedic planets\. Detailed transit details across Rashi \(Signs\) and Nakshatras \(Asterisms\)\.'", r"description: 'Track the movements (Gochara) of all nine Vedic planets across Rashi (Signs) and Nakshatras (Asterisms).'"),
        (r"description: 'Track the past and future movements of all nine Vedic planets across signs and nakshatras\.'", r"description: 'Track the movements of all nine Vedic planets across signs and nakshatras.'")
    ],
    "src/app/biorhythm/page.tsx": [
        (r"description: 'Track your physical, emotional, and intellectual Biorhythm cycles\. Understand your natural energy peaks and troughs based on your birth date for guidance\.'", r"description: 'Track your physical, emotional, and intellectual Biorhythm cycles based on your birth date.'")
    ],
    "src/app/biorhythm/BiorhythmClientPage.tsx": [
        (r'heroDesc: "Understand your natural cycles\. Physical, emotional, and intellectual rhythms influence your daily life from the moment of birth\."', r'heroDesc: "Track your physical, emotional, and intellectual rhythms."')
    ],
    "src/app/privacy/page.tsx": [
        (r'description: "Read our Privacy Policy\. Learn how your birth details, names, and contact information are processed securely with absolute confidentiality\."', r'description: "Read our Privacy Policy. Learn how your information is processed securely."'),
        (r'description: "Read our Privacy Policy\. Learn how your birth details, names, and contact information are processed securely\."', r'description: "Read our Privacy Policy. Learn how your information is processed securely."')
    ],
    "src/app/privacy/PrivacyContent.tsx": [
        (r'subtitle: "Trust & Transparency"', r'subtitle: "Information Security"'),
        (r'description: "We value your trust\. Learn how your birth details and personal information are handled with absolute confidentiality\."', r'description: "Learn how your birth details and personal information are handled securely."')
    ],
    "src/app/reviews/page.tsx": [
        (r'description: "Transforming Destiny, Elevating Lives — Happy Clients, Happy Life"', r'description: "Client reviews and experiences with Rahul Bali Astrology"')
    ],
    "src/app/reviews/ReviewsClientPage.tsx": [
        (r'description: "Transforming Destiny, Elevating Lives — Happy Clients, Happy Life"', r'description: "Client reviews and experiences with Rahul Bali Astrology"')
    ],
    "src/app/services/page.tsx": [
        (r'description: "Expert Vedic Astrology services covering career, finance, relationships, health, and spiritual guidance through traditional Jyotish principles\."', r'description: "Vedic Astrology services covering career, finance, relationships, and health."'),
        (r'description: "Expert Vedic Astrology services covering career, finance, relationships, health, and spiritual guidance\."', r'description: "Vedic Astrology services covering career, finance, relationships, and health."')
    ],
    "src/app/transits-table/page.tsx": [
        (r"description: 'View the current live astrological positions and status of all Vedic planets in a compact table view\.'", r"description: 'View the current astrological positions and status of all Vedic planets in a table view.'")
    ],
    "src/app/transits-table/TransitsTableClientPage.tsx": [
        (r'heroDesc: "View the current live astrological positions and status of all Vedic planets\."', r'heroDesc: "View the current astrological positions and status of all Vedic planets."')
    ],
    "src/app/donate/page.tsx": [
        (r'description: "Support Rahul Bali Astrology\. Make a voluntary contribution or donation to help us continue providing free, high-quality Vedic Astrology tools and knowledge\."', r'description: "Support Rahul Bali Astrology. Make a voluntary contribution to help us provide free Vedic Astrology tools."'),
        (r'description: "Support Rahul Bali Astrology\. Make a voluntary contribution or donation to help us continue providing free, high-quality Vedic Astrology tools\."', r'description: "Support Rahul Bali Astrology. Make a voluntary contribution to help us provide free Vedic Astrology tools."')
    ],
    "src/app/donate/DonateClientPage.tsx": [
        (r'subtitle: "CONTRIBUTIONS & DONATIONS"', r'subtitle: "Contributions"')
    ],
    "src/app/kp-horary/page.tsx": [
        (r'description: "Calculate your KP Horary \(Prashna\) Kundli based on a chosen number between 1 to 249\. Get precise answers using Krishnamurti Paddhati astrology\."', r'description: "Calculate your KP Horary (Prashna) Kundli based on a chosen number between 1 to 249."')
    ],
    "src/app/panch-pakshi/page.tsx": [
        (r'description: "Calculate your precise Panch Pakshi and track the five elemental birds based on ancient Tamil astrology\. Optimize your daily tasks for success and harmony\."', r'description: "Calculate your Panch Pakshi and track the five elemental birds based on Tamil astrology."'),
        (r'description: "Calculate your precise Panch Pakshi and track the five elemental birds based on ancient Tamil astrology\."', r'description: "Calculate your Panch Pakshi and track the five elemental birds based on Tamil astrology."')
    ],
    "src/app/contact/page.tsx": [
        (r'description: "Contact Pandit Rahul Bali for Vedic Astrology consultations, spiritual guidance, and Kundli reading appointments\. Get in touch for reliable astrological support\."', r'description: "Contact Rahul Bali for Vedic Astrology consultations and Kundli readings."')
    ],
    "src/app/contact/ContactContent.tsx": [
        (r'subtitle: "Get in Touch"', r'subtitle: "Contact Information"')
    ],
    "src/app/error.tsx": [
        (r'subtitle: "System Error"', r'subtitle: "Error"'),
        (r'description: "The celestial alignment seems disrupted\. We\'ve encountered an unexpected error\."', r'description: "We\'ve encountered an unexpected error."')
    ],
    "src/app/not-found.tsx": [
        (r'subtitle: "404 Error"', r'subtitle: "Not Found"'),
        (r'description: "The cosmic path you\'re looking for doesn\'t seem to exist\. Let\'s get you back on track\."', r'description: "The page you are looking for does not exist."')
    ]
}

for filepath, reps in replacements.items():
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        for search, replace in reps:
            content = re.sub(search, replace, content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"File not found: {filepath}")
