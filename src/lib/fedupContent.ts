export type FedupContentItem = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  videoUrl?: string;
  instagramUrl?: string;
  caption?: string;
  quote?: string;
  handle?: string;
  category?: string;
  date?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const fedupInstagram = "https://www.instagram.com/fedddup_";
const fedupFacebook = "https://www.facebook.com/FedUpRealitySeries";
const fedupYouTube = "https://www.youtube.com/@FedUpRealitySeries";
const brandiInstagram = "https://www.instagram.com/doughgirl____/";
const brandiFacebook = "https://www.facebook.com/profile.php?id=100054002169527";
const rashiaInstagram = "https://www.instagram.com/1stlady_ent/";
const rashiaFacebook = "https://www.facebook.com/rashia.wilson.3/";

export const heroMedia: FedupContentItem[] = [
  {
    title: "FEDUP Reality Series",
    subtitle: "Raw Stories. Real Women. Real Purpose.",
    imageUrl: "/images/fedup_banner.png",
    videoUrl: "/images/mainvideo.mov",
    caption:
      "FEDUP follows women who have lived through defeat, rebuilt with purpose, and are ready for the camera to meet the truth.",
    quote:
      "LADIES ARE YOU FEDUP? They judged your time. Now let them hear the redemption.",
    handle: "@fedddup_",
    category: "Casting Now",
    ctaLabel: "Apply Now",
    ctaHref: "/apply",
  },
];

export const featuredStories: FedupContentItem[] = [
  {
    title: "Stories They Tried To Silence",
    subtitle: "Official FEDUP casting language",
    imageUrl: "/images/fedup_banner.png",
    instagramUrl: fedupInstagram,
    caption:
      "The official FEDUP profile frames the series around women whose stories were judged, delayed, or silenced, then brought back through redemption.",
    quote: "Stories they tried to silence. FEDUP ladies wya?",
    handle: "@fedddup_",
    category: "Casting",
  },
  {
    title: "Brandi Johnson",
    subtitle: "Founder",
    imageUrl: "/images/social/brandi-facebook.jpg",
    instagramUrl: brandiFacebook,
    caption:
      "Brandi Johnson's public Facebook profile identifies her as founder of FEDUP the reality TV show and carries active audience engagement around her personal brand.",
    quote: "Founder of Fedup the reality t.v show.",
    handle: "Brandi Johnson",
    category: "Founder",
  },
  {
    title: "Rashia Wilson",
    subtitle: "Co-Founder / Entertainment Voice",
    imageUrl: "/images/social/rashia-instagram.jpg",
    instagramUrl: rashiaInstagram,
    caption:
      "Rashia Wilson brings a public entertainment platform to FEDUP, with 112K Instagram followers and established audience recognition.",
    quote: "Money, Power & Time.",
    handle: "@1stlady_ent",
    category: "Co-Founder",
  },
];

export const socialProof: FedupContentItem[] = [
  {
    title: "10K",
    subtitle: "FEDUP Instagram followers",
    instagramUrl: fedupInstagram,
    category: "@fedddup_",
  },
  {
    title: "58",
    subtitle: "FEDUP public Instagram posts",
    instagramUrl: fedupInstagram,
    category: "Official profile",
  },
  {
    title: "51K",
    subtitle: "Founder Instagram followers",
    instagramUrl: brandiInstagram,
    category: "Brandi Johnson",
  },
  {
    title: "112K",
    subtitle: "Co-founder Instagram followers",
    instagramUrl: rashiaInstagram,
    category: "Rashia Wilson",
  },
  {
    title: "11,614",
    subtitle: "Founder Facebook likes",
    instagramUrl: brandiFacebook,
    category: "Brandi Johnson",
  },
  {
    title: "25,843",
    subtitle: "Rashia Facebook likes",
    instagramUrl: rashiaFacebook,
    category: "Rashia Wilson",
  },
  {
    title: "112",
    subtitle: "FEDUP Facebook page likes",
    instagramUrl: fedupFacebook,
    category: "FEDUP Reality Series",
  },
];

export const judgeAnnouncements: FedupContentItem[] = [
  {
    title: "Brandi Johnson",
    subtitle: "Founder",
    imageUrl: "/images/social/brandi-facebook.jpg",
    instagramUrl: brandiFacebook,
    caption:
      "Public founder profile for FEDUP. The page states her role directly and gives the series a real person, real audience, and real accountability behind the brand.",
    handle: "Brandi Johnson",
    category: "Founder",
  },
  {
    title: "Rashia Wilson",
    subtitle: "Co-Founder",
    imageUrl: "/images/social/rashia-facebook.jpg",
    instagramUrl: rashiaFacebook,
    caption:
      "Rashia's public profile connects FEDUP to a visible entertainment personality with an existing audience across Instagram, Facebook, YouTube, and TikTok.",
    handle: "@1stlady_ent",
    category: "Co-Founder",
  },
  {
    title: "FEDUP Reality Series",
    subtitle: "Official Series Channel",
    imageUrl: "/images/social/fedup-facebook-profile.jpg",
    instagramUrl: fedupFacebook,
    caption:
      "The public Facebook page describes FEDUP as a reality series highlighting real stories of women who have overcome adversity.",
    handle: "FedUpRealitySeries",
    category: "Official",
  },
];

