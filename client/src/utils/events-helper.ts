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
  "يوم تواصلي احتفاءً بالمرأة في آيت سادن وتكريم نساء متميزات في مجالات مختلفة.": {
    de: "Ein Kommunikationstag zur Feier der Frauen in Ait Sadden und zur Ehrung herausragender Frauen in verschiedenen Bereichen.",
    fr: "Une journée de communication célébrant les femmes d'Ait Sadden et honorant des femmes exceptionnelles dans divers domaines.",
    en: "A communication day celebrating women in Ait Sadden and honoring outstanding women in various fields."
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
  "ثانوية طارق بن زياد، راس تابودة، صفرو": {
    de: "Tarik Ibn Ziad Gymnasium, Ras Tabouda, Sefrou",
    fr: "Lycée Tarik Ibn Ziad, Ras Tabouda, Sefrou",
    en: "Tarik Ibn Ziad High School, Ras Tabouda, Sefrou"
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
  return eventsData.map((event: RealEvent, index: number) => {
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
      mainImage: event.main_photo_url,
      gallery: event.gallery
    };
  });
};