type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  genres?: Genre[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
};