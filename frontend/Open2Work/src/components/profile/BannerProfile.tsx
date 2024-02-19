import * as React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import Array from './Array';
import { getInitials } from '../../helpers/getInitials';
import { User } from '../../interfaces/loginInterface';
import MyAvatar from '../MyAvatar';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  user: User;
}
const BannerProfile = ({ user }: Props): JSX.Element => {

  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          position: 'absolute',
          top: -100,
          marginLeft: 5,
          width: 102,
          height: 145,
          borderRadius: 50,
          backgroundColor: 'black',
          alignItems: 'center',
        }}>
        {user.avatar.startsWith('http') ? (
          <MyAvatar uri={user.avatar} />
        ) : (
          <Avatar.Text
            label={getInitials(`${user.name} ${user.surname}`)}
            size={90}
            style={{ marginTop: 7 }}
          />
        )}
      </View>
      <Text style={styles.item}>
        <Icon name="build-outline" size={20} color="white" />{' '}
        {(user.isDev ? user.role : user.info.organization) || 'Globant'}
      </Text>
      <Text style={styles.item}>
        <Icon name="globe-outline" size={20} color="white" />{' '}
        {user.info.time_zone || 'UTC-3'}
      </Text>
      <Text style={styles.item}>
        <Icon name="language-outline" size={20} color="white" />{' '}
        <Array data={user.info.language} symbol={' - '} />
      </Text>
      {user.isDev && (
        <Text style={styles.item}>
          <Icon name="briefcase-outline" size={20} color="white" />{' '}
          {user.info.time_availability}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:${user.email}`)}
      >
        <Text
          style={styles.item}>
          <Icon name="mail-outline" size={20} color="white" /> {user.email || 'test@test.com'}
        </Text>
      </TouchableOpacity>
      <>
        <TouchableOpacity
          onPress={() => Linking.openURL(`${user.social.github} `)}
        >
          <Text style={[styles.item]}>
            <Icon name="logo-github" size={20} color="white" />{' '}
            {user.social.github || 'http://a.com'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`${user.social.linkedin}`)}
        >
          <Text style={styles.item}>
            <Icon name="logo-linkedin" size={20} color="white" />{' '}
            {user.social.linkedin || 'http://a.com'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`${user.social.portfolio}`)}
        >
          <Text style={styles.item}>
            <Icon name="globe-outline" size={20} color="white" />{' '}
            {user.social.portfolio || 'http://a.com'}
          </Text>

        </TouchableOpacity>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { color: 'darkgrey', fontSize: 17, marginVertical: 4, marginHorizontal: 5 },
});

export default BannerProfile;
