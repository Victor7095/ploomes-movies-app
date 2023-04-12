import { useState } from "react";
import {
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
} from "react-native";

export default function TextInput(props: TextInputProps) {
  const [mainColor, setMainColor] = useState("#999");

  return (
    <DefaultTextInput
      {...props}
      style={[props.style, styles.default, { borderColor: mainColor }]}
      placeholderTextColor="#999"
      onFocus={() => setMainColor("yellowgreen")}
      onBlur={() => setMainColor("#999")}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    backgroundColor: "#222",
    marginBottom: 10,
    color: "#fff",
  },
});
