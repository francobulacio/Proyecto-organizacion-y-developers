import * as React from 'react';
import {List} from 'react-native-paper';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {
  selectFilter,
  setAvailability,
} from '../../redux/slices/filter/filterSilce';
interface Props {
  onPress?: (field: string, value: any) => void;
  error?: boolean;
}

const Availability = ({onPress, error}: Props) => {
  const {availability} = useAppSelector(selectFilter);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState('' || availability);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setAvailability(selected));
  }, [selected, dispatch]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleSelect = (avail: string) => {
    if (selected === '' || selected !== avail) {
      setSelected(avail);
      if (onPress) {
        onPress('availability', avail);
      }
    } else {
      setSelected('');
    }
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
          title="Availability"
          left={props => (
            <List.Icon {...props} color="white" icon="briefcase-outline" />
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
              paddingLeft: 0,
            }}>
            <List.Item
              title="Full-Time ( 8 - 12 hs )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === 'full'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('full')}
            />
            <List.Item
              title="Part-Time ( 4 - 6 hs )"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected === 'part'
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('part')}
            />
          </View>
        </List.Accordion>
      </View>
    </List.Section>
  );
};

export default Availability;
