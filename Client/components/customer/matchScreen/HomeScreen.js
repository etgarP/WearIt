import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import RefreshErrorPage from "../../loadingPages/refreshErrorPage.js";
import { getMatches } from "../../../apiServices/client/getMatches.js"; // Import the fetch function
import { AppObjectContext } from "../../appNavigation/appObjectProvider.js";
import LoadingPage from "../../loadingPages/loadingPage.js";
import ConnectedMatchRoute from "./homeScreenConnected.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../backgroundWrapper.js";

export default function MatchRoute({ setProfilePage, navigation }) {
  const [filtered, setFiltered] = useState([]);
  const [alertShown, setAlertShown] = useState(false); // State to track if alert has been shown
  const [loading, setLoading] = useState(true); // State to track loading
  const [userDetailsState, setUserDetailsState] = useState(null); // Local state for userDetails
  const { userDetails } = useContext(AppObjectContext); // Context value

  // Store userDetails in local state only once when the component is first mounted
  useEffect(() => {
    if (userDetails) {
      setUserDetailsState(userDetails); // Only set once
    } else {
      navigation.navigate("SignIn");
    }
  }, [userDetails, navigation]); // Only runs on initial mount or when userDetails changes

  // Fetch data if userDetails is available
  useEffect(() => {
    if (userDetailsState) {
      const fetchData = async () => {
        const page = await AsyncStorage.getItem("selectedTab");
        if (page === "client") {
          setLoading(true); // Set loading to true when starting fetch
          try {
            const data = await getMatches(userDetailsState.token); // Use the local userDetails state
            setFiltered(data); // Initialize filtered data
            setAlertShown(false); // Hide alert if data is fetched successfully
          } catch (error) {
            setAlertShown(true); // Show alert if there's an error
          } finally {
            setLoading(false); // Set loading to false when fetch completes
          }
        }
      };

      fetchData();
    }
  }, [userDetailsState]); // Only trigger effect when userDetailsState changes

  // Retry function for error page
  const onRetry = () => {
    setLoading(true); // Re-trigger loading
    fetchData(); // Retry the order submission
  };

  if (loading) {
    return <LoadingPage loadingText={"Fetching your matches..."} />;
  }
  if (alertShown) {
    return <RefreshErrorPage tryAgain={onRetry} />;
  } else {
    return (
      <BackgroundWrapper>
        <View style={styles.container}>
          <ConnectedMatchRoute
            setProfilePage={setProfilePage}
            navigation={navigation}
            designersData={filtered}
          />
        </View>
      </BackgroundWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingIcon: {
    width: 80,
    height: 80,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});
