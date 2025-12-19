import { Lesson } from './types';

// Helper to create single-question slides
const createQuizSlide = (id: number, question: string, answer: string, options: string[], correctOption: number, titlePrefix: string) => ({
  id,
  type: 'quiz' as const,
  title: `${titlePrefix} - Q${id}`,
  content: {
    quizList: [
      { question, answer, options, correctOption }
    ]
  }
});

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
      // --- Split Quiz Section 1 ---
      createQuizSlide(2.1, 'Which word relates to the complete set of DNA?', 'Genomic', ['Genetic', 'Genomic', 'Generic', 'Geriatric'], 1, 'Vocab Check'),
      createQuizSlide(2.2, 'A "Pathogen" is primarily defined as...', 'A disease causer', ['A helpful bacteria', 'A disease causer', 'A blood cell', 'A vitamin'], 1, 'Vocab Check'),
      createQuizSlide(2.3, 'What is the opposite of "Dysbiosis"?', 'Symbiosis', ['Symbiosis', 'Diagnosis', 'Hypnosis', 'Osmosis'], 0, 'Vocab Check'),
      createQuizSlide(2.4, 'Dysbiosis involves an ________ of microbes.', 'Imbalance', ['Imbalance', 'Improvement', 'Injection', 'Ignorance'], 0, 'Vocab Check'),
      
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
      // --- Split Quiz Section 2 ---
      createQuizSlide(3.1, 'If a tissue is "Vascular", it bleeds...', 'Easily', ['Easily', 'Rarely', 'Never', 'Slowly'], 0, 'Vocab Check'),
      createQuizSlide(3.2, 'A "Systemic" disease affects...', 'The whole body', ['Only the teeth', 'The whole body', 'The skin only', 'The hair'], 1, 'Vocab Check'),
      createQuizSlide(3.3, '"Gingival" health refers to the health of your...', 'Gums', ['Eyes', 'Lungs', 'Gums', 'Liver'], 2, 'Vocab Check'),
      createQuizSlide(3.4, 'Which organ system is "Vascular"?', 'Circulatory', ['Skeletal', 'Circulatory', 'Digestive', 'Nervous'], 1, 'Vocab Check'),

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
      // --- Split Quiz Section 3 ---
      createQuizSlide(4.1, 'Bacteria that "Colonize" a surface...', 'Stay and grow', ['Pass through', 'Die immediately', 'Stay and grow', 'Float away'], 2, 'Vocab Check'),
      createQuizSlide(4.2, 'Signs of "Inflammation" include...', 'Redness and swelling', ['Coldness', 'Redness and swelling', 'Shrinking', 'Dryness'], 1, 'Vocab Check'),
      createQuizSlide(4.3, 'A "Therapeutic" massage is intended to...', 'Heal/Relax', ['Injure', 'Heal/Relax', 'Diagnose', 'Infect'], 1, 'Vocab Check'),
      createQuizSlide(4.4, '"Commensal" bacteria are usually...', 'Harmless/Friendly', ['Deadly', 'Harmless/Friendly', 'Artificial', 'Visible'], 1, 'Vocab Check'),
      createQuizSlide(4.5, 'Which word is a synonym for "Curative"?', 'Therapeutic', ['Systemic', 'Therapeutic', 'Pathogenic', 'Genomic'], 1, 'Vocab Check'),

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
      // --- Split Quiz Section 4 (Grammar) ---
      createQuizSlide(13.1, 'Which verb implies 100% certainty?', 'Prove', ['Suggest', 'Suspect', 'Prove', 'Believe'], 2, 'Grammar Check'),
      createQuizSlide(13.2, 'If I "Suspect" something, I have...', 'A hunch/idea', ['Solid proof', 'A hunch/idea', 'A confirmed fact', 'A photograph'], 1, 'Grammar Check'),
      createQuizSlide(13.3, '"Studies suggest that..." means the result is...', 'Possible/Likely', ['Impossible', 'Absolute Fact', 'Possible/Likely', 'False'], 2, 'Grammar Check'),
      createQuizSlide(13.4, 'Avicenna ________ the link centuries ago.', 'Suspected', ['Proved', 'Suspected', 'Confirmed', 'Identified'], 1, 'Grammar Check'),
      createQuizSlide(13.5, 'Modern science has ________ the specific bacteria.', 'Identified', ['Guessed', 'Identified', 'Theorized', 'Suspected'], 1, 'Grammar Check'),
      createQuizSlide(13.6, 'Which is the WEAKEST reporting verb?', 'Speculate', ['Speculate', 'Demonstrate', 'Show', 'Establish'], 0, 'Grammar Check'),
      createQuizSlide(13.7, '"Implicated in" suggests a connection to...', 'Something bad', ['Something good', 'Something bad', 'Something neutral', 'Nothing'], 1, 'Grammar Check'),
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
      // --- Split Quiz Section 1 ---
      createQuizSlide(2.1, 'A "Cryptic" animal is...', 'Hard to see', ['Loud', 'Hard to see', 'Colorful', 'Friendly'], 1, 'Vocab Check'),
      createQuizSlide(2.2, 'The "Canopy" is found at the...', 'Top of trees', ['Bottom of trees', 'Roots', 'Top of trees', 'River bank'], 2, 'Vocab Check'),
      createQuizSlide(2.3, '"Refugia" provide...', 'Safety/Shelter', ['Food', 'Safety/Shelter', 'Water only', 'Danger'], 1, 'Vocab Check'),
      createQuizSlide(2.4, 'Koalas hide in the...', 'Canopy', ['Cave', 'Ocean', 'Canopy', 'Desert'], 2, 'Vocab Check'),

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
      // --- Split Quiz Section 2 ---
      createQuizSlide(3.1, 'Hyperspectral cameras see...', 'More than eyes', ['Less than eyes', 'Black and white', 'More than eyes', 'Only heat'], 2, 'Vocab Check'),
      createQuizSlide(3.2, 'Every species has a unique spectral...', 'Signature', ['Autograph', 'Signature', 'Sound', 'Smell'], 1, 'Vocab Check'),
      createQuizSlide(3.3, 'An "Algorithm" is a set of...', 'Rules', ['Trees', 'Rules', 'Cameras', 'Sensors'], 1, 'Vocab Check'),
      createQuizSlide(3.4, 'AI uses ________ to process data.', 'Algorithms', ['Refugia', 'Algorithms', 'Canopies', 'Tannins'], 1, 'Vocab Check'),
      createQuizSlide(3.5, 'We identify trees by their light...', 'Signature', ['Weight', 'Height', 'Signature', 'Age'], 2, 'Vocab Check'),

      {
        id: 8,
        type: 'grammar',
        title: 'Grammar: Process & Method',
        content: {
          heading: 'Timeline: The Airbear Process',
          text: [
            'Step 1: Mounting sensors on aircraft to gain altitude.',
            'Step 2: Scanning vast tracts of forest using hyperspectral imaging.',
            'Step 3: Analyzing light signatures to find protein levels.',
            'Step 4: Mapping the safest "refugia" for release.'
          ]
        }
      },
      // --- Split Quiz Section 3 (Grammar) ---
      createQuizSlide(12.1, 'Combine: "They fly drones. They scan trees."', 'By flying...', ['Flying drones, trees scan.', 'By flying drones, they scan trees.', 'To fly drones, trees scan.', 'Drones fly by scanning.'], 1, 'Grammar Check'),
      createQuizSlide(12.2, 'Combine: "We analyze light. We find protein."', 'By analyzing...', ['By analyzing light, we find protein.', 'We find light by analyzing protein.', 'Analyze light to find protein.', 'Found protein by analyze light.'], 0, 'Grammar Check'),
      createQuizSlide(12.3, 'Which preposition follows "achieved"?', 'By/Through', ['At', 'On', 'By/Through', 'In'], 2, 'Grammar Check'),
      createQuizSlide(12.4, '"_____ using a thermal camera, we see heat."', 'By', ['To', 'For', 'By', 'At'], 2, 'Grammar Check'),
      createQuizSlide(12.5, 'Success was reached _____ hard work.', 'By means of', ['Instead of', 'By means of', 'In spite of', 'Next to'], 1, 'Grammar Check'),
      createQuizSlide(12.6, '"By _____ (mount) the sensor..."', 'Mounting', ['Mount', 'Mounts', 'Mounting', 'Mounted'], 2, 'Grammar Check'),
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
      // --- Split Quiz Section 1 ---
      createQuizSlide(2.1, 'A "Recession" is a period of...', 'Decline', ['Growth', 'Decline', 'Stability', 'Boom'], 1, 'Vocab Check'),
      createQuizSlide(2.2, 'During "Inflation", money buys...', 'Less', ['More', 'The same', 'Less', 'Everything'], 2, 'Vocab Check'),
      createQuizSlide(2.3, '"Fiscal" policy relates to...', 'Taxes/Gov Spending', ['Bank interest', 'Taxes/Gov Spending', 'Imports', 'Technology'], 1, 'Vocab Check'),
      createQuizSlide(2.4, 'The opposite of a "Recession" is...', 'Expansion/Boom', ['Crash', 'Inflation', 'Expansion/Boom', 'Deficit'], 2, 'Vocab Check'),

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
      // --- Split Quiz Section 2 ---
      createQuizSlide(3.1, '"Decoupling" means...', 'Separating', ['Joining', 'Separating', 'Fixing', 'Buying'], 1, 'Vocab Check'),
      createQuizSlide(3.2, 'If the market undergoes "Fragmentation", it...', 'Breaks apart', ['Unites', 'Grows', 'Breaks apart', 'Stops'], 2, 'Vocab Check'),
      createQuizSlide(3.3, 'To "Precipitate" a crisis is to...', 'Cause it suddenly', ['Stop it', 'Predict it', 'Cause it suddenly', 'Watch it'], 2, 'Vocab Check'),
      createQuizSlide(3.4, 'Which word suggests breaking into pieces?', 'Fragmentation', ['Decoupling', 'Fragmentation', 'Fiscal', 'Recession'], 1, 'Vocab Check'),

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
      // --- Split Quiz Section 3 ---
      createQuizSlide(4.1, 'A "Bottleneck" causes...', 'Delays', ['Speed', 'Delays', 'Profits', 'Freedom'], 1, 'Vocab Check'),
      createQuizSlide(4.2, 'Software is an ________ asset.', 'Intangible', ['Intangible', 'Physical', 'Heavy', 'Liquid'], 0, 'Vocab Check'),
      createQuizSlide(4.3, 'A "Trilemma" involves how many choices?', 'Three', ['Two', 'Three', 'Four', 'Infinite'], 1, 'Vocab Check'),
      createQuizSlide(4.4, '"Resilience" is the ability to...', 'Bounce back', ['Break', 'Bounce back', 'Give up', 'Predict'], 1, 'Vocab Check'),
      createQuizSlide(4.5, 'Which is NOT intangible?', 'Gold bar', ['Copyright', 'Brand', 'Gold bar', 'Patent'], 2, 'Vocab Check'),

      {
        id: 8,
        type: 'grammar',
        title: 'Grammar: Concession & Contrast',
        content: {
          heading: 'Timeline of Arguments',
          text: [
             'Argument A: The macro economy is doing well.',
             'Transition: However,',
             'Argument B: The average person feels poor.',
             'Argument A: Tech is efficient.',
             'Transition: Whereas,',
             'Argument B: Construction is slow.'
          ]
        }
      },
      // --- Split Quiz Section 4 (Grammar) ---
      createQuizSlide(13.1, 'Which word shows contrast?', 'However', ['And', 'So', 'However', 'Thus'], 2, 'Grammar Check'),
      createQuizSlide(13.2, '"She is rich, _____ she is unhappy."', 'Yet/But', ['So', 'Because', 'Yet/But', 'Therefore'], 2, 'Grammar Check'),
      createQuizSlide(13.3, '"_____ it rained, we played."', 'Although', ['Because', 'However', 'Although', 'Despite'], 2, 'Grammar Check'),
      createQuizSlide(13.4, '"Prices rose. _____, sales fell."', 'Conversely', ['Also', 'Conversely', 'Similarly', 'And'], 1, 'Grammar Check'),
      createQuizSlide(13.5, '"While" is used to show...', 'Simultaneous contrast', ['Cause', 'Effect', 'Simultaneous contrast', 'Time only'], 2, 'Grammar Check'),
      createQuizSlide(13.6, '"Despite" is followed by a...', 'Noun/Gerund', ['Sentence', 'Noun/Gerund', 'Verb', 'Adjective'], 1, 'Grammar Check'),
    ]
  }
];