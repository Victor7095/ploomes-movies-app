import { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

type PickerProps = {
  value: DropDownPickerProps<any>["value"];
  items: any[];
  setValue: DropDownPickerProps<any>["setValue"];
  placeholder: string;
  schema: DropDownPickerProps<any>["schema"];
};

export default function Picker({
  value,
  items,
  schema,
  placeholder,
  setValue,
}: PickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      schema={schema}
      placeholder={placeholder}
      style={styles.default}
      textStyle={styles.text}
      placeholderStyle={styles.placeholder}
      dropDownContainerStyle={styles.dropDownStyle}
      ArrowUpIconComponent={() => (
        <Ionicons name="chevron-up-outline" size={20} color="#fff" />
      )}
      ArrowDownIconComponent={() => (
        <Ionicons name="chevron-down-outline" size={20} color="#fff" />
      )}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#222",
    marginBottom: 10,
    color: "#fff",
    minHeight: 40,
  },
  dropDownStyle: {
    backgroundColor: "#222",
  },
  text: {
    color: "#fff",
  },
  placeholder: {
    color: "#999",
  },
});
