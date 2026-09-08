// Site-wide constants. Import these instead of hard-coding strings in components.

export const SITE_TITLE = 'DMC Tech Blog';
export const SITE_DESCRIPTION =
  'Notes on cloud,on-prem and whatever else is intereseting to me from a tech perspective.';
export const AUTHOR = 'Danny McDermott';

// Shown in the footer and used for the RSS feed's managingEditor field.
export const AUTHOR_EMAIL = 'dmc@dmc-tech.co.uk';

// Analytics. Leave the code empty to disable tracking entirely.
// GoatCounter: sign up at https://www.goatcounter.com, pick a site code
// (e.g. "dmctech"), and put just that code here — not the full URL.
// The script only loads in production builds, so `npm run dev` never counts.
export const ANALYTICS = {
  goatcounterCode: '<script data-goatcounter="https://dmc-tech.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>',
};

// Social / profile links. Shown in the site footer and on the About page.
//   - Fill in each `url` with your real profile.
//   - Leave `url` as an empty string ('') to hide that entry without deleting it.
//   - Add or remove entries freely; order here is the order they render.
export const SOCIALS: { name: string; url: string }[] = [
  { name: 'GitHub', url: 'https://github.com/dmc-tech' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/danny-mcdermott-dmc-tech/' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/dmc-tech.co.uk' },
  { name: 'Mastodon', url: '' },
  { name: 'RSS', url: '/rss.xml' },
  { name: 'Email', url: `mailto:${AUTHOR_EMAIL}` },
];
