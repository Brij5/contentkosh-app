const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@contentkosh.com',
    password: 'Admin@123',
    role: 'admin',
    isVerified: true
  },
  {
    name: 'Test User',
    email: 'test@contentkosh.com',
    password: 'Test@123',
    role: 'user',
    isVerified: true
  }
];

const testServices = [
  {
    title: 'Content Writing',
    description: 'Professional content writing services for your business',
    icon: '✍️',
    iconUrl: 'https://contentkosh.com/icons/content-writing.svg',
    category: 'academic',
    status: 'active',
    features: ['SEO Optimized', 'Original Content', 'Quick Delivery'],
    pricing: {
      basic: 49,
      standard: 99,
      premium: 199
    }
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings',
    icon: '🔍',
    iconUrl: 'https://contentkosh.com/icons/seo.svg',
    category: 'marketing',
    status: 'active',
    features: ['Keyword Research', 'On-page SEO', 'Link Building'],
    pricing: {
      basic: 99,
      standard: 199,
      premium: 399
    }
  },
  {
    title: 'Social Media Management',
    description: 'Manage your social media presence effectively',
    icon: '📱',
    iconUrl: 'https://contentkosh.com/icons/social-media.svg',
    category: 'marketing',
    status: 'active',
    features: ['Content Calendar', 'Analytics', 'Engagement'],
    pricing: {
      basic: 79,
      standard: 149,
      premium: 299
    }
  }
];

const testContent = [
  {
    title: 'Getting Started with Content Marketing',
    description: 'Learn the basics of content marketing',
    content: 'Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action.',
    type: 'article',
    status: 'published',
    tags: ['marketing', 'content', 'beginner'],
    readTime: '5 min'
  },
  {
    title: 'SEO Best Practices 2024',
    description: 'Latest SEO techniques and strategies',
    content: 'Search Engine Optimization (SEO) continues to evolve. Stay ahead of the competition by implementing these proven strategies that work in 2024.',
    type: 'article',
    status: 'published',
    tags: ['seo', 'marketing', 'guide'],
    readTime: '10 min'
  }
];

module.exports = {
  testUsers,
  testServices,
  testContent
}; 