import React, { useState } from 'react';
import { Modal, Text, View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { MyInput } from './MyInput';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import axios from 'axios';
import { setError } from '../redux/slices/error/errorSlice';
import { useSendContact } from '../hook/useSendContact';

interface Props {
    teamId: string,
    disabled: boolean | undefined
}

export const ContactModal = ({ teamId, disabled }: Props) => {

    const { show, message, handleChange, handleSubmit } = useSendContact();

    return (
        <>
            <Modal
                visible={show}
                animationType='fade'
                transparent
                onDismiss={() => handleChange( 'show', false )}
            >
            <StatusBar
                // hidden
                backgroundColor={'black'}
            />

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,1)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <View
                        style={{
                            backgroundColor: '#39304d',
                            width: '80%',
                            borderRadius: 5,
                            alignItems: 'center',
                            // justifyContent: 'space-evenly'
                        }}
                    >
                        <Icon
                            name='close-circle-outline'
                            size={40}
                            color='white'
                            onPress={() => handleChange( 'show', false )}
                            style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                zIndex: 999,
                                elevation: 999
                            }}
                        />
                        <Text
                            style={{ color: 'white', fontSize: 20, marginVertical: 40, marginHorizontal: 20, textAlign: 'center' }}
                        >Send the team a description of your idea to develop</Text>

                        <MyInput
                            numberOfLines={4}
                            multiline
                            keyboardType='default'
                            value={message}
                            onChangeText={( value )=>handleChange( 'message', value )}
                            style={{
                                marginHorizontal: 20,
                            }}
                        />
                        <Button
                            mode='contained'
                            style={{
                                marginVertical: 20
                            }}
                            onPress={() => handleSubmit(teamId)}
                        >send</Button>
                    </View>
                </View>

            </Modal>
            <Button
                onPress={() =>  handleChange( 'show', true )}
                mode="contained"
                style={{
                    width: '60%',
                    alignSelf: 'center',
                    margin: 20,
                    borderRadius: 40
                }}
                disabled={disabled}
            >
                <Text style={{
                    fontSize: 20
                }}>Contact Team!</Text>
            </Button>
        </>
    )
}
