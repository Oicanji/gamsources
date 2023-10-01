import { Text, View } from 'react-native';
import { Button } from 'react-native-web';
import { useEffect, useState } from 'react';
import { axiosTag, axiosTagCreate } from '../../api/tag';
import { useForm } from "react-hook-form";

export function Tag({navigation}){

    const [tags, setTags] = useState([]);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = values => addTags(values);

    function goHome(){
        navigation.navigate('Home')
    }

    const getTags = async () => {
        const req = await axiosTag();
        console.log(req.tags);
        setTags(req.tags);
    }

    const addTags = async (values) => {
        await axiosTagCreate(values.name, values.hex);
        getTags();
    }

    useEffect(() => {
        getTags();
    }, [])

    return(
        <View style={{ 
            padding: 10,
             }}>
            <Text>Adicionar Tags: </Text>
                
            <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                {...register("name", { required: true, maxLength: 20 })}

            />
            {errors.name && errors.name.message}

            <input
                {...register("hex", { required: false, maxLength: 7,
                pattern: {
                value: /^#([0-9A-F]{3}){1,2}$/i,
                message: "invalid color"
                } })}
                style={{
                    marginLeft: 3,
                    marginRight: 3
                }}
            />
            {errors.hex && errors.hex.message}

            <button type="submit">+</button>
            </form>
            <hr
                style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#000000",
                    marginTop: 10,
                    marginBottom: 10
                }}
            />
            <Text>Tags: </Text>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {tags.map((tag) => 
                    <div
                        style={{
                            margin: 2,
                            padding: 5,
                            borderRadius: 5,
                            backgroundColor: tag.color,
                            color: "#FFFFFF",
                            textShadow: "2px 2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, -2px -2px 0 #000, 2px 0px 0 #000, 0px 2px 0 #000, -2px 0px 0 #000, 0px -2px 0 #000"
                        }}
                    >{tag.name}</div>
                )}
            </div>

            <Text>GO HOME: </Text>
            <Button title="ENTER" onPress={() => goHome()} />
        </View>
    )
}