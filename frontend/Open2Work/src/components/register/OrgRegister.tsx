import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import { MyInput } from '../MyInput';
import Timezones from './Timezones';
import Languages from './Languages';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import { setError } from '../../redux/slices/error/errorSlice';
import { logUser } from '../../redux/slices/user/userSlice';
import { setToken } from '../../redux/slices/auth/authSlice';
import { loading, removeLoading } from '../../redux/slices/loading/loadingSlice';
import { ImageState } from '../../screens/Register';
import { apiDb } from '../../axios/apiDb';

interface FormValues {
  languages: string[];
  timezone: string;
  organization: string;
  linkedin: string;
  web: string;
  github: string;
}

interface Props {
	file: ImageState
}

const OrgRegister = ({ file }: Props) => {

	const formValues = useAppSelector(state => state.register);
	const dispatch = useAppDispatch();

	const submitPOST = async (values: FormValues) => {
		dispatch(loading())
		const form = {
			...formValues,
			social: {
				linkedin: values.linkedin,
				portfolio: values.web,
				github: values.github
			},
			info: {
				organization: values.organization,
				time_zone: values.timezone,
				language: values.languages
			}
		}
		
		try {
			const { data }= await apiDb.post('/client/register', form);
			dispatch( logUser(data.client))
			dispatch( setError( data.message ))
			dispatch( setToken(data.token))
			dispatch(removeLoading())
		} catch (error: any) {
			dispatch(removeLoading())
			console.log('error', JSON.stringify(error.response, null, 2))
			dispatch( setError(error.response.data.message))
		}
	};
	return (
		<Formik
			validationSchema={Yup.object({
				languages: Yup.array()
					.min(1, 'Provide at least 1 option')
					.required('Required'),
				timezone: Yup.string().required('Required'),
				organization: Yup.string().required('Required'),
				github: Yup.string().url('Invalid URL format'),
				linkedin: Yup.string().url('Invalid URL format').required('Required'),
				web: Yup.string().url('Invalid URL format').required('Required'),
			})}
			initialValues={{
				languages: [],
				timezone: '',
				organization: '',
				linkedin: '',
				web: '',
				github: '',
			}}
			onSubmit={ (values: FormValues) => submitPOST( values )}>
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
					<Languages
						onPress={setFieldValue}
						error={!!errors.languages && !!touched.languages}
					/>
					{errors.languages && touched.languages && (
						<Text style={{ color: 'red' }}>
							<ErrorMessage name="languages" />
						</Text>
					)}
					<Timezones
						onPress={setFieldValue}
						error={!!errors.timezone && !!touched.timezone}
					/>
					{errors.timezone && touched.timezone && (
						<Text style={{ color: 'red' }}>
							<ErrorMessage name="timezone" />
						</Text>
					)}

          <MyInput
            iconName="briefcase-outline"
            label={'Organization'}
            value={values.organization}
            error={!!errors.organization && !!touched.organization}
            onChangeText={handleChange('organization')}
          />
          {errors.organization && touched.organization && (
            <Text style={{color: 'red'}}>
              <ErrorMessage name="organization" />
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
  );
};

export default OrgRegister;
