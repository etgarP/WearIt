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
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzE3MDA1OTM2fQ.O4h6cAx78lRaTHA4QCKPF0Xt9kUm-of_a0NA74n_q9c',
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
