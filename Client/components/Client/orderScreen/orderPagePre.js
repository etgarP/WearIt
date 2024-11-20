import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getOrders } from "../../../apiServices/client/getOrders"; // API service for order creation
import OrderPage from "./orderPage";
import { LoadingPage } from "../loadingPage";
import RefreshErrorPage from "../refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import FinishedDesigns from "../../designScreen/finishedDesigns";
import RefreshPage from "../refreshPage";

export const OrdersRoutePre = ({ onGoBack, navigation, isDesign = false }) => {
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [orderSuccess, setOrderSuccess] = useState(false); // To manage success state
  const [orderFailed, setOrderFailed] = useState(false); // To manage error state
  const [orders, setOrders] = useState(null);

  // Function to handle order submission
  const handleOrderSubmission = async () => {
    setLoading(true);
    setOrderFailed(false); // Reset the error state when retrying
    try {
      const gotten = await getOrders(token); // Make the POST request to create the order
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
  }, [token]);

  // Retry function for error page
  const onRetry = () => {
    handleOrderSubmission(); // Retry the order submission
  };

  if (loading) {
    return <LoadingPage loadingText={"Finalizing your order..."} />; // Show loading screen while request is processing
  }

  if (orderSuccess && isDesign) {
    return (
      <RefreshPage tryAgain={onRetry}>
        <FinishedDesigns navigation={navigation} orders={orders} />
      </RefreshPage>
    );
  }

  if (orderSuccess && !isDesign) {
    return (
      <RefreshPage tryAgain={onRetry}>
        <OrderPage orders={orders} />
      </RefreshPage>
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
