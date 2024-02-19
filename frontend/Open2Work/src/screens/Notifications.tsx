import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline } from 'react-native-paper';
import { useGetTeamById } from '../hook/useGetTeamById';
import { useAppSelector } from '../redux/hook';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamListClientNotifications } from '../navigation/StackNotifications';
import { useGetClientById } from '../hook/useGetClientById';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StackScreenProps<
  RootStackParamListClientNotifications,
  'Notifications'
>;

const Notifications = ({ navigation }: Props) => {

  const { getInfoGroup, infoGroup } = useGetTeamById();

  const { getInfoClient, infoClient } = useGetClientById();

  const { isDev, currentTeam, _id } = useAppSelector(state => state.user);
  
  const { top } = useSafeAreaInsets();

  const refreshOrders = () => {
    if (isDev) {
      getInfoGroup(currentTeam)
    } else {
      getInfoClient(_id)
    }
  };

  useEffect(() => {
    refreshOrders();
  }, [])

  const ordenes = isDev ? infoGroup?.orders : infoClient?.orders;

  return (
    <View style={{ backgroundColor: 'rgb(31, 26, 48)', flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          top,
          zIndex: 10
        }}
      >
        <Text
          style={{
            color: '#17f1de',
            fontWeight: '700',
            fontSize: 30,
            marginLeft: 15,
          }}>
          Inbox
        </Text>
        <TouchableOpacity
          onPress={() => refreshOrders()}
        >
          <Icon name='refresh-outline' size={30} color='white' />
        </TouchableOpacity>

      </View>
      <View
        style={{
          backgroundColor: 'hsl(0,0%,5%)',
          height: 7,
          marginVertical: 7,
        }}
      />
      <View
        style={{
          backgroundColor: 'rgb(57,48,77)',
          padding: 10,
          marginHorizontal: 15,
          borderRadius: 3,
          height: '90%',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {ordenes &&
            ordenes.map((order) => {

              if (isDev) {
                const state = order.devs_ok.includes(_id) ? 'Accepted' : order.devs_not.includes(_id) ? 'Rejected' : 'Pending';
                return (

                  <View
                    key={order._id}
                    style={{
                      backgroundColor: 'rgb(31, 26, 48)',
                      borderRadius: 5,
                      padding: 10,
                      marginVertical: 10,
                    }}>

                    <Text style={{
                      color: '#17f1de',
                      fontSize: 18
                    }}>{`Order number: #${order._id.slice(-6)}`}</Text>
                    <Text style={{
                      color: '#fff',
                      fontSize: 18
                    }}>{`Created: ${new Date(order.createdAt)}`}</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Details', {
                        idUser: order.client,
                        order,
                        refreshFunc: refreshOrders
                      })}
                    >
                      <Text style={{
                        color: '#17f1de',
                        fontSize: 18
                      }}>{`From: Client #${order.client.slice(-4)}`}</Text>
                    </TouchableOpacity>
                    <Text style={{
                      color: state === 'Accepted' ? 'green' : state === 'Rejected' ? 'red' : 'yellow',
                      fontSize: 18
                    }}>{`State: ${state}`}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 10,
                      }}>

                    </View>
                  </View>
                )
              } else {


                return (
                  <View
                    key={order._id}
                    style={{
                      backgroundColor: 'rgb(31, 26, 48)',
                      borderRadius: 5,
                      padding: 10,
                      marginVertical: 10,
                    }}>
                    <Text style={{
                      color: '#17f1de',
                      fontSize: 18
                    }}>{`Order number: #${order._id.slice(-6)}`}</Text>
                    <Text style={{
                      color: '#fff',
                      fontSize: 18
                    }}>{`Created: ${new Date(order.createdAt)}`}</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Details', {
                        idUser: order.team,
                        order
                      })}
                    >
                      <Text style={{
                        color: '#17f1de',
                        fontSize: 18,
                      }}>{`To: Group #${order.team.slice(-4)}`}</Text>
                    </TouchableOpacity>

                    <Text style={{
                      color: '#fff',
                      fontSize: 18
                    }}>{`Message: ${order.description}`}</Text>
                    <View>
                      <Text style={{
                        color: '#fff',
                        fontSize: 18
                      }}>{`State:`}</Text>
                      <View style={{ marginLeft: 30}}>
                        <Text style={{ fontSize: 18, color: 'green' }}>{`${order.devs_ok.length} Accept`}</Text>
                        <Text style={{ fontSize: 18, color: 'red' }}>{`${order.devs_not.length} Rejection`}</Text>
                        {/* <Text style={{ fontSize: 18, color: 'yellow' }}>{`${4 - (order.devs_not.length + order.devs_ok.length)} Pending`}</Text> */}

                      </View>
                    </View>


                  </View>
                )
              }
            }).reverse()
          }

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgb(31, 26, 48)', flex: 1},
  headline: {
    color: '#17f1de',
    marginTop: 40,
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 15,
  },
  line: {
    backgroundColor: 'hsl(0,0%,5%)',
    height: 7,
    marginVertical: 7,
  },
  scrollCont: {
    backgroundColor: 'rgb(57,48,77)',
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 3,
    height: '83%',
  },
  card: {
    backgroundColor: 'hsla(0, 0%, 65%,0.75)',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  reject: {backgroundColor: 'rgb(190,10,10)'},
  accept: {backgroundColor: 'rgb(50,220,50)'},
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
  cardTitle: {
    color: '#17f1de',
    fontSize: 18,
  },
});

export default Notifications;
