export interface PersonajeResponse {
  count: number;
  next: string;
  prev: null;
  pages: number;
  results: Personaje[];
}

export interface Personaje {
  id: number;
  age: number | null;
  birthdate: Date | null;
  gender: Gender;
  name: string;
  occupation: string;
  portrait_path: string;
  phrases: string[];
  status: Status;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
}

export enum Status {
  Alive = "Alive",
  Deceased = "Deceased",
}
