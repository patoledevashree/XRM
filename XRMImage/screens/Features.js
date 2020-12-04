import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Headers from '../screens/Header/header';
import {globalStyles} from '../shared/globalStyles';
import {connect} from 'react-redux';
import {UpdateFeatureList, getAllFeatures} from '../redux/action/FeatureAction';
import CheckBox from '@react-native-community/checkbox';
import Footer from './Footer/footer';
import {useNavigation} from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This component is to display the list of features and allows the user to
 * select the features they have in their vehicle
 * @param {*} props contains the getAllfeatures functions and the vin number from redux
 * @returns JSx of Features Component
 */
function Features(props) {
  useEffect(() => {
    props.getAllFeatures();
  }, []);

  const [array, setArray] = useState([]);
  const navigation = useNavigation();

  const handleClick = () => {
    props.UpdateFeatureList(array);
    navigation.navigate('ExteriorImages');
  };

  const handleChange = (id) => {
    if (!array.includes(id)) {
      setArray((prev) => {
        return [...prev, id];
      });
    } else {
      let demo = array.filter((item) => item !== id);
      setArray(demo);
    }
    // props.UpdateFeatureList(array);
  };
  if (props.loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 300,
        }}>
        <ActivityIndicator size={'large'} color={'crimson'} />
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView>
          <Headers />
          <View style={globalStyles.container}>
            <View>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Features
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginHorizontal: 10,
                marginVertical: 10,
                marginBottom: 70,
              }}>
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}>
                <View
                  style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 15}}>
                  <Text style={{fontWeight: 'bold'}}>Exterior</Text>
                </View>
                <View>
                  {props.features.length !== 0 ? (
                    <FlatList
                      data={props.features}
                      // keyExtractor={(item) => {
                      //   return item._id;
                      // }}
                      numColumns={2}
                      renderItem={({item, index}) => (
                        <View style={{width: '45%'}}>
                          {item.isForImage && item.category === 'Exterior' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10,
                              }}>
                              <CheckBox
                                value={array.includes(item._id)}
                                tintColors={{true: 'crimson', false: 'black'}}
                                onValueChange={(val) => {
                                  handleChange(item._id);
                                }}
                              />
                              <Text style={{paddingTop: 5}}>{item.name}</Text>
                            </View>
                          ) : null}
                        </View>
                      )}
                    />
                  ) : null}
                </View>
                <View
                  style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 20}}>
                  <Text style={{fontWeight: 'bold'}}>Interior</Text>
                </View>
                <View>
                  {props.features.length !== 0 ? (
                    <FlatList
                      data={props.features}
                      // keyExtractor={(item) => {
                      //   return item._id;
                      // }}
                      numColumns={2}
                      renderItem={({item, index}) => (
                        <View style={{width: '45%'}}>
                          {item.isForImage && item.category === 'Interior' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10,
                              }}>
                              <CheckBox
                                value={array.includes(item._id)}
                                tintColors={{true: 'crimson', false: 'black'}}
                                onValueChange={(val) => {
                                  handleChange(item._id);
                                }}
                              />
                              <Text style={{paddingTop: 5}}>{item.name}</Text>
                            </View>
                          ) : null}
                        </View>
                      )}
                    />
                  ) : null}
                </View>
                <View
                  style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 20}}>
                  <Text style={{fontWeight: 'bold'}}>Media</Text>
                </View>
                <View>
                  {props.features.length !== 0 ? (
                    <FlatList
                      data={props.features}
                      // keyExtractor={(item) => {
                      //   return item._id;
                      // }}
                      numColumns={2}
                      renderItem={({item, index}) => (
                        <View style={{width: '45%'}}>
                          {item.isForImage && item.category === 'Media' ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10,
                              }}>
                              <CheckBox
                                value={array.includes(item._id)}
                                tintColors={{true: 'crimson', false: 'black'}}
                                onValueChange={(val) => {
                                  handleChange(item._id);
                                }}
                              />
                              <Text style={{paddingTop: 5}}>{item.name}</Text>
                            </View>
                          ) : null}
                        </View>
                      )}
                    />
                  ) : null}
                </View>
                <View
                  style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 20}}>
                  <Text style={{fontWeight: 'bold'}}>Other</Text>
                </View>
              </View>
            </View>
          </View>
          <Footer onClick={handleClick} />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    features: state.featureReducer.features,
    featureList: state.featureReducer.featureList,
    loading: state.featureReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllFeatures: () => dispatch(getAllFeatures()),
    UpdateFeatureList: (id) => dispatch(UpdateFeatureList(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Features);
