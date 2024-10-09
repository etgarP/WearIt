import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ImageSlider } from '../data/SliderData';
import MyCard from './card.js'

const MyCarousel = () => {
    return (
        <View style={styles.container}>
            <FlatList data={ImageSlider} renderItem={({ item, index }) => <MyCard item = {item} index = {index} />}/>
        </View>
    );
};

export default MyCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});