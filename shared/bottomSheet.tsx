import { StyleSheet } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Sheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

export const BottomSheet = forwardRef(function BottomSheet(
  props: {
    intial?: boolean;
    children: React.ReactNode;
    component: React.ReactNode;
  },
  ref,
) {
  const bottomSheetRef = useRef<Sheet>(null);
  const inset = useSafeAreaInsets();

  // 🚧 This requires manual typing when being used 🚧
  const externalMethods = {
    handleClosePress: () => {
      bottomSheetRef.current?.close();
    },
    handleExpandPress: () => {
      bottomSheetRef.current?.expand();
    },
  };

  // Ensure the component that uses the bottom sheet has access to the functions via a ref
  useImperativeHandle(ref, () => externalMethods);

  return (
    <GestureHandlerRootView
      style={StyleSheet.compose(styles.container, { paddingTop: inset.top })}
    >
      {props.children}
      {/* This could be made more exstensible but it suites our needs for the time being */}
      <Sheet
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            style={[props.style, { backgroundColor: "rgba(0,0,0,0.7)" }]} // Your custom color here
          />
        )}
        enablePanDownToClose
        snapPoints={["30%"]}
        index={props.intial ? 1 : -1}
        ref={bottomSheetRef}
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
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
