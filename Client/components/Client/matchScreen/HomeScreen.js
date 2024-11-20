import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import RefreshErrorPage from '../../loadingPages/refreshErrorPage';
import { getMatches } from '../../../apiServices/client/getMatches.js'; // Import the fetch function
import { AppObjectContext } from '../../appNavigation/appObjectProvider';
import LoadingPage from '../../loadingPages/loadingPage';
import ConnectedMatchRoute from './homeScreenConnected';

export default function MatchRoute({ setProfilePage, navigation }) {
  const [filtered, setFiltered] = useState([]);
  const { userDetails } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false); // State to track if alert has been shown
  const [loading, setLoading] = useState(true); // State to track loading
  
  if (!userDetails) {
    useEffect(() => {
      navigation.navigate("SignIn");
    }, []);
    return null; // Prevents further rendering
  }

  const fetchData = async () => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      const data = await getMatches(userDetails.token);
      setFiltered(data); // Initialize filtered data
      setAlertShown(false); // Hide alert if data is fetched successfully
    } catch (error) {
      setAlertShown(true); // Show alert if there's an error
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  };

  useEffect(() => {
    fetchData();
  }, [userDetails.token]); // No need to track alertShown in dependencies

  // Retry function for error page
  const onRetry = () => {
    fetchData(); // Retry the order submission
  };

  if (loading) {
    return <LoadingPage loadingText={"Fetching your matches..."}></LoadingPage>;
  }
  if (alertShown) {
    return <RefreshErrorPage tryAgain={onRetry}></RefreshErrorPage>;
  } else {
    return (
      <View style={styles.container}>
        <ConnectedMatchRoute
          setProfilePage={setProfilePage}
          navigation={navigation}
          designersData={filtered}
        />
      </View>
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
