import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";
import { MovieList, Text } from "../../components";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=958f4c13ca4c26bf3dfe94aeccc9b4a0"
    )
      .then((response) => response.json())
      .then((json) => {
        setNowPlaying(json.results);
      })
      .catch((error) => console.error(error));
      
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=958f4c13ca4c26bf3dfe94aeccc9b4a0"
    )
      .then((response) => response.json())
      .then((json) => {
        setPopularMovies(json.results);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <MovieList title="Now Playing" movieList={nowPlaying} />
      <MovieList title="Most Popular" movieList={popularMovies} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
});
