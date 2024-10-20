import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, List, Button } from 'react-native-paper';

const outfits = [
    { id: 1, name: 'outfit name', image: require('./assets/shirt.png') },  // Replace with actual images
    { id: 2, name: 'outfit name', image: require('./assets/pants_black.png') },  // Replace with actual images
    { id: 3, name: 'outfit name', image: require('./assets/pants_tan.png') }  // Replace with actual images
];

const MyComponent = () => {
    return (
        <View style={styles.container}>
            {/* Top Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Pick Clothes" />
            </Appbar.Header>

            {/* List of Outfits */}
            <View style={styles.listContainer}>
                {outfits.map((outfit) => (
                    <List.Item
                        key={outfit.id}
                        title={outfit.name}
                        left={() => <Image source={outfit.image} style={styles.outfitImage} />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => console.log(`Selected ${outfit.name}`)}
                    />
                ))}
            </View>

            {/* AI Mix & Match Section */}
            <View style={styles.aiMixMatchContainer}>
                <List.Item
                    title="AI Mix & Match"
                    right={() => (
                        <View>
                            <List.Icon icon="star" color="#FFD700" /> {/* Star icon with golden color */}
                        </View>
                    )}
                />
            </View>

            {/* Send to Customer Button */}
            <Button
                mode="contained"
                onPress={() => console.log('Send to customer')}
                style={styles.sendButton}
            >
                send to customer
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listContainer: {
        flex: 1,
        padding: 10
    },
    outfitImage: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    aiMixMatchContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    sendButton: {
        margin: 20,
        paddingVertical: 10,
        backgroundColor: '#BB86FC',
        borderRadius: 20,
    }
});

export default MyComponent;
