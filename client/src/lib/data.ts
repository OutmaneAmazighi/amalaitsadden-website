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
    mainImage: "https://images.unsplash.com/photo-1593113598332-cd59c93c7d7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552084117-56a987666449?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1558904882-09139b8006f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531579234-a0a99da45460?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
    mainImage: "https://images.unsplash.com/photo-1544307580-d6e78a47a5f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548625361-1adcab316530?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1504430125427-3d585e88ef9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Amina Tazi",
    role: {
      de: "Projektkoordinatorin",
      fr: "Coordinatrice de projet",
      ar: "منسقة المشروع",
      en: "Project Coordinator"
    },
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Youssef Benali",
    role: {
      de: "Umweltexperte",
      fr: "Expert environnemental",
      ar: "خبير بيئي",
      en: "Environmental Expert"
    },
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Fatima Ouazzani",
    role: {
      de: "Kulturbeauftragte",
      fr: "Responsable culturelle",
      ar: "مسؤولة ثقافية",
      en: "Cultural Officer"
    },
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Ahmed Benkirane",
    role: {
      de: "Finanzdirektor",
      fr: "Directeur financier",
      ar: "مدير مالي",
      en: "Financial Director"
    },
    photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Nadia El Mansouri",
    role: {
      de: "Bildungsbeauftragte",
      fr: "Responsable éducative",
      ar: "مسؤولة تعليمية",
      en: "Education Officer"
    },
    photo: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];
