import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

import { Button, Text, TextInput } from "../components";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [username, setUsername] = useState("testuser");
  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");

  const { firebaseRegister } = useAuth();
  const router = useRouter();

  const validate = () => {
    if (username === "") {
      alert("Username is required");
      return false;
    }
    if (email === "") {
      alert("Email is required");
      return false;
    }
    if (password === "") {
      alert("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const register = () => {
    if (!validate()) return;
    console.log("register");
    firebaseRegister(username, email, password)
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

      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
        <View style={styles.formRow}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{ width: "49%" }}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={{ width: "50%" }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <Button onPress={register}>
        <Text>SIGN UP</Text>
      </Button>

      <Link href="/" asChild style={styles.loginLink}>
        <Pressable>
          {() => <Text>Already have an account? Login</Text>}
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
  title: {
    marginTop: 90,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 60,
  },
  form: {
    paddingHorizontal: 20,
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "center",
    marginBottom: 20,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginLink: {
    marginTop: 20,
  },
});
