import * as React from 'react';
import {Text} from 'react-native';

interface Props {
  data: string[];
  symbol: string;
}

const Array = ({data, symbol}: Props): JSX.Element | null => {
  if (data.length === 0 || data === undefined) {
    return null;
  } else {
    return (
      <>
        {data.map((item, index) => {
          return (
            <Text
              key={index}
              style={{color: 'darkgrey', fontSize: 17, marginLeft: 15}}>
              {item}
              {index === data.length - 1 ? null : symbol}
            </Text>
          );
        })}
      </>
    );
  }
};

export default Array;
