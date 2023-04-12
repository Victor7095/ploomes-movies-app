import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";
import { MovieList, Text } from "../../components";
import { API_KEY, API_URL } from "../../config/api";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      `${API_URL}/movie/now_playing?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        setNowPlaying(json.results);
      })
      .catch((error) => console.error(error));
      
    fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}`
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
