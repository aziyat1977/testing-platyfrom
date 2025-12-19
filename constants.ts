import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'The Oral Microbiome',
    subtitle: 'The Microscopic Universe',
    theme: 'microbiome',
    slides: [
      {
        id: 1,
        type: 'title',
        title: 'Title Slide',
        content: {
          heading: 'The Oral Microbiome',
          subheading: 'A Window to the Body',
          text: ['IELTS Academic Reading Lesson 1'],
          visualPrompt: 'High-definition 3D render of bacteria floating in a dark blue void'
        }
      },
      {
        id: 2,
        type: 'vocab',
        title: 'Vocabulary 1-3 (The Ecosystem)',
        content: {
          vocabList: [
            { word: 'Genomic', pos: 'adj', ipa: '/dʒiːˈnəʊmɪk/', definition: 'Relating to the complete set of DNA.', translations: '🇷🇺 Геномный | 🇺🇿 Genomga oid' },
            { word: 'Pathogen', pos: 'n', ipa: '/ˈpæθədʒən/', definition: 'A bacterium, virus, or microorganism that can cause disease.', translations: '🇷🇺 Патоген | 🇺🇿 Patogen' },
            { word: 'Dysbiosis', pos: 'n', ipa: '/dɪsbaɪˈəʊsɪs/', definition: 'A microbial imbalance on or inside the body.', translations: '🇷🇺 Дисбиоз | 🇺🇿 Disbioz' }
          ]
        }
      },
      {
        id: 3,
        type: 'vocab',
        title: 'Vocabulary 4-6 (The Anatomy)',
        content: {
          vocabList: [
            { word: 'Vascular', pos: 'adj', ipa: '/ˈvæskjʊlə/', definition: 'Rich in blood vessels.', translations: '🇷🇺 Сосудистый | 🇺🇿 Qon tomirga oid' },
            { word: 'Systemic', pos: 'adj', ipa: '/sɪˈstɛmɪk/', definition: 'Affecting the entire body, rather than a single part.', translations: '🇷🇺 Системный | 🇺🇿 Tizimli' },
            { word: 'Gingival', pos: 'adj', ipa: '/ˈdʒɪndʒɪvl/', definition: 'Relating to the gums.', translations: '🇷🇺 Десневой | 🇺🇿 Milklarga oid' }
          ]
        }
      },
      {
        id: 4,
        type: 'vocab',
        title: 'Vocabulary 7-10 (The Action)',
        content: {
          vocabList: [
            { word: 'Colonize', pos: 'v', ipa: '/ˈkɒlənaɪz/', definition: 'To settle among and establish control over.', translations: '🇷🇺 Колонизировать | 🇺🇿 Koloniyalashtirmoq' },
            { word: 'Inflammation', pos: 'n', ipa: '/ˌɪnfləˈmeɪʃn/', definition: 'A physical condition where part of the body becomes reddened/swollen.', translations: '🇷🇺 Воспаление | 🇺🇿 Yallig\'lanish' },
            { word: 'Therapeutic', pos: 'adj', ipa: '/ˌθɛrəˈpjuːtɪk/', definition: 'Relating to the healing of disease.', translations: '🇷🇺 Терапевтический | 🇺🇿 Davolovchi' },
            { word: 'Commensal', pos: 'adj', ipa: '/kəˈmɛns(ə)l/', definition: 'Living in close association where one benefits without harming the other.', translations: '🇷🇺 Комменсальный | 🇺🇿 Kommensal' }
          ]
        }
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Vocabulary Assessment - Fill in the Blanks',
        content: {
          quizList: [
            { question: 'The mouth is highly ________, meaning bacteria can enter the blood easily.', answer: 'vascular' },
            { question: 'P. gingivalis is a dangerous ________ found in the gums.', answer: 'pathogen' },
            { question: 'Sugar consumption can lead to ________, an imbalance of bacteria.', answer: 'dysbiosis' },
            { question: 'Doctors hope to use oral microbes for ________ purposes to cure diseases.', answer: 'therapeutic' },
            { question: 'Once in the blood, bacteria can ________ distant organs like the heart.', answer: 'colonize' }
          ]
        }
      },
      {
        id: 8,
        type: 'grammar',
        title: 'Grammar Focus: Reporting Verbs & Certainty',
        content: {
          heading: 'Meaning, Form, Pronunciation',
          text: [
            'Meaning: Using specific verbs to show how true a statement is based on evidence.',
            'Form: Subject + Reporting Verb + (that) + Clause.',
            'Pronunciation: Stress the stem. sus-PEC-ted, in-VES-ti-ga-ting.'
          ]
        }
      },
      {
        id: 10,
        type: 'grammar',
        title: 'The CLINE of Certainty',
        content: {
          text: [
            '0% - 30% (Speculation): Suspect, Theorize ("Avicenna suspected...")',
            '40% - 70% (Possibility): Suggest, Implicate, Link ("Studies suggest...")',
            '80% - 100% (Evidence): Find, Identify, Prove, Confirm ("Researchers found...")'
          ]
        }
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Project Airbear',
    subtitle: 'Eco-Tech Surveillance',
    theme: 'airbear',
    slides: [
      {
        id: 1,
        type: 'title',
        title: 'Project Airbear',
        content: {
          heading: 'Project Airbear',
          subheading: 'Saving Koalas from the Sky',
          text: ['IELTS Academic Reading Lesson 2'],
          visualPrompt: 'Drone thermal view of a forest with a bright spot (koala)'
        }
      },
      {
        id: 2,
        type: 'vocab',
        title: 'Vocabulary 1-3 (The Target)',
        content: {
          vocabList: [
            { word: 'Cryptic', pos: 'adj', ipa: '/ˈkrɪptɪk/', definition: 'Difficult to find or see; camouflaged.', translations: '🇷🇺 Скрытный | 🇺🇿 Yashirin' },
            { word: 'Canopy', pos: 'n', ipa: '/ˈkænəpi/', definition: 'The upper layer or habitat zone formed by mature tree crowns.', translations: '🇷🇺 Полог леса | 🇺🇿 Daraxt shox-shabbasi' },
            { word: 'Refugia', pos: 'n', ipa: '/rɪˈfjuːdʒɪə/', definition: 'An area where a population can survive during unfavorable conditions.', translations: '🇷🇺 Убежище | 🇺🇿 Boshpana' }
          ]
        }
      },
      {
        id: 3,
        type: 'vocab',
        title: 'Vocabulary 4-6 (The Tech)',
        content: {
          vocabList: [
            { word: 'Hyperspectral', pos: 'adj', ipa: '/ˌhaɪpəˈspɛktrəl/', definition: 'Collecting information from across the electromagnetic spectrum.', translations: '🇷🇺 Гиперспектральный | 🇺🇿 Giperspektral' },
            { word: 'Signature', pos: 'n', ipa: '/ˈsɪɡnətʃə/', definition: 'A distinctive pattern/characteristic.', translations: '🇷🇺 Сигнатура | 🇺🇿 Imzo' },
            { word: 'Algorithm', pos: 'n', ipa: '/ˈælɡərɪðəm/', definition: 'A process or set of rules to be followed in calculations by a computer.', translations: '🇷🇺 Алгоритм | 🇺🇿 Algoritm' }
          ]
        }
      },
      {
        id: 8,
        type: 'grammar',
        title: 'Grammar: Process & Method',
        content: {
          heading: 'Expressing "How"',
          text: [
            'Meaning: Describing the method used to achieve a result.',
            'Form: "By" + Gerund (Verb-ing) OR Passive Voice + "by" + Agent.',
            'Example: "By mounting sensors on aircraft, researchers can scan vast tracts."'
          ]
        }
      },
      {
        id: 12,
        type: 'quiz',
        title: 'Grammar Assessment - Combine Sentences',
        content: {
          quizList: [
            { question: 'They analyze light. They find the protein level.', answer: 'By analyzing light, they find the protein level.' },
            { question: 'The drone flies high. It scans the canopy.', answer: 'By flying high, the drone scans the canopy.' },
            { question: 'They identify refugia. They save the species.', answer: 'They save the species by identifying refugia.' }
          ]
        }
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'The Year of the "Soft Landing"',
    subtitle: 'Global Finance',
    theme: 'economy',
    slides: [
      {
        id: 1,
        type: 'title',
        title: 'The Year of the "Soft Landing"',
        content: {
          heading: 'The Year of the "Soft Landing"',
          subheading: 'Economics in 2025',
          text: ['IELTS Academic Reading Lesson 3'],
          visualPrompt: 'A graphical line crashing down then gently curving up'
        }
      },
      {
        id: 2,
        type: 'vocab',
        title: 'Vocabulary 1-3 (The Economy)',
        content: {
          vocabList: [
            { word: 'Recession', pos: 'n', ipa: '/rɪˈsɛʃn/', definition: 'A period of temporary economic decline.', translations: '🇷🇺 Рецессия | 🇺🇿 Turg\'unlik' },
            { word: 'Inflation', pos: 'n', ipa: '/ɪnˈfleɪʃn/', definition: 'A general increase in prices and fall in the purchasing value of money.', translations: '🇷🇺 Инфляция | 🇺🇿 Inflyatsiya' },
            { word: 'Fiscal', pos: 'adj', ipa: '/ˈfɪskl/', definition: 'Relating to government revenue, especially taxes.', translations: '🇷🇺 Фискальный | 🇺🇿 Fiskal' }
          ]
        }
      },
      {
        id: 3,
        type: 'vocab',
        title: 'Vocabulary 4-6 (The Change)',
        content: {
          vocabList: [
            { word: 'Decoupling', pos: 'n', ipa: '/diːˈkʌplɪŋ/', definition: 'Separating two things that were connected.', translations: '🇷🇺 Разъединение | 🇺🇿 Ajratish' },
            { word: 'Fragmentation', pos: 'n', ipa: '/ˌfraɡmɛnˈteɪʃn/', definition: 'The process of breaking into small or separate parts.', translations: '🇷🇺 Фрагментация | 🇺🇿 Bo\'linish' },
            { word: 'Precipitate', pos: 'v', ipa: '/prɪˈsɪpɪteɪt/', definition: 'To cause (an event, typically bad) to happen suddenly.', translations: '🇷🇺 Ускорять | 🇺🇿 Tezlashtirmoq' }
          ]
        }
      },
      {
        id: 4,
        type: 'vocab',
        title: 'Vocabulary 7-10 (The Concepts)',
        content: {
          vocabList: [
            { word: 'Bottleneck', pos: 'n', ipa: '/ˈbɒtlˌnɛk/', definition: 'A point of congestion or blockage in a system/supply chain.', translations: '🇷🇺 Затор | 🇺🇿 To\'siq' },
            { word: 'Intangible', pos: 'adj', ipa: '/ɪnˈtændʒɪbl/', definition: 'Unable to be touched; not having physical presence.', translations: '🇷🇺 Нематериальный | 🇺🇿 Nomoddiy' },
            { word: 'Trilemma', pos: 'n', ipa: '/traɪˈlɛmə/', definition: 'A situation with three difficult choices.', translations: '🇷🇺 Трилемма | 🇺🇿 Trilemma' },
            { word: 'Resilience', pos: 'n', ipa: '/rɪˈzɪlɪəns/', definition: 'The capacity to recover quickly from difficulties.', translations: '🇷🇺 Устойчивость | 🇺🇿 Chidamlilik' }
          ]
        }
      },
      {
        id: 8,
        type: 'grammar',
        title: 'Grammar: Concession & Contrast',
        content: {
          heading: 'Weighing Arguments',
          text: [
            'Meaning: Admitting a point (Concession) to then introduce a contrasting or more important point.',
            'Direct Contrast: Conversely, On the other hand.',
            'Unexpected Result: However, Nevertheless.',
            'Simultaneous Difference: While, Whereas.'
          ]
        }
      }
    ]
  }
];