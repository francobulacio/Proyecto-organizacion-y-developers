import * as React from 'react';
import {List} from 'react-native-paper';
import {View, ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {selectFilter, setTimezone} from '../../redux/slices/filter/filterSilce';

const timezonesData = {
  'GMT-12': {tz: 'GMT -12', location: 'International Date Line West (IDLW)'},
  'GMT-11': {tz: 'GMT -11', location: 'Nome Time (NT)'},
  'GMT-10': {tz: 'GMT -10', location: 'Hawaii Standard Time (HST)'},
  'GMT-9': {tz: 'GMT -9', location: 'Alaska Standard Time (AKST)'},
  'GMT-8': {tz: 'GMT -8', location: 'Pacific Standard Time (PST)'},
  'GMT-7': {tz: 'GMT -7', location: 'Mountain Standard Time (MST)'},
  'GMT-6': {tz: 'GMT -6', location: 'Central Standard Time (CST)'},
  'GMT-5': {tz: 'GMT -5', location: 'Eastern Standard Time (EST)'},
  'GMT-4': {tz: 'GMT -4', location: 'Atlantic Standard Time (AST)'},
  'GMT-3': {tz: 'GMT -3', location: 'Argentina Time (ART)'},
  'GMT-2': {tz: 'GMT -2', location: 'Azores Time (AT)'},
  'GMT-1': {tz: 'GMT -1', location: 'Azores Time (AT)'},
  'GMT+0': {tz: 'GMT +0', location: 'Greenwich Mean Time (GMT)'},
  'GMT+1': {tz: 'GMT +1', location: 'Central European Time (CET)'},
  'GMT+2': {tz: 'GMT +2', location: 'Eastern European Time (EET)'},
  'GMT+3': {tz: 'GMT +3', location: 'Moscow Time (MSK)'},
  'GMT+4': {tz: 'GMT +4', location: 'Armenia Time (AMT)'},
  'GMT+5': {tz: 'GMT +5', location: 'Pakistan Standard Time (PKT)'},
  'GMT+6': {tz: 'GMT +6', location: 'Omsk Time (OMSK)'},
  'GMT+7': {tz: 'GMT +7', location: 'Kranoyask Time (KRAT)'},
  'GMT+8': {tz: 'GMT +8', location: 'China Standard Time (CST)'},
  'GMT+9': {tz: 'GMT +9', location: 'Japan Standard Time (JST)'},
  'GMT+10': {tz: 'GMT +10', location: 'Eastern Australia Standard Time (AEST)'},
  'GMT+11': {tz: 'GMT +11', location: 'Sakhalin Time (SAKT)'},
  'GMT+12': {tz: 'GMT +12', location: 'New Zealand Standard Time (NZST)'},
};
interface Props {
  onPress?: (field: string, value: any) => void;
  error?: boolean;
}

const Timezones = ({onPress, error}: Props) => {
  const {timezone} = useAppSelector(selectFilter);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState('' || timezone);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setTimezone(selected));
  }, [selected, dispatch]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleSelect = (tz: string) => {
    if (selected === '' || selected !== tz) {
      setSelected(tz);
      if (onPress) {
        onPress('timezone', tz);
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
          title="Timezone"
          left={props => (
            <List.Icon {...props} color="white" icon="time-outline" />
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
          <ScrollView
            nestedScrollEnabled={true}
            style={{
              height: 325,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
              paddingLeft: 0,
            }}>
            {Object.entries(timezonesData).map(([index, value], key) => {
              return (
                <List.Item
                  title={`${value.tz}  (${value.location})`}
                  key={key}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={
                        selected === index
                          ? 'radio-button-on-outline'
                          : 'radio-button-off-outline'
                      }
                    />
                  )}
                  onPress={() => handleSelect(index)}
                />
              );
            })}
          </ScrollView>
        </List.Accordion>
      </View>
    </List.Section>
  );
};

export default Timezones;
