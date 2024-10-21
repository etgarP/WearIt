import React, { useContext } from 'react';
import { Text } from 'react-native';
import { BottomNavigation, Appbar } from 'react-native-paper';
import MatchRoute from '../matchScreen/HomeScreen';
import OrdersRoute from '../orderScreen/orderPage';
import { ObjectContext } from './ObjectProvider';
import FinishedDesigns from '../designScreen/finishedDesigns'


export default function BottomNav({ navigation }) {
    const { setProfilePage } = useContext(ObjectContext);
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
        orders: OrdersRoute,
        design: () => <FinishedDesigns navigation={navigation} />,
    });

    return (
        <>
            {/* Update the Appbar title dynamically based on the selected route */}
            <Appbar.Header mode="center-aligned">
                <Appbar.Content title={routes[index].title} />
            </Appbar.Header>

            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>
    );
}
