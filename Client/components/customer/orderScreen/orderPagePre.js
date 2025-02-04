import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getOrders } from "../../../apiServices/client/getOrders"; // API service for order creation
import OrderPage from "./orderPage";
import { LoadingPage } from "../../loadingPages/loadingPage";
import RefreshErrorPage from "../../loadingPages/refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import FinishedDesigns from "../designScreenCustomer/finishedDesigns";
import RefreshPage from "../../loadingPages/refreshPage";
import BackgroundWrapper from "../../backgroundWrapper";

export const OrdersRoutePre = ({ onGoBack, navigation, isDesign = false }) => {
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [orderSuccess, setOrderSuccess] = useState(false); // To manage success state
  const [orderFailed, setOrderFailed] = useState(false); // To manage error state
  const [orders, setOrders] = useState(null);
  const { userDetails } = useContext(AppObjectContext);

  if (!userDetails) {
    useEffect(() => {
      navigation.navigate("SignIn");
    }, []);
    return null; // Prevents further rendering
  }

  // Function to handle order submission
  const handleOrderSubmission = async () => {
    setLoading(true);
    setOrderFailed(false); // Reset the error state when retrying
    try {
      const gotten = await getOrders(userDetails.token); // Make the POST request to create the order
      setOrders(gotten);
      setOrderSuccess(true); // If successful, show success screen
    } catch (error) {
      setOrderFailed(true); // Set error state if an error occurred
    } finally {
      setLoading(false); // Stop the loading spinner regardless of outcome
    }
  };

  // Call handleOrderSubmission when the component mounts
  useEffect(() => {
    handleOrderSubmission();
  }, [userDetails.token]);

  // Retry function for error page
  const onRetry = () => {
    handleOrderSubmission(); // Retry the order submission
  };

  if (loading) {
    return <LoadingPage loadingText={"Loaidng your orders..."} />; // Show loading screen while request is processing
  }

  if (orderSuccess && isDesign) {
    return (
      <BackgroundWrapper>
        <RefreshPage tryAgain={onRetry}>
          <FinishedDesigns navigation={navigation} orders={orders} />
        </RefreshPage>
      </BackgroundWrapper>
    );
  }

  if (orderSuccess && !isDesign) {
    return (
      <BackgroundWrapper>
        <RefreshPage tryAgain={onRetry}>
          <OrderPage orders={orders} />
        </RefreshPage>
      </BackgroundWrapper>
    ); // Show success page if the order was created
  }

  if (orderFailed) {
    return <RefreshErrorPage tryAgain={onRetry} />; // Show error page with retry option if order creation failed
  }

  return null; // Return nothing if no state is active
};

export default OrdersRoutePre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
