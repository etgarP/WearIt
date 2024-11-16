import React from 'react';
import { Appbar } from 'react-native-paper';


const AppBar = ({navigation, text}) => {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={text} />
        </Appbar.Header>
    );
}

export default AppBar