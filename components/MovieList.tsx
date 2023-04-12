import { ScrollView, StyleSheet } from "react-native";
import Text from "./Text";
import MovieItem from "./MovieItem";

type MovieListProps = {
  title: string;
  movieList: Movie[];
};

const MovieList = ({ title, movieList }: MovieListProps) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal>
        {movieList.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </>
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

export default MovieList;
