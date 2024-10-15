import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Search from './Search';
import MyCarousel from './carousel/carousel';
import TopBtns from './btns/buttons';
import { data } from '../../data/designers';

export default function MatchRoute({ setProfilePage, navigation }) {
    const [filtered, setFiltered] = useState(data);  // State for filtered data
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [reviewFilter, setReviewFilter] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        let filteredData = data;
        console.log("priceFilter, categoryFilter, reviewFilter, searchText:", priceFilter, categoryFilter, reviewFilter, searchText)
        // Price filtering
        if (priceFilter && priceFilter != '') {
            filteredData = filteredData.filter(item => {
                if (priceFilter === 'Cheap') return item.price < 50;
                if (priceFilter === 'Affordable') return item.price >= 50 && item.price < 100;
                if (priceFilter === 'Expensive') return item.price >= 100;
                return true;
            });
        }

        // Category filtering
        if (categoryFilter) {
            filteredData = filteredData.filter(item => item.category === categoryFilter);
        }

        // Review filtering
        if (reviewFilter && reviewFilter != '') {
            filteredData = filteredData.filter(item => {
                const avgRating = calculateAverageRating(item.reviews);
                if (reviewFilter === '3+ Stars') return avgRating >= 3;
                if (reviewFilter === '4+ Stars') return avgRating >= 4;
                if (reviewFilter === '5 Stars') return avgRating === 5;
                return true;
            });
        }

        // Search text filtering
        if (searchText) {
            filteredData = filteredData.filter(designer =>
                designer.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Update filtered state
        setFiltered(filteredData);
    }, [priceFilter, categoryFilter, reviewFilter, searchText]);  // Runs when any of these change

    const handleSearchChange = (text) => {
        setSearchText(text);  // Update search text filter
    };

    // Function to calculate average rating
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return total / reviews.length;
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Search onChange={handleSearchChange} />
            </View>
            <View style={styles.btnscontainer}>
                <TopBtns setPriceFilter={setPriceFilter} setCategoryFilter={setCategoryFilter} setReviewFilter={setReviewFilter} />
            </View>
            <View>
                <MyCarousel setProfilePage={setProfilePage} navigation={navigation} data={filtered} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    btnscontainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    search: {
        width: '100%',
        paddingHorizontal: 10,
    },
});
