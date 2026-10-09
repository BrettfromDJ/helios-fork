// Shared links and navigation for every page.

// TODO: swap in real destinations once they exist.
export const BOOK_CALL = '/#book-a-call';
export const GITHUB = 'https://github.com/HeliosSoftware/hfs';
export const LINKEDIN = '#';

export const DOCKER_COMMAND = 'docker run -p 8080:8080 ghcr.io/heliossoftware/hfs:latest';

export const nav = [
  { label: 'FHIR Server', href: '/fhir-server' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Blog', href: '#' },
  { label: 'About', href: '#' },
];

export const footerLinks = [
  [
    { label: 'FHIR Server', href: '/fhir-server' },
    { label: 'Careers', href: '#' },
    { label: 'Newsletter', href: '#newsletter' },
  ],
  [
    { label: 'Consulting', href: '#' },
    { label: 'Documentation', href: GITHUB },
    { label: 'Contact', href: '#' },
  ],
  [
    { label: 'Case Studies', href: '/#case-studies' },
    { label: 'Privacy Policy', href: '#' },
  ],
];
