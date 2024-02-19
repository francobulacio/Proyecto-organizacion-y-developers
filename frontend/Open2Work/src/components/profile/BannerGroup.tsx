import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import Array from './Array';
import { useAppSelector } from '../../redux/hook';
import MyAvatar from '../MyAvatar';
import { Team } from '../../interfaces/teamInterface';

interface Props {
  data: Team;
}

const BannerGroup = ({ data }: Props): JSX.Element => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,

      }}>

      {
        data.stack && (<Text style={styles.item}>
          <Icon name="build-outline" size={20} color="white" />{' '}
          {data.stack}
        </Text>)
      }
      <Text style={styles.item}>
        <Icon name="globe-outline" size={20} color="white" />{' '}
        <Array data={data.time_zone} symbol={' / '} />
      </Text>
      <Text style={styles.item}>
        <Icon name="language-outline" size={20} color="white" />{' '}
        <Array data={data.language} symbol={' - '} />
      </Text>
      <Text style={styles.item}>
        <Icon name="briefcase-outline" size={20} color="white" /> {data.availability}
      </Text>
      {/* <Text
        style={{
          color: data.working ? 'green' : 'red',
          fontSize: 17,
          textAlignVertical: 'center',
        }}>
        <Icon name="alert-circle-outline" size={20} color="white" /> {data.working ? 'Working' : 'Not working'}</Text> */}

    </View>
  );
};

const styles = StyleSheet.create({
  item: { color: 'darkgrey', fontSize: 17, marginVertical: 4, marginHorizontal: 5 },

});

export default BannerGroup;
