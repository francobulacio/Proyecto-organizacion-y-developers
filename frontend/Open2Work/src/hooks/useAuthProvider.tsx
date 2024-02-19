import * as React from 'react';
import {Linking} from 'react-native';
import {useAppDispatch} from '../redux/hook';
import {setToken} from '../redux/slices/auth/authSlice';
import {logUser} from '../redux/slices/user/userSlice';

const useGithub = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    Linking.addEventListener('url', ({url}) => {
      const token = url.slice(12);
      const paths = token.split(';');
      let name = paths[1];
      const regex = /%20/g;
      if (name.includes('%20')) {
        name = name.replace(regex, ' ');
      }
      const avatar = paths[2];
      if (token !== 'fail') {
        dispatch(setToken(token));
        dispatch(logUser({avatar: avatar, name: name}));
      }
    });
  });
};

export default useGithub;
