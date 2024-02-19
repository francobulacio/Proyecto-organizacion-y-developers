import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../redux/hook';
import { logout } from '../redux/slices/auth/authSlice';
import { clearUser } from '../redux/slices/user/userSlice';
import { Modal, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import {useState} from 'react';
export const ButtonLogout = () => {

    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false)

    const handleLogout = () => {
        setShowModal(false)
        dispatch(logout())
        dispatch(clearUser())
    }

    return (
        <>
            <TouchableOpacity
                onPress={ ()=> setShowModal(true)}
            >
                <Icon name='log-out-outline' size={40} color='white' />
            </TouchableOpacity>
            {/* <View
                style={{
                    position: 'absolute'
                }}
            > */}

                <Modal
                    visible={showModal}
                    animationType='fade'
                    transparent
                    onDismiss={()=> setShowModal(false)}
                >
                    <StatusBar 
                        backgroundColor={'rgba(0,0,0,.5)'}
                    />
                    <View 
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,.5)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <View
                            style={{
                                backgroundColor: '#39304d',
                                width: '80%',
                                height: 230,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            <Text
                                style={{ color: 'white', fontSize: 20 }}
                            >Are you sure you want to go out</Text>
                        <View
                            style={{ flexDirection: 'row'}}
                        >
                            <Button
                                mode='contained'
                                style={{
                                    margin: 5,
                                }}
                                theme={{ colors: { primary: 'red'} }}
                                onPress={handleLogout}
                            >Yes</Button>
                            <Button
                                mode='contained'
                                style={{
                                    margin: 5
                                }}
                                onPress={()=> setShowModal(false)}
                            >No</Button>
                        </View>
                        </View>
                    </View>

                </Modal>
            {/* </View> */}
        </>
    )
}
