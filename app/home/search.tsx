import { useState, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Picker, Text, TextInput, SearchMovieList } from "../../components";
import { API_KEY, API_URL } from "../../config/api";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [genre, setGenre] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const filteredMovies = useMemo(() => {
    if (genre === 0) {
      return movies;
    }
    return movies.filter((movie) => movie.genre_ids.includes(genre));
  }, [movies, genre]);

  useEffect(() => {
    fetch(
      `${API_URL}/genre/movie/list?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        setGenres(json.genres);
      })
      .catch((error) => console.error(error));
  }, []);

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
        <Picker
          selectedValue={genre}
          onValueChange={(itemValue) => setGenre(Number(itemValue))}
          placeholder="Filter by genre"
        >
          <Picker.Item label="Filter by genre" value={0} enabled={false} />
          {genres.map((genre) => (
            <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
          ))}
        </Picker>
      <SearchMovieList movieList={filteredMovies} genres={genres} />
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
