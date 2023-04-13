import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, ScrollView, View } from "react-native";

import { SearchMovieList, Text } from "../../components";
import { API_KEY, API_URL } from "../../config/api";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Favorites() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        setGenres(json.genres);
      })
      .catch((error) => console.error(error));

    async function loadFavorite() {
      // get user favorites
      const user = auth.currentUser;
      if (!user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const newMovies: Movie[] = [];
      await Promise.all(
        userData?.favorites.map(async (movieId: number) => {
          const response = await fetch(
            `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
          );
          const movie = await response.json();
          newMovies.push(movie);
        })
      );
      setMovies(newMovies);
      setLoading(false);
    }
    loadFavorite();
  }, [auth]);

  const emptyList = (
    <View style={styles.emptyList}>
      <Text style={styles.emptyText}>You don't have any favorite movies yet.</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <StatusBar style="auto" />
      {isLoading ? (
        <ActivityIndicator />
      ) : movies.length === 0 ? (
        emptyList
      ) : (
        <SearchMovieList movieList={movies} genres={genres} />
      )}
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
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
});
