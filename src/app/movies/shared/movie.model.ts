export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  poster_path?: string;
  poster_url?: string;
  backdrop_path?: string;
  genres?: MovieGenre[];
  spoken_languages: MovieLanguage[];
  production_countries: ProductionCountry[];
  release_date?: string;
  runtime?: number;
  popularity?: number;
  vote_count?: number;
  vote_average?: number;
  video?: boolean;
  original_language?: string;
  overview?: string;
}

export interface MoviesResp {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieLanguage {
  iso_639_1: string;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
