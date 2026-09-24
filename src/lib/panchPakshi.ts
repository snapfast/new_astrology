export interface PanchPakshiActivity {
  timeSlot: string;
  activity: string;
  color: string;
}

export interface PanchPakshiDayData {
  bird: string;
  activities: PanchPakshiActivity[];
}

export interface BirdAttributes {
  planet: string;
  element: string;
  direction: string;
  friendlyBirds: string[];
  enemyBirds: string[];
  description: string;
}

export interface ActivityGuidance {
  title: string;
  hindiTitle: string;
  summary: string;
  recommended: string[];
  avoid: string[];
  badgeColor: string;
}

export const NAKSHATRA_BIRD_MAPPING: Record<string, { Shukla: string; Krishna: string }> = {
  "Ashwini": { "Shukla": "Vulture", "Krishna": "Peacock" },
  "Bharani": { "Shukla": "Vulture", "Krishna": "Peacock" },
  "Krittika": { "Shukla": "Vulture", "Krishna": "Peacock" },
  "Rohini": { "Shukla": "Vulture", "Krishna": "Peacock" },
  "Mrigashira": { "Shukla": "Vulture", "Krishna": "Peacock" },
  "Ardra": { "Shukla": "Owl", "Krishna": "Rooster" },
  "Punarvasu": { "Shukla": "Owl", "Krishna": "Rooster" },
  "Pushya": { "Shukla": "Owl", "Krishna": "Rooster" },
  "Ashlesha": { "Shukla": "Owl", "Krishna": "Rooster" },
  "Magha": { "Shukla": "Owl", "Krishna": "Rooster" },
  "Purva Phalguni": { "Shukla": "Owl", "Krishna": "Rooster" },
  "Uttara Phalguni": { "Shukla": "Crow", "Krishna": "Crow" },
  "Hasta": { "Shukla": "Crow", "Krishna": "Crow" },
  "Chitra": { "Shukla": "Crow", "Krishna": "Crow" },
  "Swati": { "Shukla": "Crow", "Krishna": "Crow" },
  "Vishakha": { "Shukla": "Crow", "Krishna": "Crow" },
  "Anuradha": { "Shukla": "Rooster", "Krishna": "Owl" },
  "Jyeshtha": { "Shukla": "Rooster", "Krishna": "Owl" },
  "Mula": { "Shukla": "Rooster", "Krishna": "Owl" },
  "Purva Ashadha": { "Shukla": "Rooster", "Krishna": "Owl" },
  "Uttara Ashadha": { "Shukla": "Rooster", "Krishna": "Owl" },
  "Shravana": { "Shukla": "Peacock", "Krishna": "Vulture" },
  "Dhanishta": { "Shukla": "Peacock", "Krishna": "Vulture" },
  "Shatabhisha": { "Shukla": "Peacock", "Krishna": "Vulture" },
  "Purva Bhadrapada": { "Shukla": "Peacock", "Krishna": "Vulture" },
  "Uttara Bhadrapada": { "Shukla": "Peacock", "Krishna": "Vulture" },
  "Revati": { "Shukla": "Peacock", "Krishna": "Vulture" }
};

export const BIRDS = ["Vulture", "Owl", "Crow", "Rooster", "Peacock"];

export const BIRD_TRANSLATIONS: Record<string, string> = {
  "Vulture": "गिद्ध",
  "Owl": "उल्लू",
  "Crow": "कौआ",
  "Rooster": "मुर्गा",
  "Peacock": "मोर"
};

