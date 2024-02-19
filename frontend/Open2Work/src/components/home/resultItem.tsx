import * as React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Team } from '../../interfaces/teamInterface';

interface Props {
	data: Team,
	haveOrder: boolean
}

const ResultItem = ({ data, haveOrder }: Props) => {

	return (
		<View
			style={{
				backgroundColor: 'rgb(57,48,77)',
				marginVertical: 7,
				paddingHorizontal: 15,
				paddingVertical: 10,
				flexDirection: 'row',
				justifyContent: 'space-around',
				flexWrap: 'wrap',
			}}>

			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'space-between'
				}}
			>
				<Text
					style={{
						fontSize: 18,
						color: '#17f1de',
						paddingBottom: 5,
					}}>
					GROUP #{data._id.slice(-4)}
				</Text>
				{
					haveOrder && (<Text style={{ color: 'red', fontSize: 15}}>
						You already have orders with this group
					</Text>
					)
				}
			</View>

			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'space-around'
				}}
			>

				{
					data.stack && (<Text style={{ color: 'white', marginBottom: 5, marginRight: 15 }}>
						<Icon name="build-outline" size={16} /> {data.stack}
					</Text>)
				}

				<Text style={{ color: 'lightgrey' }}>
					<Icon name="language-outline" size={16} /> [
					{data.language.length > 0
						? data.language.reduce((lang0, lang1) => `${lang0} - ${lang1}`)
						: data.language}
					]
				</Text>
				<Text style={{ color: 'lightgrey' }}>
					<Icon name="time-outline" size={16} />
					{data.time_zone.length > 0
						? data.time_zone.reduce((tz0, tz1) => `${tz0} / ${tz1}`)
						: data.time_zone}

				</Text>
				<Text style={{ color: 'lightgrey' }}>
					<Icon name="briefcase-outline" size={16} /> {data.availability}
				</Text>
			</View>

		</View>
	);
};

export default ResultItem;
