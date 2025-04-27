import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersView() {
  return (
    <SafeAreaView>
      <View>
        <Text>Your Orders</Text>
        <Text>This is where your orders will be displayed </Text>
      </View>
    </SafeAreaView>
  );
}
