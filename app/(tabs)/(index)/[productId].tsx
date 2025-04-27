import { queryProducts } from "@/api/products";
import { Colors } from "@/constants/Colors";
import { BottomSheet } from "@/shared/bottomSheet";
import { Button } from "@/shared/button";
import { Heading } from "@/shared/headers";
import { useUserStore } from "@/store/user";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { Image } from "expo-image";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

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
  // Faux handling unique id query
  const id = parseInt(params.productId);
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await queryProducts();
      return res.filter((product) => product.id === id)[0];
    },
  });

  const handleBuyNow = () => {
    if (isUserLoggedIn) {
      buttonSheetRef.current?.handleExpandPress();
    } else {
      push({
        pathname: "/profile/login",
        params: { fromProduct: id },
      });
    }
  };

  // Allows for stagging animations on load
  const intialDelay = 200;

  return (
    <BottomSheet
      intial={!!params.fromLogin}
      ref={buttonSheetRef}
      component={
        <View style={Styles.bottomSheetContainer}>
          <Heading.H2 style={Styles.bottomSheetTitle}> Congrats! </Heading.H2>
          <Heading.P style={Styles.bottomSheetContent}>
            Order for {data?.title} Confirmed.
          </Heading.P>
          <Button
            type="secondary"
            onPress={() => {
              buttonSheetRef.current?.handleClosePress();
              // Wait for bottome sheet to close
              setTimeout(() => back(), 300);
            }}
          >
            Continue Shopping
          </Button>
        </View>
      }
    >
      <View style={Styles.mainContainer}>
        <View style={Styles.headerContainer}>
          <Pressable onPress={back}>
            <Ionicons name={"arrow-back"} size={24} color={Colors.black.mid} />
          </Pressable>
          <View style={Styles.categoryPill}>
            <Heading.Note style={Styles.categoryText}>
              {data?.category}
            </Heading.Note>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={Styles.flex}>
          <Animated.View
            entering={FadeInUp.duration(400).delay(intialDelay)}
            style={Styles.productImageContainer}
          >
            <Image
              contentFit="contain"
              source={{ uri: data?.image }}
              style={Styles.productImage}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.duration(400).delay(intialDelay * 2)}
          >
            <Heading.H3>{data?.title}</Heading.H3>
            <View style={Styles.priceAndRatingContainer}>
              <Heading.H2 style={{ fontWeight: 600 }}>
                ${data?.price?.toFixed(2)}
              </Heading.H2>
              <View style={Styles.ratingContainer}>
                <Ionicons name={"star"} size={18} color={Colors.green.main} />
                <Heading.P style={Styles.ratingScoreText}>
                  {data?.rating.rate}
                </Heading.P>
                <Heading.P style={Styles.ratingCountText}>
                  {" "}
                  ({data?.rating.count})
                </Heading.P>
              </View>
            </View>
            <Button onPress={handleBuyNow} type="main">
              Buy Now
            </Button>
            <Heading.H4 style={Styles.descriptionTitle}>Description</Heading.H4>
            <Heading.P style={Styles.descriptionContent}>
              {data?.description}
            </Heading.P>
          </Animated.View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

const Styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  categoryPill: {
    backgroundColor: Colors.black.lighest,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 32,
  },
  categoryText: { textTransform: "capitalize", fontWeight: 500 },
  productImageContainer: {
    width: "100%",
    backgroundColor: "white",
    height: 245,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  productImage: { height: "100%", objectFit: "scale-down" },
  priceAndRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  ratingContainer: {
    backgroundColor: Colors.black.lighest,
    flexShrink: 1,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingScoreText: { fontWeight: 500 },
  ratingCountText: { fontWeight: 500, color: Colors.black.mid },
  buttonContainer: {
    backgroundColor: Colors.green.main,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
  },
  descriptionTitle: { fontWeight: 500, marginBottom: 8 },
  descriptionContent: { color: Colors.black.mid, lineHeight: 21 },
  bottomSheetContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
    justifyContent: "center",
  },
  bottomSheetTitle: { textAlign: "center" },
  bottomSheetContent: { textAlign: "center", marginBottom: 24 },
});
