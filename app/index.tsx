import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Button, Text, TextInput } from "../components";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("12345678");

  const { firebaseEmailPasswordSignIn } = useAuth();
  const router = useRouter();

  const validate = () => {
    if (email === "") {
      alert("Email is required");
      return false;
    }
    if (password === "") {
      alert("Password is required");
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!validate()) return;
    console.log("login");
    firebaseEmailPasswordSignIn(email, password)
      .then((response) => {
        // Signed in
        const {authData, userDocument} = response;
        console.log(authData, userDocument)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/poster.jpg")}
      />
      <LinearGradient
        colors={["rgba(0,0,0, 0.5)", "#040f26"]}
        style={styles.gradient}
        locations={[0.2, 0.8]}
      />
      <Ionicons
        name="videocam-outline"
        style={styles.logo}
        size={256}
        color="yellowgreen"
      />
      <Text style={styles.title}>Buscador de filmes</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button onPress={submit}>
        <Text>SIGN IN</Text>
      </Button>

      <Link href="/register" asChild style={styles.registerLink}>
        <Pressable>
          <Text>Don't have an account? Register</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    paddingTop: 90,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 60,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    position: "absolute",
  },
  gradient: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  form: {
    paddingHorizontal: 20,
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "center",
    marginBottom: 20,
  },
  registerLink: {
    marginTop: 20,
  },
});
