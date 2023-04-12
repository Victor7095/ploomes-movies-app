import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export default function Button(props: TouchableOpacityProps) {
  return <TouchableOpacity {...props} style={[props.style, styles.default]} />;
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    backgroundColor: "purple",
  },
});
