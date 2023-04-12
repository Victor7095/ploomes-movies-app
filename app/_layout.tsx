// App layout
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { FirebaseProvider as AuthProvider } from "../contexts/AuthContext";
import { store, persister } from "../store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persister}>
        <AuthProvider>
          <View style={styles.container}>
            <Slot />
          </View>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040f26",
  },
});
