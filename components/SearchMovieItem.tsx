import { Link } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import Text from "./Text";

type MovieItemProps = {
  movie: Movie,
  genres: Genre[],
};

const MovieItem = ({ movie, genres }: MovieItemProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable>
        {() => (
          <View style={styles.movie}>
            <Image
              style={styles.movieImage}
              source={{ uri: "https://image.tmdb.org/t/p/w500/" + movie.poster_path }}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieYear}>{movie.release_date}</Text>
              <Text>{genres.map((genre) => genre.name).join(", ")}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  movie: {
    flexDirection: "row",
    marginBottom: 16,
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
  },
  movieInfo: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  movieYear: {
    fontSize: 16,
    color: "#666",
  },
});

export default MovieItem;