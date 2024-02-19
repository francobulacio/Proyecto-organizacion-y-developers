import * as React from 'react';
import {Headline} from 'react-native-paper';
import {Modal, View, Text, ScrollView} from 'react-native';
import Availability from '../register/Availability';
import Languages from '../register/Languages';
import Timezones from '../register/Timezones';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {handleToggle: () => void};

const FilterModal = ({handleToggle}: Props) => {
  return (
    <Modal transparent={true} style={{}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'hsla(0,0%,0%,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView
            style={{
              backgroundColor: 'rgb(57,48,77)',
              width: '80%',
              borderRadius: 5,
              borderColor: 'darkgrey',
              borderWidth: 1,
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}
            contentContainerStyle={{
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Headline style={{marginBottom: 10}}>Select Filters</Headline>
              <Text onPress={handleToggle}>
                <Icon name="close-outline" size={35} color="lightgrey" />
              </Text>
            </View>
            <Timezones />
            <Availability />
            <Languages />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
