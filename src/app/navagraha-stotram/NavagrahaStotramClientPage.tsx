'use client';

import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ExploreTools from '@/components/ExploreTools';

interface StotraVerse {
  id: number;
  planet: string;
  planetHindi: string;
  icon: string;
  title: string;
  sanskrit: string[];
  transliteration: string[];
  meaning: string;
}

const STOTRA_VERSES: StotraVerse[] = [
  {
    id: 1,
    planet: 'Surya (Sun)',
    planetHindi: 'सूर्य',
    icon: 'wb_sunny',
    title: 'Surya — The Sun',
    sanskrit: [
      'जपाकुसुमसङ्काशं काश्यपेयं महाद्युतिम्।',
      'तमोरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥१॥'
    ],
    transliteration: [
      'japākusumasaṅkāśaṁ kāśyapeyaṁ mahādyutim |',
      'tamoriṁ sarvapāpaghnaṁ praṇato\'smi divākaram || 1 ||'
    ],
    meaning:
      'I bow down to the Sun God (Divakara), who resembles the crimson red hibiscus flower, born of Sage Kashyapa, possessing magnificent radiance, the enemy of darkness, and the destroyer of all sins.'
  },
  {
    id: 2,
    planet: 'Chandra (Moon)',
    planetHindi: 'चन्द्र',
    icon: 'bedtime',
    title: 'Chandra — The Moon',
    sanskrit: [
      'दधिशङ्खतुषाराभं क्षीरोदार्णवसम्भवम्।',
      'नमामि शशिनं सोमं शम्भोर्मुकुटभूषणम्॥२॥'
    ],
    transliteration: [
      'dadhiśaṅkhatuṣārābhaṁ kṣīrodārṇavasambhavam |',
      'namāmi śaśinaṁ somaṁ śambhormukuṭabhūṣaṇam || 2 ||'
    ],
    meaning:
      'I bow to the Moon God (Soma), whose hue is like curds, conch, and snow, who arose from the Ocean of Milk, and who adorns the crest of Lord Shiva.'
  },
  {
    id: 3,
    planet: 'Mangala (Mars)',
    planetHindi: 'मङ्गल',
    icon: 'local_fire_department',
    title: 'Mangala — Mars',
    sanskrit: [
      'धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।',
      'कुमारं शक्तिहस्तं तं मङ्गलं प्रणमाम्यहम्॥३॥'
    ],
    transliteration: [
      'dharaṇīgarbhasambhūtaṁ vidyutkāntisamaprabham |',
      'kumāraṁ śaktihastaṁ taṁ maṅgalaṁ praṇamāmyaham || 3 ||'
    ],
    meaning:
      'I reverently bow to Mangala, born from the womb of Mother Earth, radiating brilliance like lightning, youthful in form, holding the divine spear in his hand.'
  },
  {
    id: 4,
    planet: 'Budha (Mercury)',
    planetHindi: 'बुध',
    icon: 'psychology',
    title: 'Budha — Mercury',
    sanskrit: [
      'प्रियङ्गुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।',
      'सौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥४॥'
    ],
    transliteration: [
      'priyaṅgukalikāśyāmaṁ rūpeṇāpratimaṁ budham |',
      'saumyaṁ saumyaguṇopetaṁ taṁ budhaṁ praṇamāmyaham || 4 ||'
    ],
    meaning:
      'I offer salutations to Budha, dark in hue like the Priyangu bud, of matchless beauty, gentle and endowed with serene qualities.'
  },
  {
    id: 5,
    planet: 'Brihaspati (Jupiter)',
    planetHindi: 'बृहस्पति',
    icon: 'school',
    title: 'Brihaspati — Jupiter',
    sanskrit: [
      'देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।',
      'बुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥५॥'
    ],
    transliteration: [
      'devānāṁ ca ṛṣīṇāṁ ca guruṁ kāñcanasannibham |',
      'buddhibhūtaṁ trilokeśaṁ taṁ namāmi bṛhaspatim || 5 ||'
    ],
    meaning:
      'I bow to Brihaspati, guru of the Gods and Rishis, shining like pure gold, the embodiment of wisdom, and lord of the three worlds.'
  },
  {
    id: 6,
    planet: 'Shukra (Venus)',
    planetHindi: 'शुक्र',
    icon: 'diamond',
    title: 'Shukra — Venus',
    sanskrit: [
      'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।',
      'सर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥६॥'
    ],
    transliteration: [
      'himakundamṛṇālābhaṁ daityānāṁ paramaṁ gurum |',
      'sarvaśāstrapravaktāraṁ bhārgavaṁ praṇamāmyaham || 6 ||'
    ],
    meaning:
      'I pay homage to Bhargava (Shukra), of the hue of snow, white jasmine, and lotus stem, supreme teacher of the Daityas, expounder of all sacred scriptures.'
  },
  {
    id: 7,
    planet: 'Shani (Saturn)',
    planetHindi: 'शनि',
    icon: 'balance',
    title: 'Shani — Saturn',
    sanskrit: [
      'नीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम्।',
      'छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥७॥'
    ],
    transliteration: [
      'nīlāñjanasamābhāsaṁ raviputraṁ yamāgrajam |',
      'chāyāmārtaṇḍasambhūtaṁ taṁ namāmi śanaiścaram || 7 ||'
    ],
    meaning:
      'I bow to Shanaishchara (Saturn), shining like dark blue collyrium, son of the Sun god and Chhaya, elder brother of Yama.'
  },
  {
    id: 8,
    planet: 'Rahu (North Node)',
    planetHindi: 'राहु',
    icon: 'dark_mode',
    title: 'Rahu — North Node',
    sanskrit: [
      'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।',
      'सिंहिकागर्भसम्भूतं तं राहुं प्रणमाम्यहम्॥८॥'
    ],
    transliteration: [
      'ardhakāyaṁ mahāvīryaṁ candrādityavimardanam |',
      'siṁhikāgarbhasambhūtaṁ taṁ rāhuṁ praṇamāmyaham || 8 ||'
    ],
    meaning:
      'I offer obeisance to Rahu, of half-formed body, possessing great valour, the eclipse-maker of the Moon and the Sun, born of Simhika.'
  },
  {
    id: 9,
    planet: 'Ketu (South Node)',
    planetHindi: 'केतु',
    icon: 'flag',
    title: 'Ketu — South Node',
    sanskrit: [
      'पलाशपुष्पसङ्काशं तारकाग्रहमस्तकम्।',
      'रौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥९॥'
    ],
    transliteration: [
      'palāśapuṣpasaṅkāśaṁ tārakāgrahamastakam |',
      'raudraṁ raudrAtmakaṁ ghoraṁ taṁ ketuṁ praṇamāmyaham || 9 ||'
    ],
    meaning:
      'I prostrate before Ketu, resembling the flame-colored Palasha flower, the crest of the stars and planets, fierce and awe-inspiring.'
  }
];

