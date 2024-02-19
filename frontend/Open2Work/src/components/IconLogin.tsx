import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    label: string;
    backgroundColor?: string;
    onPress: ()=>void;
}

export const IconLogin = ({ backgroundColor = '#fff', iconName, label, onPress }: Props) => {

    return (
        <View>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor,
                    padding: 10,
                    borderRadius: 10,
                    margin: 20
                }}
                onPress={()=> onPress()}
                >
                <Icon name={iconName} size={30} color='white' />
                <Text style={{ color: 'white', fontSize: 15 }}> {label}</Text>
            </TouchableOpacity>
        </View>
    )
}
