import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import Search from './Search';
import MyCarousel from './carousel/carousel';
import TopBtns from './btns/buttons';
import { getMatches } from '../../../apiServices/client/getMatches.js'; // Import the fetch function
import { filterDesigners } from '../../../utils/client/filterLogic'; // Import the filter logic
import { AppObjectContext } from '../../appNavigation/appObjectProvider';
import ConnectedMatchRoute from './homeScreenConnected'

export default function MatchRoute({ setProfilePage, navigation }) { 
    const [filtered, setFiltered] = useState([]);
    const { userDetails: { token } } = useContext(AppObjectContext);
    const [alertShown, setAlertShown] = useState(false); // State to track if alert has been shown
    const [loading, setLoading] = useState(true); // State to track loading
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true when starting fetch
            try {
                const data = await getMatches(token);
                setFiltered(data);  // Initialize filtered data
                setAlertShown(false); // Hide alert if data is fetched successfully
            } catch (error) {
                setAlertShown(true); // Show alert if there's an error
            } finally {
                setLoading(false); // Set loading to false when fetch completes
            }
        };

        fetchData();
    }, [token]); // No need to track alertShown in dependencies
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
                <Text style={styles.loadingText}>Fetching your matches...</Text>
            </View>
        );
    }
    if (alertShown) {
        return (
            <Text style={styles.errorText}>
                NETWORK ERROR
            </Text>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <ConnectedMatchRoute setProfilePage={setProfilePage} navigation={navigation} designersData={filtered} />
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    loadingIcon: {
        width: 80,
        height: 80,
    },
    spinner: {
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 20,
    },
});
