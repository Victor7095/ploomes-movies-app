import { Image, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from ".";

type MovieDetailsProps = {
  movie: Movie;
  genres: Genre[];
};

const MovieDetails = ({ movie, genres }: MovieDetailsProps) => {
  return (
    <>
      <View style={styles.movie}>
        <Image
          style={styles.movieImage}
          source={{
            uri: "https://image.tmdb.org/t/p/w500/" + movie.poster_path,
          }}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieYear}>{movie.release_date}</Text>
          <Text>{genres.map((genre) => genre.name).join(", ")}</Text>
          <View style={styles.actions}>
            <Ionicons name="heart-outline" size={24} color="white" />
            <Ionicons name="share-outline" size={24} color="white" />
          </View>
        </View>
      </View>
      <Text style={styles.movieTitle}>Overview</Text>
      <Text>{movie.overview}</Text>
    </>
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
  actions: {
    flexDirection: "row",
  },
});

export default MovieDetails;
