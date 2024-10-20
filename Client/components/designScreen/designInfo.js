import * as React from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Appbar, List, Button } from 'react-native-paper';

const outfits = [
    { id: 1, name: 'Outfit 1', image: require('../../assets/shirt.png'), link: 'https://www.example.com/outfit1' },
    { id: 2, name: 'Outfit 2', image: require('../../assets/pants_black.png'), link: 'https://www.example.com/outfit2' },
    { id: 3, name: 'Outfit 3', image: require('../../assets/pants_tan.png'), link: 'https://www.example.com/outfit3' },
    { id: 4, name: 'Outfit 4', image: require('../../assets/shirt.png'), link: 'https://www.example.com/outfit4' },
    { id: 5, name: 'Outfit 5', image: require('../../assets/pants_black.png'), link: 'https://www.example.com/outfit5' },
    { id: 6, name: 'Outfit 6', image: require('../../assets/pants_tan.png'), link: 'https://www.example.com/outfit6' },
    { id: 7, name: 'Outfit 7', image: require('../../assets/shirt.png'), link: 'https://www.example.com/outfit7' },
    { id: 8, name: 'Outfit 8', image: require('../../assets/pants_black.png'), link: 'https://www.example.com/outfit8' },
    { id: 9, name: 'Outfit 9', image: require('../../assets/pants_tan.png'), link: 'https://www.example.com/outfit9' },
];

const DesignInfo = ({ toSend = true }) => {
    // Function to open the HTTPS link
    const handleOutfitPress = (link) => {
        Linking.openURL(link).catch((err) => console.error('Error opening URL', err));
    };

    return (
        <View style={styles.container}>
            {/* Top Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Pick Clothes" />
            </Appbar.Header>

            {/* List of Outfits wrapped in a ScrollView */}
            <ScrollView style={styles.listContainer}>
                {outfits.map((outfit) => (
                    <List.Item
                        key={outfit.id}
                        title={outfit.name}
                        left={() => <Image source={outfit.image} style={styles.outfitImage} />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => handleOutfitPress(outfit.link)}
                    />
                ))}
            </ScrollView>

            {/* AI Mix & Match Section */}
            <View style={styles.aiMixMatchContainer}>
                <List.Item
                    title="AI Mix & Match"
                    right={() => (
                        <View>
                            <List.Icon icon="star" color="#FFD700" />
                        </View>
                    )}
                    onPress={() => {
                        // Add your functionality here
                        console.log('AI Mix & Match clicked');
                    }}
                />
            </View>

            {/* Send to Customer Button */}
            {toSend ? (
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        style={styles.selectButton}
                        onPress={() => console.log('Selected outfit:', selectedOutfitId)}
                        disabled={selectedOutfitId === null}
                    >
                        Select
                    </Button>
                </View>
            ) : (<></>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
    outfitImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginLeft: 20,
    },
    aiMixMatchContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    selectButton: {
        width: 200,
        paddingVertical: 10,
        borderRadius: 20,
    },
});

export default DesignInfo;
