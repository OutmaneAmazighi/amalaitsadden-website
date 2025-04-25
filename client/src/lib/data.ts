// This file contains all the placeholder data for the website

interface LocalizedText {
  de: string;
  fr: string;
  ar: string;
  en: string;
}

export interface Activity {
  id: string;
  year: number;
  title: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  mainImage: string;
  gallery: string[];
}

export interface TeamMember {
  name: string;
  role: LocalizedText;
  photo: string;
}

// Activities data
export const activities: Activity[] = [
  {
    id: "tree-planting-2023",
    year: 2023,
    title: {
      de: "Baumpflanzungsaktion: Grüne Zukunft Initiative",
      fr: "Plantation d'arbres: Initiative Avenir Vert",
      ar: "زراعة الأشجار: مبادرة المستقبل الأخضر",
      en: "Tree Planting: Green Future Initiative"
    },
    location: {
      de: "Ait Sadden, Marokko",
      fr: "Ait Sadden, Maroc",
      ar: "آيت سادن، المغرب",
      en: "Ait Sadden, Morocco"
    },
    description: {
      de: "Ein gemeinschaftliches Projekt zur Wiederaufforstung und Bekämpfung der Bodenerosion in der Region Ait Sadden. Über 500 Bäume wurden mit Hilfe von Freiwilligen und lokalen Schulkindern gepflanzt.",
      fr: "Un projet communautaire de reboisement et de lutte contre l'érosion des sols dans la région d'Ait Sadden. Plus de 500 arbres ont été plantés avec l'aide de volontaires et d'écoliers locaux.",
      ar: "مشروع مجتمعي لإعادة التشجير ومكافحة تآكل التربة في منطقة آيت سادن. تم زراعة أكثر من 500 شجرة بمساعدة متطوعين وأطفال المدارس المحلية.",
      en: "A community project for reforestation and combating soil erosion in the Ait Sadden region. Over 500 trees were planted with the help of volunteers and local schoolchildren."
    },
    mainImage: "/images/activities/tree-planting.jpg",
    gallery: [
      "/images/activities/gallery/tree1.jpg",
      "/images/activities/gallery/tree2.jpg",
      "/images/activities/gallery/tree3.jpg"
    ]
  },
  {
    id: "agriculture-workshop-2022",
    year: 2022,
    title: {
      de: "Workshop zu nachhaltiger Landwirtschaft",
      fr: "Atelier sur l'agriculture durable",
      ar: "ورشة عمل حول الزراعة المستدامة",
      en: "Sustainable Agriculture Workshop"
    },
    location: {
      de: "Kulturzentrum, Ait Sadden",
      fr: "Centre culturel, Ait Sadden",
      ar: "المركز الثقافي، آيت سادن",
      en: "Cultural Center, Ait Sadden"
    },
    description: {
      de: "Eine Schulungsveranstaltung für lokale Landwirte zu Techniken der nachhaltigen Landwirtschaft, Wassermanagement und dem Anbau von dürreresistenten Pflanzen. Der Workshop konzentrierte sich auf traditionelle Amazigh-Anbaumethoden und moderne nachhaltige Praktiken.",
      fr: "Un événement de formation pour les agriculteurs locaux sur les techniques d'agriculture durable, la gestion de l'eau et la culture de plantes résistantes à la sécheresse. L'atelier s'est concentré sur les méthodes de culture traditionnelles amazighes et les pratiques durables modernes.",
      ar: "حدث تدريبي للمزارعين المحليين حول تقنيات الزراعة المستدامة وإدارة المياه وزراعة النباتات المقاومة للجفاف. ركزت ورشة العمل على طرق الزراعة الأمازيغية التقليدية والممارسات المستدامة الحديثة.",
      en: "A training event for local farmers on sustainable agriculture techniques, water management, and growing drought-resistant plants. The workshop focused on traditional Amazigh cultivation methods and modern sustainable practices."
    },
    mainImage: "/images/activities/agriculture.jpg",
    gallery: [
      "/images/activities/gallery/agri1.jpg",
      "/images/activities/gallery/agri2.jpg",
      "/images/activities/gallery/agri3.jpg"
    ]
  },
  {
    id: "cultural-festival-2021",
    year: 2021,
    title: {
      de: "Amazigh-Kulturfestival",
      fr: "Festival culturel amazigh",
      ar: "مهرجان الثقافة الأمازيغية",
      en: "Amazigh Cultural Festival"
    },
    location: {
      de: "Stadtplatz, Ait Sadden",
      fr: "Place de la ville, Ait Sadden",
      ar: "ساحة المدينة، آيت سادن",
      en: "Town Square, Ait Sadden"
    },
    description: {
      de: "Ein dreitägiges Festival zur Feier des Amazigh-Kulturerbes mit traditioneller Musik, Tanz, Kunsthandwerk und kulinarischen Spezialitäten. Die Veranstaltung zog Besucher aus der ganzen Region an und bot lokalen Handwerkern die Möglichkeit, ihre Produkte zu präsentieren.",
      fr: "Un festival de trois jours célébrant le patrimoine culturel amazigh avec de la musique traditionnelle, de la danse, de l'artisanat et des spécialités culinaires. L'événement a attiré des visiteurs de toute la région et a offert aux artisans locaux la possibilité de présenter leurs produits.",
      ar: "مهرجان يستمر ثلاثة أيام للاحتفال بالتراث الثقافي الأمازيغي مع الموسيقى التقليدية والرقص والحرف اليدوية والتخصصات الطهي. جذب الحدث زوارًا من جميع أنحاء المنطقة وقدم للحرفيين المحليين فرصة لعرض منتجاتهم.",
      en: "A three-day festival celebrating Amazigh cultural heritage with traditional music, dance, crafts, and culinary specialties. The event attracted visitors from across the region and provided local artisans with an opportunity to showcase their products."
    },
    mainImage: "/images/activities/festival.jpg",
    gallery: [
      "/images/activities/gallery/fest1.jpg",
      "/images/activities/gallery/fest2.jpg",
      "/images/activities/gallery/fest3.jpg"
    ]
  }
];

// Team members data
export const teamMembers: TeamMember[] = [
  {
    name: "Mohammed Alami",
    role: {
      de: "Vorsitzender",
      fr: "Président",
      ar: "رئيس",
      en: "President"
    },
    photo: "/images/team/president.jpg"
  },
  {
    name: "Amina Tazi",
    role: {
      de: "Projektkoordinatorin",
      fr: "Coordinatrice de projet",
      ar: "منسقة المشروع",
      en: "Project Coordinator"
    },
    photo: "/images/team/vp.jpg"
  },
  {
    name: "Youssef Benali",
    role: {
      de: "Umweltexperte",
      fr: "Expert environnemental",
      ar: "خبير بيئي",
      en: "Environmental Expert"
    },
    photo: "/images/team/secretary.jpg"
  },
  {
    name: "Fatima Ouazzani",
    role: {
      de: "Kulturbeauftragte",
      fr: "Responsable culturelle",
      ar: "مسؤولة ثقافية",
      en: "Cultural Officer"
    },
    photo: "/images/team/treasurer.jpg"
  }
];
