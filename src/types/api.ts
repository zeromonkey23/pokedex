export interface InputParams {
  [key:string]: unknown;
  limit: number,
  offset: number
}

export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  prev: string | null;
  results: Array<NamedResource>;
}

export interface NamedResource {
  name: string;
  url: string;
}