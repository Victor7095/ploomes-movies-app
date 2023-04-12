import { FlatList, StyleSheet } from "react-native";
import Text from "./Text";
import SearchMovieItem from "./SearchMovieItem";

type SearchMovieListProps = {
  movieList: Movie[];
};

const SearchMovieList = ({ movieList }: SearchMovieListProps) => {
  return (
    <FlatList
      data={movieList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <SearchMovieItem movie={item} />}
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
