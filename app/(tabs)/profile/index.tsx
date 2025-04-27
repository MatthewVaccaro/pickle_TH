import { Colors } from "@/constants/Colors";
import { Heading } from "@/shared/headers";
import { useUserStore } from "@/store/user";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileView() {
  const user = useUserStore((state) => state.user);
  const setter = useUserStore((method) => method.setter);
  const { replace } = useRouter();

  if (user) {
    return (
      <SafeAreaView style={Style.safeContainer}>
        <Heading.H2> Profile </Heading.H2>

        <View style={Style.avatarContainer}>
          <Heading.H1 style={Style.avatarText}>
            {user.name.firstname[0]}
            {user.name.lastname[0]}
          </Heading.H1>
        </View>
        <Heading.H2 style={Style.nameText}>
          {user.name.firstname} {user.name.lastname}
        </Heading.H2>
        <View style={Style.detailContainer}>
          <View style={Style.detailSection}>
            <Heading.P style={Style.detailType}>Phone Number</Heading.P>
            <Heading.P style={Style.detailcontent}>{user.phone}</Heading.P>
          </View>
          <View style={Style.divider} />

          <View style={Style.detailSection}>
            <Heading.P style={Style.detailType}>Email</Heading.P>
            <Heading.P style={Style.detailcontent}>{user.email}</Heading.P>
          </View>
          <View style={Style.divider} />

          <View style={Style.detailSection}>
            <Heading.P style={Style.detailType}>Address</Heading.P>
            <Heading.P style={Style.detailcontent}>
              {user.address.number} {user.address.street}, {user.address.city},{" "}
              {user.address.zipcode}
            </Heading.P>
          </View>
        </View>
        <View style={Style.logoutContainer}>
          <Pressable
            onPress={() => {
              setter(null);
              replace({ pathname: "/(tabs)/(index)" });
            }}
            style={Style.logoutButton}
          >
            <Ionicons name={"log-out"} size={24} color={Colors.green.main} />
            <Heading.H4 style={Style.logoutText}> Logout</Heading.H4>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Style.safeContainer}>
      <Heading.H2> Profile </Heading.H2>
      <Heading.P style={Style.loginNote}>
        Get the most out of this app by logging into your account!
      </Heading.P>
      <Link style={Style.loginButton} href="/profile/login">
        Login
      </Link>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  safeContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: Colors.green.main,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    width: 78,
    height: 78,
    marginVertical: 12,
  },
  avatarText: {
    color: "white",
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: 500,
  },
  nameText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: 500,
  },
  detailContainer: {
    marginVertical: 24,
    width: "100%",
    borderRadius: 12,
    borderColor: Colors.black.veryLight,
    borderWidth: 1,
    padding: 16,
  },
  detailSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailType: {
    color: Colors.black.light,
    fontWeight: 400,
  },
  detailcontent: {
    fontWeight: 600,
    flexShrink: 1,
    textAlign: "right",
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: 16,
    backgroundColor: Colors.black.veryLight,
  },
  logoutContainer: {
    width: "100%",
  },
  logoutButton: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  logoutText: {
    color: Colors.green.main,
  },
  loginNote: {
    color: Colors.black.mid,
    textAlign: "center",
    marginVertical: 16,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.green.main,
    width: "100%",
    textAlign: "center",
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
  },
});
