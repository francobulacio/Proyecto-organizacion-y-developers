import * as React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import { Dev } from '../../interfaces/teamInterface';
import { getInitials } from '../../helpers/getInitials';

interface Props {
  dev: Dev
}
const Card = ({ dev }: Props) => {
  const initials = getInitials(`${dev.name} ${dev.surname}`)
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          marginTop: 5,
          marginBottom: 15,
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-evenly',
        },
      ]}>
      <Avatar.Text size={74} label={initials} />
      <View
        style={{
          backgroundColor: 'hsla(0,0%,95%,0.6)',
          borderRadius: 5,
          paddingVertical: 10,
          paddingLeft: 20,
          width: '60%',
        }}>
        <Text style={{color: 'white', textTransform: 'capitalize'}}>{`${dev.name} ${dev.surname}`}</Text>
        <Text style={{ textTransform: 'capitalize'}}>{dev.role}</Text>
        <Text style={{color: 'black'}}>{dev.email}</Text>
      </View>
    </View>
  );
};

export default Card;
