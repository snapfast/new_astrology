export interface PanchPakshiActivity {
  timeSlot: string;
  activity: string;
  color: string;
}

export interface PanchPakshiDayData {
  bird: string;
  activities: PanchPakshiActivity[];
}

export const NAKSHATRA_BIRD_MAPPING: Record<string, { Shukla: string, Krishna: string }> = {
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