export const BIRD_DETAILS: Record<string, BirdAttributes> = {
  "Vulture": {
    planet: "Sun (सूर्य)",
    element: "Fire (Agni / अग्नि)",
    direction: "East (पूर्व)",
    friendlyBirds: ["Owl", "Peacock"],
    enemyBirds: ["Crow", "Rooster"],
    description: "Symbolizes sharp vision, authority, determination, and strategic dominance."
  },
  "Owl": {
    planet: "Moon (चंद्र)",
    element: "Water (Jal / जल)",
    direction: "North (उत्तर)",
    friendlyBirds: ["Vulture", "Rooster"],
    enemyBirds: ["Crow", "Peacock"],
    description: "Symbolizes deep intuition, sharp nocturnal intellect, wisdom, and analytical focus."
  },
  "Crow": {
    planet: "Mars (मंगल)",
    element: "Earth (Prithvi / पृथ्वी)",
    direction: "South (दक्षिण)",
    friendlyBirds: ["Peacock", "Rooster"],
    enemyBirds: ["Vulture", "Owl"],
    description: "Symbolizes practical ingenuity, high adaptability, persistence, and alertness."
  },
  "Rooster": {
    planet: "Jupiter (गुरु)",
    element: "Ether (Akash / आकाश)",
    direction: "Center / North-East (ईशान)",
    friendlyBirds: ["Owl", "Crow"],
    enemyBirds: ["Vulture", "Peacock"],
    description: "Symbolizes punctual discipline, vibrant energy, leadership, and optimism."
  },
  "Peacock": {
    planet: "Saturn (शनि)",
    element: "Air (Vayu / वायु)",
    direction: "West (पश्चिम)",
    friendlyBirds: ["Vulture", "Crow"],
    enemyBirds: ["Owl", "Rooster"],
    description: "Symbolizes grace, magnetic influence, artistic finesse, and regal stature."
  }
};

export const ACTIVITY_GUIDANCE: Record<string, ActivityGuidance> = {
  "Ruling": {
    title: "Ruling State (राज)",
    hindiTitle: "शासन / राज कार्य",
    summary: "Peak power phase. Ideal for high-impact decisions, leadership, and critical milestones.",
    recommended: [
      "Launching new business ventures & projects",
      "Signing major legal contracts & agreements",
      "High-stakes negotiations & government meetings",
      "Appearing for interviews or court hearings"
    ],
    avoid: [
      "Procrastination or passive work",
      "Surrendering leadership initiative to others"
    ],
    badgeColor: "bg-success/20 text-success border-success/30"
  },
  "Eating": {
    title: "Eating State (भोजन)",
    hindiTitle: "भोजन / संवर्धन कार्य",
    summary: "Growth and nourishment phase. Great for steady progress, financial planning, and learning.",
    recommended: [
      "Skill acquisition, studies & deep learning",
      "Financial investments & budgeting",
      "Team bonding & relationship building",
      "Strategic planning & creative drafting"
    ],
    avoid: [
      "Aggressive confrontations or disputes",
      "Impulsive financial gambles"
    ],
    badgeColor: "bg-info/20 text-info border-info/30"
  },
  "Walking": {
    title: "Walking State (गमन)",
    hindiTitle: "गमन / निरंतर कार्य",
    summary: "Moderate activity phase. Favorable for movement, travel, routine execution, and networking.",
    recommended: [
      "Business travel & client field visits",
      "Routine operational & administrative tasks",
      "Networking & general communications",
      "Physical exercise & movement"
    ],
    avoid: [
      "Finalizing multi-year binding contracts",
      "Making permanent high-risk commitments"
    ],
    badgeColor: "bg-warning/20 text-warning border-warning/30"
  },
  "Sleeping": {
    title: "Sleeping State (शयन)",
    hindiTitle: "शयन / विश्राम",
    summary: "Inactive resting phase. Best utilized for re-energizing, internal review, and quiet reflection.",
    recommended: [
      "Rest, relaxation & physical recovery",
      "Meditation & spiritual practice",
      "Behind-the-scenes research & audit",
      "Quiet solitude & light planning"
    ],
    avoid: [
      "Public speaking or major launches",
      "Initiating competitive confrontations",
      "Signing critical business documents"
    ],
    badgeColor: "bg-on-surface/10 text-on-surface border-on-surface/20"
  },
  "Dying": {
    title: "Dying State (मरण)",
    hindiTitle: "मरण / निष्क्रिय काल",
    summary: "Inauspicious passive phase. Avoid critical commitments or risky activities.",
    recommended: [
      "Solitary routine work & maintenance",
      "Meditation & spiritual surrendering",
      "Taking a planned mental break"
    ],
    avoid: [
      "Starting any new venture or project",
      "High-value financial transactions",
      "Long-distance travel or medical procedures",
      "Heated debates or resolving conflicts"
    ],
    badgeColor: "bg-error/20 text-error border-error/30"
  }
};

