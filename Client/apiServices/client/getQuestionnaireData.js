import { Alert } from "react-native";
import { constants } from "../../constants/api"
import axios from "axios";

export const getQuestionnaireData = async ({ userDetails }) => {
  const API_URL = `${constants.clientBaseAddress}matches/info`;
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${userDetails.token}` },
    });
    return response; // Return the response
  } catch (error) {
    return null; // Return an empty object on failure
  }
};