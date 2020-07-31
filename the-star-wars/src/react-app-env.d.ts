// / <reference types="react-scripts" />

interface Data {
  count: number;
  next: null;
  previous: null;
  results: Array<Film>;
}

interface Film {
  characters: Array<string>;
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: Array<string>;
  producer: string;
  release_date: string;
  species: Array<string>;
  starships: Array<string>;
  title: string;
  url: string;
  vehicles: Array<string>;
  id?: number;
}

interface People {
  count: number;
  next: null | string;
  previous: null;
  results: Array<Human>;
}

interface Human {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  created: string;
  edited: string;
  url: string;
  id?: number;
}

interface Planets {
  count: number;
  next: null | string;
  previous: null;
  results: Array<Planet>;
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: Array<string>;
  residents: Array<string>;
  created: string;
  edited: string;
  url: string;
}

interface Starships {
  count: number;
  next: null | string;
  previous: null;
  results: Array<Starship>;
}

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  films: Array<string>;
  pilots: Array<string>;
  created: string;
  edited: string;
  url: string;
}

interface Vehicles {
  count: number;
  next: null | string;
  previous: null;
  results: Array<Vehicle>;
}

interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  films: Array<string>;
  pilots: Array<string>;
  created: string;
  edited: string;
  url: string;
}

interface Kinds {
  count: number;
  next: null | string;
  previous: null;
  results: Array<Species>;
}

interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  language: string;
  homeworld: string;
  films: Array<string>;
  people: Array<string>;
  created: string;
  edited: string;
  url: string;
}
