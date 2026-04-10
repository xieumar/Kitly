import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/src/constants/colors';
import {
  CURRENCIES,
  EXCHANGE_RATES,
  CURRENCY_FLAGS,
} from '@/src/constants/mockData';

type ConversionCategory = 'Length' | 'Temp' | 'Weight' | 'Currency';

const CATEGORIES: { key: ConversionCategory; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'Length', icon: 'resize-outline' },
  { key: 'Temp', icon: 'thermometer-outline' },
  { key: 'Weight', icon: 'barbell-outline' },
  { key: 'Currency', icon: 'card-outline' },
];

type CurrencyPickerProps = {
  visible: boolean;
  selected: string;
  onSelect: (c: string) => void;
  onClose: () => void;
};

function CurrencyPicker({ visible, selected, onSelect, onClose }: CurrencyPickerProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.pickerSheet}>
          <View style={styles.pickerHandle} />
          <Text style={styles.pickerTitle}>Select Currency</Text>
          <FlatList
            data={CURRENCIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.pickerRow, item === selected && styles.pickerRowActive]}
                onPress={() => { onSelect(item); onClose(); }}
                activeOpacity={0.7}
              >
                <Text style={styles.pickerFlag}>{CURRENCY_FLAGS[item]}</Text>
                <Text style={styles.pickerCurrency}>{item}</Text>
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
}

type ComparisonRowProps = {
  currency: string;
  amount: number;
  change: string;
  positive: boolean;
};

function ComparisonRow({ currency, amount, change, positive }: ComparisonRowProps) {
  return (
    <View style={styles.compRow}>
      <Text style={styles.compFlag}>{CURRENCY_FLAGS[currency]}</Text>
      <Text style={styles.compAmount}>
        {currency === 'GBP' ? '£' : currency === 'JPY' ? '¥' : '₣'}{' '}
        {amount >= 1000 ? `${(amount / 1000).toFixed(1)}K` : amount.toFixed(2)}
      </Text>
      <Text style={[styles.compChange, positive ? styles.changePos : styles.changeNeg]}>
        {change}
      </Text>
    </View>
  );
}

