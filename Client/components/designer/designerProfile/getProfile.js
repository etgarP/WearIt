import React, { useEffect, useContext, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../loadingPages/loadingPage";
import RefreshErrorPage from "../../loadingPages/refreshErrorPage";
import DesignerProfile from "./designerProfile";
import { constants } from "../../../constants/api";

export default function GetProfile({ navigation }) {
  const { userDetails } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!userDetails) return null;
  }, []);

  // Function to fetch the profile data from the server
  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${constants.designerBaseAddress}profile/`,
        {
          headers: { Authorization: `Bearer ${userDetails.token}` },
        }
      );
      setProfileData(response.data);
      setAlertShown(false);
    } catch (error) {
      setAlertShown(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to trigger data fetching and handle loading state
  const fetchData = async () => {
    setLoading(true);
    await getProfile();
  };

  // Automatically fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh the data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // Handle retry in case of errors
  const onRetry = () => {
    fetchData();
  };

  // Render loading page if data is still being fetched
  if (loading) {
    return <LoadingPage loadingText={"Fetching your profile..."} />;
  }

  // Render error page if an error occurred during data fetching
  if (alertShown) {
    return <RefreshErrorPage tryAgain={onRetry} />;
  }

  // Render the designer profile once the data is successfully fetched
  return (
    <DesignerProfile
      navigation={navigation}
      profile={profileData}
      isDesigner={true}
    />
  );
}
