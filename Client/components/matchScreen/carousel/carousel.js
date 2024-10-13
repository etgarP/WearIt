import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MyCard from './card'; // Ensure that this is correctly imported
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('screen');

const MyCarousel = ({ setProfilePage, navigation, data }) => {
    return (
        <View style={styles.container}>
            {data.length === 0 ? (  // Check if the data array is empty
                <Text style={styles.noResultsText}>
                    No matching results found.
                </Text>
            ) : (
                <Carousel
                    width={width} // 90% of screen width for better appearance
                    height={height * 0.6}  // Adjust height based on your card size
                    data={data}
                    renderItem={({ item, index }) => (
                        <MyCard
                            profile={item}
                            index={index}
                            setProfilePage={setProfilePage}
                            navigation={navigation}
                        />
                    )}
                    mode="parallax"  // Add any carousel mode or configuration you prefer
                    loop={true}  // Whether the carousel should loop
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    noResultsText: {
        flex: 1,
        paddingTop: 25,
        fontSize: 18,
        color: '#888', // Optional: grey color for the no results text
    },
});

export default MyCarousel;
