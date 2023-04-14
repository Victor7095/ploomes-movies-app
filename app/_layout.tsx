// App layout
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { FirebaseProvider as AuthProvider } from "../contexts/AuthContext";
import { store, persister } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const url = Linking.useURL();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (url) {
      const { hostname, path, queryParams } = Linking.parse(url);

      console.log(
        `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
          queryParams
        )}`
      );
    }
  }, [url]);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persister}>
        <AuthProvider>
          <SafeAreaProvider>
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <Slot />
            </View>
          </SafeAreaProvider>
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
