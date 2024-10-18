import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Avatar, Text } from 'react-native-paper';

const OrdersRoute = () => {
    return (
        <View style={styles.container}>
            {/* Not Yet Approved Section */}
            <Text style={styles.sectionHeader}>not yet approved</Text>

            <List.Item
                title="ordered from ronnit"
                description="status: pending"
                left={() => (
                    <Avatar.Image
                        size={50}
                        source={{ uri: 'https://example.com/designer-image.jpg' }} // replace with real image
                    />
                )}
                descriptionStyle={styles.statusPending}
            />
            <Divider />

            <List.Item
                title="ordered from ronnit"
                description="status: pending"
                left={() => (
                    <Avatar.Image
                        size={50}
                        source={{ uri: 'https://example.com/designer-image.jpg' }} // replace with real image
                    />
                )}
                descriptionStyle={styles.statusPending}
            />
            <Divider />

            {/* Approved Section */}
            <Text style={styles.sectionHeader}>approved</Text>
            {/* Add approved orders here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
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
});

export default OrdersRoute;
