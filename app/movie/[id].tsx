import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Button, MovieDetails, Text } from "../../components";
import { useRouter, useSearchParams, useNavigation } from "expo-router";
import { API_KEY, API_URL } from "../../config/api";

export default function Settings() {
  const { id } = useSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovie(data));
  }, [id]);

  return (
    <View style={styles.container}>
      {movie && (
        <Image
          style={styles.backgroundImage}
          source={{
            uri: "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path,
          }}
        />
      )}
      <LinearGradient
        colors={["rgba(0,0,0, 0.5)", "#040f26"]}
        style={styles.gradient}
        locations={[0.1, 0.3]}
      />
      <View style={styles.movieDetails}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={
            navigation.canGoBack()
              ? navigation.goBack
              : () => router.replace("/")
          }
        />
        <Text style={styles.title}>Movie Details</Text>
        {movie && <MovieDetails movie={movie} genres={movie.genres!} />}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieDetails: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    position: "absolute",
    width: "100%",
    height: "30%",
  },
  gradient: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
});
