import React from 'react'
import { Searchbar } from 'react-native-paper';

export default function Search({ onChange }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={(text) => {
                setSearchQuery(text)
                onChange(text)
            }}
            value={searchQuery}
        />
    );
};