import { placeholder } from '../lib/format.ts';

export const copy = {
  home: {
    // Source: lardnercustomhomes.com home page ("Design Matters." and
    // "Making Dallas Better, One Home at a Time.").
    hero: {
      eyebrow: 'Design matters',
      title: 'Making Dallas better, one home at a time.',
      /** File name in src/assets/site/, for example 'hero.jpg'. Null shows a placeholder tile. */
      image: null as string | null,
      imageAlt: 'A home built by Lardner Custom Homes',
      primaryCta: 'View homes',
      secondaryCta: 'See the gallery',
    },
    // Source: lardnercustomhomes.com home page ("We are innovative. We develop and build homes
    // that are creative, aesthetic, efficient, and most importantly; the way you live… We hire
    // professional, accomplished and creative team members…").
    intro: {
      eyebrow: 'Lardner Custom Homes',
      heading: 'Homes built around the way you live.',
      body: [
        'We design and build homes in Dallas that are creative, efficient and good to look at. Most of all, each one is planned around the way its owners live.',
        'Our team is made up of accomplished, creative people who care about design, energy efficiency and well-chosen finishes.',
      ],
      link: 'About us',
    },
    featured: { eyebrow: 'Gallery', heading: 'Recent work', link: 'See the gallery' },
    // Source: lardnercustomhomes.com home page neighborhood list ("…And more to come!").
    neighborhoods: {
      eyebrow: 'Where we build',
      names: ['Midway Hollow', 'M-Streets', 'Uptown', 'East Village', 'Knox-Henderson', 'Preston Hollow'],
      note: 'And more to come.',
    },
    // Source: lardnercustomhomes.com home page ("Good design is good business. — Colin Lardner, CEO").
    quote: { text: 'Good design is good business.', attribution: 'Colin Lardner, CEO' },
    cta: {
      heading: 'Looking for a home, a lot or a builder?',
      body: "Tell us what you're looking for and we'll take it from there.",
      button: 'Get in touch',
    },
  },

  homes: {
    index: { title: 'Homes', intro: 'Homes for sale, lots, and building on land you already own.' },
    available: { title: 'Available Homes', intro: 'Homes for sale now and coming soon.' },
    lots: { title: 'Lots', intro: 'Land ready for a custom home.' },
    empty: {
      heading: 'Nothing is listed here right now.',
      body: "Tell us what you're looking for and we'll let you know when something comes up.",
      button: 'Get in touch',
    },
    detailCta: 'Ask about this home',
    lotDetailCta: 'Ask about this lot',
    buildOnYourLot: {
      title: 'Build on Your Lot',
      intro: 'Already have the land? We can design and build on it.',
      body: [placeholder("how building on a client's own lot works, in a few sentences from Colin")],
      button: 'Start a conversation',
    },
  },

  gallery: {
    index: { title: 'Gallery', intro: 'Select a project to see it in full.' },
    rooms: {
      exterior: 'Exteriors from across our projects.',
      kitchen: 'Kitchens from across our projects.',
      bath: 'Baths from across our projects.',
      living: 'Living spaces from across our projects.',
    },
    projectHint: 'Select a photo to view it larger.',
    empty: 'Photos are on the way.',
  },

  about: {
    title: 'About',
    colin: {
      name: 'Colin Lardner',
      // Source: lardnercustomhomes.com/about ("Colin Lardner | CEO").
      role: 'CEO',
      photoAlt: 'Colin Lardner seated in a cream armchair',
      // Sources: lardnergroup.com home page ("He'll be the guy looking up at buildings, pointing
      // out spaces…", "Texas-sized personality and New York City determination") and
      // lardnercustomhomes.com/about ("roll-up-your-sleeves attitude", "like his father and
      // grandfather before him…", "spent time in Africa and South America…", "Master's in Real
      // Estate, Columbia University", "Licenced General Contractor", "Texas Real Estate Broker",
      // "Husband to Tracy, Dad to Stoneleigh").
      bio: [
        'Colin Lardner is the one looking up at buildings and pointing out what they could become. He pairs a Texas-sized personality with New York City determination and a roll-up-your-sleeves attitude.',
        'Building runs in the family. Like his father and grandfather before him, Colin has spent his career rebuilding communities, and the Live-Work-Play concept in Dallas is part of that work. He has also spent time in Africa and South America helping people rebuild their lives, and he mentors a number of people closer to home.',
        "He holds a master's in real estate from Columbia University and is a licensed general contractor and Texas real estate broker. At home, he is husband to Tracy and dad to Stoneleigh.",
      ],
    },
    // Source: lardnercustomhomes.com home page (neighborhood list; "We hire professional,
    // accomplished and creative team members to execute on thoughtfully refined homes that feature
    // captivating design elements, energy-efficiency and sophisticated finishes. Our team is
    // tireless in maximizing the beauty, uniqueness and efficiency of each home.").
    company: {
      heading: 'The company',
      body: [
        'Lardner Custom Homes designs and builds homes across Dallas, from Midway Hollow and the M-Streets to Preston Hollow.',
        'We hire accomplished, creative people and ask them to sweat the details: design that holds your attention, energy efficiency, and finishes chosen with care. The aim is a home that is distinctive, efficient and built for the way you live.',
      ],
    },
    // Sources: lardnercustomhomes.com home page ("Design Matters.", "Good design is good
    // business.", "maximizing the beauty, uniqueness and efficiency of each home", "Making Dallas
    // Better, One Home at a Time.") and lardnergroup.com home page ("Relationships built on
    // trust, has given us a solid, reputable name in the business.").
    values: {
      heading: 'What we value',
      items: [
        {
          title: 'Design matters',
          body: 'Good design is good business. We start with how you live and design the home around it.',
        },
        {
          title: 'Beauty and efficiency',
          body: 'We work to get the most out of every home: how it looks, what makes it different and how efficiently it runs.',
        },
        {
          title: 'Trust',
          body: 'Relationships built on trust are how we earned our name in this business.',
        },
        {
          title: 'One home at a time',
          body: 'Our goal is simple. Make Dallas better, one home at a time.',
        },
      ],
    },
  },

  inventory: {
    eyebrow: 'Inventory',
    title: "Let's find your home.",
    intro: 'Share a few details and Colin will follow up about current and upcoming homes and lots.',
    galleryHeading: 'Previous projects',
    galleryLink: 'See the gallery',
  },

  notFound: {
    title: 'Page not found',
    body: "That page doesn't exist or has moved. Here are a few places to go instead.",
  },
};
