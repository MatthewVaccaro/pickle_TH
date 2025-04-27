import { Text, View, StyleSheet, Pressable } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Sheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export const BottomSheet = forwardRef(function BottomSheet(
  props: {
    intial?: boolean;
    children: React.ReactNode;
    component: React.ReactNode;
  },
  ref,
) {
  const bottomSheetRef = useRef<Sheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 🚧 This requires manual typing when being used 🚧
  const externalMethods = {
    handleClosePress: () => {
      bottomSheetRef.current?.close();
      setIsOpen(false);
    },
    handleExpandPress: () => {
      bottomSheetRef.current?.expand();
      setIsOpen(true);
    },
  };

  // Ensure the component that uses the bottom sheet has access to the functions via a ref
  useImperativeHandle(ref, () => externalMethods);

  const handleSheetChanges = useCallback((index: number) => {
    if (index > -1) {
      setIsOpen(true);
    } else {
      false;
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.5,
          position: "relative",
        }}
      >
        {isOpen && (
          <Pressable
            onPress={() => externalMethods.handleClosePress()}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              top: 0,
              zIndex: 10,
              opacity: 0.5,
            }}
          />
        )}
        <SafeAreaView edges={["top"]} style={styles.container}>
          {props.children}
        </SafeAreaView>
      </View>
      {/* This could be made more exstensible but it suites our needs for the time being */}
      <Sheet
        enablePanDownToClose
        snapPoints={["30%"]}
        index={props.intial ? 1 : -1}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView style={styles.contentContainer}>
          {props.component}
        </BottomSheetView>
      </Sheet>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
