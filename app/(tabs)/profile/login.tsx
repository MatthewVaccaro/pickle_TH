import { login, User } from "@/api/user";
import { Colors } from "@/constants/Colors";
import { Button } from "@/shared/button";
import { Heading } from "@/shared/headers";
import { Input } from "@/shared/input";
import { useUserStore } from "@/store/user";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { dismissAll, dismissTo } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

export default function LoginPage() {
  const nav = useNavigation();

  const { back, replace, dismissAll, push } = useRouter();
  const params = useLocalSearchParams();
  const setter = useUserStore((method) => method.setter);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Ensure the user goes to the home page or back to the product where they came from
  // Using fromProduct & fromLogin to designate path
  // DismissAll is so the user can gensture back & profile drop the "login" from the navigation stack
  const handleMutationNavigation = () => {
    if (params.fromProduct) {
      dismissAll();
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

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
      <Pressable onPress={back}>
        <Ionicons name={"arrow-back"} size={24} color={Colors.black.mid} />
      </Pressable>
      <Heading.H2 style={{ textAlign: "center" }}> Log In </Heading.H2>
      <View style={{ gap: 12 }}>
        <Input
          label="Email"
          value={form.email}
          aria-label="email"
          validation={formSchema.pick({ email: true })}
          autoCapitalize="none"
          placeholder="Please enter your email"
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        />

        <Input
          secureTextEntry={true}
          label="Password"
          value={form.password}
          aria-label="password"
          validation={formSchema.pick({ password: true })}
          autoCapitalize="none"
          placeholder="Please enter your password"
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, password: text }))
          }
        />
      </View>

      {mutation.error && (
        <Heading.Note style={Styles.errorText}>
          {mutation.error.message}
        </Heading.Note>
      )}

      <Button
        disabled={!formSchema.safeParse(form).success}
        style={{ marginTop: 12 }}
        onPress={() => mutation.mutate(form)}
      >
        Log In
      </Button>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.black.lighest,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 500,
    color: Colors.black.mid,
    marginVertical: 8,
  },
  errorText: {
    color: Colors.red.error,
    marginVertical: 12,
  },
});
