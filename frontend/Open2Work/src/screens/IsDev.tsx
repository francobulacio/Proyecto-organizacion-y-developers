import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/Navigation';
import {useAppSelector} from '../redux/hook';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'IsDev'>;
}

const IsDev = ({navigation}: Props) => {
  const {name} = useAppSelector(state => state.register);

  return (
    <>
      <LinearGradient
        style={styles.container}
        locations={[0.1, 0.55, 0.8]}
        useAngle={true}
        angle={180}
        colors={[
          'rgba(31, 26, 48,0.9)',
          'rgba(31, 26, 48,0.5)',
          'rgba(31, 26, 48,1)',
        ]}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}
          style={styles.imgBkgd}
        />
      </LinearGradient>
      <LinearGradient
        style={styles.grdt}
        locations={[0.05, 0.6, 1]}
        useAngle={true}
        angle={180}
        colors={[
          'rgba(31, 26, 48,0.99)',
          'rgba(31, 26, 48,0.1)',
          'rgba(31, 26, 48,0.9)',
        ]}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
          style={styles.imgBkgd2}
        />
      </LinearGradient>

      <View style={styles.txtCont}>
        <Text style={styles.txt}>Hi, {name}!</Text>
        <Text style={styles.txt2}>Please, tell us who you are</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.txtCont2}>
          <View style={{top: 35, left: 15}}>
            <Text style={styles.txt2}>I am part of an ...</Text>
          </View>
          <Button
            onPress={() => navigation.navigate('Register', {isDev: false})}
            mode="contained"
            style={styles.btn}>
            <Text style={{fontSize: 25}}>Organization</Text>
          </Button>
          <View style={{top: 40, left: 35}}>
            <Text style={styles.txt2}>I'm a ...</Text>
          </View>
          <Button
            onPress={() => navigation.navigate('Register', {isDev: true})}
            mode="contained"
            style={styles.btn}>
            <Text style={{fontSize: 25}}>Developer</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '50%', position: 'absolute'},
  imgBkgd: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  imgBkgd2: {
    width: '100%',
    height: '100%',
    zIndex: -100,
  },
  txtCont: {position: 'absolute', zIndex: 1, top: 45, marginLeft: '3%'},
  txt: {
    color: '#17f1de',
    fontSize: 40,
  },
  txt2: {
    color: '#6d6387',
    fontSize: 30,
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgba(31, 26, 48,0.7)',
    justifyContent: 'center',
  },
  txtCont2: {height: '55%', justifyContent: 'space-around'},
  btn: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 40,
  },
  grdt: {width: '100%', top: '50%', height: '50%', position: 'absolute'},
});

export default IsDev;
