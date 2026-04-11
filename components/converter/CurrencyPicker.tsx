import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/colors";
import { CURRENCIES, CURRENCY_FLAGS } from "@/src/constants/mockData";

type Props = {
  visible: boolean;
  selected: string;
  onSelect: (c: string) => void;
  onClose: () => void;
};

const CurrencyPicker = ({ visible, selected, onSelect, onClose }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Select Currency</Text>

          <FlatList
            data={CURRENCIES}
            keyExtractor={(item) => item} // ✅ GOOD
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.row, item === selected && styles.active]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text>{CURRENCY_FLAGS[item]}</Text>
                <Text style={styles.currency}>{item}</Text>
                {item === selected && <Ionicons name="checkmark" size={16} />}
              </TouchableOpacity>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default CurrencyPicker;

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: Colors.overlay },
  sheet: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", gap: 12, paddingVertical: 12 },
  active: { backgroundColor: Colors.accentDim },
  currency: { flex: 1 },
});