export const auditionInfo: FedupContentItem[] = [
  {
    title: "Orlando, Florida",
    subtitle: "Audition city",
    caption: "FEDUP auditions are scheduled for Orlando, Florida.",
    date: "July 11, 2026",
    ctaLabel: "Audition Details",
    ctaHref: "/audition",
  },
  {
    title: "Embassy Suites Orlando I-Drive",
    subtitle: "Hotel and travel hub",
    caption:
      "The audition page keeps hotel information public and professional while reserving private instructions for registered or selected applicants.",
    ctaLabel: "View Hotel",
    ctaHref:
      "https://www.hilton.com/en/hotels/orlies-embassy-suites-orlando-international-drive-convention-center/",
  },
  {
    title: "Apply before you arrive",
    subtitle: "Casting review",
    caption:
      "Applicants should complete the casting application before audition weekend so producers can review story, eligibility, and travel readiness.",
    ctaLabel: "Apply Now",
    ctaHref: "/apply",
  },
];

export const pressOrMedia: FedupContentItem[] = [
  {
    title: "FEDUP Casting Motion",
    subtitle: "Series video asset",
    imageUrl: "/images/banner.png",
    videoUrl: "/images/mainvideo2.mov",
    caption:
      "Existing FEDUP video media anchors the site in the show's own casting visuals instead of stock footage or generated silhouettes.",
    ctaLabel: "View Channel",
    ctaHref: fedupYouTube,
  },
  {
    title: "Founder Audience",
    subtitle: "Brandi Johnson",
    imageUrl: "/images/social/brandi-instagram.jpg",
    instagramUrl: brandiInstagram,
    caption:
      "Brandi Johnson's public Instagram profile shows 51K followers and an active personal platform feeding credibility into the FEDUP casting movement.",
    ctaLabel: "View Founder",
    ctaHref: brandiInstagram,
  },
  {
    title: "Entertainment Reach",
    subtitle: "Rashia Wilson",
    imageUrl: "/images/social/rashia-instagram.jpg",
    instagramUrl: rashiaInstagram,
    caption:
      "Rashia Wilson's public Instagram profile shows 112K followers, adding visible entertainment reach to FEDUP's casting and audience story.",
    ctaLabel: "View Profile",
    ctaHref: rashiaInstagram,
  },
  {
    title: "Public Facebook Presence",
    subtitle: "FEDUP Reality Series",
    imageUrl: "/images/social/fedup-facebook-profile.jpg",
    instagramUrl: fedupFacebook,
    caption:
      "FEDUP Reality Series has an active Facebook page with public series positioning, page likes, and conversation around the launch.",
    ctaLabel: "View Facebook",
    ctaHref: fedupFacebook,
  },
];

export const realQuotes: FedupContentItem[] = [
  {
    quote: "They judged your time. Now let them hear the redemption.",
    title: "Public FEDUP Instagram bio",
    subtitle: "@fedddup_",
  },
  {
    quote:
      "FEDUP is not about perfection. It is about truth, consequence, survival, and purpose.",
    title: "Series thesis",
    subtitle: "Females Ending Defeat. Unleashing Purpose.",
  },
  {
    quote:
      "FED UP is a reality series highlighting the real stories of women who have overcome adversity.",
    title: "Public Facebook description",
    subtitle: "FEDUP Reality Series",
  },
  {
    quote: "Founder of Fedup the reality t.v show.",
    title: "Brandi Johnson public Facebook profile",
    subtitle: "Founder",
  },
];

export const instagramPosts: FedupContentItem[] = [
  {
    title: "LADIES ARE YOU FEDUP?",
    imageUrl: "/images/social/fedup-reel-thumbnail.jpg",
    videoUrl: "/images/mainvideo2.mov",
    instagramUrl: fedupInstagram,
    caption:
      "They judged your time. Now let them hear the redemption. Stories they tried to silence. FEDUP ladies wya?",
    handle: "@fedddup_",
    category: "Official FEDUP",
  },
  {
    title: "Founder: Brandi Johnson",
    imageUrl: "/images/social/brandi-instagram.jpg",
    instagramUrl: brandiInstagram,
    caption:
      "Public founder channel with 51K followers and 92 Instagram posts, giving FEDUP a real person and public audience behind the series.",
    handle: "@doughgirl____",
    category: "Founder",
  },
  {
    title: "Co-Founder: Rashia Wilson",
    imageUrl: "/images/social/rashia-instagram.jpg",
    instagramUrl: rashiaInstagram,
    caption:
      "Rashia Wilson's public Instagram profile shows 112K followers and an established entertainment platform connected to FEDUP.",
    handle: "@1stlady_ent",
    category: "Co-Founder",
  },
  {
    title: "FEDUP Reality Series on Facebook",
    imageUrl: "/images/social/fedup-facebook-profile.jpg",
    instagramUrl: fedupFacebook,
    caption:
      "The public FEDUP Reality Series page describes the show as real stories of women who have overcome adversity.",
    handle: "FedUpRealitySeries",
    category: "Facebook",
  },
];
