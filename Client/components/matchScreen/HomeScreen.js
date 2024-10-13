import React from 'react'
import { StyleSheet, View } from "react-native";
import Search from './Search'
import MyCarousel from './carousel/carousel';
import TopBtns from './btns/buttons'
import {data} from './../../assets/data/designers'

export default function MatchRoute({ setProfilePage, navigation }) {
    const [filtered, setFiltered] = React.useState(data);  // State for filtered data

    const filterInfo = (text) => {
        const filteredData = data.filter(designer =>
            designer.name.toLowerCase().includes(text.toLowerCase())  // Use includes for partial matches
        );
        setFiltered(filteredData);  // Update the filtered state
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Search onChange={filterInfo}/>
            </View>
            <View style={styles.btnscontainer}>
                <TopBtns/>
            </View>
            <View>
                <MyCarousel setProfilePage={setProfilePage} navigation={navigation} data={filtered} />
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
