import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
type Props = {
    navigation: StackNavigationProp<any, any>
}
export const ButtonGoBack = ({ navigation }: Props) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'hsla(0,0%,15%,0.65)',
                    borderRadius: 6,
                    padding: 5
                }}
            >
                <Icon name='arrow-back-outline' size={40} color='white' />
                <Text style={{
                    color: 'white',
                    fontSize: 25
                }}>Go back</Text>
            </TouchableOpacity>
        </>
    )
}
