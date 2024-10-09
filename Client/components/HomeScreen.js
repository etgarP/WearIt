import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Search from './Search'
import MyCarousel from './carousel.js';
import TopBtns from './buttons'

export default function MatchRoute() {
    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Search />
            </View>
            <View style={styles.btnscontainer}>
                <TopBtns/>
            </View>
            <View>
                <MyCarousel />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Center horizontally
        backgroundColor: '#fff',
    },
    btnscontainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribute space evenly
    },
    search: {
        width: '100%', // Ensure the search takes full width
        paddingHorizontal: 10, // Optional padding
    },
    text: {
        fontSize: 20, // Adjust font size as needed
    },
});
