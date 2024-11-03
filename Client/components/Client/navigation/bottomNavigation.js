import React, { useContext, useRef } from 'react';
import { BottomNavigation, Appbar } from 'react-native-paper';
import MatchRoute from '../matchScreen/HomeScreen';
import OrdersRoutePre from '../orderScreen/orderPagePre';
import { ClientObjectContext } from './ClientObjectProvider';
import Sheet from '../../sheet';



export default function BottomNav({ navigation }) {
    const { setProfilePage } = useContext(ClientObjectContext);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'match', title: 'Match', focusedIcon: 'face-man-shimmer', unfocusedIcon: 'face-man-shimmer-outline' },
        // { key: 'groupMatch', title: 'Group Match', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
        { key: 'orders', title: 'Orders', focusedIcon: 'shopping', unfocusedIcon: 'shopping-outline' },
        { key: 'design', title: 'Design', focusedIcon: 'palette', unfocusedIcon: 'palette-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        match: () => <MatchRoute setProfilePage={setProfilePage} navigation={navigation} />,
        // groupMatch: GroupMatchRoute,
        orders: () => <OrdersRoutePre navigation={navigation} isDesign={false} />,
        design: () => <OrdersRoutePre navigation={navigation} isDesign={true} />,
    });

    const sheetRef = useRef(null);

    const openBottomSheet = () => {
        sheetRef.current?.openSheet();
    };

    return (
        <>
            
            <Sheet ref={sheetRef}>
                <Appbar.Header mode="center-aligned">
                    <Appbar.Content title={routes[index].title} />
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
