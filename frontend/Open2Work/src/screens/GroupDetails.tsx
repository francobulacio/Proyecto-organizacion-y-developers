import React, { useEffect } from 'react';
import { ScrollView, Image, View, TouchableOpacity, Text } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/profile/Card';
import BannerGroup from '../components/profile/BannerGroup';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamListClient } from '../navigation/StackClientHome';
import { useGetTeamById } from '../hook/useGetTeamById';
import { ContactModal } from '../components/ContactModal';
import { RootStackParamListClientNotifications } from '../navigation/StackNotifications';
import { ButtonGoBack } from '../components/ButtonGoBack';
import { useAppSelector } from '../redux/hook';

type Props = StackScreenProps<RootStackParamListClient, 'Group'> | StackScreenProps<RootStackParamListClientNotifications, 'Details'>

export const GroupDetails = ({ navigation, route }: Props) => {

    const idTeam = route.params.idUser;

    const { getInfoGroup, infoGroup } = useGetTeamById();

    const { top } = useSafeAreaInsets();

    const { _id } = useAppSelector( state => state.user);


    useEffect(() => {
        getInfoGroup(idTeam)
    }, [idTeam])
    

    return (
        <ScrollView
            contentContainerStyle={{
                backgroundColor: 'rgb(31,26,48)',
                flex: 1,
            }}>
            <Image
                style={{ width: '100%', height: 220 }}
                source={require('../assets/imgs/istockphoto-1046965704-640x640.jpg')}
            />
            <View
                style={{
                    position: 'absolute',
                    top,
                    left: 10
                }}
            >
                <ButtonGoBack navigation={navigation} />
            </View>
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
                {`${!!infoGroup?._id ? `Group #${infoGroup._id.slice(-4)}` : 'No group at the moment'}`}
            </Headline>
            <View>
                {
                    infoGroup && (<BannerGroup
                        data={infoGroup}
                    />)
                }

            </View>
            <View style={{
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flex: 1
            }}>
                {
                    infoGroup && infoGroup.devs.map(dev => {
                        return (
                            <Card dev={dev} key={`${dev._id}`} />
                        )
                    })
                }

            </View>
            <ContactModal teamId={idTeam} disabled={infoGroup?.orders.some( order => order.client === _id)}/>
        </ScrollView>
    );
}
