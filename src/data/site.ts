export const site = {
  name: 'Lardner Custom Homes',
  url: 'https://lardnercustomhomes.com',
  description: 'Lardner Custom Homes designs and builds custom homes in Dallas, Texas.',
  phone: { display: '(844) 527-3637', href: 'tel:8445273637' },
  email: { display: 'colin@lardnergroup.com', href: 'mailto:colin@lardnergroup.com' },
  address: 'Dallas, TX 75220',
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/dallashomesforsale', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/lardner_group/', icon: 'instagram' },
  ],
  legal: [
    {
      label: 'Texas Real Estate Commission Information About Brokerage Services',
      href: '/documents/iabs.pdf',
    },
    {
      label: 'Texas Real Estate Commission Consumer Protection Notice',
      href: '/documents/consumer-protection-notice.pdf',
    },
  ],
} as const;
