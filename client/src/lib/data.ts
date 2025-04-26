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
    name: "Kamal Hassani",
    role: {
      de: "Präsident",
      fr: "Président",
      ar: "رئيس",
      en: "President"
    },
    photo: "/images/team/avatar1.svg"
  },
  {
    name: "Khalid El Jazouli",
    role: {
      de: "Schriftführer",
      fr: "Secrétaire général",
      ar: "الكاتب العام",
      en: "General Secretary"
    },
    photo: "/images/team/avatar2.svg"
  },
  {
    name: "Outmane Hassani",
    role: {
      de: "Mitglied und Medienbeauftragter",
      fr: "Membre et responsable des médias",
      ar: "عضو ومسؤول إعلامي",
      en: "Member and Media Officer"
    },
    photo: "/images/team/avatar3.svg"
  },
  {
    name: "Nazih Ghanou",
    role: {
      de: "Mitglied",
      fr: "Membre",
      ar: "عضو",
      en: "Member"
    },
    photo: "/images/team/avatar4.svg"
  },
  {
    name: "Soumiua Ahari",
    role: {
      de: "Mitglied",
      fr: "Membre",
      ar: "عضوة",
      en: "Member"
    },
    photo: "/images/team/avatar5.png"
  }
];
