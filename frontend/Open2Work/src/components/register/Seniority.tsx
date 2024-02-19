import * as React from 'react';
import {List} from 'react-native-paper';
import {View} from 'react-native';
interface Props {
  onPress: (field: string, value: any) => void;
  error: boolean;
}

const Seniority = ({onPress, error}: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleSelect = (seniority: string) => {
    setSelected(seniority);
    onPress('seniority', seniority);
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
          title="Seniority"
          left={props => (
            <List.Icon {...props} color="white" icon="analytics-outline" />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={expanded ? 'caret-down-outline' : 'caret-forward-outline'}
            />
          )}
          expanded={expanded}
          onPress={handlePress}
          style={{padding: 0}}>
          <View
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
              paddingLeft: 0,
            }}>
            <List.Item
              title="Trainee ( ~1 Year )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === '0'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('0')}
            />
            <List.Item
              title="Junior ( 1+ Year )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === '1'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('1')}
            />
            <List.Item
              title="Junior Advanced ( 2+ Year )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === '2'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('2')}
            />
            <List.Item
              title="Semi-Senior ( 3+ Year )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === '3'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('3')}
            />
            <List.Item
              title="Semi-Senior Advanced ( 4+ Year )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === '4'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('4')}
            />
            <List.Item
              title="Senior ( 5+ Year )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === '5'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('5')}
            />
          </View>
        </List.Accordion>
      </View>
    </List.Section>
  );
};

export default Seniority;
