import React from 'react'
import { Button, Modal } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import { Text, StatusBar } from 'react-native';
import { removeError } from '../redux/slices/error/errorSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ErrorModal = () => {

    const { error, showModal } = useAppSelector(state => state.error);
    const dispatch = useAppDispatch();

    return (
        <Modal
            visible={showModal}
            onDismiss={() => dispatch(removeError())}
            contentContainerStyle={{
                backgroundColor: '#39304d',
                // flex: 1
                width: '80%',
                height: 230,
                alignItems: 'center',
                borderRadius: 5
            }}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.5)'
            }}
            dismissable
        >
            <StatusBar 
            backgroundColor={'rgba(0,0,0,.5)'}
            />
                <Icon
                    name='close-circle-outline'
                    size={40}
                    color='white'
                    onPress={() => dispatch(removeError())}
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        zIndex: 999,
                        elevation: 999
                    }} 
                />
            <Text
                style={{
                    color: '#fff',
                    fontSize: 40,
                    textAlign: 'center'
                }}
            >{error}</Text>
            <Button
                onPress={() => dispatch(removeError())}
                mode="contained"
                style={{
                    width: '60%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 40
                }}
            >
                <Text>OK</Text>
            </Button>
        </Modal>
    )
}
