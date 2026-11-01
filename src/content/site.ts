/**
 * Single source of truth for copy and links on the landing page.
 * Edit here; components stay free of hard-coded content.
 */
export const site = {
  name: 'Grand Format',
  url: 'https://vegandj.biz',
  /**
   * Alt text for the Peanut Chews logo (public/images/grand-format-logo.webp).
   * Not rendered right now; kept so the wording is ready when the logo returns.
   * It carries the artwork's words ("Grand Format") plus what the picture is,
   * for people who know the candy it riffs on.
   */
  logoAlt:
    "Grand Format, original vegan vinyl DJ, since 2006. The logo is drawn as a Goldenberg's Peanut Chews wrapper, with two records on it.",

  tagline: 'Vegan vinyl DJ for weddings and events',
  region: 'Hudson Valley, NY',

  /**
   * PARKED (not on the page right now; see the roadmap). YouTube video ID of
   * the homepage sizzler reel (the part after `v=`).
   * Leave empty to show the "reel coming soon" placeholder.
   * See docs/video-reel-brief.md for what the reel should be.
   */
  reelVideoId: '',

  social: {
    instagram: 'https://www.instagram.com/grandformat',
  },

  // Public Google Form, embedded as the contact form (carried over from the static site).
  contactFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdqYjGhrfwtyGOmhIiJEG8fElGIOYvPiVo-othNwD1oNAFCHg/viewform?embedded=true',

  hero: {
    tagline: 'The vegan vinyl DJ in the Hudson Valley',
    cta: "Let's Party!",
    photoAlt:
      'Grand Format, in a tweed jacket and headphones, leaning over a turntable to cue a pink record, with a second turntable and a crate of records alongside.',
  },

  // Credit for the hero photo, shown bottom right of the hero.
  photoCredit: {
    name: 'Yaz Tulça',
    url: 'https://yaztulca.com/',
  },

  reel: {
    heading: 'Vinyl vibes for your weddings, celebrations, anywhere!',
  },
} as const;
