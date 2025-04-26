interface Translation {
  ngoName: string;
  nav: {
    about: string;
    activities: string;
    team: string;
  };
  sections: {
    about: {
      title: string;
      paragraphs: string[];
    };
    activities: {
      title: string;
      viewMorePhotos: string;
    };
    team: {
      title: string;
    };
  };
  footer: {
    contact: string;
    location: string;
    followUs: string;
    copyright: string;
    developedBy: string;
  };
}

interface Translations {
  de: Translation;
  fr: Translation;
  ar: Translation;
  en: Translation;
}

export const translations: Translations = {
  de: {
    ngoName: "Association Amal Ait Sadden pour le Développement Durable",
    nav: {
      about: "Über uns",
      activities: "Aktivitäten",
      team: "Team"
    },
    sections: {
      about: {
        title: "Über uns",
        paragraphs: [
          "Die Association Amal Ait Sadden pour le Développement Durable ist eine gemeinnützige Organisation, die sich für nachhaltige Entwicklung und Umweltschutz in der Region Ait Sadden einsetzt. Wir arbeiten mit lokalen Gemeinschaften zusammen, um Bildung, Umweltbewusstsein und wirtschaftliche Möglichkeiten zu fördern.",
          "Unsere Vision ist es, eine nachhaltige Zukunft für kommende Generationen zu schaffen, indem wir das reiche kulturelle Erbe der Amazigh-Gemeinschaft bewahren und gleichzeitig moderne nachhaltige Praktiken fördern."
        ]
      },
      activities: {
        title: "Aktivitäten",
        viewMorePhotos: "Mehr Fotos anzeigen"
      },
      team: {
        title: "Unser Team"
      }
    },
    footer: {
      contact: "Kontakt",
      location: "Ait Sadden, Marokko",
      followUs: "Folgen Sie uns",
      copyright: "© {year} Association Amal Ait Sadden. Alle Rechte vorbehalten.",
      developedBy: "Website entwickelt von Othman Hassani"
    }
  },
  
  fr: {
    ngoName: "Association Amal Ait Sadden pour le Développement Durable",
    nav: {
      about: "À propos",
      activities: "Activités",
      team: "Équipe"
    },
    sections: {
      about: {
        title: "À propos de nous",
        paragraphs: [
          "L'Association Amal Ait Sadden pour le Développement Durable est une organisation à but non lucratif dédiée au développement durable et à la protection de l'environnement dans la région d'Ait Sadden. Nous travaillons avec les communautés locales pour promouvoir l'éducation, la sensibilisation environnementale et les opportunités économiques.",
          "Notre vision est de créer un avenir durable pour les générations futures en préservant le riche patrimoine culturel de la communauté amazighe tout en promouvant des pratiques durables modernes."
        ]
      },
      activities: {
        title: "Activités",
        viewMorePhotos: "Voir plus de photos"
      },
      team: {
        title: "Notre Équipe"
      }
    },
    footer: {
      contact: "Contact",
      location: "Ait Sadden, Maroc",
      followUs: "Suivez-nous",
      copyright: "© {year} Association Amal Ait Sadden. Tous droits réservés.",
      developedBy: "Site web développé par Othman Hassani"
    }
  },
  
  ar: {
    ngoName: "جمعية آمل آيت سادن للتنمية المستدامة",
    nav: {
      about: "من نحن",
      activities: "أنشطة",
      team: "فريق"
    },
    sections: {
      about: {
        title: "من نحن",
        paragraphs: [
          "جمعية آمال آيت سادن للتنمية المستدامة هي منظمة غير ربحية مكرسة للتنمية المستدامة وحماية البيئة في منطقة آيت سادن. نحن نعمل مع المجتمعات المحلية لتعزيز التعليم والوعي البيئي والفرص الاقتصادية.",
          "رؤيتنا هي خلق مستقبل مستدام للأجيال القادمة من خلال الحفاظ على التراث الثقافي الغني للمجتمع الأمازيغي مع تعزيز الممارسات المستدامة الحديثة."
        ]
      },
      activities: {
        title: "أنشطة",
        viewMorePhotos: "عرض المزيد من الصور"
      },
      team: {
        title: "فريقنا"
      }
    },
    footer: {
      contact: "اتصل بنا",
      location: "آيت سادن، المغرب",
      followUs: "تابعونا",
      copyright: "© {year} جمعية آمال آيت سادن. جميع الحقوق محفوظة.",
      developedBy: "تم تطوير الموقع بواسطة عثمان حساني"
    }
  },
  
  en: {
    ngoName: "Amal Ait Sadden Association for Sustainable Development",
    nav: {
      about: "About",
      activities: "Activities",
      team: "Team"
    },
    sections: {
      about: {
        title: "About Us",
        paragraphs: [
          "The Amal Ait Sadden Association for Sustainable Development is a non-profit organization dedicated to sustainable development and environmental protection in the Ait Sadden region. We work with local communities to promote education, environmental awareness, and economic opportunities.",
          "Our vision is to create a sustainable future for generations to come by preserving the rich cultural heritage of the Amazigh community while promoting modern sustainable practices."
        ]
      },
      activities: {
        title: "Activities",
        viewMorePhotos: "View more photos"
      },
      team: {
        title: "Our Team"
      }
    },
    footer: {
      contact: "Contact",
      location: "Ait Sadden, Morocco",
      followUs: "Follow Us",
      copyright: "© {year} Amal Ait Sadden Association. All rights reserved.",
      developedBy: "Website developed by Othman Hassani"
    }
  }
};
