import React, { useContext} from 'react';
import { Button, View } from 'react-native';
import { AppObjectContext } from '../../appNavigation/appObjectProvider';

const SignIn = ({ navigation }) => {
    const { setUserDetails, userDetails } = useContext(AppObjectContext) 
    return (
        <View style={styles.container}>
            <Button
                title='SignIn'
                onPress={() => {
                    setUserDetails({
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzI5NTMxMTAzfQ.T5_yF70MX20GRNMlxCjx-DS-AptKjqTqjn5iVmEgBPE',
                        username: 'john_doe'
                    })
                    navigation.replace('client')
                }}
            >
            </Button>
        </View>
        
    );
};

styles = {
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    }
}
export default SignIn;
