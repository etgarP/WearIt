import { Alert } from "react-native";


// Function to send a login request to the server
export const sendLoginRequest = async (authenticationInfo, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authenticationInfo),
    });

    // Check if the request was successful
    if (response.ok) {
      // Parse the JSON response if needed
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Error sending data:", response.statusText);
      Alert.alert("Error", "Failed to sign in. Please try again later.");
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    Alert.alert(
      "Error",
      "Failed to sign in. Please check your network connection."
    );
    return null;
  }
};

// Function to send a register request to the server
export const sendRegisterRequest = async (
  authenticationInfo,
  url
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authenticationInfo),
    });
    // Check if the request was successful
    console.log(response);
    if (response.ok) {
      // Parse the JSON response if needed
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json(); // Parse error response from server
      console.error("Error sending data:", response.statusText);

      // Check if it's a duplicate key error based on the server's response
      if (
        response.status === 400 &&
        errorData.includes("Username already exists")
      ) {
        Alert.alert(
          "Error",
          "Username already exists. Please try another one."
        );
      } else {
        Alert.alert("Error", "Failed to sign up. Please try again later.");
      }
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    Alert.alert(
      "Error",
      "Failed to sign in. Please check your network connection."
    );
    return null;
  }
};
