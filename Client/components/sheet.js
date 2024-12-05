import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { List, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppObjectContext } from "./appNavigation/appObjectProvider";
import { CommonActions } from "@react-navigation/native";

const Sheet = forwardRef(
  ({ navigation, children, isClient = true, onChangeInfo }, ref) => {
    const bottomSheetRef = useRef(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [flag, setFlag] = useState(false);

    const { setUserDetails, setQuestionnaireData } =
      useContext(AppObjectContext);

    // Function to sign out the user, deletes the token from the storage
    const handleSignOut = async () => {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("selectedTab");
      setUserDetails(null);
      setQuestionnaireData({
        name: "",
        age: "",
        gender: "",
        allergies: "",
        work: "",
        city: "",
        religion: "",
        image: null,
        measurements: {
          shoulders: "",
          bust: "",
          waist: "",
          hips: "",
          thighs: "",
          calves: "",
          legs: "",
        },
        other: "",
        price: null,
        specialization: "",
        stylistAbout: "",
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        })
      );
    };

    const handleSheetChanges = useCallback((index) => {
      if (index < 0) setIsSheetOpen(index >= 0);
    }, []);

    const openSheet = () => {
      bottomSheetRef.current?.snapToIndex(0);
      setFlag(true);
      setIsSheetOpen(true);
    };

    const closeSheet = () => {
      bottomSheetRef.current?.close();
      setIsSheetOpen(false);
    };

    // Expose openSheet function to parent component
    useImperativeHandle(ref, () => ({
      openSheet,
    }));

    return (
      <GestureHandlerRootView style={styles.container}>
        {/* Main Content */}
        {children}

        {/* Overlay */}
        {isSheetOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeSheet}
          />
        )}
        {flag && (
          <BottomSheet
            ref={bottomSheetRef}
            enablePanDownToClose={true}
            initialSnapIndex={-1}
            onChange={handleSheetChanges}
            backgroundStyle={styles.bottomSheetBackground}
          >
            <BottomSheetView style={styles.contentContainer}>
              <List.Item
                style={styles.listItem}
                title={isClient ? "Change Client Info" : "Change Stylist Info"}
                left={() => <List.Icon icon="account" />}
                onPress={() => onChangeInfo()}
              />
              <Divider />
              <List.Item
                style={styles.listItem}
                title="Sign out"
                left={() => <List.Icon icon="logout" />}
                onPress={async () => await handleSignOut()}
              />
            </BottomSheetView>
          </BottomSheet>
        )}

        {/* Bottom Sheet */}
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetBackground: {
    borderRadius: 16,
  },
  contentContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
  },
  listItem: {
    paddingHorizontal: 16,
  },
});

export default Sheet;
