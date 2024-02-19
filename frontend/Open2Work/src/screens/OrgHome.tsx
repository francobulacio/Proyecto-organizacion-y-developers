import * as React from 'react';
import {
	ScrollView,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Headline } from 'react-native-paper';
import FilterModal from '../components/home/filterModal';
import ResultItem from '../components/home/resultItem';
import {MyInput} from '../components/MyInput';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamListClient} from '../navigation/StackClientHome';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {resetFilter, selectFilter} from '../redux/slices/filter/filterSilce';
import {apiDb} from '../axios/apiDb';

type Props = StackScreenProps<RootStackParamListClient, 'Home'>;

const OrgHome = ({navigation}: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [teamsData, setTeamsData] = React.useState<any>();
  const [results, setResults] = React.useState<any>();
  const [selected, setSelected] = React.useState(['']);
  const [error, setError] = React.useState('');
  const {availability, timezone, language} = useAppSelector(selectFilter);

  const dispatch = useAppDispatch();

	const { token } = useAppSelector(state => state.auth);

	const user = useAppSelector(state => state.user);
	

  React.useEffect(() => {
    setError('');

    apiDb
      .get('/team/profile', {
        headers: {
          Authorization: token!,
        },
      })
      .then(res => {
        setTeamsData(res.data);
        setResults(res.data);
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  }, [timezone, availability, language]);

  const handleToggle = () => {
    setShowModal(!showModal);
    handleFilters(results);

    /* if (selected.includes(id)) {
		  setSelected(selected.filter(item => item !== id));
		} else {
		  setSelected(state => [...state, id]);
		} */
  };

  const handleTextInput = (input: string) => {
    setQuery(input);
    input = input.trim();
    let teamsMatch: any;
    if (input !== '') {
      teamsMatch = Object.values(teamsData).filter((item: any) => {
        if (item.stack !== undefined)
          return item.stack.toLowerCase().includes(input.toLowerCase());
      });
    } else {
      teamsMatch = [null];
    }
    if (teamsMatch[0] === null || input === '' || input.length < 2) {
      setResults(teamsData);
    } else {
      setResults(teamsMatch);
    }
  };

  const handleFilters = (resultsArray: any): void => {
    if (timezone !== '' && resultsArray !== undefined) {
      resultsArray = resultsArray.filter((team: any) => {
        return team.time_zone[0].slice(3).trim().includes(timezone.slice(3));
      });
    }
    if (availability !== '' && resultsArray !== undefined) {
      resultsArray = resultsArray.filter((team: any) => {
        return team.availability
          .slice(0, 4)
          .toLowerCase()
          .includes(availability.slice(0, 4).toLowerCase());
      });
    }
    if (language[0] !== '' && resultsArray !== undefined) {
      resultsArray = resultsArray.filter((team: any) => {
        return team.language.some((lang: string) =>
          language.includes(lang.slice(0, 3).toUpperCase()),
        );
      });
    }
    setResults(resultsArray);
  };

  return (
    <>
      {showModal && <FilterModal handleToggle={handleToggle} />}
      <View style={styles.container}>
        <LinearGradient
          style={styles.grdtContainer}
          locations={[0.1, 0.35, 1]}
          useAngle={true}
          angle={180}
          colors={ ['rgba(0, 0, 0,0.65)', 'rgba(31, 26, 48,0.8)', 'rgba(31, 26, 48,1)']}>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            style={styles.imgBkgd}
          />
        </LinearGradient>
        <Headline style={styles.headline}>Team Finder</Headline>
        <View style={styles.searchCont}>
          <View style={{margin: 15}}>
            <MyInput
              iconName="search-outline"
              label="Search Tech Stack"
              onChangeText={handleTextInput}
              clearTextOnFocus={true}
              selectTextOnFocus={true}
              value={query}
            />
          </View>
          <View style={styles.filters}>
            <Button
              onPress={handleToggle}
              mode={selected.includes('gmt') ? 'contained' : 'outlined'}
              style={styles.filterBtn}>
              <Text
                style={{
                  fontSize: 18,
                }}>
                Filters
                {/* <Icon name="time-sharp" size={22} />{' '}
                <Icon name="chevron-down-outline" size={20} color="#17f1de" /> */}
              </Text>
            </Button>
            {/* <Button
              onPress={() => handleToggle('avail')}
              mode={selected.includes('avail') ? 'contained' : 'outlined'}
              style={{
                width: '30%',
                borderRadius: 40,
                borderWidth: 2,
                borderColor: '#17f1de',
              }}>
              <Text
              style={{
                fontSize: 18,
                }}>
                <Icon name="briefcase-sharp" size={20} />{' '}
                <Icon name="chevron-down-outline" size={20} color="#17f1de" />
                </Text>
                </Button>
              */}
            <Button
              onPress={() => (dispatch(resetFilter()), handleTextInput(''))}
              mode={selected.includes('lang') ? 'contained' : 'outlined'}
              style={styles.resetBtn}>
              <Text
                style={{
                  fontSize: 18,
                }}>
                Reset
                {/* <Icon name="language-sharp" size={21} />{' '}
                <Icon name="chevron-down-outline" size={20} color="#17f1de" /> */}
							</Text>
						</Button>
					</View>
				</View>
				<View style={{ backgroundColor: 'black', width: '100%', height: 2 }} />
				<ScrollView contentContainerStyle={{ paddingVertical: 7 }}>
					<>
						{error && <Text style={{ color: 'lightgrey' }}>{error}</Text>}
						{results && results.length > 0 ? (
							results.map((item: any, index: number) => {
								if (item !== null) {
									if (user.orders) {

										const haveOrder = user.orders.some(order => order.team === item._id) || false;
										return (
											<TouchableOpacity
												key={`button ${item._id}`}
												onPress={() => navigation.navigate('Group', {
													idUser: item._id
												})}
												disabled={haveOrder}

											>
												<>
													<ResultItem key={item._id} data={item} haveOrder={haveOrder} />
												</>
											</TouchableOpacity>
										);
									}
								} else {
									return null;
								}
							})
						) : (
							<Text style={{ color: 'lightgrey' }}>No Results</Text>
						)}
					</>
				</ScrollView>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgb(31, 26, 48)', flex: 1},
  grdtContainer: {width: '100%', height: 500, position: 'absolute'},
  imgBkgd: {
    width: '100%',
    height: '75%',
    zIndex: -100,
  },
  headline: {
    color: '#17f1de',
    marginTop: 40,
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 15,
  },
  searchCont: {backgroundColor: 'rgb(57,48,77)', marginTop: 100},
  filters: {
    marginBottom: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterBtn: {
    width: '30%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#17f1de',
  },
  resetBtn: {
    width: '30%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#17f1de',
  },
  line: {backgroundColor: 'black', width: '100%', height: 2},
  message: {color: 'lightgrey', marginLeft: 10},
});

export default OrgHome;
