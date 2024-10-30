import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../Client/loadingPage";
import RefreshErrorPage from "../../Client/refreshErrorPage";
import DesignerPage from "../../designerPage";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

export default function GetProfile({ navigation }) {
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.162:12345/api/designer/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
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

  const fetchData = async () => {
    setLoading(true);
    getProfile();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRetry = () => {
    fetchData();
  };

  if (loading) {
    return <LoadingPage loadingText={"Fetching your profile..."} />;
  }

  if (alertShown) {
    return <RefreshErrorPage tryAgain={onRetry} />;
  }

  return (
    <DesignerPage navigation={navigation} profile={profileData}></DesignerPage>
  );
}
