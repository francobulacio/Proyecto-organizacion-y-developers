import React from 'react';
import {
  ScrollView,
  ImageBackground,
  StatusBar,
  Text,
  StyleSheet,
} from 'react-native';
import {Headline} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AvatarPicker from '../components/register/AvatarPicker';
import MyAvatar from '../components/MyAvatar';
import DevRegister from '../components/register/DevRegister';
import OrgRegister from '../components/register/OrgRegister';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = StackScreenProps<RootStackParamList, 'Register'>;
export interface ImageState {
  path?: string;
  mime?: string;
}
const Register = ({navigation, route: {params}}: Props) => {
  const {isDev} = params || true;
  const [showModal, setShowModal] = React.useState(false);
  const [uri, setUri] = React.useState<ImageState>({
    path: '',
    mime: '',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <LinearGradient
        style={styles.grdtContainer}
        locations={[0.1, 0.35, 1]}
        useAngle={true}
        angle={180}
        colors={[
          'rgba(0, 0, 0,0.65)',
          'rgba(31, 26, 48,0.8)',
          'rgba(31, 26, 48,1)',
        ]}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: isDev
              ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
              : 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}
          style={styles.imgBkgd}
        />
      </LinearGradient>
      <Headline style={styles.headline}>Create Account</Headline>

      <MyAvatar uri={uri.path} />

      <Text onPress={() => setShowModal(!showModal)} style={styles.add}>
        <Icon name="add-outline" size={26} />
      </Text>

      <AvatarPicker
        setShowModal={setShowModal}
        showModal={showModal}
        setUri={setUri}
      />
      {isDev ? <DevRegister file={uri} /> : <OrgRegister file={uri} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(31,26,48)',
    alignItems: 'center',
    minHeight: '100%',
  },
  grdtContainer: {width: '100%', height: 500, position: 'absolute'},
  imgBkgd: {
    width: '100%',
    height: '75%',
    zIndex: -100,
  },
  headline: {
    color: '#17f1de',
    marginTop: 40,
    fontWeight: '700',
    fontSize: 30,
  },
  add: {
    left: 40,
    bottom: 30,
    borderRadius: 50,
    width: 26,
    aspectRatio: 1,
    backgroundColor: '#17f1de',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Register;