export default function ConverterScreen() {
  const [activeCategory, setActiveCategory] = useState<ConversionCategory>('Currency');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [inputAmount, setInputAmount] = useState('1250');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const convertedAmount = useCallback(() => {
    const num = parseFloat(inputAmount) || 0;
    const inUSD = num / EXCHANGE_RATES[fromCurrency];
    return (inUSD * EXCHANGE_RATES[toCurrency]).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [inputAmount, fromCurrency, toCurrency]);

  const rate = (EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]).toFixed(4);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const comparisons = ['GBP', 'JPY', 'CHF'].map((c) => {
    const num = parseFloat(inputAmount) || 0;
    const inUSD = num / EXCHANGE_RATES[fromCurrency];
    const converted = inUSD * EXCHANGE_RATES[c];
    return { currency: c, amount: converted };
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.logoRow}>
          <Ionicons name="flash" size={18} color={Colors.accent} />
          <Text style={styles.logoText}>KITLY</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(50).duration(400)}>
        <Text style={styles.tagline}>UNIVERSAL PRECISION</Text>
        <Text style={styles.titleLarge}>Unit</Text>
        <Text style={styles.titleGhost}>Converter</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.categoryRow}>
        {CATEGORIES.map(({ key, icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.categoryBtn, activeCategory === key && styles.categoryBtnActive]}
            onPress={() => setActiveCategory(key)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={icon}
              size={14}
              color={activeCategory === key ? Colors.bg : Colors.textSecondary}
            />
            <Text style={[styles.categoryText, activeCategory === key && styles.categoryTextActive]}>
              {key.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {activeCategory === 'Currency' && (
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <View style={styles.converterCard}>
            <Text style={styles.inputLabel}>FROM CURRENCY</Text>
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => setShowFromPicker(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.flagText}>{CURRENCY_FLAGS[fromCurrency]}</Text>
              <Text style={styles.currencyText}>{fromCurrency}</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.amountBox}>
              <TextInput
                style={styles.amountInput}
                value={inputAmount}
                onChangeText={setInputAmount}
                keyboardType="numeric"
                placeholderTextColor={Colors.textMuted}
              />
            </View>

            <TouchableOpacity style={styles.swapBtn} onPress={swapCurrencies} activeOpacity={0.8}>
              <Ionicons name="swap-vertical" size={20} color={Colors.bg} />
            </TouchableOpacity>

            <Text style={styles.inputLabel}>TO CURRENCY</Text>
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => setShowToPicker(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.flagText}>{CURRENCY_FLAGS[toCurrency]}</Text>
              <Text style={styles.currencyText}>{toCurrency}</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.resultBox}>
              <Text style={styles.resultCurrencySymbol}>
                {toCurrency === 'EUR' ? '€' : toCurrency === 'GBP' ? '£' : toCurrency === 'JPY' ? '¥' : '$'}
              </Text>
              <Text style={styles.resultAmount}>{convertedAmount()}</Text>
            </View>

            <View style={styles.rateRow}>
              <Text style={styles.rateText}>
                {`1 ${fromCurrency} = ${rate} ${toCurrency}`}
              </Text>
              <Text style={styles.rateAgo}>0.4s AGO</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE MARKET DATA</Text>
            </View>
          </View>

          <Animated.View entering={FadeInUp.delay(300).duration(400)}>
            {comparisons.map((c, i) => (
              <ComparisonRow
                key={c.currency}
                currency={c.currency}
                amount={c.amount}
                change={i === 0 ? '+0.02%' : i === 1 ? '-0.14%' : '0.00%'}
                positive={i === 0}
              />
            ))}
          </Animated.View>
        </Animated.View>
      )}

      {activeCategory !== 'Currency' && (
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.comingSoon}>
          <Ionicons name="construct-outline" size={32} color={Colors.textMuted} />
          <Text style={styles.comingSoonText}>{activeCategory} converter</Text>
          <Text style={styles.comingSoonSub}>Coming soon</Text>
        </Animated.View>
      )}

      <CurrencyPicker
        visible={showFromPicker}
        selected={fromCurrency}
        onSelect={setFromCurrency}
        onClose={() => setShowFromPicker(false)}
      />
      <CurrencyPicker
        visible={showToPicker}
        selected={toCurrency}
        onSelect={setToCurrency}
        onClose={() => setShowToPicker(false)}
      />
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingTop: 56 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
    color: Colors.textPrimary,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: Colors.accent,
    marginBottom: 4,
  },
  titleLarge: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 50,
  },
  titleGhost: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.textSecondary,
    opacity: 0.3,
    marginBottom: 28,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryBtnActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.textSecondary,
  },
  categoryTextActive: { color: Colors.bg },
  converterCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 10,
    gap: 10,
  },
  flagText: { fontSize: 20 },
  currencyText: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  amountBox: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 16,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  swapBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    padding: 14,
    marginBottom: 16,
  },
  resultCurrencySymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  resultAmount: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.accent,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rateText: { fontSize: 11, color: Colors.textSecondary },
  rateAgo: { fontSize: 9, color: Colors.textMuted, letterSpacing: 0.5 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accentDim,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  liveText: { fontSize: 9, fontWeight: '700', color: Colors.accent, letterSpacing: 1 },
  compRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 8,
    gap: 10,
  },
  compFlag: { fontSize: 18 },
  compAmount: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  compChange: { fontSize: 11, fontWeight: '600' },
  changePos: { color: Colors.accent },
  changeNeg: { color: Colors.danger },
  comingSoon: {
    alignItems: 'center',
    padding: 48,
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  comingSoonText: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  comingSoonSub: { fontSize: 12, color: Colors.textMuted },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: Colors.border,
    padding: 20,
    maxHeight: '60%',
  },
  pickerHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  pickerRowActive: { backgroundColor: Colors.accentDim },
  pickerFlag: { fontSize: 22 },
  pickerCurrency: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
});
