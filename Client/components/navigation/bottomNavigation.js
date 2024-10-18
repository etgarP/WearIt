import React, { useContext } from 'react';
import { View, Text } from 'react-native'
import { BottomNavigation } from 'react-native-paper';
import MatchRoute from '../matchScreen/HomeScreen';
import { Appbar } from 'react-native-paper';
import { ProfileContext } from './ProfileProvider'; 

const GroupMatchRoute = () => <Text>Group Match</Text>;
const OrdersRoute = () => <Text>Orders</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

export default function BottomNav({ navigation }) {
    const { setProfilePage } = useContext(ProfileContext);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'match', title: 'Match', focusedIcon: 'face-man-shimmer', unfocusedIcon: 'face-man-shimmer-outline' },
        { key: 'groupMatch', title: 'Group Match', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
        { key: 'orders', title: 'Orders', focusedIcon: 'shopping', unfocusedIcon: 'shopping-outline' },
        { key: 'notifications', title: 'Notifications', focusedIcon: 'palette', unfocusedIcon: 'palette-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        match: (props) => <MatchRoute {...props} setProfilePage={setProfilePage} navigation={navigation} />,
        groupMatch: GroupMatchRoute,
        orders: OrdersRoute,
        notifications: NotificationsRoute,
    });

    return (
        <>
            <Appbar.Header mode="center-aligned">
                <Appbar.Content title="Matching" />
            </Appbar.Header>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>
        
    );
}
