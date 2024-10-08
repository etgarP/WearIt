import React from 'react';
import { Text } from "react-native";
import { BottomNavigation } from 'react-native-paper';

const MatchRoute = () => <Text>Match</Text>;
const GroupMatchRoute = () => <Text>Group Match</Text>;
const OrdersRoute = () => <Text>Orders</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

export default function BottomNav() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'match', title: 'Match', focusedIcon: 'face-man-shimmer', unfocusedIcon: 'face-man-shimmer-outline' },
        { key: 'groupMatch', title: 'Group Match', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
        { key: 'orders', title: 'Orders', focusedIcon: 'shopping', unfocusedIcon: 'shopping-outline' },
        { key: 'notifications', title: 'Notifications', focusedIcon: 'palette', unfocusedIcon: 'palette-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        match: MatchRoute,
        groupMatch: GroupMatchRoute,
        orders: OrdersRoute,
        notifications: NotificationsRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}
