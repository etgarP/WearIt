import React, { useContext, useRef } from 'react';
import { BottomNavigation, Appbar } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native'; // Import Image from 'react-native'
import MatchRoute from '../matchScreen/HomeScreen';
import OrdersRoutePre from '../orderScreen/orderPagePre';
import { ClientObjectContext } from './ClientObjectProvider';
import Sheet from '../../sheet';

export default function BottomNav({ navigation }) {
    const { setProfilePage } = useContext(ClientObjectContext);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'match', title: 'Match', focusedIcon: 'face-man-shimmer', unfocusedIcon: 'face-man-shimmer-outline' },
        { key: 'orders', title: 'Orders', focusedIcon: 'shopping', unfocusedIcon: 'shopping-outline' },
        { key: 'design', title: 'Design', focusedIcon: 'palette', unfocusedIcon: 'palette-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        match: () => <MatchRoute setProfilePage={setProfilePage} navigation={navigation} />,
        orders: () => <OrdersRoutePre navigation={navigation} isDesign={false} />,
        design: () => <OrdersRoutePre navigation={navigation} isDesign={true} />,
    });

    const sheetRef = useRef(null);

    const openBottomSheet = () => {
        sheetRef.current?.openSheet();
    };

    const onChangeInfo = () => {
        navigation.navigate("clientQuestionnaire")
    }

    return (
        <>
            <Sheet ref={sheetRef} onChangeInfo={onChangeInfo}>
                <Appbar.Header mode="center-aligned">
                    {/* Display logo in the center */}
                    <View style={styles.imageContainer}>
                        {/* <Appbar.Content title={routes[index].title} /> */}
                        <Image
                            source={require('../../../data/logo.png')} // Local image using require
                            style={styles.image}
                        />
                    </View>
                    <Appbar.Action icon='dots-vertical' onPress={openBottomSheet} />
                </Appbar.Header>

                {/* Update the Appbar title dynamically based on the selected route */}
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </Sheet>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the image horizontally
        alignItems: 'center',
        flex: 1, // This ensures that the image is centered in the Appbar
    },
    image: {
        marginLeft: 45,
        width: 120,  // Adjust the size of the image
        height: 20, // Adjust the size of the image
    },
});

