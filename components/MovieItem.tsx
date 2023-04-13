import { Link } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import { Text } from "../components";

type MovieItemProps = {
  movie: Movie
};

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable>
        {() => (
          <View style={styles.movie}>
            <Image
              style={styles.movieImage}
              source={{ uri: "https://image.tmdb.org/t/p/w500/" + movie.poster_path }}
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  movie: {
    flexDirection: "row",
    alignItems: "center",
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
  },
  movieInfo: {
    flex: 1,
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