import { Text, StyleSheet } from "react-native";
import { TextProps } from "react-native/Libraries/Text/Text";

export const Heading = () => <div />;

export function H1({ children, style, ...rest }: TextProps) {
  return (
    <Text {...rest} style={StyleSheet.compose(baseStyle.h1, style)}>
      {children}
    </Text>
  );
}

export function H2({ children, style, ...rest }: TextProps) {
  return (
    <Text {...rest} style={StyleSheet.compose(baseStyle.h2, style)}>
      {children}
    </Text>
  );
}

export function H3({ children, style, ...rest }: TextProps) {
  return (
    <Text {...rest} style={StyleSheet.compose(baseStyle.h3, style)}>
      {children}
    </Text>
  );
}

export function H4({ children, style, ...rest }: TextProps) {
  return (
    <Text {...rest} style={StyleSheet.compose(baseStyle.h4, style)}>
      {children}
    </Text>
  );
}

export function P({ children, style, ...rest }: TextProps) {
  return (
    <Text {...rest} style={StyleSheet.compose(baseStyle.p, style)}>
      {children}
    </Text>
  );
}

export function Note({ children, style, ...rest }: TextProps) {
  return (
    <Text {...rest} style={StyleSheet.compose(baseStyle.note, style)}>
      {children}
    </Text>
  );
}

const baseStyle = StyleSheet.create({
  h1: {
    fontSize: 34,
  },
  h2: {
    fontSize: 22,
  },
  h3: {
    fontSize: 18,
  },
  h4: {
    fontSize: 16,
  },
  p: {
    fontSize: 14,
  },
  note: {
    fontSize: 12,
  },
});

Heading.H1 = H1;
Heading.H2 = H2;
Heading.H3 = H3;
Heading.H4 = H4;
Heading.P = P;
Heading.Note = Note;
