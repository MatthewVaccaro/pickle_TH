import { Colors } from "@/constants/Colors";
import { Heading } from "@/shared/headers";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersView() {
  return (
    <SafeAreaView style={Style.contianer}>
      <View style={Style.contianer}>
        <Heading.H2> Your Orders </Heading.H2>
        <Heading.P style={Style.subline}>
          This is where your orders will be displayed
        </Heading.P>
      </View>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  subline: {
    color: Colors.black.mid,
  },
});
