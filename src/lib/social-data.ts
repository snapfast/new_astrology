export interface SocialPost {
  id: string;
  platform: 'threads' | 'instagram' | 'facebook';
  url: string;
}

export const SOCIAL_PROFILES = {
  threads: "https://www.threads.net/@rahulbaliastro",
  instagram: "https://www.instagram.com/rahulbaliastro",
  facebook: "https://www.facebook.com/people/Rahul-Bali-Astrology/61584860245800/",
  youtube: "https://www.youtube.com/@RahulBaliAstrology",
  linkedin: "https://www.linkedin.com/in/rahulbaliastrology/",
  tumblr: "https://rahulbaliastrology.tumblr.com/",
  reddit: "https://www.reddit.com/r/RahulBaliAstrology/"
};

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'i1',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DF2N43LzRzG/'
  },
  {
    id: 't1',
    platform: 'threads',
    url: 'https://www.threads.net/@rahulbaliastro/post/DFeXzK6z_s-'
  },
  {
    id: 'f1',
    platform: 'facebook',
    url: 'https://www.facebook.com/rahulbaliastrology/posts/pfbid02RzL1zL8p1zL8p1zL8p1zL8p1zL8p1zL8p1zL8p1z'
  }
];
