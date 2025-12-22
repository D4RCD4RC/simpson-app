export interface LocationResponse {
  count:   number;
  next:    string;
  prev:    null;
  pages:   number;
  results: Location[];
}

export interface Location {
  id:         number;
  name:       string;
  image_path: string;
  town:       Town;
  use:        string;
}

export enum Town {
  Empty = "",
  Springfield = "Springfield",
  SpringfieldCapitalCity = "Springfield, Capital City",
}
