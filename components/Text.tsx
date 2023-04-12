import { Text as DefaultText, TextProps, StyleSheet } from "react-native";

export default function AppText(props: TextProps) {
  return <DefaultText {...props} style={[props.style, styles.default]} />;
};

const styles = StyleSheet.create({
  default: {
    color: "#fff",
  }
});