import * as React from 'react';
import {List} from 'react-native-paper';
import {View} from 'react-native';
interface Props {
  onPress: (field: string, value: any) => void;
  error: boolean;
}

const Roles = ({onPress, error}: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleSelect = (role: string) => {
    setSelected(role);
    onPress('role', role);
  };

  return (
    <List.Section>
      <View
        style={{
          borderColor: error ? 'rgb(180,0,0)' : 'white',
          borderRadius: 5,
          borderWidth: 1,
          marginVertical: 5,
        }}>
        <List.Accordion
          titleStyle={{color: error ? 'rgb(180,0,0)' : 'white'}}
          title="Role"
          left={props => (
            <List.Icon {...props} color="white" icon="build-outline" />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={expanded ? 'caret-down-outline' : 'caret-forward-outline'}
            />
          )}
          expanded={expanded}
          onPress={handlePress}
          style={{borderRadius: 0, padding: 0, margin: 0}}>
          <View
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
            }}>
            <List.Item
              title="Front End"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === 'front'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('front')}
            />
            <List.Item
              title="Back End"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === 'back'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('back')}
            />
            <List.Item
              title="UIX"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === 'uix'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('uix')}
            />
            <List.Item
              title="QA"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === 'qa'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => setSelected('qa')}
            />
          </View>
        </List.Accordion>
      </View>
    </List.Section>
  );
};

export default Roles;
