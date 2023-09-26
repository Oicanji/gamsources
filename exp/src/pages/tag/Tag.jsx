import { Text, View } from 'react-native';
import { Button } from 'react-native-web';
import { useEffect, useState } from 'react';
import { axiosTag } from '../../api/tag';

export function Tag({navigation}){

    const [tags, setTags] = useState([]);

    function goHome(){
        navigation.navigate('Home')
    }

    const getTags = async () => {
        const tags = await axiosTag();
        console.log(tags);
        setTags();
    }

    useEffect(() => {
        getTags();
    }, [])

    return(
        <View>
            {tags.length > 0 && tags.map((tag) => (
                <Text key={tag.id}>{tag.name}</Text>
            ))}

            <Text>GO HOME: </Text>
            <Button title="ENTER" onPress={() => goHome()} />
        </View>
    )
}