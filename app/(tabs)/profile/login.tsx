import { login, User } from "@/api/user";
import { useUserStore } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const { dismissAll, push } = useRouter();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const setter = useUserStore((method) => method.setter);
  const [form, setForm] = useState({
    email: "jimmie@gmail.com",
    password: "klein*#%*",
  });

  // Ensure the user goes to the home page or back to the product where they came from
  // Using fromProduct & fromLogin to designate path
  // DismissAll is so the user can gensture back & profile drop the "login" from the navigation stack
  const handleMutationNavigation = () => {
    if (params.fromProduct) {
      push({
        pathname: "/(tabs)/(index)/[productId]",
        params: { productId: `${params.fromProduct}`, fromLogin: "1" },
      });
    } else {
      dismissAll();
      push({ pathname: "/(tabs)/(index)" });
    }
  };

  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ["user"],
    onSuccess: (user) => {
      setter(user as User);
      handleMutationNavigation();
    },
  });

  return (
    <SafeAreaView>
      <View>
        <Text> Login Page - Fix me</Text>

        <TextInput
          value={form.email}
          placeholder="Please enter your email"
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          style={Styles.input}
        />
        <TextInput
          value={form.password}
          placeholder="Please enter your password"
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, password: text }))
          }
          style={Styles.input}
        />
      </View>
      <Button onPress={() => mutation.mutate(form)} title="Login" />
      <Text> {mutation?.data?.name.firstname} </Text>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  input: {
    backgroundColor: "grey",
    padding: 20,
  },
});
