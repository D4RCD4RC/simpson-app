export interface EpisodioResponse {
  count:   number;
  next:    string;
  prev:    string;
  pages:   number;
  results: Episodio[];
}

export interface Episodio {
  id:             number;
  airdate:        Date;
  episode_number: number;
  image_path:     string;
  name:           string;
  season:         number;
  synopsis:       string;
}
