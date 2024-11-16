import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List, Divider, Avatar } from 'react-native-paper';

const OrdersRoute = ({ orders }) => {
    // Filter orders based on their status
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const approvedOrders = orders.filter(order => order.status === 'accepted');
    const rejectedOrders = orders.filter(order => order.status === 'rejected');

    return (
        <View style={styles.container}>
            {/* Not Yet Approved Section */}
            <Text style={styles.sectionHeader}>Not Yet Approved</Text>
            {pendingOrders.length > 0 ? (
                pendingOrders.map(order => (
                    <React.Fragment key={order._id}>
                        <List.Item
                            title={`Ordered from ${order.designer}`}
                            description={`Status: ${order.status}`}
                            left={() => (
                                <Avatar.Image
                                    size={50}
                                    source={{ uri: order.designerImage }} // Replace with real image
                                />
                            )}
                            descriptionStyle={styles.statusPending}
                        />
                        <Divider />
                    </React.Fragment>
                ))
            ) : (
                <Text>No pending orders.</Text>
            )}

            {/* Approved Section */}
            <Text style={styles.sectionHeader}>Approved</Text>
            {approvedOrders.length > 0 ? (
                approvedOrders.map(order => (
                    <React.Fragment key={order._id}>
                        <List.Item
                            title={`Ordered from ${order.designer}`}
                            description={`Status: ${order.status}`}
                            left={() => (
                                <Avatar.Image
                                    size={50}
                                    source={{ uri: order.designerImage }} // Replace with real image
                                />
                            )}
                            descriptionStyle={styles.statusApproved}
                        />
                        <Divider />
                    </React.Fragment>
                ))
            ) : (
                <Text>No active approved orders.</Text>
            )}
            {/* Approved Section */}
            <Text style={styles.sectionHeader}>Rejected</Text>
            {rejectedOrders.length > 0 ? (
                rejectedOrders.map(order => (
                    <React.Fragment key={order._id}>
                        <List.Item
                            title={`Ordered from ${order.designer}`}
                            description={`Status: ${order.status}`}
                            left={() => (
                                <Avatar.Image
                                    size={50}
                                    source={{ uri: order.designerImage }} // Replace with real image
                                />
                            )}
                            descriptionStyle={styles.statusApproved}
                        />
                        <Divider />
                    </React.Fragment>
                ))
            ) : (
                <Text>No rejected  orders.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,  // Ensure the container can grow and allow scrolling
        marginBottom: 20,
        marginHorizontal: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    statusPending: {
        fontStyle: 'italic',
        color: '#555',
    },
    statusApproved: {
        color: '#000', // Customize approved status color if needed
    },
});

export default OrdersRoute;
