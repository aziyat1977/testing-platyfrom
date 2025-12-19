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
        title: 'Vocabulary Check: Fill in the Blanks',
        content: {
          quizList: [
            { 
              question: 'The mouth is highly ________, meaning bacteria can enter the blood easily.', 
              answer: 'vascular',
              options: ['vascular', 'genomic', 'systemic', 'commensal'],
              correctOption: 0
            },
            { 
              question: 'P. gingivalis is a dangerous ________ found in the gums.', 
              answer: 'pathogen',
              options: ['commensal', 'pathogen', 'enzyme', 'genome'],
              correctOption: 1
            },
            { 
              question: 'Sugar consumption can lead to ________, an imbalance of bacteria.', 
              answer: 'dysbiosis',
              options: ['symbiosis', 'dysbiosis', 'diagnosis', 'hypnosis'],
              correctOption: 1
            },
            { 
              question: 'Doctors hope to use oral microbes for ________ purposes to cure diseases.', 
              answer: 'therapeutic',
              options: ['cosmetic', 'systemic', 'therapeutic', 'genetic'],
              correctOption: 2
            },
            { 
              question: 'Once in the blood, bacteria can ________ distant organs like the heart.', 
              answer: 'colonize',
              options: ['colonize', 'terrorize', 'vaporize', 'analyze'],
              correctOption: 0
            }
          ]
        }
      },
      {
        id: 6,
        type: 'quiz',
        title: 'Vocabulary Check: Rapid Fire',
        content: {
          quizList: [
            { question: 'Which word means "a disease-causing germ"?', answer: 'Pathogen', options: ['Pathogen', 'Genome', 'Dysbiosis', 'Commensal'], correctOption: 0 },
            { question: '"Vascular" refers to...?', answer: 'Blood vessels', options: ['Blood vessels', 'Bones', 'Nerves', 'Skin'], correctOption: 0 },
            { question: 'The opposite of a balanced microbiome is...?', answer: 'Dysbiosis', options: ['Symbiosis', 'Dysbiosis', 'Diagnosis', 'Prognosis'], correctOption: 1 },
            { question: '"Systemic" implies the disease is...?', answer: 'Everywhere in the body', options: ['Localized', 'Everywhere in the body', 'Only in the mouth', 'Mental'], correctOption: 1 },
            { question: 'A "Therapeutic" approach is focused on...?', answer: 'Healing', options: ['Healing', 'Hurting', 'Diagnosing', 'Ignoring'], correctOption: 0 }
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
      },
      {
        id: 13,
        type: 'quiz',
        title: 'Grammar Assessment',
        content: {
          quizList: [
            { question: 'Which verb shows the strongest evidence?', answer: 'Find', options: ['Suspect', 'Suggest', 'Find', 'Theorize'], correctOption: 2 },
            { question: '"Implicated in" means:', answer: 'Connected to a crime/problem', options: ['Proven innocent', 'Connected to a crime/problem', 'Cured', 'Unrelated'], correctOption: 1 },
            { question: '"Researchers found that..." is followed by:', answer: 'A full clause', options: ['A full clause', 'An infinitive', 'A noun', 'A gerund'], correctOption: 0 },
            { question: '"Hypothesis" pairs best with:', answer: 'Suggest', options: ['Suggest', 'Prove', 'Confirm', 'Identify'], correctOption: 0 },
            { question: '"Hard science" turns suspicion into:', answer: 'Fact', options: ['Fact', 'Theory', 'Guess', 'Opinion'], correctOption: 0 }
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
        id: 5,
        type: 'quiz',
        title: 'Vocabulary Assessment',
        content: {
           quizList: [
            { question: 'Koalas are ________ animals, making them hard to spot.', answer: 'cryptic', options: ['cryptic', 'canopy', 'refugia', 'hyperspectral'], correctOption: 0 },
            { question: 'The drone flies above the ________ to scan leaves.', answer: 'canopy', options: ['ground', 'canopy', 'roots', 'trunk'], correctOption: 1 },
            { question: 'During a fire, animals seek safety in a ________.', answer: 'refugia', options: ['city', 'refugia', 'desert', 'canopy'], correctOption: 1 },
            { question: 'The sensor detects the unique spectral ________ of the tree.', answer: 'signature', options: ['sound', 'smell', 'signature', 'taste'], correctOption: 2 },
            { question: 'This camera is ________, seeing more than the human eye.', answer: 'hyperspectral', options: ['hyperspectral', 'blind', 'monochrome', 'broken'], correctOption: 0 }
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
            { 
              question: 'They analyze light. They find the protein level.', 
              answer: 'By analyzing light, they find the protein level.',
              options: [
                'By analyzing light, they find the protein level.',
                'They find the protein level by analyze light.',
                'Analyzing light, the protein level is found.',
                'By analyzed light, they find the protein level.'
              ],
              correctOption: 0
            },
            { 
              question: 'The drone flies high. It scans the canopy.', 
              answer: 'By flying high, the drone scans the canopy.',
              options: [
                'The drone scans the canopy by fly high.',
                'By flying high, the drone scans the canopy.',
                'To fly high, the drone scans the canopy.',
                'Flying high, scans the drone canopy.'
              ],
              correctOption: 1
            },
            { 
              question: 'They identify refugia. They save the species.', 
              answer: 'They save the species by identifying refugia.',
              options: [
                'They identify refugia by saving the species.',
                'They save the species by identifying refugia.',
                'By save the species, they identify refugia.',
                'Identifying refugia saves species.'
              ],
              correctOption: 1
            }
          ]
        }
      },
      {
        id: 13,
        type: 'quiz',
        title: 'Grammar Assessment - Prepositions',
        content: {
          quizList: [
            { question: 'The problem is solved _____ using drones.', answer: 'by', options: ['on', 'by', 'with', 'at'], correctOption: 1 },
            { question: 'Koalas are found _____ scanning the trees.', answer: 'by', options: ['to', 'for', 'by', 'in'], correctOption: 2 },
            { question: 'Data is collected _____ the sensor.', answer: 'by', options: ['of', 'by', 'at', 'from'], correctOption: 1 },
            { question: '_____ analyzing the leaf, we find poison.', answer: 'By', options: ['By', 'To', 'For', 'With'], correctOption: 0 },
            { question: 'They help koalas _____ choosing good release sites.', answer: 'by', options: ['by', 'in', 'on', 'at'], correctOption: 0 }
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
        id: 5,
        type: 'quiz',
        title: 'Vocabulary Check: Fill in the Blanks',
        content: {
          quizList: [
            { question: 'The government avoided a deep ________ despite fears.', answer: 'recession', options: ['recession', 'inflation', 'depression', 'stagnation'], correctOption: 0 },
            { question: 'Supply chain ________ caused delays in shipping.', answer: 'bottlenecks', options: ['bottlenecks', 'breakups', 'breakthroughs', 'bandits'], correctOption: 0 },
            { question: 'Digital goods are examples of ________ growth.', answer: 'intangible', options: ['intangible', 'invisible', 'invincible', 'irrational'], correctOption: 0 },
            { question: 'The ________ of trade into blocs is changing the world.', answer: 'fragmentation', options: ['fragmentation', 'augmentation', 'sedimentation', 'fermentation'], correctOption: 0 },
            { question: 'High debt limits the government\'s ________ space.', answer: 'fiscal', options: ['fiscal', 'physical', 'festival', 'final'], correctOption: 0 }
          ]
        }
      },
      {
        id: 6,
        type: 'quiz',
        title: 'Vocabulary Check: Concepts',
        content: {
          quizList: [
            { question: 'Opposite of "Soft Landing"?', answer: 'Recession/Crash', options: ['Recession/Crash', 'Boom', 'Growth', 'Stability'], correctOption: 0 },
            { question: 'Tax and government spending is called...?', answer: 'Fiscal policy', options: ['Monetary policy', 'Fiscal policy', 'Trade policy', 'Foreign policy'], correctOption: 1 },
            { question: 'Software is a(n) ____ good.', answer: 'Intangible', options: ['Tangible', 'Intangible', 'Expensive', 'Imported'], correctOption: 1 },
            { question: 'Breaking the world into trading blocs is...', answer: 'Fragmentation', options: ['Globalization', 'Fragmentation', 'Integration', 'Unification'], correctOption: 1 },
            { question: 'Prices going up is...', answer: 'Inflation', options: ['Deflation', 'Inflation', 'Stagflation', 'Recession'], correctOption: 1 }
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
      },
      {
        id: 13,
        type: 'quiz',
        title: 'Grammar Assessment',
        content: {
          quizList: [
            { question: 'Which word starts a sentence to show contrast?', answer: 'However', options: ['However', 'And', 'So', 'Because'], correctOption: 0 },
            { question: '"_____ production flowed easily, now it is hard."', answer: 'While', options: ['While', 'Because', 'Therefore', 'Since'], correctOption: 0 },
            { question: '"Friendly trade is good. _____, it is costly."', answer: 'On the other hand', options: ['On the other hand', 'Therefore', 'Additionally', 'As a result'], correctOption: 0 },
            { question: 'Does "Conversely" mean the same or opposite?', answer: 'Opposite', options: ['Opposite', 'Same', 'Similar', 'Unrelated'], correctOption: 0 },
            { question: 'Can "While" be used at the start of a sentence?', answer: 'Yes', options: ['Yes', 'No', 'Only in formal writing', 'Never'], correctOption: 0 }
          ]
        }
      }
    ]
  }
];