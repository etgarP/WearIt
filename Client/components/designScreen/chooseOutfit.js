import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Appbar, List, Button, RadioButton } from 'react-native-paper';

const outfits = [
    { id: 1, name: 'Outfit 1', image: require('../../assets/shirt.png') },
    { id: 2, name: 'Outfit 2', image: require('../../assets/pants_black.png') },
    { id: 3, name: 'Outfit 3', image: require('../../assets/pants_tan.png') },
];

const ChooseOutfit = () => {
    const [selectedOutfitId, setSelectedOutfitId] = useState(null);

    const selectOutfit = (id) => {
        setSelectedOutfitId(id);
    };

    return (
        <View style={styles.container}>
            {/* Top Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Add to Mix & Match" />
            </Appbar.Header>

            {/* Outfit List */}
            <ScrollView style={styles.listContainer}>
                {outfits.map((outfit) => (
                    <List.Item
                        key={outfit.id}
                        title={outfit.name}
                        left={() => (
                            <Image source={outfit.image} style={styles.outfitImage} />
                        )}
                        right={() => (
                            <View style={styles.radioButtonContainer}>
                                <RadioButton
                                    value={outfit.id}
                                    status={selectedOutfitId === outfit.id ? 'checked' : 'unchecked'}
                                    onPress={() => selectOutfit(outfit.id)}
                                />
                            </View>
                        )}
                        onPress={() => selectOutfit(outfit.id)}
                    />
                ))}
            </ScrollView>

            {/* Select Button */}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    radioButtonContainer: {
        justifyContent: 'center',  // Vertically center the radio button
        alignItems: 'center',
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

export default ChooseOutfit;
