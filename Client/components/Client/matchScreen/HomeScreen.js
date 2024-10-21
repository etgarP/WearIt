import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Search from './Search';
import MyCarousel from './carousel/carousel';
import TopBtns from './btns/buttons';
import { data } from '../../../data/designers';
import { categories } from '../../../data/categories';  // Import the categories data

export default function MatchRoute({ setProfilePage, navigation }) {
    const [filtered, setFiltered] = useState(data);  // State for filtered data
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [subcategoryFilter, setSubcategoryFilter] = useState('');  // Add subcategory filter
    const [reviewFilter, setReviewFilter] = useState('');
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        let filteredData = data;

        // console.log("priceFilter, categoryFilter, subcategoryFilter, reviewFilter, searchText:", priceFilter, categoryFilter, subcategoryFilter, reviewFilter, searchText);

        // Price filtering
        if (priceFilter && priceFilter !== '') {
            filteredData = filteredData.filter(item => {
                print(item.pricePerItem)
                if (priceFilter === 'Cheap') return item.pricePerItem < 5;
                if (priceFilter === 'Affordable') return item.pricePerItem >= 5 && item.pricePerItem < 20;
                if (priceFilter === 'Expensive') return item.pricePerItem >= 20;
                return true;
            });
        }

        // Category filtering
        if (categoryFilter) {
            // Find the picked category in the categories array
            const pickedCategory = categories.find(category => category.title === categoryFilter);
            if (pickedCategory) {
                // Check if any specialization is in the picked category's items
                filteredData = filteredData.filter(item => {
                    return item.specialization.some(specializationItem =>
                        pickedCategory.items.includes(specializationItem)
                    );
                });
            }
        }

        // Subcategory filtering
        if (subcategoryFilter) {
            // filteredData = filteredData.filter(item => item.subcategory === subcategoryFilter);
            if (categoryFilter) {
                filteredData = filteredData.filter(item => {
                    return item.specialization.some(specializationItem =>
                        subcategoryFilter === specializationItem
                    );
                });
            }   
        }

        // Review filtering
        if (reviewFilter && reviewFilter !== '') {
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
    }, [priceFilter, categoryFilter, subcategoryFilter, reviewFilter, searchText]);  // Add subcategoryFilter to dependencies

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
                <TopBtns setPriceFilter={setPriceFilter} setCategoryFilter={setCategoryFilter} setSubcategoryFilter={setSubcategoryFilter} setReviewFilter={setReviewFilter} />
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
