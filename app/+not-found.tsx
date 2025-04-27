import { Link, Stack } from "expo-router";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text> Oh boy</Text>
      <Link href="/(tabs)/home"> HOME </Link>
    </>
  );
}
