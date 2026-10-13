export const copy = {
  home: {
    // Source: lardnercustomhomes.com home page ("Design Matters." and
    // "Making Dallas Better, One Home at a Time.").
    hero: {
      eyebrow: 'Design matters',
      title: 'Making Dallas better, one home at a time.',
      /*
        The slideshow, in order. Each photo is a file in src/assets/site/, at least 2000px wide.
        `position` is the part kept in view when the screen crops the photo: across, then down
        ('center' is the middle). `label` and `href` are the small link under the photo.
        The first photo is also the picture shown when the site is shared.
      */
      slides: [
        {
          image: 'hero.jpg',
          alt: '4103 Saranac at dusk, with wood siding, pale brick and a dark metal roof',
          position: '60% 18%',
          label: '4103 Saranac',
          href: '/gallery/4103-saranac/',
        },
        {
          image: 'slide-3880-durango.jpg',
          alt: '3880 Durango at dusk, a white gabled house lit from within',
          position: '50% 30%',
          label: '3880 Durango',
          href: '/gallery/3880-durango/',
        },
        {
          image: 'slide-3805-eaton-drive.jpg',
          alt: '3805 Eaton Drive at dusk, with twin white brick gables under a pink sky',
          position: '60% 35%',
          label: '3805 Eaton Drive',
          href: '/gallery/3805-eaton-drive/',
        },
        {
          image: 'slide-4401-scurry-street.jpg',
          alt: '4401 Scurry Street at dusk, three dark metal-clad gables in a row',
          position: '50% 40%',
          label: '4401 Scurry Street',
          href: '/gallery/4401-scurry-street/',
        },
        {
          image: 'slide-2208-moser-avenue.jpg',
          alt: '2208 Moser Avenue at dusk, a white metal-clad house with a balcony',
          position: '50% 45%',
          label: '2208 Moser Avenue',
          href: '/gallery/2208-moser-avenue/',
        },
        {
          image: 'slide-721-eagles-landing.jpg',
          alt: '721 Eagles Landing, a stone house with blue shutters and an arched wood door',
          position: '50% 40%',
          label: '721 Eagles Landing',
          href: '/gallery/721-eagles-landing/',
        },
      ],
      /** Read out by screen readers to name the slideshow. */
      slidesLabel: 'Homes by Lardner Custom Homes',
      scrollCue: 'Scroll',
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
        'The people who build them are accomplished and creative, and they care as much about energy efficiency as they do about the finishes.',
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
    location: { heading: 'Location', link: 'Open in Google Maps' },
    buildOnYourLot: {
      title: 'Build on Your Lot',
      intro: 'Already have the land? We can design and build on it.',
      // Add a few sentences from Colin on how building on a client's own lot works.
      body: [] as string[],
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
        'Building runs in the family. Like his father and grandfather before him, Colin has rebuilding communities in his blood, and the Live-Work-Play concept in Dallas is part of his legacy. He has also spent time in Africa and South America helping people rebuild their lives, and he mentors a number of people closer to home.',
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
        'Lardner Custom Homes designs and builds homes in Dallas neighborhoods including Midway Hollow, the M-Streets and Preston Hollow.',
        'We hire accomplished, creative people and ask them to sweat the details, right down to the finishes. The aim is a home that runs efficiently and looks like no other on the street.',
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
          body: 'We work to get the most out of every home, both in how it looks and in how efficiently it runs.',
        },
        {
          title: 'Trust',
          body: 'Relationships built on trust are how we earned our name in this business.',
        },
        {
          title: 'One home at a time',
          body: 'We want to make Dallas better, one home at a time.',
        },
      ],
    },
  },

  inventory: {
    eyebrow: 'Inventory',
    title: "Let's find your home.",
    intro: 'Share a few details and Colin will follow up about current and upcoming homes and lots.',
    // Shown instead of the form until a form service is connected.
    offline: {
      intro: "Tell Colin what you're looking for and he'll follow up about current and upcoming homes and lots.",
      heading: 'Get in touch',
      body: 'Call or email Colin directly.',
    },
    galleryHeading: 'Previous projects',
    galleryLink: 'See the gallery',
  },

  notFound: {
    title: 'Page not found',
    body: "That page doesn't exist or has moved. Here are a few places to go instead.",
  },
};
