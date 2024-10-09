import React from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import MyCard from './card'; // Ensure that this is correctly imported
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('screen');

const MyCarousel = () => {
    // Sample data based on the provided structure
    const data = [
        {
            "username": "jane_designer",
            "__v": 0,
            "bio": "Now bio!",
            "designerInfo": {
                "$oid": "665a13d3f21fe10cf2321514"
            },
            "image": "https://example.com/images/jane_doe.jpg",
            "name": "Jane Doe",
            "reviews": [],
            "score": 85
        },
        {
            "username": "jane_designer",
            "__v": 0,
            "bio": "Now bio!",
            "designerInfo": {
                "$oid": "665a13d1f21fe10cf2321514"
            },
            "image": "https://example.com/images/jane_doe.jpg",
            "name": "Jane Doe",
            "reviews": [],
            "score": 85
        },
        {
            "username": "sara_designer",
            "__v": 0,
            "bio": "I am an expert in casual dresses!",
            "designerInfo": {
                "$oid": "665a13d3f21fe10cf2321515"
            },
            "image": "https://example.com/images/sara_doe.jpg",
            "name": "Sara Doe",
            "reviews": [],
            "score": 90
        }
    ];
    return (
        <View style={styles.container}>
            <Carousel
                width={width} // 90% of screen width for better appearance
                height={height*0.6}  // Adjust height based on your card size
                data={data}
                renderItem={({ item, index }) => (
                    <MyCard
                        name={item.name}
                        image={item.image}
                        description={item.bio}
                        score={item.score}
                        index={index}
                    />
                )}
                mode="parallax"  // Add any carousel mode or configuration you prefer
                loop={true}  // Whether the carousel should loop
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },

});

export default MyCarousel;