export const MOCK_PANCH_PAKSHI_DATA: Record<string, PanchPakshiDayData> = {
  "Vulture": {
    bird: "Vulture",
    activities: [
      { timeSlot: "06:00 - 08:24", activity: "Ruling", color: "bg-success/20 text-success" },
      { timeSlot: "08:24 - 10:48", activity: "Eating", color: "bg-info/20 text-info" },
      { timeSlot: "10:48 - 13:12", activity: "Walking", color: "bg-warning/20 text-warning" },
      { timeSlot: "13:12 - 15:36", activity: "Sleeping", color: "bg-on-surface/10 text-on-surface" },
      { timeSlot: "15:36 - 18:00", activity: "Dying", color: "bg-error/20 text-error" },
    ]
  },
  "Owl": {
    bird: "Owl",
    activities: [
      { timeSlot: "06:00 - 08:24", activity: "Eating", color: "bg-info/20 text-info" },
      { timeSlot: "08:24 - 10:48", activity: "Walking", color: "bg-warning/20 text-warning" },
      { timeSlot: "10:48 - 13:12", activity: "Sleeping", color: "bg-on-surface/10 text-on-surface" },
      { timeSlot: "13:12 - 15:36", activity: "Dying", color: "bg-error/20 text-error" },
      { timeSlot: "15:36 - 18:00", activity: "Ruling", color: "bg-success/20 text-success" },
    ]
  },
  "Crow": {
    bird: "Crow",
    activities: [
      { timeSlot: "06:00 - 08:24", activity: "Walking", color: "bg-warning/20 text-warning" },
      { timeSlot: "08:24 - 10:48", activity: "Sleeping", color: "bg-on-surface/10 text-on-surface" },
      { timeSlot: "10:48 - 13:12", activity: "Dying", color: "bg-error/20 text-error" },
      { timeSlot: "13:12 - 15:36", activity: "Ruling", color: "bg-success/20 text-success" },
      { timeSlot: "15:36 - 18:00", activity: "Eating", color: "bg-info/20 text-info" },
    ]
  },
  "Rooster": {
    bird: "Rooster",
    activities: [
      { timeSlot: "06:00 - 08:24", activity: "Sleeping", color: "bg-on-surface/10 text-on-surface" },
      { timeSlot: "08:24 - 10:48", activity: "Dying", color: "bg-error/20 text-error" },
      { timeSlot: "10:48 - 13:12", activity: "Ruling", color: "bg-success/20 text-success" },
      { timeSlot: "13:12 - 15:36", activity: "Eating", color: "bg-info/20 text-info" },
      { timeSlot: "15:36 - 18:00", activity: "Walking", color: "bg-warning/20 text-warning" },
    ]
  },
  "Peacock": {
    bird: "Peacock",
    activities: [
      { timeSlot: "06:00 - 08:24", activity: "Dying", color: "bg-error/20 text-error" },
      { timeSlot: "08:24 - 10:48", activity: "Ruling", color: "bg-success/20 text-success" },
      { timeSlot: "10:48 - 13:12", activity: "Eating", color: "bg-info/20 text-info" },
      { timeSlot: "13:12 - 15:36", activity: "Walking", color: "bg-warning/20 text-warning" },
      { timeSlot: "15:36 - 18:00", activity: "Sleeping", color: "bg-on-surface/10 text-on-surface" },
    ]
  }
};

export function getPanchPakshiSchedule(bird: string): PanchPakshiDayData {
  return MOCK_PANCH_PAKSHI_DATA[bird] || MOCK_PANCH_PAKSHI_DATA["Vulture"];
}
