import { z } from "zod";
import { API } from "./api";

export async function getProducts() {
  const res = await API.get<Array<Product>>("products");
  return z.array(ProductSchmea).parse(res.data);
}

export type Product = z.infer<typeof ProductSchmea>;
export const ProductSchmea = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({ rate: z.number(), count: z.number() }),
});

export async function queryProducts() {
  const products = await getProducts();
  return z.array(ProductSchmea).parse(products);
}
