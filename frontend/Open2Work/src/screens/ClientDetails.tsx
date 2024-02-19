import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { Headline } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BannerProfile from '../components/profile/BannerProfile'
import { useGetClientById } from '../hook/useGetClientById';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamListClientNotifications } from '../navigation/StackNotifications'
import { ButtonGoBack } from '../components/ButtonGoBack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { useAppSelector, useAppDispatch } from '../redux/hook';
import { apiDb } from '../axios/apiDb';
import { AppDispatch } from '../redux/store';
import { loading, removeLoading } from '../redux/slices/loading/loadingSlice'
import { setError } from '../redux/slices/error/errorSlice'
import { useRefreshUser } from '../hook/useRefreshUser';

type Props = StackScreenProps<RootStackParamListClientNotifications, 'Details'>

export const ClientDetails = ({ route, navigation }: Props) => {

    const { idUser, order, refreshFunc } = route.params;

    const { _id } = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    const { top } = useSafeAreaInsets();

    const { getInfoClient, infoClient } = useGetClientById();

    const handleAccept = async (value: boolean) => {

        dispatch(loading());
        if (order) {

            try {

                const body = {
                    dev: _id,
                    ok: value
                };

                const { data } = await apiDb.put(`/order/update/${order?._id}`, body);
                dispatch(setError(data))
                dispatch(removeLoading())
                refreshFunc!();
                navigation.goBack();
            } catch (error: any) {
                console.log('error.response', JSON.stringify(error.response, null, 2))
                dispatch(removeLoading())
            }
        }


    }

    useEffect(() => {
        getInfoClient(idUser)
    }, [idUser])

    return (
        <ScrollView
            contentContainerStyle={{
                backgroundColor: 'rgb(31,26,48)',
                flex: 1,
            }}>
            <View
                style={{
                    position: 'absolute',
                    left: 10,
                    top,
                    zIndex: 1,
                }}
            >
                <ButtonGoBack navigation={navigation} />
            </View>
            <Image
                style={{ width: '100%', height: 220 }}
                source={require('../assets/imgs/laptop-programming-coding-macbook.jpg')}
            />


            {
                infoClient && (
                    <>
                        <Headline
                            style={{
                                position: 'absolute',
                                top,
                                right: 10,
                                color: '#17f1de',
                                marginTop: 25,
                                fontWeight: '700',
                                fontSize: 30,
                                paddingVertical: 7,
                                paddingHorizontal: 15,
                                borderRadius: 3,
                                backgroundColor: 'hsla(0,0%,15%,0.65)',
                                textTransform: 'capitalize'
                            }}>
                            {`${infoClient?.name} ${infoClient?.surname}`}
                        </Headline>
                        <BannerProfile user={infoClient} />
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            <Text
                                style={{
                                    color: '#17f1de',
                                    fontSize: 40,
                                    textAlign: 'center'
                                }}
                            >
                                Description the job to develop:
                            </Text>

                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 30,
                                    textAlign: 'center',
                                    padding: 10
                                }}
                            >
                                {order?.description}
                            </Text>
                            {
                                order?.devs_ok.includes(_id) && (
                                    <View
                                        style={{
                                            width: '40%',
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            bottom: 20,
                                            right: 20
                                        }}
                                    >
                                        <Text style={{ color: 'green', textAlign: 'center' }}>You already accepted this offer</Text>
                                    </View>
                                )
                            }
                            {
                                order?.devs_not.includes(_id) && (
                                    <View
                                        style={{
                                            width: '40%',
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            bottom: 20,
                                            right: 20
                                        }}>
                                        <Text style={{ color: 'red' }}>You already rejected this offer</Text>
                                    </View>
                                )
                            }
                            {
                                (!order?.devs_ok.includes(_id) && !order?.devs_not.includes(_id)) && (
                                    <>
                                        <Text
                                            style={{
                                                color: '#17f1de',
                                                fontSize: 40,
                                                textAlign: 'center'
                                            }}
                                        >
                                            Would you like to accept the job
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                width: '60%',
                                                justifyContent: 'space-evenly',
                                                margin: 10
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => handleAccept(true)}
                                            >

                                                <Icon name='thumbs-up-outline' size={50} color='green' />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleAccept(false)}
                                            >

                                                <Icon name='thumbs-down-outline' size={50} color='red' />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )
                            }


                        </View>
                    </>
                )
            }


        </ScrollView>
    )
}
