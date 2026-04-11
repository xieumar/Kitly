import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";


import { Colors } from "@/src/constants/colors";
import {
  EXCHANGE_RATES,
} from "@/src/constants/mockData";


import CategoryTabs from "@/components/converter/CategoryTabs";
import ComparisonRow from "@/components/converter/ComparisonRow";
import ConverterCard from "@/components/converter/ConverterCard";
import CurrencyPicker from "@/components/converter/CurrencyPicker";
import Header from "@/components/converter/Header";
import LengthConverter from "@/components/converter/LengthConverter";
import TempConverter from "@/components/converter/TempConverter";
import WeightConverter from "@/components/converter/WeightConverter";


type ConversionCategory = "Length" | "Temp" | "Weight" | "Currency";


const CATEGORIES = [
  { key: "Length", icon: "resize-outline" },
  { key: "Temp", icon: "thermometer-outline" },
  { key: "Weight", icon: "barbell-outline" },
  { key: "Currency", icon: "card-outline" },
] as const;


export default function ConverterScreen() {
  const [activeCategory, setActiveCategory] =
    useState<ConversionCategory>("Currency");


  // ── Currency state ──────────────────────────────────────────────────────
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencyAmount, setCurrencyAmount] = useState("1250");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const convertedAmount = useCallback(() => {
    const num = parseFloat(currencyAmount) || 0;
    const inUSD = num / EXCHANGE_RATES[fromCurrency];
    return (inUSD * EXCHANGE_RATES[toCurrency]).toFixed(2);
  }, [currencyAmount, fromCurrency, toCurrency]);

  const rate = (
    EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]
  ).toFixed(4);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const comparisons = ["GBP", "JPY", "CHF"].map((c) => {
    const num = parseFloat(currencyAmount) || 0;
    const inUSD = num / EXCHANGE_RATES[fromCurrency];
    const converted = inUSD * EXCHANGE_RATES[c];
    return { currency: c, amount: converted };
  });


  // ── Length state ─────────────────────────────────────────────────────────
  const [lengthValue, setLengthValue] = useState("1");
  const [lengthFrom, setLengthFrom] = useState("m");
  const [lengthTo, setLengthTo] = useState("ft");


  // ── Temperature state ────────────────────────────────────────────────────
  const [tempValue, setTempValue] = useState("100");
  const [tempFrom, setTempFrom] = useState("C");
  const [tempTo, setTempTo] = useState("F");


  // ── Weight state ─────────────────────────────────────────────────────────
  const [weightValue, setWeightValue] = useState("1");
  const [weightFrom, setWeightFrom] = useState("kg");
  const [weightTo, setWeightTo] = useState("lb");


  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.bg }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Header />

        <CategoryTabs
          categories={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {/* ── Currency ──────────────────────────────────────────────────── */}
        {activeCategory === "Currency" && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <ConverterCard
              from={fromCurrency}
              to={toCurrency}
              amount={currencyAmount}
              result={convertedAmount()}
              rate={`1 ${fromCurrency} = ${rate} ${toCurrency}`}
              onChangeAmount={setCurrencyAmount}
              onSwap={swapCurrencies}
              onOpenFrom={() => setShowFromPicker(true)}
              onOpenTo={() => setShowToPicker(true)}
            />

            <Animated.View entering={FadeInUp.delay(200)}>
              {comparisons.map((c, i) => (
                <ComparisonRow
                  key={c.currency}
                  currency={c.currency}
                  amount={c.amount}
                  change={
                    i === 0 ? "+0.02%" : i === 1 ? "-0.14%" : "0.00%"
                  }
                  positive={i === 0}
                />
              ))}
            </Animated.View>
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

        {/* ── Length ────────────────────────────────────────────────────── */}
        {activeCategory === "Length" && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <LengthConverter
              value={lengthValue}
              onChange={setLengthValue}
              fromUnit={lengthFrom}
              toUnit={lengthTo}
              onFromUnit={setLengthFrom}
              onToUnit={setLengthTo}
            />
          </Animated.View>
        )}

        {/* ── Temperature ───────────────────────────────────────────────── */}
        {activeCategory === "Temp" && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <TempConverter
              value={tempValue}
              onChange={setTempValue}
              fromUnit={tempFrom}
              toUnit={tempTo}
              onFromUnit={setTempFrom}
              onToUnit={setTempTo}
            />
          </Animated.View>
        )}

        {/* ── Weight ────────────────────────────────────────────────────── */}
        {activeCategory === "Weight" && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <WeightConverter
              value={weightValue}
              onChange={setWeightValue}
              fromUnit={weightFrom}
              toUnit={weightTo}
              onFromUnit={setWeightFrom}
              onToUnit={setWeightTo}
            />
          </Animated.View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}