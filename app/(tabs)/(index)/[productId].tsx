import { queryProducts } from "@/api/products";
import { Colors } from "@/constants/Colors";
import { BottomSheet } from "@/shared/bottomSheet";
import { useUserStore } from "@/store/user";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { View, Text, Pressable, Button } from "react-native";
export default function ProductDetails() {
  const isUserLoggedIn = useUserStore((state) => !!state.user);
  const params: { productId: string; fromLogin: string } =
    useLocalSearchParams();
  const { back, push } = useRouter();

  // Functions provided by Imperative Handle
  const buttonSheetRef = useRef<{
    handleClosePress: () => void;
    handleExpandPress: () => void;
  }>();

  // Data
  const id = parseInt(params.productId);
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await queryProducts();
      return res.filter((product) => product.id === id)[0];
    },
  });
  return (
    <BottomSheet
      intial={!!params.fromLogin}
      ref={buttonSheetRef}
      component={
        <View>
          <Text> Order for {data?.title} Confirmed. </Text>
          <Button
            onPress={() => {
              buttonSheetRef.current?.handleClosePress();
              // Wait for bottome sheet to close
              setTimeout(() => back(), 300);
            }}
            title="Keep Shopping"
          />
        </View>
      }
    >
      <Pressable onPress={back}>
        <Ionicons name={"arrow-back"} size={24} color={Colors.black.light} />
      </Pressable>
      <View>
        <Text> {data?.title} </Text>
      </View>
      <Button
        onPress={() => {
          if (isUserLoggedIn) {
            buttonSheetRef.current?.handleExpandPress();
          } else {
            push({ pathname: "/profile/login", params: { fromProduct: id } });
          }
        }}
        title="Buy Now"
      />
      <Text> Wooooo </Text>
    </BottomSheet>
  );
}
