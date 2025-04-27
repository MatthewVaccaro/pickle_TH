import { queryProducts } from "@/api/products";
import { Colors } from "@/constants/Colors";
import { Heading } from "@/shared/headers";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useMemo, useRef, useState } from "react";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [search, setSearch] = useState<string>("");
  const stickyHeaderRef = useRef(null);
  const { data, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: queryProducts,
  });

  const results = useMemo(() => {
    if (!search) {
      return data;
    }

    if (data && search) {
      const products = data.filter((product) => {
        const substring = product.title
          .substring(0, search.length)
          .toLowerCase();
        return substring === search.toLowerCase();
      });
      return products;
    }
  }, [search, data]);

  if (results) {
    return (
      <SafeAreaView edges={["top"]} style={Style.list}>
        <Animated.View
          style={Style.stickyHeader}
          entering={FadeInUp.duration(300)}
          ref={stickyHeaderRef}
        >
          <Heading.H2> Home </Heading.H2>
          <View style={Style.searchContainer}>
            <Ionicons name={"search"} size={24} color={Colors.black.light} />

            <TextInput
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder="Search over 10,000 products"
              style={Style.searchInput}
            />
          </View>
        </Animated.View>

        <Animated.FlatList
          keyboardShouldPersistTaps="handled"
          entering={FadeInDown.duration(100).delay(400)}
          numColumns={2}
          data={results}
          columnWrapperStyle={{ gap: 12 }}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <View style={Style.emptyListContainer}>
              <Heading.H3 style={Style.emptyListHeader}>
                Well...this is akward
              </Heading.H3>
              <Heading.P style={Style.emptyListContent}>
                Looks like we don't have exactly what you're looking for. maybe
                you missed spelled something? 🙃
              </Heading.P>
            </View>
          }
          renderItem={({ item, index }) => {
            return (
              <Link
                href={{
                  pathname: "/(tabs)/(index)/[productId]",
                  params: { productId: item.id },
                }}
              >
                <Animated.View
                  entering={FadeInDown.duration(300).delay(
                    400 + 50 * (index + 1),
                  )}
                  style={Style.product}
                >
                  <Animated.View
                    sharedTransitionTag={`ProductImage_${item.id}`}
                    style={Style.productPhotoContainer}
                  >
                    <Image
                      contentFit="contain"
                      source={{ uri: item.image }}
                      style={Style.productPhoto}
                    />
                  </Animated.View>
                  <View style={Style.productContainer}>
                    <Heading.H4
                      style={Style.productTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Heading.H4>
                    <Heading.P style={Style.productPrice}>
                      ${item.price.toFixed(2)}
                    </Heading.P>
                  </View>
                </Animated.View>
              </Link>
            );
          }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View>
          <Heading.H2> Oops, looks like there was an error! </Heading.H2>
          <Heading.P> Error Messsage: {error?.message} </Heading.P>
        </View>
      </SafeAreaView>
    );
  }
}

const Style = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
  productContainer: {
    width: 178,
    marginBottom: 12,
  },
  product: {
    gap: 12,
  },
  productTitle: {
    fontWeight: 500,
  },
  productPrice: {
    fontWeight: 400,
    color: Colors.black.mid,
  },
  productPhotoContainer: {
    borderRadius: 12,
    width: 178,
    height: 178,
    backgroundColor: "white",
    padding: 12,
  },
  productPhoto: {
    height: "100%",
  },
  emptyListHeader: {
    fontWeight: 500,
    textAlign: "center",
  },
  emptyListContent: {
    fontWeight: 400,
    textAlign: "center",
    color: Colors.black.mid,
  },
  emptyListContainer: {
    gap: 8,
    marginVertical: 16,
  },
  stickyHeader: { paddingVertical: 12, gap: 8 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: Colors.black.veryLight,
    paddingLeft: 12,
    overflow: "hidden",
  },
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: Colors.black.veryLight,
  },
});
