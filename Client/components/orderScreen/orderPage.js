import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, Divider, Avatar, Text } from 'react-native-paper';
import { orders } from '../../data/orders'; // Adjust the import path accordingly

const OrdersRoute = () => {
    // Filter orders based on their status
    const pendingOrders = orders.orders.filter(order => order.status === 'pending');
    const approvedOrders = orders.orders.filter(order => order.status === 'accepted' || order.status === 'finished');

    return (
        <ScrollView >
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
                                        source={{ uri: 'https://example.com/designer-image.jpg' }} // Replace with real image
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
                                        source={{ uri: 'https://example.com/designer-image.jpg' }} // Replace with real image
                                    />
                                )}
                                descriptionStyle={styles.statusApproved}
                            />
                            <Divider />
                        </React.Fragment>
                    ))
                ) : (
                    <Text>No approved orders.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 20,
        marginHorizontal: 20
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