const PHALASHRUTI_VERSES = [
  {
    id: 10,
    title: 'Phalashruti — Verse 10',
    sanskrit: [
      'इति व्यासमुखोद्गीतं यः पठेत् सुसमाहितः।',
      'दिवा वा यदि वा रात्रौ विघ्नशान्तिर्भविष्यति॥१०॥'
    ],
    transliteration: [
      'iti vyāsamukhodgītaṁ yaḥ paṭhet susamāhitaḥ |',
      'divā vā yadi vā rātrau vighnaśāntirbhaviṣyati || 10 ||'
    ],
    meaning:
      'Whoever recites this hymn composed by Sage Vyasa with one-pointed devotion, whether by day or by night, will find all their obstacles completely pacified.'
  },
  {
    id: 11,
    title: 'Phalashruti — Verse 11',
    sanskrit: [
      'नरनारीनृपाणां च भवेद् दुःस्वप्ननाशनम्।',
      'ऐश्वर्यमतुलं तेषामारोग्यं पुष्टिवर्धनम्॥११॥'
    ],
    transliteration: [
      'naranārīnṛpāṇāṁ ca bhaved duḥsvapnanāśanam |',
      'aiśvaryamatulaṁ teṣāmārogyaṁ puṣṭivardhanam || 11 ||'
    ],
    meaning:
      'For men, women, and rulers, it dispels nightmares and bad dreams, bestowing matchless prosperity, radiant health, and increasing strength.'
  },
  {
    id: 12,
    title: 'Phalashruti — Verse 12',
    sanskrit: [
      'ग्रहनक्षत्रजाः पीडास्तस्कराग्निसमुद्भवाः।',
      'ताः सर्वाः प्रशमं यान्ति व्यासो ब्रूते न संशयः॥१२॥'
    ],
    transliteration: [
      'grahanakṣatrajāḥ pīḍāstaskarāgnisamudbhavāḥ |',
      'tāḥ sarvāḥ praśamaṁ yānti vyāso brūte na saṁśayaḥ || 12 ||'
    ],
    meaning:
      'All afflictions arising from planets and constellations, as well as dangers from thieves and fire, are thoroughly quelled. Sage Vyasa speaks this without any doubt.'
  }
];

const NavagrahaStotramClientPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="नवग्रहस्तोत्रम् (Navagraha Stotram)"
        subtitle="Vedic Hymn"
        description="The popular Navagraha Stotram of Veda Vyasa — one verse for each of the nine planets, beginning with Surya (japā-kusuma-saṅkāśam), in the Anushtubh metre."
      />

      {/* Planetary Shlokas (1 - 9) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8 mb-12">
        <div className="space-y-6">
          {STOTRA_VERSES.map((verse) => (
            <article
              key={verse.id}
              id={`graha-${verse.id}`}
              className="bg-white border border-outline/20 rounded-2xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4 border-b border-outline/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-accent text-xl" aria-hidden="true">
                    {verse.icon}
                  </span>
                  <h2 className="text-base md:text-lg font-headline text-on-surface">
                    {verse.title} <span className="font-hindi text-on-surface/70 text-sm">({verse.planetHindi})</span>
                  </h2>
                </div>
                <span className="text-xs font-label uppercase px-2.5 py-1 bg-surface-container-high rounded-full text-on-surface/80">
                  {verse.id}
                </span>
              </div>

              {/* Sanskrit Shloka */}
              <div className="my-5 p-4 md:p-6 bg-surface-bright/70 rounded-xl text-center border border-outline/10">
                {verse.sanskrit.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-lg md:text-2xl text-on-surface font-hindi font-medium leading-relaxed tracking-wide"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Transliteration */}
              <div className="my-3 text-center text-xs md:text-sm text-on-surface/80 italic font-mono space-y-1">
                {verse.transliteration.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Meaning */}
              <div className="mt-5 pt-4 border-t border-outline/10 text-xs md:text-sm">
                <p className="text-on-surface/90 leading-relaxed font-body">
                  {verse.meaning}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Phalashruti (10 - 12) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mb-12">
        <div className="flex items-center gap-2 border-b border-outline/20 pb-2">
          <h2 className="text-xl md:text-2xl font-headline text-on-surface">
            फलश्रुतिः (Phalashruti)
          </h2>
        </div>

        <div className="space-y-6">
          {PHALASHRUTI_VERSES.map((verse) => (
            <article
              key={verse.id}
              id={`phala-${verse.id}`}
              className="bg-white border border-outline/20 rounded-2xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4 border-b border-outline/10 pb-3">
                <h3 className="text-base md:text-lg font-headline text-on-surface">
                  {verse.title}
                </h3>
                <span className="text-xs font-label uppercase px-2.5 py-1 bg-surface-container-high rounded-full text-on-surface/80">
                  {verse.id}
                </span>
              </div>

              {/* Sanskrit Shloka */}
              <div className="my-5 p-4 md:p-6 bg-surface-bright/70 rounded-xl text-center border border-outline/10">
                {verse.sanskrit.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-lg md:text-2xl text-on-surface font-hindi font-medium leading-relaxed tracking-wide"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Transliteration */}
              <div className="my-3 text-center text-xs md:text-sm text-on-surface/80 italic font-mono space-y-1">
                {verse.transliteration.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Meaning */}
              <div className="mt-5 pt-4 border-t border-outline/10 text-xs md:text-sm">
                <p className="text-on-surface/90 leading-relaxed font-body">
                  {verse.meaning}
                </p>
              </div>
            </article>
          ))}

          {/* Concluding Signature */}
          <div className="text-center p-6 bg-white border border-outline/20 rounded-2xl shadow-sm">
            <p className="text-base md:text-lg text-on-surface font-hindi font-semibold">
              ॥ इति श्रीव्यासविरचितं नवग्रहस्तोत्रं सम्पूर्णम् ॥
            </p>
          </div>
        </div>
      </section>

      {/* Sacred Mantra & Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white border border-outline/20 rounded-2xl p-6 md:p-8 shadow-sm text-center">
          <p className="text-base md:text-lg text-accent font-hindi">
            ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link prefetch={true} href="/panchang" className="btn-secondary px-5 py-2 text-xs">
              Check Today&apos;s Panchang
            </Link>
            <Link prefetch={true} href="/free-horoscope" className="btn-secondary px-5 py-2 text-xs">
              Generate Free Kundli
            </Link>
            <Link prefetch={true} href="/book-astrology-reading-online" className="btn-primary px-5 py-2 text-xs">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Explore More Tools Section */}
      <ExploreTools currentPath="/navagraha-stotram" />
    </main>
  );
};

export default NavagrahaStotramClientPage;
