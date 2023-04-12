import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from "expo-status-bar";

import { Text, TextInput } from "../../components";
import SearchMovieList from "../../components/SearchMovieList";
import { API_KEY, API_URL } from "../../config/api";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect

  useEffect(() => {
    if (!search) {
      return;
    }
    fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${search}`
    )
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.results);
      })
      .catch((error) => console.error(error));
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        returnKeyType="search"
      />
      <SearchMovieList movieList={movies} />
      <StatusBar style="auto" />
    </View>
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
