import { TextInput, TextInputProps, StyleSheet, View } from "react-native";
import { Heading } from "./headers";
import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { ZodTypeAny } from "zod";

type Props = TextInputProps & {
  label: string;
  validation: ZodTypeAny;
};

export function Input({
  label,
  onBlur,
  validation,
  onChangeText,

  ...props
}: Props) {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [input, setInput] = useState<string>(props.value ?? "");
  const [errors, setErrors] = useState<Array<string>>([]);

  if (!props["aria-label"]) {
    throw Error("Aria label is required!");
  }

  /*
  🔥 @handleValidation
  Validation doesn't run until on blur.
  After that, validation runs on all text changes
  In order to have propper error validation you must pass a zod schema that contains a key in the object = the aria-label
  🚧 Nested Zod schemas wont work! 🚧
  */
  const handleValidation = useCallback(() => {
    const key = props["aria-label"];
    const parse = validation.safeParse({ [key as string]: input });
    if (parse.error) {
      setErrors((prev) => {
        const errors = [
          ...prev,
          ...parse.error.issues.map((err) => err.message),
        ];
        const removeDuplicates = [...new Set(errors)];
        return removeDuplicates;
      });
    } else {
      setErrors([]);
    }
  }, [input]);
  return (
    <View>
      <Heading.P>{label}</Heading.P>
      <TextInput
        {...props}
        style={Styles.input}
        onBlur={(e) => {
          setIsTouched(true);
          handleValidation();
          if (onBlur) {
            onBlur(e);
          }
        }}
        onChangeText={(value) => {
          setInput(value);
          if (isTouched) {
            handleValidation();
          }
          if (onChangeText) {
            onChangeText(value);
          }
        }}
      />
      {errors &&
        errors.map((err) => (
          <Heading.Note key={err} style={Styles.errorText}>
            {err}
          </Heading.Note>
        ))}
    </View>
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
  },
});
