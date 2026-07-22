type Feature = {
  name: string;
  description: string;
  /** Lucide icon name (mapped to a component in ServiceSection). */
  icon: string;
};

export type Service = {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
  image: string;
  link: string;
  reverse?: boolean;
  features: Feature[];
  color: string;
};

export const services: Service[] = [
  {
    eyebrow: "Studio de tournage",
    title: "Des espaces pensés pour vos productions",
    color: "#7c86ff",
    link: "studio-de-tournage",
    id: "studio-de-tournage",
    description:
      "Découvrez nos espaces, équipements et options de location pour vos productions. Nous mettons à disposition un environnement professionnel conçu pour maximiser la qualité de vos contenus tout en simplifiant vos tournages.",
    image: "/newicones/green screend.png",
    features: [
      {
        name: "Espace modulable.",
        description:
          "Un studio adaptable pour différents formats de tournage, du contenu social media aux productions plus ambitieuses.",
        icon: "Camera",
      },
      {
        name: "Éclairage professionnel.",
        description:
          "Des solutions d’éclairage optimisées pour garantir un rendu visuel cohérent et esthétique.",
        icon: "Lightbulb",
      },
      {
        name: "Matériel disponible.",
        description:
          "Accédez à l’équipement essentiel pour produire efficacement sans contraintes techniques.",
        icon: "Clapperboard",
      },
    ],
  },
  {
    eyebrow: "Accompagnement stratégique",
    title: "Une vision claire pour votre croissance",
    color: "#ed6aff",
    link: "accompagnement-strategique",
    id: "accompagnement-strategique",
    description:
      "Community management, audit digital et stratégie sur mesure pour votre croissance. Nous analysons votre présence actuelle et construisons des actions concrètes pour améliorer votre visibilité et vos performances.",
    image: "/img/Stratégie.webp",
    reverse: true,
    features: [
      {
        name: "Audit digital.",
        description:
          "Analyse complète de votre présence en ligne pour identifier les opportunités d’amélioration.",
        icon: "BarChart",
      },
      {
        name: "Stratégie sur mesure.",
        description:
          "Des recommandations adaptées à votre marché et à vos objectifs business.",
        icon: "Target",
      },
      {
        name: "Community management.",
        description:
          "Gestion et animation de vos réseaux sociaux pour créer une audience engagée.",
        icon: "Users",
      },
    ],
  },
  {
    eyebrow: "Audiovisuel",
    title: "Donnez vie à votre image",
    color: "#00d3f2",
    link: "audiovisuel",
    id: "audiovisuel",
    description:
      "Prestations vidéo/photo, tournage, montage et livraison multi-formats. Nous vous accompagnons de la conception à la livraison pour produire du contenu impactant et adapté à tous vos canaux.",
    image: "/img/Production.webp",
    features: [
      {
        name: "Production vidéo.",
        description:
          "Tournage professionnel pour vos contenus marketing, corporate ou réseaux sociaux.",
        icon: "Video",
      },
      {
        name: "Photographie.",
        description:
          "Des visuels de qualité pour valoriser votre marque et vos produits.",
        icon: "ImageIcon",
      },
      {
        name: "Montage & formats.",
        description:
          "Optimisation et déclinaison de vos contenus pour toutes les plateformes.",
        icon: "Film",
      },
    ],
  },
];
