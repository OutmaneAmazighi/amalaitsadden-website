import eventsData from './events.json';
import { format, parseISO } from 'date-fns';
import type { Locale } from 'date-fns';
import { de, fr, enUS, ar } from 'date-fns/locale';

// No longer using a constant path for images
// Each event uses its own image paths

// Define the Event interface from JSON structure
export interface RealEvent {
  date: string;
  title: string;
  location: string;
  description: string;
  main_photo_url: string;
  gallery: string[];
}

// Define our processed event type with translations and formatted data
export interface ProcessedEvent {
  id: string;
  date: string;
  year: number;
  title: {
    de: string;
    fr: string;
    ar: string;
    en: string;
  };
  location: {
    de: string;
    fr: string;
    ar: string;
    en: string;
  };
  description: {
    de: string;
    fr: string;
    ar: string;
    en: string;
  };
  mainImage: string;
  gallery: string[];
}

// Translations for non-Arabic content
const translations: Record<string, { de: string; fr: string; en: string }> = {
  "مبادرة دعم طلاب الباكالوريا": {
    de: "Initiative zur Unterstützung von Abiturprüflingen",
    fr: "Initiative de soutien aux étudiants du baccalauréat",
    en: "Initiative to Support Baccalaureate Students"
  },
  "ندوة دولية حول إقرار رأس السنة الأمازيغية عطلة رسمية": {
    de: "Internationale Konferenz zur Anerkennung des Amazigh-Neujahrs als offizieller Feiertag",
    fr: "Conférence internationale sur la reconnaissance du Nouvel An amazigh comme jour férié officiel",
    en: "International Conference on the Recognition of Amazigh New Year as an Official Holiday"
  },
  "قافلة طبية متعددة التخصصات": {
    de: "Multidisziplinäre medizinische Karawane",
    fr: "Caravane médicale multidisciplinaire",
    en: "Multidisciplinary Medical Caravan"
  },
  "حفل اختتام مسابقة تجويد القرآن الكريم": {
    de: "Abschlussfeier des Koran-Rezitationswettbewerbs",
    fr: "Cérémonie de clôture du concours de récitation du Coran",
    en: "Closing Ceremony of the Quran Recitation Competition"
  },
  "يوم المرأة السادنية والعمل الجمعوي": {
    de: "Tag der Sadden-Frauen und Gemeinschaftsarbeit",
    fr: "Journée de la femme saddenienne et du travail associatif",
    en: "Sadden Women's Day and Community Work"
  },
  "حملة توعوية ضد مخاطر كوفيد-19": {
    de: "Aufklärungskampagne gegen COVID-19-Risiken",
    fr: "Campagne de sensibilisation contre les risques de COVID-19",
    en: "Awareness Campaign Against COVID-19 Risks"
  },
  "برنامج أوراش": {
    de: "Awrach-Programm",
    fr: "Programme Awrach",
    en: "Awrach Program"
  },
  "رحلة استكشافية": {
    de: "Entdeckungsreise",
    fr: "Voyage d'exploration",
    en: "Exploratory Trip"
  },
  "أعمال الصيانة": {
    de: "Instandhaltungsarbeiten",
    fr: "Travaux d'entretien",
    en: "Maintenance Works"
  },
  "قافلة طبية متعددة الإختصاصات": {
    de: "Multidisziplinäre medizinische Karawane",
    fr: "Caravane médicale multidisciplinaire",
    en: "Multidisciplinary Medical Caravan"
  },
  "قافلة طبية متعددة الاختصاصات": {
    de: "Multidisziplinäre medizinische Karawane",
    fr: "Caravane médicale multidisciplinaire",
    en: "Multidisciplinary Medical Caravan"
  },
  "قافلة طبية تضامنية": {
    de: "Solidarische medizinische Karawane",
    fr: "Caravane médicale solidaire",
    en: "Solidarity Medical Caravan"
  },
  "قفة رمضان": {
    de: "Ramadan-Lebensmittelkörbe",
    fr: "Paniers alimentaires du Ramadan",
    en: "Ramadan Food Baskets"
  },
  "قافلة طبية متعددة الاختصاصات 2024": {
    de: "Multidisziplinäre medizinische Karawane 2024",
    fr: "Caravane médicale multidisciplinaire 2024", 
    en: "Multidisciplinary Medical Caravan 2024"
  },
  "قافلة تضامنية للحوز": {
    de: "Humanitärer Hilfskonvoi nach Al Haouz",
    fr: "Convoi d'aide humanitaire pour Al Haouz", 
    en: "Humanitarian Aid Convoy to Al Haouz"
  },
  "مباراة كرة قدم": {
    de: "Fußballspiel",
    fr: "Match de football",
    en: "Football Match"
  },
  "مسابقة تجويد القرآن الكريم": {
    de: "Quran-Rezitationswettbewerb",
    fr: "Concours de récitation du Coran",
    en: "Quran Recitation Competition"
  },
  "اغبالو اقورار": {
    de: "Aghbalou Akourar",
    fr: "Aghbalou Akourar",
    en: "Aghbalou Akourar"
  },
  "شاركت الجمعية إلى جانب مؤسسات أخرى في تنظيم ندوة دولية بمدينة فاس حول دلالات ورسائل إقرار الملك محمد السادس رأس السنة الأمازيغية عطلة رسمية.": {
    de: "Der Verein nahm zusammen mit anderen Institutionen an der Organisation einer internationalen Konferenz in Fes teil, die sich mit der Bedeutung und den Botschaften der Anerkennung des Amazigh-Neujahrs als offiziellen Feiertag durch König Mohammed VI. befasste.",
    fr: "L'association a participé, aux côtés d'autres institutions, à l'organisation d'un colloque international à Fès sur les significations et les messages de la reconnaissance par le Roi Mohammed VI du Nouvel An amazigh comme jour férié officiel.",
    en: "The association participated, alongside other institutions, in organizing an international conference in Fez on the significance and messages of King Mohammed VI's recognition of the Amazigh New Year as an official holiday."
  },
  "قافلة طبية نظمتها الجمعية بشراكة مع المندوبية الإقليمية للصحة وجمعيات أخرى، استفاد منها أكثر من 600 شخص.": {
    de: "Eine vom Verein in Partnerschaft mit der regionalen Gesundheitsdelegation und anderen Vereinen organisierte medizinische Karawane, von der mehr als 600 Menschen profitierten.",
    fr: "Une caravane médicale organisée par l'association en partenariat avec la délégation régionale de la santé et d'autres associations, dont ont bénéficié plus de 600 personnes.",
    en: "A medical caravan organized by the association in partnership with the regional health delegation and other associations, benefiting more than 600 people."
  },
  "حفل ديني بمناسبة اختتام الدورة الثانية لمسابقة تجويد القرآن الكريم، بحضور عدد من الشخصيات وتكريم الفائزين.": {
    de: "Eine religiöse Zeremonie anlässlich des Abschlusses des zweiten Koran-Rezitationswettbewerbs, an der eine Reihe von Persönlichkeiten teilnahmen und bei der die Gewinner geehrt wurden.",
    fr: "Une cérémonie religieuse à l'occasion de la clôture de la deuxième édition du concours de récitation du Coran, en présence de plusieurs personnalités et en honorant les gagnants.",
    en: "A religious ceremony on the occasion of the closing of the second Quran recitation competition, attended by a number of personalities and honoring the winners."
  },
  "احتفاء باليوم العالمي للمرأة الذي يصادف 8  مارس من كل سنة،  واعترافا بالمجهودات الجبارة للمرأة، نظمت جمعية أمل ايت سادن للتنمية المستدامة بشراكة مع جمعية جيبر للتنمية القروية و البيئة و بتنسيق مع جماعة رأس تبودة ، يوما تواصليا  تحت عنون \"المرأة السادنية والعمل الجمعوي\". كما تم تكريم مجموعة من النساء المتميزات في المجال  العمل الجمعوي، الرياضي والتعليمي": {
    de: "Anlässlich des Internationalen Frauentags am 8. März und in Anerkennung der großen Anstrengungen der Frauen organisierte der Verein Amal Ait Sadden für nachhaltige Entwicklung in Zusammenarbeit mit dem Jaber-Verein für ländliche Entwicklung und Umwelt und in Koordination mit der Gemeinde Ras Tabouda einen Kommunikationstag unter dem Titel \"Die Sadden-Frau und die Vereinsarbeit\". Mehrere herausragende Frauen wurden in den Bereichen Vereinsarbeit, Sport und Bildung geehrt.",
    fr: "À l'occasion de la Journée internationale de la femme, qui correspond au 8 mars de chaque année, et en reconnaissance des efforts considérables des femmes, l'Association Amal Ait Sadden pour le développement durable, en partenariat avec l'Association Jaber pour le développement rural et l'environnement et en coordination avec la commune de Ras Tabouda, a organisé une journée de communication sous le titre \"La femme Sadden et le travail associatif\". Un groupe de femmes exceptionnelles dans le domaine du travail associatif, sportif et éducatif a été honoré.",
    en: "In celebration of International Women's Day, which falls on March 8th each year, and in recognition of the tremendous efforts of women, the Amal Ait Sadden Association for Sustainable Development, in partnership with the Jaber Association for Rural Development and Environment and in coordination with the Ras Tabouda commune, organized a communication day under the title \"The Sadden Woman and Associative Work\". A group of outstanding women in the field of associative work, sports, and education were honored."
  },
  "نشاط تحسيسي بالتنسيق مع الهلال الأخضر لتوعية السكان حول الوقاية من فيروس كورونا وتوزيع الكمامات.": {
    de: "Eine Sensibilisierungsaktivität in Koordination mit dem Grünen Halbmond, um die Bevölkerung über die Prävention des Coronavirus aufzuklären und Masken zu verteilen.",
    fr: "Une activité de sensibilisation en coordination avec le Croissant Vert pour sensibiliser la population à la prévention du coronavirus et distribuer des masques.",
    en: "An awareness activity in coordination with the Green Crescent to educate the population about coronavirus prevention and distribute masks."
  },
  "Palais Médina & SPA, Fès": {
    de: "Palais Médina & SPA, Fes",
    fr: "Palais Médina & SPA, Fès",
    en: "Palais Médina & SPA, Fez"
  },
  "دوار أيت كايس، كندر سيدي خيار": {
    de: "Duar Ait Kais, Kander Sidi Khiar",
    fr: "Douar Ait Kais, Kandar Sidi Khiar",
    en: "Douar Ait Kais, Kandar Sidi Khiar"
  },
  "رأس تبودة": {
    de: "Ras Tabouda",
    fr: "Ras Tabouda",
    en: "Ras Tabouda" 
  },
  "رأس تبودة، سوق أسبوعي": {
    de: "Ras Tabouda, Wochenmarkt",
    fr: "Ras Tabouda, marché hebdomadaire",
    en: "Ras Tabouda, weekly market"
  },
  "رأس تبودة، صفرو": {
    de: "Ras Tabouda, Sefrou",
    fr: "Ras Tabouda, Sefrou",
    en: "Ras Tabouda, Sefrou"
  },
  "مستشفى رأس تبودة، صفرو": {
    de: "Krankenhaus Ras Tabouda, Sefrou",
    fr: "Hôpital Ras Tabouda, Sefrou",
    en: "Ras Tabouda Hospital, Sefrou"
  },
  "ثانوية طارق بن زياد، رأس تبودة، صفرو": {
    de: "Tarik Ibn Ziad Gymnasium, Ras Tabouda, Sefrou",
    fr: "Lycée Tarik Ibn Ziad, Ras Tabouda, Sefrou",
    en: "Tarik Ibn Ziad High School, Ras Tabouda, Sefrou"
  },
  "دوار آيت ابراهيم، سيدي يوسف بن احمد": {
    de: "Douar Ait Ibrahim, Sidi Youssef Ben Ahmed",
    fr: "Douar Ait Ibrahim, Sidi Youssef Ben Ahmed",
    en: "Douar Ait Ibrahim, Sidi Youssef Ben Ahmed"
  },
  "دواوير كندر، جماعة كندر سيدي خيار": {
    de: "Douars von Kandar, Gemeinde Kandar Sidi Khiar",
    fr: "Douars de Kandar, commune de Kandar Sidi Khiar",
    en: "Douars of Kandar, Kandar Sidi Khiar commune"
  },
  "دوار ايت كايس جماعة كندر سيدي خيار": {
    de: "Douar Ait Kais, Gemeinde Kandar Sidi Khiar",
    fr: "Douar Ait Kais, commune de Kandar Sidi Khiar",
    en: "Douar Ait Kais, Kandar Sidi Khiar commune"
  },
  "باشوية أمزميز، الحوز": {
    de: "Amizmiz, Al Haouz",
    fr: "Amizmiz, Al Haouz",
    en: "Amizmiz, Al Haouz"
  },
  "رأس تبودة / بئر طم طم، صفرو": {
    de: "Ras Tabouda / Bir Tam Tam, Sefrou",
    fr: "Ras Tabouda / Bir Tam Tam, Sefrou",
    en: "Ras Tabouda / Bir Tam Tam, Sefrou"
  },
  "نظمت جمعية آمال آيت سادن للتنمية المستدامة يوم 20 يناير قافلة طبية متعددة الاختصاصات بجماعة كندر سيدي خيار بدواوير كندر بشراكة مع المندوبية الإقليمية للصحة وجمعية FEMSA و جمعية النور للتنمية البشرية. الشكر موصول لكل من ساهم في إنجاح هذا العمل الإنساني.": {
    de: "Am 20. Januar organisierte der Verein Amal Ait Sadden für nachhaltige Entwicklung eine multidisziplinäre medizinische Karawane in der Gemeinde Kandar Sidi Khiar in den Douars von Kandar in Zusammenarbeit mit der Provinzdelegation für Gesundheit, dem FEMSA-Verein und dem Al Noor-Verein für menschliche Entwicklung. Wir danken allen, die zum Erfolg dieser humanitären Arbeit beigetragen haben.",
    fr: "L'Association Amal Ait Sadden pour le développement durable a organisé le 20 janvier une caravane médicale multidisciplinaire dans la commune de Kandar Sidi Khiar dans les douars de Kandar en partenariat avec la Délégation Provinciale de la Santé, l'association FEMSA et l'Association Al Noor pour le développement humain. Nous remercions tous ceux qui ont contribué au succès de ce travail humanitaire.",
    en: "On January 20, the Amal Ait Sadden Association for Sustainable Development organized a multidisciplinary medical caravan in the Kandar Sidi Khiar commune in the douars of Kandar in partnership with the Provincial Health Delegation, FEMSA association, and Al Noor Association for Human Development. We thank everyone who contributed to the success of this humanitarian work."
  },
  "نظرا للظروف الاسثنائية التي تمر فيها امتحانات الباكالوريا هذه السنة قام أعضاء جمعية أمال آيت سادن للتنمية المستدامة بمبادرة تحفيزية لفائدة تلاميذ ثانوية طارق بن زياد و ذالك بتوزيع قنينة ماء و ياغورت و بسكويت كما تعتزم الجمعية القيام بعملية تعقيم لكل مرافق المؤسسة.": {
    de: "Angesichts der außergewöhnlichen Umstände der Abiturprüfungen in diesem Jahr haben die Mitglieder des Vereins Amal Ait Sadden für nachhaltige Entwicklung eine Motivationsinitiative für die Schüler der Tarik Ibn Ziad Schule gestartet, indem sie Wasserflaschen, Joghurt und Kekse verteilten. Der Verein plant auch, alle Schuleinrichtungen zu desinfizieren.",
    fr: "En raison des circonstances exceptionnelles des examens du baccalauréat cette année, les membres de l'Association Amal Ait Sadden pour le développement durable ont lancé une initiative motivante pour les élèves du lycée Tarik Ibn Ziad en distribuant des bouteilles d'eau, des yaourts et des biscuits. L'association prévoit également de désinfecter toutes les installations de l'établissement.",
    en: "Due to the exceptional circumstances of the baccalaureate exams this year, members of the Amal Ait Sadden Association for Sustainable Development launched a motivational initiative for students of Tarik Ibn Ziad High School by distributing bottles of water, yogurt, and biscuits. The association also plans to disinfect all school facilities."
  },
  "نظمت جمعية آمال آيت سادن للتنمية المستدامة يومه الإثنين 07 شتنبر 2020 نشاط تحسيسي توعوي ضد مخاطر كوفيد 19 . بالتنسيق مع الهلال الأخضر و جماعة رأس تبودة و بحضور السلطات المحلية ممثلة في السيد قائد رأس تبودة . حيت تم توزيع الكمامات على المواطنين من داخل السوق الأسبوعي و المقاهي و الثانوية التأهيلية طارق بن زياد و توعيتهم بمخاطر كورونا و الإجراءات الازم اتخادها لتفادي الإصابة و انتشار الفيروس .": {
    de: "Am Montag, den 7. September 2020, organisierte der Verein Amal Ait Sadden für nachhaltige Entwicklung eine Sensibilisierungsaktion zu den Risiken von COVID-19. Die Aktion wurde in Zusammenarbeit mit dem Grünen Halbmond und der Gemeinde Ras Tabouda und in Anwesenheit der lokalen Behörden, vertreten durch den Leiter von Ras Tabouda, durchgeführt. Es wurden Masken an die Bürger auf dem Wochenmarkt, in Cafés und in der Tarik Ibn Ziad Oberschule verteilt, und sie wurden über die Risiken von Corona und die notwendigen Maßnahmen zur Vermeidung von Infektionen und der Ausbreitung des Virus aufgeklärt.",
    fr: "Le lundi 7 septembre 2020, l'Association Amal Ait Sadden pour le développement durable a organisé une activité de sensibilisation contre les risques de COVID-19. L'activité a été coordonnée avec le Croissant Vert et la commune de Ras Tabouda, et en présence des autorités locales représentées par le Caïd de Ras Tabouda. Des masques ont été distribués aux citoyens dans le marché hebdomadaire, les cafés et le lycée Tarik Ibn Ziad, et ils ont été sensibilisés aux risques du coronavirus et aux mesures nécessaires à prendre pour éviter l'infection et la propagation du virus.",
    en: "On Monday, September 7, 2020, the Amal Ait Sadden Association for Sustainable Development organized an awareness activity against the risks of COVID-19. The activity was coordinated with the Green Crescent and the Ras Tabouda commune, and in the presence of local authorities represented by the Caid of Ras Tabouda. Masks were distributed to citizens in the weekly market, cafes, and Tarik Ibn Ziad High School, and they were educated about the risks of coronavirus and the necessary measures to take to avoid infection and virus spread."
  },
  "استمرار العمل الميداني لبرنامج أوراش بجماعة رأس تبودة في تهيئة ملعب كرة القدم واضفاء جمالية جديدة داخل مركز رأس تبودة وهذه بعض الصور في انتظار اتمام الورش بقيادة جمعية آمال ايت سادن للتنمية المستدامة إلى جانب جماعة رأس تبودة الشكر والتقدير للمجلس لانخراطه الفعال في هذا الورش": {
    de: "Die Feldarbeit des Awrach-Programms in der Gemeinde Ras Tabouda wird fortgesetzt, um den Fußballplatz zu sanieren und dem Zentrum von Ras Tabouda eine neue ästhetische Note zu verleihen. Dies sind einige Bilder in Erwartung der Fertigstellung des Workshops unter der Leitung des Vereins Amal Ait Sadden für nachhaltige Entwicklung zusammen mit der Gemeinde Ras Tabouda. Dank und Anerkennung an den Rat für sein aktives Engagement in diesem Workshop.",
    fr: "Poursuite du travail de terrain du programme Awrach dans la commune de Ras Tabouda pour réhabiliter le terrain de football et donner une nouvelle esthétique au centre de Ras Tabouda. Voici quelques photos en attendant l'achèvement du chantier dirigé par l'Association Amal Ait Sadden pour le développement durable ainsi que la commune de Ras Tabouda. Remerciements et appréciation au conseil pour son engagement actif dans ce chantier.",
    en: "The fieldwork of the Awrach program in the Ras Tabouda commune continues to rehabilitate the football field and give new aesthetics to the Ras Tabouda center. These are some pictures awaiting the completion of the workshop led by the Amal Ait Sadden Association for Sustainable Development along with the Ras Tabouda commune. Thanks and appreciation to the council for its active involvement in this workshop."
  },
  "في يومه الأربعاء قام مكتب الاشغال والصيانة بأعمال روتينية بشراكة مع جمعية آمال ايت سادن للتنمية المستدامة وتحت اشراف السيد القائد والسيد رئيس المجلس الجماعي و بمساعدة برنامج اوراش : تمت صباغة حواف الرصيف واصلاح بعض المصابيح العمومية في ما تمت برمجة عمل يوم غد الخميس بجمع النفايات الصلبة ومخلفات البناء وكذالك تتمت صباغة حواف الرصيف بالمركز في ما ستقوم خلية الانارة العمومية بإصلاح وتركيب مصابيح جديد من نوع ليد بدوار ايت جابر": {
    de: "Am Mittwoch führte das Arbeits- und Wartungsbüro in Zusammenarbeit mit dem Verein Amal Ait Sadden für nachhaltige Entwicklung und unter der Aufsicht des Gemeindevorstehers und des Präsidenten des Gemeinderats mit Unterstützung des Awrach-Programms Routinearbeiten durch: Die Bordsteinkanten wurden gestrichen und einige öffentliche Lampen repariert. Für Donnerstag ist die Sammlung von Feststoffabfällen und Bauabfällen geplant, die Bordsteinkanten im Zentrum wurden gestrichen, und die öffentliche Beleuchtungsabteilung wird neue LED-Lampen im Dorf Ait Jaber reparieren und installieren.",
    fr: "Mercredi, le bureau des travaux et de l'entretien a effectué des travaux de routine en partenariat avec l'Association Amal Ait Sadden pour le développement durable et sous la supervision du Caïd et du Président du conseil communal, avec l'aide du programme Awrach : les bords des trottoirs ont été peints et certaines lampes publiques ont été réparées. Le travail de jeudi est programmé pour collecter les déchets solides et les débris de construction, les bords des trottoirs du centre ont été peints, et l'unité d'éclairage public réparera et installera de nouvelles lampes LED dans le village d'Ait Jaber.",
    en: "On Wednesday, the Works and Maintenance office carried out routine work in partnership with the Amal Ait Sadden Association for Sustainable Development and under the supervision of the Caid and the President of the Communal Council, with the assistance of the Awrach program: The curb edges were painted and some public lamps were repaired. Thursday's work is scheduled for collecting solid waste and construction debris, the curb edges in the center were painted, and the public lighting unit will repair and install new LED lamps in the village of Ait Jaber."
  },
  "نظمت جمعية امال ايت سادن للتنمية المستدامة وجمعية جيبر للتنمية القروية والبيئية بشراكة مع جماعة رأس تبودة وبشراكة مع المندوبية الإقليمية للصحة بصفرو ونادي روطارك كلية الطب فاس ونادي FEMSA قافلة طبية متعددة الإختصاصات التي استافدت منها أزيد من 800 مستفيد كل الشكر والتقدير للسيد قائد قيادة رأس تبودة وأعوان السلطة والقواة المساعدة والدرك الملكي ورئيس جماعة بئر طم طم الذي قدم يد المساعدة وموظفي جماعة رأس تبودة الذين ساهموا بشكل كبير لإنجاح هذه القافلة": {
    de: "Der Verein Amal Ait Sadden für nachhaltige Entwicklung und der Verein Jaber für ländliche Entwicklung und Umwelt organisierten in Zusammenarbeit mit der Gemeinde Ras Tabouda und in Partnerschaft mit der regionalen Gesundheitsdelegation von Sefrou, dem Rotaract Club der medizinischen Fakultät Fes und dem FEMSA Club eine multidisziplinäre medizinische Karawane, von der mehr als 800 Menschen profitierten. Vielen Dank an den Leiter der Führung von Ras Tabouda, die Behördenvertreter, die Hilfsstreitkräfte, die Königliche Gendarmerie und den Vorsitzenden der Gemeinde Bir Tam Tam, der Hilfe leistete, sowie an die Mitarbeiter der Gemeinde Ras Tabouda, die wesentlich zum Erfolg dieser Karawane beigetragen haben.",
    fr: "L'Association Amal Ait Sadden pour le développement durable et l'Association Jaber pour le développement rural et environnemental, en partenariat avec la commune de Ras Tabouda et en partenariat avec la délégation provinciale de la santé de Sefrou, le club Rotaract de la faculté de médecine de Fès et le club FEMSA, ont organisé une caravane médicale multidisciplinaire qui a bénéficié à plus de 800 personnes. Tous les remerciements et l'appréciation au Caïd du commandement de Ras Tabouda, aux agents d'autorité, aux forces auxiliaires, à la Gendarmerie Royale et au président de la commune de Bir Tam Tam qui a prêté main-forte, ainsi qu'aux fonctionnaires de la commune de Ras Tabouda qui ont grandement contribué au succès de cette caravane.",
    en: "The Amal Ait Sadden Association for Sustainable Development and the Jaber Association for Rural and Environmental Development, in partnership with the Ras Tabouda commune and in partnership with the Provincial Health Delegation of Sefrou, the Rotaract Club of the Faculty of Medicine of Fez, and the FEMSA Club, organized a multidisciplinary medical caravan that benefited more than 800 people. Many thanks to the Caid of the Ras Tabouda command, the authority agents, the auxiliary forces, the Royal Gendarmerie, and the president of the Bir Tam Tam commune who provided assistance, as well as to the employees of the Ras Tabouda commune who greatly contributed to the success of this caravan."
  },
  "تنظم جمعية امال ايت سادن للتنمية المستدامة بشراكة مع جمعية femsa وباقي شركائها المندوبية الإقليمية للصحة بصفرو، DHL ومؤسسة سيدي عبد الرحمن الودغيري قافلة طبية تضامنية يوم 11  مارس 2023 ،بدوار آيت ابراهيم جماعة سيدي يوسف بن احمد": {
    de: "Der Verein Amal Ait Sadden für nachhaltige Entwicklung organisiert in Partnerschaft mit dem FEMSA-Verein und seinen anderen Partnern, der Provinzdelegation für Gesundheit in Sefrou, DHL und der Stiftung Sidi Abderrahman Al Oudghiri, am 11. März 2023 eine solidarische medizinische Karawane im Dorf Ait Ibrahim in der Gemeinde Sidi Youssef Ben Ahmed.",
    fr: "L'Association Amal Ait Sadden pour le développement durable organise, en partenariat avec l'association FEMSA et ses autres partenaires, la délégation provinciale de la santé de Sefrou, DHL et la Fondation Sidi Abderrahman Al Oudghiri, une caravane médicale solidaire le 11 mars 2023 au douar Ait Ibrahim, commune de Sidi Youssef Ben Ahmed.",
    en: "The Amal Ait Sadden Association for Sustainable Development, in partnership with the FEMSA association and its other partners, the Provincial Health Delegation of Sefrou, DHL, and the Sidi Abderrahman Al Oudghiri Foundation, is organizing a solidarity medical caravan on March 11, 2023, in the village of Ait Ibrahim in the commune of Sidi Youssef Ben Ahmed."
  },
  "نتقدم بخالص الشكر والتقدير لكل من ساهم في القافلة التضامنية التي انطلقت من قبيلة أيت سادن الى الحوز وحطت الرحال بباشوية أمزميز الشكر الخالص لجمعية اسيف للتنمية المستدامة وجمعية التضامن بئر طم طم للتعاون والتعاونية السادنية و جمعية امال أيت أيت سادن على انخراطهم الفعال والفعلي في انجاح هذه القافلة التضامنية، كما نتقدم بخالص الشكر والامتنان ونرفع القبعة احتراما وتقديرا لأبناء قبيلة أيت سادن والجالية المقيمة بالخارج على مساهمتهم لانجاح هذه القافلة وأخيرا وليس أخيراً تحية وتقدير لجنود الخفاء.": {
    de: "Wir danken herzlich allen, die zum humanitären Hilfskonvoi beigetragen haben, der vom Ait Sadden-Stamm nach Al Haouz aufbrach und in der Amizmiz-Gemeinde ankam. Besonderer Dank gilt dem Verein Asif für nachhaltige Entwicklung, dem Solidaritätsverein Bir Tam Tam, der Sadden-Kooperative und dem Verein Amal Ait Sadden für ihr aktives und effektives Engagement beim Erfolg dieses Solidaritätskonvois. Wir drücken auch unseren aufrichtigen Dank und unsere Anerkennung aus und ziehen den Hut vor den Mitgliedern des Ait Sadden-Stammes und der im Ausland lebenden Gemeinschaft für ihren Beitrag zum Erfolg dieses Konvois. Schließlich grüßen und würdigen wir die stillen Helfer im Hintergrund.",
    fr: "Nous exprimons nos sincères remerciements et notre gratitude à tous ceux qui ont contribué au convoi humanitaire parti de la tribu d'Ait Sadden vers Al Haouz et arrivé à la commune d'Amizmiz. Sincères remerciements à l'Association Asif pour le développement durable, à l'Association de solidarité Bir Tam Tam, à la Coopérative Sadden et à l'Association Amal Ait Sadden pour leur engagement actif et effectif dans la réussite de ce convoi de solidarité. Nous exprimons également nos sincères remerciements et notre gratitude, et nous tirons notre chapeau avec respect et appréciation aux membres de la tribu d'Ait Sadden et à la communauté résidant à l'étranger pour leur contribution à la réussite de ce convoi. Enfin et surtout, saluons et apprécions les soldats de l'ombre.",
    en: "We extend our sincere thanks and appreciation to everyone who contributed to the humanitarian convoy that set out from the Ait Sadden tribe to Al Haouz and arrived at the Amizmiz commune. Sincere thanks to the Asif Association for Sustainable Development, the Bir Tam Tam Solidarity Association, the Sadden Cooperative, and the Amal Ait Sadden Association for their active and effective involvement in the success of this solidarity convoy. We also express our sincere thanks and gratitude, and we tip our hats with respect and appreciation to the members of the Ait Sadden tribe and the community residing abroad for their contribution to the success of this convoy. Last but not least, salute and appreciation to the behind-the-scenes workers."
  },
  "بمناسبة عيد الشباب نظمت جمعية آمال آيت سادن للتنمية المستدامة مقابلة ودية بين شباب جماعة كندر سيدي خيار و شباب قبيلة ايت سادن تحت شعار \"الرياضة قاطرة للتنمية الجهوية\" يوم الجمعة 18 غشت 2023 بملعب كرة القدم بجماعة رأس تبودة.": {
    de: "Anlässlich des Jugendtages organisierte der Verein Amal Ait Sadden für nachhaltige Entwicklung ein Freundschaftsspiel zwischen den Jugendlichen der Gemeinde Kandar Sidi Khiar und den Jugendlichen des Ait Sadden-Stammes unter dem Motto \"Sport als Lokomotive für regionale Entwicklung\" am Freitag, den 18. August 2023, auf dem Fußballplatz der Gemeinde Ras Tabouda.",
    fr: "À l'occasion de la Fête de la Jeunesse, l'Association Amal Ait Sadden pour le développement durable a organisé un match amical entre les jeunes de la commune de Kandar Sidi Khiar et les jeunes de la tribu Ait Sadden sous le slogan \"Le sport comme locomotive du développement régional\" le vendredi 18 août 2023 au terrain de football de la commune de Ras Tabouda.",
    en: "On the occasion of Youth Day, the Amal Ait Sadden Association for Sustainable Development organized a friendly match between the youth of Kandar Sidi Khiar commune and the youth of the Ait Sadden tribe under the slogan \"Sport as a locomotive for regional development\" on Friday, August 18, 2023, at the football field in Ras Tabouda commune."
  },
  "بتاريخ 21 ماي 2023 نظمت جمعية امال ايت سادن قافلة طبية متعددة الاختصاصات بدوار ايت كايس جماعة كندر سيدي خيار،بشراكة مع المندوبية الإقليمية للصحة والحماية الاجتماعية والعصبة المغربية لمحاربة داء السل وجمعية أفوس.واستفاد من هذه القافلة أزيد من 600 مستفيد. الشكر موصول للسيد المندوب الإقليمي للصحة بإقليم صفرو على مواكبته والسلطات المحلية التي حرصت على تنظيم وتأطير الساكنة،ولكل من حضر هذه المساهمة في هذه المبادرة الإنسانية والاجتماعية.": {
    de: "Am 21. Mai 2023 organisierte der Verein Amal Ait Sadden eine multi-spezialisierte medizinische Karawane im Dorf Ait Kais in der Gemeinde Kandar Sidi Khiar, in Partnerschaft mit der Provinzdelegation für Gesundheit und Sozialschutz, der Marokkanischen Liga zur Bekämpfung der Tuberkulose und dem Verein Afous. Mehr als 600 Menschen profitierten von dieser Karawane. Unser Dank gilt dem Provinzbeauftragten für Gesundheit in der Provinz Sefrou für seine Unterstützung und den lokalen Behörden, die für die Organisation und Betreuung der Einwohner gesorgt haben, sowie allen, die zu dieser humanitären und sozialen Initiative beigetragen haben.",
    fr: "Le 21 mai 2023, l'Association Amal Ait Sadden a organisé une caravane médicale multi-spécialités dans le village d'Ait Kais, commune de Kandar Sidi Khiar, en partenariat avec la délégation provinciale de la santé et de la protection sociale, la Ligue marocaine de lutte contre la tuberculose et l'Association Afous. Plus de 600 personnes ont bénéficié de cette caravane. Nos remerciements au délégué provincial de la santé de la province de Sefrou pour son accompagnement, aux autorités locales qui ont veillé à l'organisation et à l'encadrement des habitants, et à tous ceux qui ont contribué à cette initiative humanitaire et sociale.",
    en: "On May 21, 2023, the Amal Ait Sadden Association organized a multi-specialty medical caravan in the village of Ait Kais, Kandar Sidi Khiar commune, in partnership with the Provincial Delegation of Health and Social Protection, the Moroccan League for Tuberculosis Control, and the Afous Association. More than 600 people benefited from this caravan. Our thanks go to the Provincial Delegate of Health in Sefrou Province for his support and to the local authorities who ensured the organization and supervision of the residents, and to everyone who participated in this humanitarian and social initiative."
  },
  "نظمت جمعية آمال آيت سادن حفلا دينيا بمناسبة اختتام الدورة الثانية لمسابقة تجويد القرآن الكريم والتي عرفت نجاحا كبيرا. عرف الحفل تتويج الفائزين بالمسابقة وكذلك المشاركين بحضور السيد عبد العالي دمري والسيد عبد الله برحو ممثلي غرفة الفلاحة.والسيدة فتيحة رواق ممثلة جماعة رأس تبودة،والسيدة نادية حصيطو ممثلة المجلس الإقليمي بالإضافة إلى فعاليات جمعوية. كما تتقدم جمعية آمال آيت سادن للتنمية المستدامة بالشكر الجزيل لجمعية آيت سادن للرياضة في شخص رئيسها السيد محمد حساني. هنيئا للفائزين والمشاركين وبالتوفيق في مسارهم العلمي والديني.": {
    de: "Der Verein Amal Ait Sadden organisierte eine religiöse Feier zum Abschluss der zweiten Ausgabe des Quran-Rezitationswettbewerbs, der ein großer Erfolg war. Bei der Veranstaltung wurden die Gewinner des Wettbewerbs sowie die Teilnehmer in Anwesenheit von Herrn Abdelali Damri und Herrn Abdullah Barhou, Vertretern der Landwirtschaftskammer, Frau Fatiha Rawaq, Vertreterin der Gemeinde Ras Tabouda, und Frau Nadia Haseito, Vertreterin des Provinzrats, sowie weiterer Vereinsmitglieder geehrt. Der Verein Amal Ait Sadden für nachhaltige Entwicklung dankt dem Verein Ait Sadden für Sport in Person seines Präsidenten, Herrn Mohammed Hassani. Herzlichen Glückwunsch an die Gewinner und Teilnehmer und viel Erfolg auf ihrem wissenschaftlichen und religiösen Weg.",
    fr: "L'Association Amal Ait Sadden a organisé une cérémonie religieuse à l'occasion de la clôture de la deuxième édition du concours de récitation du Coran, qui a connu un grand succès. La cérémonie a vu le couronnement des gagnants du concours ainsi que des participants en présence de M. Abdelali Damri et M. Abdullah Barhou, représentants de la Chambre d'Agriculture, Mme Fatiha Rawaq, représentante de la commune de Ras Tabouda, et Mme Nadia Haseito, représentante du Conseil provincial, ainsi que d'autres acteurs associatifs. L'Association Amal Ait Sadden pour le développement durable remercie également l'Association Ait Sadden pour le sport en la personne de son président, M. Mohammed Hassani. Félicitations aux gagnants et aux participants et bonne chance dans leur parcours scientifique et religieux.",
    en: "The Amal Ait Sadden Association organized a religious ceremony on the occasion of the closing of the second edition of the Quran recitation competition, which was a great success. The ceremony saw the honoring of the winners of the competition as well as the participants in the presence of Mr. Abdelali Damri and Mr. Abdullah Barhou, representatives of the Chamber of Agriculture, Mrs. Fatiha Rawaq, representative of the Ras Tabouda commune, and Mrs. Nadia Haseito, representative of the Provincial Council, as well as other association members. The Amal Ait Sadden Association for Sustainable Development also extends its sincere thanks to the Ait Sadden Association for Sport in the person of its president, Mr. Mohammed Hassani. Congratulations to the winners and participants and good luck in their scientific and religious journey."
  },
  "يسرّنا في جمعية آمال أيت سادن للتنمية المستدامة أن نشارككم إنجازاً رائعاً وملهماً نعتزّ به. تحت شعار الوحدة والتكافل الاجتماعي، قدمنا قفة رمضانية مباركة لـ 120 عائلة مستحقة في هذا الشهر الفضيل. تعزز هذه المبادرة النبيلة روح التآزر والتعايش بين أفراد المجتمع. إنها تجسيد حقيقي لمفهوم الأخوة والتعاضد الذي ينبغي أن يكون سائداً في هذه الأيام الطيبة. نتقدم بجزيل الشكر والتقدير لكل من ساهم ودعم هذه المبادرة الإنسانية العظيمة، فهذا النجاح لا يُعدّ فقط نجاحاً لجمعيتنا، بل هو نجاح مشترك لكل من تعاون وتكاتف من أجل تحقيق الهدف الأسمى والتغيير الإيجابي. نسأل الله تعالى أن يتقبل منا ومنكم صالح الأعمال وأن يعيد علينا رمضانات عديدة مليئة بالخير والبركة.": {
    de: "In der Amal Ait Sadden Association for Sustainable Development freuen wir uns, mit Ihnen eine wunderbare und inspirierende Leistung zu teilen, auf die wir stolz sind. Unter dem Motto Einheit und soziale Solidarität haben wir in diesem gesegneten Monat 120 bedürftigen Familien einen gesegneten Ramadan-Korb überreicht. Diese edle Initiative fördert den Geist der Solidarität und des Zusammenlebens unter den Mitgliedern der Gesellschaft. Sie ist eine wahre Verkörperung des Konzepts der Brüderlichkeit und der gegenseitigen Unterstützung, die in diesen guten Tagen vorherrschen sollte. Wir möchten allen, die zu dieser großartigen humanitären Initiative beigetragen und sie unterstützt haben, herzlich danken, denn dieser Erfolg ist nicht nur ein Erfolg für unseren Verein, sondern ein gemeinsamer Erfolg für alle, die zusammengearbeitet haben, um das höchste Ziel und einen positiven Wandel zu erreichen. Wir bitten Gott, unsere und Ihre guten Taten anzunehmen und uns viele weitere Ramadan-Monate voller Güte und Segen zu schenken.",
    fr: "À l'Association Amal Aït Sadden pour le développement durable, nous sommes ravis de partager avec vous une réalisation merveilleuse et inspirante dont nous sommes fiers. Sous le slogan de l'unité et de la solidarité sociale, nous avons offert un panier du Ramadan béni à 120 familles nécessiteuses en ce mois béni. Cette noble initiative renforce l'esprit de solidarité et de coexistence entre les membres de la société. C'est une véritable incarnation du concept de fraternité et de soutien mutuel qui devrait prévaloir en ces jours heureux. Nous exprimons nos sincères remerciements et notre gratitude à tous ceux qui ont contribué et soutenu cette grande initiative humanitaire, car ce succès n'est pas seulement un succès pour notre association, mais un succès commun pour tous ceux qui ont coopéré et collaboré pour atteindre l'objectif suprême et un changement positif. Nous demandons à Dieu d'accepter nos bonnes actions et de nous ramener de nombreux mois de Ramadan pleins de bonté et de bénédiction.",
    en: "At the Amal Ait Sadden Association for Sustainable Development, we are delighted to share with you a wonderful and inspiring achievement that we are proud of. Under the slogan of unity and social solidarity, we presented a blessed Ramadan basket to 120 deserving families in this blessed month. This noble initiative enhances the spirit of solidarity and coexistence among members of society. It is a true embodiment of the concept of brotherhood and mutual support that should prevail in these good days. We extend our sincere thanks and appreciation to everyone who contributed to and supported this great humanitarian initiative, for this success is not only a success for our association, but a shared success for everyone who cooperated and worked together to achieve the highest goal and positive change. We ask God to accept our and your good deeds and to bring us many more Ramadan months full of goodness and blessing."
  },
  "تنزيلا لبرنامجها التنموي لجميعة آمال ايت سادن للتنمية المستدامة بشراكة مع جمعية خبراء متطوعون من اجل التنمية و جمعية جيبر و جمعية النور أيت جابر وبتنسيق مع جماعة رأس تبودة نظمت اليوم رحلة استكشافية لكل من عين السخونات وعين الوالي التابعة لجماعة اغبالو اقورار و كان هدف هذه الرحلة هو الوقوف على المسار الرابط بين هذه المنابع الغنية بالمياه الصالحة للشرب وبطبيعتها الخلابة من اجل خلق منتجعات في هذه المناطق لتشجيع السياحة الداخلية و المحلية": {
    de: "Im Rahmen ihres Entwicklungsprogramms organisierte der Verein Amal Ait Sadden für nachhaltige Entwicklung in Zusammenarbeit mit dem Verein der freiwilligen Experten für Entwicklung, dem Jaber-Verein und dem Nour Ait Jaber-Verein und in Koordination mit der Gemeinde Ras Tabouda heute eine Erkundungsreise zu den Quellen Ain Sakhounat und Ain Al Wali, die zur Gemeinde Aghbalou Akourar gehören. Das Ziel dieser Reise war es, den Weg zwischen diesen an Trinkwasser reichen Quellen mit ihrer atemberaubenden Natur zu erkunden, um in diesen Gebieten Resorts zu schaffen und den inländischen und lokalen Tourismus zu fördern.",
    fr: "Dans le cadre de son programme de développement, l'Association Amal Ait Sadden pour le développement durable, en partenariat avec l'Association des experts volontaires pour le développement, l'Association Jaber et l'Association Nour Ait Jaber, et en coordination avec la commune de Ras Tabouda, a organisé aujourd'hui un voyage d'exploration aux sources Ain Sakhounat et Ain Al Wali, qui appartiennent à la commune d'Aghbalou Akourar. L'objectif de ce voyage était d'explorer le chemin entre ces sources riches en eau potable avec leur nature époustouflante, afin de créer des centres touristiques dans ces zones et encourager le tourisme intérieur et local.",
    en: "As part of its development program, the Amal Ait Sadden Association for Sustainable Development, in partnership with the Association of Volunteer Experts for Development, the Jaber Association, and the Nour Ait Jaber Association, and in coordination with the Ras Tabouda commune, organized today an exploratory trip to the Ain Sakhounat and Ain Al Wali springs, which belong to the Aghbalou Akourar commune. The aim of this trip was to explore the path between these drinking water-rich springs with their breathtaking nature, in order to create resorts in these areas and encourage domestic and local tourism."
  }
};

