import * as React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, List, IconButton } from 'react-native-paper';

const clothes = [
    { id: 1, image: require('../../assets/shirt.png') },
    { id: 2, image: require('../../assets/pants_black.png') },
    { id: 3, image: require('../../assets/pants_tan.png') },
    // Add more clothes as needed
];

const MixAndMatch = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Top Appbar */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Mix & Match" />
            </Appbar.Header>

            {/* Model Image */}
            <View style={styles.modelContainer}>
                <Image
                    source={require('../../assets/model.png')}
                    style={styles.modelImage}
                />
            </View>

            {/* Scrollable Clothes Section */}
            <View style={styles.scrollContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {clothes.map((item) => (
                        <TouchableOpacity style={styles.plusButton} onPress={() => console.log('image Pressed')}>
                            <Image
                                key={item.id}
                                source={item.image}
                                style={styles.clothesImage}
                            />
                        </TouchableOpacity>
                    ))}

                    {/* Plus Button */}
                    <TouchableOpacity style={styles.plusButton} onPress={() => console.log('Plus Button Pressed')}>
                        <IconButton icon="plus" size={30} color="black" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modelContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modelImage: {
        width: 200,
        height: 400,
        resizeMode: 'contain',
    },
    scrollContainer: {
        flex: 1,
        padding: 10,
    },
    clothesImage: {
        width: 80,
        height: 80,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    plusButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        width: 80,
        height: 80,
        marginHorizontal: 10,
        borderRadius: 40,
    },
});

export default MixAndMatch;
