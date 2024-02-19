import * as React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Headline} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BannerProfile from '../components/profile/BannerProfile';
import {useAppSelector} from '../redux/hook';
import {ButtonLogout} from '../components/ButtonLogout';

// DATAGROUP = {
//   name: 'Group #023',
//   techs: ['React Native', 'Redux', 'Express'],
//   tz: ['GMT-1', 'GMT-3'],
//   lang: ['Spanish', 'English'],
//   avail: 'Part-time',
//   isActive: 'Available',
// };

const Profile = () => {
  const user = useAppSelector(state => state.user);

  const {top} = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[{top},styles.logout]}>
        <ButtonLogout />
      </View>
      <Image
        style={styles.img}
        source={require('../assets/imgs/laptop-programming-coding-macbook.jpg')}
      />
      <Headline style={styles.headline}>
        {`${user.name} ${user.surname}`}
      </Headline>

      <BannerProfile user={ user } />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(31,26,48)',
    flex: 1,
  },
  logout: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  img: {width: '100%', height: 220},
  headline: {
    position: 'absolute',
    right: 10,
    color: '#17f1de',
    marginTop: 25,
    fontWeight: '700',
    fontSize: 30,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 3,
    backgroundColor: 'hsla(0,0%,15%,0.65)',
    textTransform: 'capitalize',
  },
});

export default Profile;
