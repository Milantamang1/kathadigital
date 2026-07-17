import type { Prisma } from "@prisma/client";
import { prisma } from "./db";

export const ABOUT_CONTENT_ID = "about";

export type AboutContentValue = {
  metadata: {
    title: string;
    description: string;
    openGraph: {
      title: string;
      description: string;
    };
  };
  hero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    subtitle: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    steps: [string, string][];
    image: string;
    imageAlt: string;
    imageBadge: string;
  };
  principles: {
    iconKey: "Eye" | "Target" | "Sparkles";
    eyebrow: string;
    title: string;
    text: string;
  }[];
  founder: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    image: string;
    imageAlt: string;
    quote: string;
    bullets: string[];
    name: string;
    role: string;
  };
  team: {
    eyebrow: string;
    title: string;
    emphasis: string;
    suffix: string;
    subtitle: string;
    members: {
      name: string;
      role: string;
      note: string;
      image: string;
      position: string;
    }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttonText: string;
    to: string;
  };
  sections: {
    hero: boolean;
    studio: boolean;
    principles: boolean;
    founder: boolean;
    team: boolean;
    cta: boolean;
  };
};

export const defaultAboutContent: AboutContentValue = {
  metadata: {
    title: "About",
    description:
      "Meet Katha Digital, a creative media studio for photography, cinematography, events, productions, and digital storytelling.",
    openGraph: {
      title: "About Katha Digital",
      description:
        "A creative media team built around thoughtful planning, cinematic craft, and honest visual storytelling.",
    },
  },
  hero: {
    eyebrow: "About",
    title: "About",
    emphasis: "Katha Digital",
    subtitle:
      "A cinematic media studio for people, brands, events, and stories that deserve to be remembered with precision and feeling.",
  },
  studio: {
    eyebrow: "Who we are",
    title:
      "We transform real moments into visual stories with emotional intelligence, clean direction, and cinematic polish.",
    paragraphs: [
      "Katha Digital works across weddings, events, commercial shoots, documentaries, talk shows, travel stories, music videos, and social campaigns. The format changes, but the intention stays the same: understand the story before touching the camera.",
      "Our team combines planning, direction, photography, cinematography, editing, and delivery into one focused workflow, so every project feels calm for the client and considered on screen.",
    ],
    steps: [
      ["01", "Plan the story"],
      ["02", "Capture with care"],
      ["03", "Deliver with polish"],
    ],
    image: "/katha-media/founder.jpg",
    imageAlt: "Katha Digital production moment",
    imageBadge: "Photography, film, and digital production",
  },
  principles: [
    {
      iconKey: "Eye",
      eyebrow: "Vision",
      title: "Stories that feel honest, cinematic, and human.",
      text: "We want Katha Digital to be known for visual work that carries emotion first, then technique. Every project should feel personal, polished, and worth returning to.",
    },
    {
      iconKey: "Target",
      eyebrow: "Mission",
      title: "A reliable creative partner from idea to final delivery.",
      text: "We plan, shoot, edit, and deliver photography, films, events, productions, and digital content with a calm process and a strong eye for detail.",
    },
    {
      iconKey: "Sparkles",
      eyebrow: "Craft",
      title: "Premium visuals without losing the real moment.",
      text: "Our work balances direction and natural emotion, so people feel comfortable on camera and the final story still feels true.",
    },
  ],
  founder: {
    eyebrow: "From the Founder",
    title: "A note from",
    emphasis: "Sunil Shrestha",
    suffix: ".",
    image: "/katha-media/sunil-shrestha.jpg",
    imageAlt: "Sunil Shrestha",
    quote:
      "A camera can record what happened, but a thoughtful team can preserve what it felt like. That is the standard we bring to every wedding, event, interview, brand film, music video, and documentary we create.",
    bullets: [
      "Clear communication before every shoot",
      "Calm direction for natural on-camera moments",
      "Cinematic editing with emotional rhythm",
      "Delivery prepared for web, social, and archive",
    ],
    name: "Sunil Shrestha",
    role: "Founder - Photographer & Cinematographer",
  },
  team: {
    eyebrow: "The Team",
    title: "The",
    emphasis: "people",
    suffix: "behind the lens.",
    subtitle: "A compact crew with clear roles, steady communication, and a shared eye for story.",
    members: [
      {
        name: "Sunil Shrestha",
        role: "Founder - Cinematographer",
        note: "Leads creative direction, client storytelling, and cinematic execution.",
        image: "/katha-media/sunil-team.jpg",
        position: "object-[52%_30%]",
      },
      {
        name: "Nabin K Shrestha",
        role: "Director",
        note: "Directs each project with a strong focus on storytelling, emotion, visual style, and client experience.",
        image: "/katha-media/team-nabin-director.jpeg",
        position: "object-[50%_32%]",
      },
      {
        name: "Prabin Khatri",
        role: "Cinematographer",
        note: "Handles camera work, lighting, composition, and cinematic visuals to bring every moment to life.",
        image: "/katha-media/team-prabin-cinematographer.jpeg",
        position: "object-[38%_42%]",
      },
      {
        name: "Lovin Ansari",
        role: "Presenter",
        note: "Hosts and presents each story with confidence, warmth, and clear communication to connect with the audience.",
        image: "/katha-media/team-lovin-presenter.jpeg",
        position: "object-[50%_24%]",
      },
    ],
  },
  cta: {
    eyebrow: "Let's build the frame",
    title: "Ready to make your story look unforgettable?",
    subtitle:
      "Bring us the moment, the brand, or the idea. We will shape it with cinematic craft, calm direction, and a polished final delivery.",
    buttonText: "Book Now",
    to: "/book-now",
  },
  sections: {
    hero: true,
    studio: true,
    principles: true,
    founder: true,
    team: true,
    cta: true,
  },
};

export function aboutContentToCreateInput(
  content: AboutContentValue = defaultAboutContent,
): Prisma.AboutContentCreateInput {
  return {
    id: ABOUT_CONTENT_ID,
    metadata: content.metadata,
    hero: content.hero,
    studio: content.studio,
    principles: content.principles,
    founder: content.founder,
    team: content.team,
    cta: content.cta,
    sections: content.sections,
    status: "PUBLISHED",
    publishedAt: new Date("2026-07-17T00:00:00.000Z"),
  };
}

export function aboutContentToValue(
  record: Prisma.AboutContentGetPayload<object>,
): AboutContentValue {
  return {
    metadata: record.metadata as AboutContentValue["metadata"],
    hero: record.hero as AboutContentValue["hero"],
    studio: record.studio as AboutContentValue["studio"],
    principles: record.principles as AboutContentValue["principles"],
    founder: record.founder as AboutContentValue["founder"],
    team: record.team as AboutContentValue["team"],
    cta: record.cta as AboutContentValue["cta"],
    sections: record.sections as AboutContentValue["sections"],
  };
}

export async function getPublishedAboutContent() {
  const record = await prisma.aboutContent.findUnique({ where: { id: ABOUT_CONTENT_ID } });

  if (!record || record.status !== "PUBLISHED") {
    return defaultAboutContent;
  }

  return aboutContentToValue(record);
}

export async function getEditableAboutContent() {
  const record = await prisma.aboutContent.findUnique({ where: { id: ABOUT_CONTENT_ID } });

  return record ? aboutContentToValue(record) : defaultAboutContent;
}
