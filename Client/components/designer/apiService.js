import axios from "axios";
import { constants } from "../../constants/api";
import { Alert } from "react-native";

export const getQuestionnaireInfo = async ({ userDetails }) => {
  const API_URL = `${constants.designerBaseAddress}info`;
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${userDetails.token}` },
    });
    return response.data; // Return the fetched data
  } catch (error) {
    Alert.alert("Error", "Failed to load data from info.");
    return {}; // Return an empty object on failure
  }
};

export const getQuestionnaireProfile = async ({ userDetails }) => {
  const API_URL = `${constants.designerBaseAddress}profile`;
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${userDetails.token}` },
    });
    return response.data; // Return the fetched data
  } catch (error) {
    Alert.alert("Error", "Failed to load data from profile.");
    return {}; // Return an empty object on failure
  }
};

