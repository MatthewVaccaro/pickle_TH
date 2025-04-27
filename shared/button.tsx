import { Colors } from "@/constants/Colors";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Heading } from "./headers";

type ButtonProps = PressableProps & {
  type?: "main" | "secondary";
  children: React.ReactNode;
};

export function Button({
  type = "main",
  children,
  style,
  ...props
}: ButtonProps) {
  // 🚧 Required for composition for the different style props to play nice
  const componsedStyles = [style as StyleProp<ViewStyle>, Styles[type]];

  if (props.disabled) {
    componsedStyles.push({ opacity: 0.5 });
  }
  return (
    <Pressable {...props} style={componsedStyles}>
      <Heading.P
        style={type === "main" ? Styles.mainText : Styles.secondaryText}
      >
        {children}
      </Heading.P>
    </Pressable>
  );
}

const Styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.green.main,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
  },
  secondary: {
    borderColor: Colors.green.main,
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
  },

  mainText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
  secondaryText: {
    color: Colors.green.main,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
});
