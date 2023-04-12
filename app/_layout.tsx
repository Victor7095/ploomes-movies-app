// App layout
import { StyleSheet, View } from "react-native";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { FirebaseProvider as AuthProvider } from "../contexts/AuthContext";
import { store } from '../store';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <View style={styles.container}>
          <Slot />
        </View>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040f26",
  },
});
