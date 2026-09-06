export interface Review {
  id: number;
  name: string;
  date: string;
  review: string;
}

export interface Suggestion {
  name: string;
  lat: string;
  lon: string;
}

export interface StoredChartData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  coords: { lat: string; lon: string } | null;
}
