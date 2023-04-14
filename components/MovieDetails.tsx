import { Alert, Image, Share, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "./Text";
import { auth, db } from "../config/firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  arrayRemove,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type MovieDetailsProps = {
  movie: Movie;
  genres: Genre[];
};

const MovieDetails = ({ movie, genres }: MovieDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadFavorite() {
      // get user favorites
      const user = auth.currentUser;
      if (!user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      setIsFavorite(userData?.favorites.includes(movie.id));
    }
    loadFavorite();
  }, []);

  const toogleFavorite = async () => {
    // Add/remove movie id to/from user favorites at user.favorites
    const user = auth.currentUser;
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return;
    }
    const userData = userDoc.data();
    if (userData?.favorites.includes(movie.id)) {
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movie.id),
      });
      setIsFavorite(false);
    } else {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movie.id),
      });
      setIsFavorite(true);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: movie.title,
        url: `exp://u.expo.dev/b3343605-c57e-4304-ab16-1c52e079b39e?channel-name=main&runtime-version=exposdk%3A48.0.0&movie-id=${movie.id}`,
        title: "Watch this movie!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

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
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color="white"
              onPress={toogleFavorite}
            />
            <Ionicons
              name="share-outline"
              size={24}
              color="white"
              onPress={onShare}
            />
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
