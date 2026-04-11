import React, { useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";


import { Colors } from "@/src/constants/colors";
import {
  EXCHANGE_RATES,
} from "@/src/constants/mockData";


import Header from "@/components/converter/Header";
import CategoryTabs from "@/components/converter/CategoryTabs";
import ConverterCard from "@/components/converter/ConverterCard";
import CurrencyPicker from "@/components/converter/CurrencyPicker";
import ComparisonRow from "@/components/converter/ComparisonRow";


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


  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [inputAmount, setInputAmount] = useState("1250");


  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);


  const convertedAmount = useCallback(() => {
    const num = parseFloat(inputAmount) || 0;
    const inUSD = num / EXCHANGE_RATES[fromCurrency];
    return (inUSD * EXCHANGE_RATES[toCurrency]).toFixed(2);
  }, [inputAmount, fromCurrency, toCurrency]);


  const rate = (
    EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]
  ).toFixed(4);


  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };


  const comparisons = ["GBP", "JPY", "CHF"].map((c) => {
    const num = parseFloat(inputAmount) || 0;
    const inUSD = num / EXCHANGE_RATES[fromCurrency];
    const converted = inUSD * EXCHANGE_RATES[c];
    return { currency: c, amount: converted };
  });


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

        {activeCategory === "Currency" && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <ConverterCard
              from={fromCurrency}
              to={toCurrency}
              amount={inputAmount}
              result={convertedAmount()}
              rate={`1 ${fromCurrency} = ${rate} ${toCurrency}`}
              onChangeAmount={setInputAmount}
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

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}