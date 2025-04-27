import { queryProducts } from "@/api/products";
import { Colors } from "@/constants/Colors";
import { Heading } from "@/shared/headers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
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
        <View style={{ paddingVertical: 12, gap: 8 }} ref={stickyHeaderRef}>
          <Heading.H2> Home </Heading.H2>

          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search over 10,000 products"
            style={{
              width: "100%",
              borderRadius: 100,
              padding: 12,
              backgroundColor: Colors.black.veryLight,
            }}
          />
        </View>
        <FlatList
          numColumns={2}
          data={results}
          columnWrapperStyle={{ gap: 12 }}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <View style={Style.EmptyListContainer}>
              <Heading.H3 style={Style.EmptyListHeader}>
                Well...this is akward{" "}
              </Heading.H3>
              <Heading.P style={Style.EmptyListContent}>
                Looks like we don't have exactly what you're looking for. maybe
                you missed spelled something? 🙃
              </Heading.P>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <Link
                href={{
                  pathname: "/(tabs)/(index)/[productId]",
                  params: { productId: item.id },
                }}
              >
                <View style={Style.product}>
                  <View style={Style.ProductPhoto}>
                    <Image
                      source={{ uri: item.image }}
                      style={Style.ProductPhoto}
                    />
                  </View>
                  <View style={Style.productContainer}>
                    <Heading.H4
                      style={Style.ProductTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Heading.H4>
                    <Heading.P style={Style.ProductPrice}>
                      ${item.price.toFixed(2)}
                    </Heading.P>
                  </View>
                </View>
              </Link>
            );
          }}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text> Oops, looks like there was an error! </Text>
        <Text> Error Messsage: {error?.message} </Text>
      </View>
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
  ProductTitle: {
    fontWeight: 500,
  },
  ProductPrice: {
    fontWeight: 400,
    color: Colors.black.mid,
  },
  ProductPhoto: {
    borderRadius: 12,
    width: 178,
    height: 178,
    overflow: "hidden",
    backgroundColor: "white",
    objectFit: "contain",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  EmptyListHeader: {
    fontWeight: 500,
    textAlign: "center",
  },
  EmptyListContent: {
    fontWeight: 400,
    textAlign: "center",
    color: Colors.black.mid,
  },
  EmptyListContainer: {
    gap: 8,
    marginVertical: 16,
  },
});
