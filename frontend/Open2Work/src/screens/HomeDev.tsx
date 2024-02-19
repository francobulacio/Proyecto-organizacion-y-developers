import React, {useEffect} from 'react';
import {ScrollView, Image, View, StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../redux/hook';
import Card from '../components/profile/Card';
import BannerGroup from '../components/profile/BannerGroup';
import {useGetTeamById} from '../hook/useGetTeamById';

export const HomeDev = () => {
  const {getInfoGroup, infoGroup} = useGetTeamById();

  const {user} = useAppSelector(state => state);

  useEffect(() => {
    getInfoGroup(user.currentTeam);
  }, []);

  const {top} = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={[{top}, styles.logout]}></View> */}
      <Image
        style={styles.img}
        source={require('../assets/imgs/istockphoto-1046965704-640x640.jpg')}
      />
      <Headline style={[{top}, styles.headline]}>
        {`${
          !!infoGroup?._id
            ? `Group #${infoGroup._id.slice(-4)}`
            : 'No group at the moment'
        }`}
      </Headline>
      <View>{infoGroup && <BannerGroup data={infoGroup} />}</View>
      <View style={styles.list}>
        {infoGroup?.devs &&
          infoGroup.devs.map(dev => {
            return <Card dev={dev} key={`${dev._id}`} />;
          })}
      </View>
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
  list: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
});
