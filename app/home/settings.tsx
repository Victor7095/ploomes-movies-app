import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "../../components";
import useAuth from "../../hooks/useAuth";

export default function Settings() {
  const { user, logout } = useAuth();

  useEffect(() => {
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <StatusBar style="auto" />
      <Text style={styles.line}>Logged in as {user?.username}</Text>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
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
  line: {
    fontSize: 14,
    marginBottom: 20,
  },
});
