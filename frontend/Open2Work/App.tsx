import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigation } from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ErrorModal } from './src/components/ErrorModal';
import { LoadingModal } from './src/components/LoadingModal';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#17f1de',
    accent: 'yellow',
    background: '#39304d',
    surface: '#1f1a30',
    text: '#fff',
    placeholder: '#fff',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider
          theme={theme}
          settings={{
            icon: props => <Icon {...props} />,
          }}>
          <SafeAreaView style={{ height: '100%' }}>
            <StatusBar
              translucent
              backgroundColor={'transparent'}
              barStyle="light-content"
            />
            <StackNavigation />
            <ErrorModal />
            <LoadingModal />
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
