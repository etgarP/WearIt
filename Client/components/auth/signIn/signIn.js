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
                      token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0eWxpc3QxMjMiLCJpYXQiOjE3MzAwNjY4MjF9.88Bei65OvUp6qAMbejKB0Lw_lYbnHFpSC6hcN-8Lfxg",
                      username: "stylist123",
                    });
                    navigation.replace("designer");
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
