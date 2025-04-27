import { z } from "zod";
import { API } from "./api";

export async function getUsers() {
  const res = await API.get<Array<User>>("users");
  return z.array(UserSchmea).parse(res.data);
}

export type User = z.infer<typeof UserSchmea>;
export const UserSchmea = z.object({
  address: z.object({
    geolocation: z.object({ lat: z.string(), long: z.string() }),
    city: z.string(),
    street: z.string(),
    number: z.number(),
    zipcode: z.string(),
  }),
  id: z.number(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  name: z.object({ firstname: z.string(), lastname: z.string() }),
  phone: z.string(),
  __v: z.number(),
});

export async function login(args: {
  email: string;
  password: string;
}): Promise<User | undefined> {
  const users = await getUsers();
  const user = users.find(
    (user) =>
      user.email.toLowerCase() === args.email.toLowerCase() &&
      user.password === args.password,
  );

  if (user) {
    return user;
  } else {
    throw Error("Email or Password is incorrect");
  }
}
