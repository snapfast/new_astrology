export interface SocialPost {
  id: string;
  platform: 'threads' | 'instagram' | 'facebook';
  url: string;
}

export const SOCIAL_PROFILES = {
  threads: "https://www.threads.net/@rahulbaliastro",
  instagram: "https://www.instagram.com/rahulbaliastro",
  facebook: "https://www.facebook.com/people/Rahul-Bali-Astrology/61584860245800/"
};

export const SOCIAL_POSTS: SocialPost[] = [
  // Instagram Posts
  {
    id: 'i1',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DF2N43LzRzG/'
  },
  {
    id: 'i2',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DF0G_tTz5_k/'
  },
  // Threads Posts
  {
    id: 't1',
    platform: 'threads',
    url: 'https://www.threads.net/@rahulbaliastro/post/DFeXzK6z_s-'
  },
  {
    id: 't2',
    platform: 'threads',
    url: 'https://www.threads.net/@rahulbaliastro/post/DFpS-iRz1gI'
  },
  // Facebook Posts
  {
    id: 'f1',
    platform: 'facebook',
    url: 'https://www.facebook.com/rahulbaliastrology/posts/pfbid02RzL1zL8p1zL8p1zL8p1zL8p1zL8p1zL8p1zL8p1z'
  },
  {
    id: 'f2',
    platform: 'facebook',
    url: 'https://www.facebook.com/rahulbaliastrology/posts/pfbid03RzL1zL8p1zL8p1zL8p1zL8p1zL8p1zL8p1zL8p1z'
  }
];
