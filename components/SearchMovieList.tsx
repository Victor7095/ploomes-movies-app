import { FlatList, StyleSheet } from "react-native";
import SearchMovieItem from "./SearchMovieItem";

type SearchMovieListProps = {
  movieList: Movie[];
  genres: Genre[];
};

const SearchMovieList = ({ movieList, genres }: SearchMovieListProps) => {
  return (
    <FlatList
      data={movieList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        let movieGenres: Genre[] = [];
        if (item.genre_ids) {
          movieGenres = genres.filter((genre) =>
            item.genre_ids.includes(genre.id)
          );
        } else if (item.genres) {
          movieGenres = item.genres;
        }
        return <SearchMovieItem movie={item} genres={movieGenres} />;
      }}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SearchMovieList;
