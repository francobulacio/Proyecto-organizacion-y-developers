import * as React from 'react';
import {List} from 'react-native-paper';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {selectFilter, setLanguage} from '../../redux/slices/filter/filterSilce';
interface Props {
  onPress?: (field: string, value: any) => void;
  error?: boolean;
}

const Languages = ({onPress, error}: Props) => {
  const {language} = useAppSelector(selectFilter);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState([''] || language);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setLanguage(selected));
  }, [selected, dispatch]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleSelect = (lang: string) => {
    if (selected.includes(lang)) {
      setSelected(selected.filter(item => item !== lang));
      if (onPress) {
        onPress(
          'languages',
          selected.filter(item => item !== lang),
        );
      }
    } else {
      if (selected.length === 1 && selected[0] === '') {
        setSelected([lang]);
        if (onPress) {
          onPress('languages', [lang]);
        }
      } else {
        setSelected([...selected, lang]);
        if (onPress) {
          onPress('languages', [...selected, lang]);
        }
      }
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
          title="Languages"
          left={props => (
            <List.Icon {...props} color="white" icon="language-outline" />
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
              title="Spanish"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected.includes('SPA')
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('SPA')}
            />
            <List.Item
              title="English"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected.includes('ENG')
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('ENG')}
            />
            <List.Item
              title="Portuguese"
              left={props => (
                <List.Icon
                  {...props}
                  icon={
                    selected.includes('POR')
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                />
              )}
              onPress={() => handleSelect('POR')}
            />
          </View>
        </List.Accordion>
      </View>
    </List.Section>
  );
};

export default Languages;
