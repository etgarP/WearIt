import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Divider, Avatar, Text, Button } from "react-native-paper";
import { ClientObjectContext } from "../navigation/ClientObjectProvider";
import ReviewModal from "./reviewModal";
import { Strings } from "../../../constants/strings";

const FinishedDesignsInnerPage = ({
  navigation,
  orders,
  onReview,
  setOrderIdForReview,
}) => {
  const approvedOrders = orders.filter((order) => order.status == "finished");
  const { setOrderId } = useContext(ClientObjectContext);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{Strings.finished}</Text>
      {approvedOrders.length > 0 ? (
        approvedOrders.map((order) => (
          <React.Fragment key={order._id}>
            <List.Item
              title={`${order.designer}`}
              description={`Status: ${order.status}`}
              onPress={() => {setOrderId(order._id); navigation.navigate("DesignInfo");}}
              left={() => (
                <Avatar.Image
                  size={50}
                  style={styles.leftSide}
                  source={
                    order.designerImage
                      ? order.designerImage.startsWith("data:")
                        ? { uri: order.designerImage }
                        : {
                            uri: `data:image/jpeg;base64,${order.designerImage}`,
                          }
                      : null // Fallback image if no image is provided
                  }
                />
              )}
              right={() => (
                <Button 
                  icon="fountain-pen"
                  onPress={() => {
                    setOrderIdForReview(order._id);
                    onReview(
                      order.review
                        ? order.review
                        : {
                          review: "",
                          number: 0,
                          designerUsername: order.designer,
                        }
                    );
                  }}
                >
                  {Strings.addReviewButtonLabel}
                </Button>
              )}
              descriptionStyle={styles.statusApproved}
            />
            <Divider style={styles.divider} />
          </React.Fragment>
        ))
      ) : (
        <Text>     No finished Designs</Text>
      )}
    </View>
  );
};

const FinishedDesigns = ({ navigation, orders }) => {
  // Create a reference for the ReviewModal
  const reviewModalRef = useRef(null);
  const [ordersState, setOrdersState] = useState(orders);
  const [orderId, setOrdersId] = useState("");

  const updateReview = (newReview) => {
    // Find the order with the given orderId
    const orderIndex = ordersState.findIndex((order) => order._id === orderId);
    // If order is found, update its review
    if (orderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[orderIndex].review = newReview;
      setOrdersState(updatedOrders);
    }
  };

  // Function to open the modal
  const showReviewModal = (reviewData) => {
    reviewModalRef.current?.openModal(reviewData);
  };

  return (
    <View>
      <FinishedDesignsInnerPage
        setOrderIdForReview={setOrdersId}
        navigation={navigation}
        orders={ordersState}
        onReview={showReviewModal}
      />
      {/* Include the ReviewModal component */}
      <ReviewModal ref={reviewModalRef} updateReview={updateReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 20,
  },
  leftSide: {
    marginStart: 20
  },
  container: {
    flex: 1,
    marginBottom: 20,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  sectionHeader: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  statusPending: {
    fontStyle: "italic",
    color: "#555",
  },
  statusApproved: {
    color: "#000",
  },
  reviewButton: {
    backgroundColor:'red',
    height: 50,
    width: 55
  },
  buttonLabel: {
    fontSize: 14,
    color: "white",
    textTransform: "none", // This prevents automatic capitalization
  },
});

export default FinishedDesigns;
