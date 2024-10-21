import React, { useContext } from 'react';
import { Text } from 'react-native';
import { BottomNavigation, Appbar } from 'react-native-paper';
import DesignerHome from '../homeScreen/designerHome';


export default function DesignerBottomNav({ navigation }) {
    // const { setProfilePage } = useContext(ClientObjectContext);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'face-man-shimmer', unfocusedIcon: 'face-man-shimmer-outline' },
        // { key: 'groupMatch', title: 'Group Match', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
        // { key: 'orders', title: 'Orders', focusedIcon: 'shopping', unfocusedIcon: 'shopping-outline' },
        // { key: 'design', title: 'Design', focusedIcon: 'palette', unfocusedIcon: 'palette-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: () => <DesignerHome/>,
        // groupMatch: GroupMatchRoute,
        // orders: OrdersRoute,
        // design: () => <FinishedDesigns navigation={navigation} />,
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
