import { Text, View } from 'react-native';
import { Button } from 'react-native-web';

export function Home({navigation}){

    function goTag(){
        navigation.navigate('Tag')
    }

    return(
        <View>
            <Text>GO TAG: </Text>
            <Button title="ENTER" onPress={() => goTag()} />
        </View>
    )
}