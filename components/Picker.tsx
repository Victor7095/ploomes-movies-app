import { Picker as DefaultPicker, PickerProps } from "@react-native-picker/picker";
import {
  StyleSheet,
} from "react-native";

export default function Picker(props: PickerProps) {
  return <DefaultPicker {...props} style={[props.style, styles.default]} />;
}
Picker.Item = DefaultPicker.Item;

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
