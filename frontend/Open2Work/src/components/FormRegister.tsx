import React, {useState} from 'react';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {Text, Keyboard, View, TouchableOpacity, Linking} from 'react-native';
import {Button} from 'react-native-paper';
import {MyInput} from './MyInput';
import {IconLogin} from './IconLogin';
import {RootStackParamList} from '../navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch} from '../redux/hook';
import {register} from '../redux/slices/register/registerSlice';
import useAuthProvider from '../hooks/useAuthProvider';

interface Props {
  setIsRegister: (value: boolean) => void;
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
}

interface FormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirPass: string;
}

export const FormRegister = ({setIsRegister, navigation}: Props) => {
  const dispatch = useAppDispatch();

  const [hidden, setHidden] = useState(true);

  useAuthProvider();

  const handleOpenUrl = (provider: string) => {
    Linking.openURL('http://192.168.1.43:8080/auth/' + provider);
  };

  const handleSubmit = (values: FormValues) => {
    const {confirPass, ...rest} = values;
    Keyboard.dismiss();
    navigation.navigate('IsDev');
    dispatch(register(rest));
  };
  return (
    <>
      <Text
        style={{
          color: '#17f1de',
          fontSize: 40,
        }}>
        Register
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
          name: '',
          surname: '',
          email: '',
          password: '',
          confirPass: '',
        }}
        onSubmit={(values: FormValues, {resetForm}) => {
          resetForm();
          handleSubmit(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('The name is required'),
          surname: Yup.string().required('The last name is required'),
          email: Yup.string()
            .email('It is not a valid email')
            .required('The email is required'),
          password: Yup.string()
            .required('The password is required')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              'Must Contain 8 Characters, One Uppercase, One Lowercase and one Number',
            ),
          confirPass: Yup.string()
            .required('Password confirmation is required')
            .min(8, 'Must Contain 8 Characters')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
              iconName="person-outline"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              label="Name"
              error={!!errors.name && !!touched.name}
            />
            {errors.name && touched.name && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="name" />
              </Text>
            )}

            <MyInput
              iconName="person-add-outline"
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              label="Last name"
              error={!!errors.surname && !!touched.surname}
            />
            {errors.surname && touched.surname && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="surname" />
              </Text>
            )}

            <MyInput
              iconName="mail-outline"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              label="Email"
              autoComplete="off"
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email && !!touched.email}
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
              onClick={setHidden}
              secureTextEntry={hidden}
              error={!!errors.password && !!touched.password}
            />
            {errors.password && touched.password && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="password" />
              </Text>
            )}

            <MyInput
              iconName={hidden ? 'eye-off-outline' : 'eye-outline'}
              onChangeText={handleChange('confirPass')}
              onBlur={handleBlur('confirPass')}
              value={values.confirPass}
              label="Confirm password"
              onClick={setHidden}
              secureTextEntry={hidden}
              error={!!errors.confirPass && !!touched.confirPass}
            />
            {errors.confirPass && touched.confirPass && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="confirPass" />
              </Text>
            )}

            <View>
              <Button
                onPress={() => {
                  handleSubmit();
                }}
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
                  Next
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
          label="Sign up with LinkedIn"
          onPress={() => handleOpenUrl('linkedin')}
        />

        <IconLogin
          iconName="logo-github"
          label="Sign up with Github"
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
          Already have a account?{' '}
        </Text>
        <TouchableOpacity onPress={() => setIsRegister(true)}>
          <Text
            style={{
              color: '#17f1de',
              fontSize: 30,
              textDecorationLine: 'underline',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
