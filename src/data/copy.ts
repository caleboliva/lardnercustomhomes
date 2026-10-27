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
          image: 'slide-durango-drive.jpg',
          alt: 'A Durango Drive home at dusk, white and gabled, lit from within',
          position: '50% 30%',
          label: 'Durango Drive',
          href: '/gallery/durango-drive/',
        },
        {
          image: 'slide-eaton-drive.jpg',
          alt: 'An Eaton Drive home at dusk, with twin white brick gables under a pink sky',
          position: '60% 35%',
          label: 'Eaton Drive',
          href: '/gallery/eaton-drive/',
        },
        {
          image: 'slide-scurry-street.jpg',
          alt: 'Scurry Street townhomes at dusk, three dark metal-clad gables in a row',
          position: '50% 40%',
          label: 'Scurry Street',
          href: '/gallery/scurry-street/',
        },
        {
          image: 'slide-moser-avenue.jpg',
          alt: 'A Moser Avenue home at dusk, white and metal-clad, with a balcony',
          position: '50% 45%',
          label: 'Moser Avenue',
          href: '/gallery/moser-avenue/',
        },
        {
          image: 'slide-eagles-landing.jpg',
          alt: 'An Eagles Landing home in stone, with blue shutters and an arched wood door',
          position: '50% 40%',
          label: 'Eagles Landing',
          href: '/gallery/eagles-landing/',
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
    // The outlets come from src/data/press.ts.
    press: { heading: 'As featured in', link: 'Read the coverage' },
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
    // Lot pages: the lot's `description` appears under this heading.
    plannedHome: 'The planned home',
    // Followed by the neighborhood's name. The text comes from src/data/neighborhoods.ts.
    aboutNeighborhood: 'About',
    buildOnYourLot: {
      title: 'Build on Your Lot',
      intro: 'Already have the land? We can design and build on it.',
      // Add a few sentences from Colin on how building on a client's own lot works.
      body: [] as string[],
      // Sources: the company description above (homes planned around how owners live; energy
      // efficiency and finishes), Colin's licences (About page), the design stage on Lardner
      // Group's builder services page, and Colin's April 2026 flyer for 4103 Saranac (2x6
      // framing, engineered slab on piers, full foam encapsulation). Colin asked in October 2026
      // that architects not be named on the site.
      points: {
        heading: 'Why build with Lardner',
        items: [
          {
            title: 'Designed around you',
            body: 'Each home is planned around the way its owners live, and designed together with an architect.',
          },
          {
            title: 'A builder who is also a broker',
            body: 'Colin Lardner is a licensed general contractor and a Texas real estate broker.',
          },
          {
            title: 'Built well, run efficiently',
            body: 'The team cares as much about energy efficiency as about the finishes. 4103 Saranac, for example, was built with 2x6 framing, an engineered slab on piers and full foam encapsulation.',
          },
        ],
      },
      noLot: {
        heading: 'No lot yet?',
        body: 'Lardner has lots ready for a custom home, each with a drawing, its size and a map.',
        link: 'See available lots',
      },
      work: { heading: 'Recent custom homes', link: 'See the gallery' },
      cta: {
        heading: 'Tell Colin about your lot.',
        body: "Share where it is and what you have in mind, and he'll follow up about designing and building on it.",
      },
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
    // Shown on a project page when the same home has a listing, followed by its status.
    listingLink: 'See the listing',
    pressLabel: 'Press coverage of this project',
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
    // Sources: lardnergroup.com (Residential Property Management, Builder Services, and the
    // home page: buying and selling, home valuation, buyer's and seller's guides) and Colin's
    // licences as stated in the bio above.
    services: {
      heading: 'Services',
      intro: 'Through Lardner Custom Homes and Lardner Group, his brokerage, Colin offers three services.',
      items: [
        {
          title: 'Luxury management',
          body: 'Management for homes and rental properties in Dallas: leasing and marketing vacancies, rent collection and bookkeeping, getting homes ready between tenants, and steady communication with owners and tenants.',
          link: { label: 'Property management', href: 'https://lardnergroup.com/residential-property-management' },
        },
        {
          title: 'Brokerage',
          body: "Colin is a licensed Texas real estate broker. Lardner Group represents buyers and sellers across Dallas, with home searches, home valuations, and buyer's and seller's guides.",
          link: { label: 'Visit Lardner Group', href: 'https://lardnergroup.com/' },
        },
        {
          title: 'Development',
          body: 'From the land to the finished homes: market and feasibility studies, land acquisition and platting, design with architects, construction by Lardner Custom Homes, then marketing, sales and leasing.',
          link: { label: 'Builder services', href: 'https://lardnergroup.com/builder-services' },
        },
      ],
    },
    // The articles come from src/data/press.ts.
    press: {
      heading: 'Press',
      intro: "Coverage of Colin's homes and developments.",
      projectLink: 'See the project',
    },
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

  // Exclusive-access sign-up, added at Colin's request in October 2026: early access to homes
  // and lots, and a pointer to his brokerage for anything else. First draft for Colin to review.
  inventory: {
    eyebrow: 'Inventory',
    title: 'Get exclusive access to our inventory.',
    intro: "Join Colin's list for first access to Lardner homes and lots, including upcoming projects before they come to market.",
    /** File name in src/assets/site/ for the photo behind the title. */
    image: 'slide-durango-drive.jpg',
    imageAlt: 'A Durango Drive home at dusk, white and gabled, lit from within',
    signupCta: 'Sign up',
    browseCta: 'See homes and lots',
    form: {
      heading: 'Sign up for early access',
      intro: "Tell Colin what you're looking for. He'll be in touch as homes and lots that fit come up.",
      submit: 'Sign up',
      /** Shown until a form service is connected, when sending opens the visitor's email app. */
      emailNote: 'Signing up opens your email app with your details filled in, ready to send to Colin.',
    },
    brokerage: {
      heading: 'Buying or selling another home?',
      body: "Lardner Group, Colin's brokerage, represents buyers and sellers across Dallas. Search homes for sale or get a home valuation on the Lardner Group website.",
      link: { label: 'Visit Lardner Group', href: 'https://lardnergroup.com/' },
      searchLink: { label: 'Search homes for sale', href: 'https://lardnergroup.com/home-search/listings' },
    },
    galleryHeading: 'Previous projects',
    galleryLink: 'See the gallery',
  },

  notFound: {
    title: 'Page not found',
    body: "That page doesn't exist or has moved. Here are a few places to go instead.",
  },
};
