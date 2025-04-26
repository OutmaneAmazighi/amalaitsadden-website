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

// Activities data - commented to ensure we use the events.json file
// export const activities: Activity[] = [];

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
