import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import {Button} from 'react-native-paper';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {MyInput} from '../MyInput';
import Roles from '../register/Roles';
import Seniority from '../register/Seniority';
import Availability from '../register/Availability';
import Timezones from '../register/Timezones';
import Languages from '../register/Languages';
import {logUser} from '../../redux/slices/user/userSlice';
import {loading, removeLoading} from '../../redux/slices/loading/loadingSlice';
import {setToken} from '../../redux/slices/auth/authSlice';
import {setError} from '../../redux/slices/error/errorSlice';
import {ImageState} from '../../screens/Register';
import {apiDb} from '../../axios/apiDb';

interface FormValues {
  languages: string[];
  timezone: string;
  role: string;
  seniority: string;
  availability: string;
  github: string;
  linkedin: string;
  web: string;
  stack: string;
}

interface Props {
  file: ImageState;
}

const DevRegister = ({file}: Props) => {
  const formValues = useAppSelector(state => state.register);

  const dispatch = useAppDispatch();

  const submitPOST = async (values: FormValues) => {
    dispatch(loading());

    const form = {
      ...formValues,
      role: values.role,
      stack: values.stack,
      avatar: 'avatar',
      social: {
        linkedin: values.linkedin,
        portfolio: values.web,
        github: values.github,
      },
      info: {
        time_availability: values.availability,
        time_zone: values.timezone,
        experience: values.seniority,
        language: values.languages,
      },
    };

    try {
      const {data} = await apiDb.post('/dev/register', form);
      dispatch(setToken(data.token));
      dispatch(logUser(data.dev));
      dispatch(removeLoading());
      dispatch(setError(data.message));
    } catch (error: any) {
      dispatch(removeLoading());
      console.log('error', JSON.stringify(error.response, null, 2));
    }
  };

  return (
    <>
      <Formik
        validationSchema={Yup.object({
          languages: Yup.array().min(1, 'Provide at least 1 option'),
          timezone: Yup.string().required('Required'),
          role: Yup.string().required('Required'),
          seniority: Yup.string().required('Required'),
          availability: Yup.string().required('Required'),
          github: Yup.string().url('Invalid URL format').required('Required'),
          linkedin: Yup.string().url('Invalid URL format').required('Required'),
          web: Yup.string().url('Invalid URL format'),
          stack: Yup.string().required('Required'),
        })}
        initialValues={{
          languages: [],
          timezone: '',
          role: '',
          seniority: '',
          availability: '',
          github: '',
          linkedin: '',
          web: '',
          stack: '',
        }}
        onSubmit={values => submitPOST(values)}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View
            style={{
              minHeight: '100%',
              marginBottom: 25,
              width: '90%',
            }}>
            <MyInput
              iconName="briefcase-outline"
              label={'Tech / Stack'}
              value={values.stack}
              placeholder="Your primary programming language"
              placeholderTextColor={'darkgrey'}
              error={!!errors.stack && !!touched.stack}
              onChangeText={handleChange('stack')}
            />
            {errors.stack && touched.stack && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="stack" />
              </Text>
            )}
            <Languages
              onPress={setFieldValue}
              error={!!errors.languages && !!touched.languages}
            />
            {errors.languages && touched.languages && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="languages" />
              </Text>
            )}
            <Timezones
              onPress={setFieldValue}
              error={!!errors.timezone && !!touched.timezone}
            />
            {errors.timezone && touched.timezone && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="timezone" />
              </Text>
            )}
            <Roles
              onPress={setFieldValue}
              error={!!errors.role && !!touched.role}
            />
            {errors.role && touched.role && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="role" />
              </Text>
            )}
            <Seniority
              onPress={setFieldValue}
              error={!!errors.seniority && !!touched.seniority}
            />
            {errors.seniority && touched.seniority && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="seniority" />
              </Text>
            )}
            <Availability
              onPress={setFieldValue}
              error={!!errors.availability && !!touched.availability}
            />
            {errors.availability && touched.availability && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="availability" />
              </Text>
            )}

            <MyInput
              iconName="logo-github"
              label={'GitHub'}
              value={values.github}
              error={!!errors.github && !!touched.github}
              onChangeText={handleChange('github')}
            />
            {errors.github && touched.github && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="github" />
              </Text>
            )}
            <MyInput
              iconName="logo-linkedin"
              label={'Linkedin'}
              value={values.linkedin}
              error={!!errors.linkedin && !!touched.linkedin}
              onChangeText={handleChange('linkedin')}
            />
            {errors.linkedin && touched.linkedin && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="linkedin" />
              </Text>
            )}
            <MyInput
              iconName="globe-outline"
              label={'Portfolio / Web'}
              value={values.web}
              error={!!errors.web && !!touched.web}
              onChangeText={handleChange('web')}
            />
            {errors.web && touched.web && (
              <Text style={{color: 'red'}}>
                <ErrorMessage name="web" />
              </Text>
            )}

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
                SUBMIT
              </Text>
            </Button>
          </View>
        )}
      </Formik>
    </>
  );
};

export default DevRegister;
