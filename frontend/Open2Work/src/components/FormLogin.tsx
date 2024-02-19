import React, {useState} from 'react';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {Keyboard, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {IconLogin} from './IconLogin';
import {MyInput} from './MyInput';
import {useAppDispatch} from '../redux/hook';
import {logUser} from '../redux/slices/user/userSlice';
import {RootStackParamList} from '../navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {UserLogued} from '../interfaces/loginInterface';
import {setToken} from '../redux/slices/auth/authSlice';
import {setError} from '../redux/slices/error/errorSlice';
import {loading, removeLoading} from '../redux/slices/loading/loadingSlice';
import useAuthProvider from '../hooks/useAuthProvider';
import {apiDb} from '../axios/apiDb';

interface Props {
  setIsRegister: (value: boolean) => void;
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

interface FormValues {
  email: string;
  password: string;
}
export const FormLogin = ({setIsRegister, navigation}: Props) => {
  const dispatch = useAppDispatch();

  const [hidden, setHidden] = useState(true);

  useAuthProvider();

  const handleOpenUrl = (provider: string) => {
    Linking.openURL('http://192.168.0.88:8080/auth/' + provider);
  };

  const handleSubmit = async (values: FormValues) => {
    dispatch(loading());
    Keyboard.dismiss();
    try {
      const {data} = await apiDb.post<UserLogued>('/login', values);
      console.log(
        `${data.message}: ${data.user.name} ${data.user.surname}, ${data.user.email}`,
      );

      dispatch(setToken(data.token));
      dispatch(logUser(data.user));
      dispatch(removeLoading());
    } catch (error: any) {
      dispatch(removeLoading());
      console.log(error.response.data.message);
      dispatch(setError(error.response.data.message));
    }
  };

  return (
    <>
      <Text
        style={{
          color: '#17f1de',
          fontSize: 40,
        }}>
        Login
      </Text>
      <Text
        style={{
          color: '#6d6387',
          fontSize: 30,
        }}>
        Please fill the input below
      </Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values: FormValues, {resetForm}) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('It is not a valid email')
            .required('The email is required'),
          password: Yup.string().required('The password is required'),
          // .matches(
          //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          //     "Must Contain 8 Characters, One Uppercase, One Lowercase and one Number"
          // ),
        })}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <MyInput
              iconName="mail-outline"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              label="Email"
              error={!!touched.email && !!errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="email" />
              </Text>
            )}

            <MyInput
              iconName={hidden ? 'eye-off-outline' : 'eye-outline'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              label="Password"
              error={!!touched.password && !!errors.password}
              onClick={setHidden}
              secureTextEntry={hidden}
            />
            {errors.password && touched.password && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="password" />
              </Text>
            )}

            <View>
              <Button
                onPress={handleSubmit}
                mode="contained"
                style={{
                  width: '60%',
                  alignSelf: 'center',
                  marginTop: 20,
                  borderRadius: 40,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                  }}>
                  LOGIN
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <IconLogin
          backgroundColor="#0a66c2"
          iconName="logo-linkedin"
          label="Sign in with LinkedIn"
          onPress={() => handleOpenUrl('linkedin')}
        />

        <IconLogin
          iconName="logo-github"
          label="Sign in with Github"
          backgroundColor="#6e5494"
          onPress={() => handleOpenUrl('github')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: '#6d6387',
            fontSize: 30,
          }}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => setIsRegister(false)}>
          <Text
            style={{
              color: '#17f1de',
              fontSize: 30,
              textDecorationLine: 'underline',
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
