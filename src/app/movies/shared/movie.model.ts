export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  poster_path?: string;
  poster_url?: string;
  backdrop_path?: string;
  release_date?: string;
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
