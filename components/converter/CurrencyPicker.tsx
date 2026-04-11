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
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.row, item === selected && styles.active]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.flag}>{CURRENCY_FLAGS[item]}</Text>

                <Text style={styles.currency}>{item}</Text>

                {item === selected && (
                  <Ionicons name="checkmark" size={16} color={Colors.accent} />
                )}
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
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "60%",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  active: {
    backgroundColor: Colors.accentDim,
    borderRadius: 10,
  },
  flag: {
    fontSize: 18,
  },
  currency: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
});