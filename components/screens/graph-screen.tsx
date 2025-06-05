import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export const GraphScreen = () => {
  const [data, setData] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Here we are</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