// Function to format date based on locale
export const formatDate = (dateString: string, localeString: string) => {
  const date = parseISO(dateString);
  const localeMap: Record<string, Locale> = {
    de: de,
    fr: fr,
    en: enUS,
    ar: ar
  };
  
  // For Arabic, use a custom format that properly respects RTL
  if (localeString === 'ar') {
    // Get the day, month and year separately
    const day = format(date, 'd', { locale: ar });
    const month = format(date, 'MMMM', { locale: ar });
    const year = format(date, 'yyyy', { locale: ar });
    
    // Combine in RTL-friendly format
    return `${day} ${month} ${year}`;
  }
  
  // For other languages, use the standard format
  return format(date, 'PPP', { locale: localeMap[localeString] });
};

// Function to get translated value or use Arabic default
const getTranslatedValue = (arabicValue: string, language: 'de' | 'fr' | 'en'): string => {
  if (translations[arabicValue]) {
    return translations[arabicValue][language];
  }
  // Return original value if no translation exists
  return arabicValue;
};

// Process the events data to add translations and format for our component

export const getProcessedEvents = (): ProcessedEvent[] => {
  // First map the events to include translations
  const processedEvents = eventsData.map((event: RealEvent, index: number) => {
    // Extract year from the date
    const year = new Date(event.date).getFullYear();
    
    // Create a unique ID for the event
    const id = `event-${year}-${index}`;
    
    return {
      id,
      date: event.date,
      year,
      title: {
        ar: event.title,
        de: getTranslatedValue(event.title, 'de'),
        fr: getTranslatedValue(event.title, 'fr'),
        en: getTranslatedValue(event.title, 'en')
      },
      location: {
        ar: event.location,
        de: getTranslatedValue(event.location, 'de'),
        fr: getTranslatedValue(event.location, 'fr'),
        en: getTranslatedValue(event.location, 'en')
      },
      description: {
        ar: event.description,
        de: getTranslatedValue(event.description, 'de'),
        fr: getTranslatedValue(event.description, 'fr'),
        en: getTranslatedValue(event.description, 'en')
      },
      // Prepend './' to paths to ensure they work on GitHub Pages
      mainImage: event.main_photo_url.startsWith('./') ? event.main_photo_url : `.${event.main_photo_url}`,
      gallery: event.gallery.map(path => path.startsWith('./') ? path : `.${path}`)
    };
  });
  
  // Then sort the events by date, most recent first
  return processedEvents.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};