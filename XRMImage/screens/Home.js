import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Headers from './Header/header';
import {globalStyles} from '../shared/globalStyles';
import Footer from './Footer/footer';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {baseURL, vinGateWay} from '../shared/config';
import {
  getVehicleInfo,
  submitForm,
  getVehicleVin,
  decodeVinValues,
} from '../shared/ApiEndPOints';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {getAllFeatures, UpdateVinNumber} from '../redux/action/FeatureAction';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {useNavigation} from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This component is for the user to search vehicle by vin number or stock number
 * or the user can also scan the barCode for vin number
 * @param {*} props contains function to update vin number in the redux
 * @returns JSX of Home component
 */
function Home(props) {
  const [vin, setVin] = useState('');
  const navigation = useNavigation();
  const [stock, setStock] = useState('');
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [inPbs, setPbs] = useState(false);
  const [scan, setScan] = useState(false);
  const [camera, setCamera] = useState({
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.auto,
  });
  const [vehicleInfo, setVehicleInfo] = useState({});

  const handleSearch = () => {
    setLoading(true);
    setResult({});
    setVehicleInfo({});
    axios
      .get(`${baseURL}/${getVehicleInfo}`, {
        params: {
          vin: vin,
          stockNumber: stock,
        },
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((response) => {
        // console.log('response', response);
        setResult(response.data.message);
        let vin = response.data.message.VIN;
        props.UpdateVinNumber(vin);
        setLoading(false);
        setPbs(true);
      })
      .catch((err) => {
        // console.log('err', err.response);
        if (err.response.data.errorCode) {
          Toast.show(err.response.data.message);
        } else if (err.response.data.message) {
          Toast.show(err.response.data.message);
        } else {
          getVehicleInfoFromVinApi(vin);
        }
        setLoading(false);
        setPbs(false);
      });
  };

  const onSuccess = (e) => {
    let file = e;
    // console.log('file', file);
    setScan(false);
    setResult({});
    setVehicleInfo({});

    axios
      .get(`${baseURL}/${getVehicleVin}/${file[0].data}`, {
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((res) => {
        // console.log('response', res);

        setPbs(true);
      })
      .catch((err) => {
        // console.log('err', err.response);
        if (err.response.data.message[0].message) {
          Toast.show(err.response.data.message[0].message);
        } else {
          getVehicleInfoFromVinApi(file[0].data);
        }
        setPbs(false);
      });
  };
  const getVehicleInfoFromVinApi = (vinNumber) => {
    // console.log('vin', vinNumber);
    setLoading(true);
    axios
      .get(`${vinGateWay}/${decodeVinValues}/${vinNumber}?format=json`)
      .then((res) => {
        // console.log('response1', res);
        // Toast.show('BarCode Detected success')
        if (res.data.Results.length) {
          let tempVehicleInfo = {
            Year: res.data.Results[0].ModelYear || '-',
            Make: res.data.Results[0].Make || '-',
            Model: res.data.Results[0].Model || '-',
            Trim: res.data.Results[0].Trim || '-',
            ExteriorColor: {
              Description: res.data.Results[0].Colour || '-',
            },
          };
          let vin = res.data.Results[0].VIN;
          props.UpdateVinNumber(vin);

          setVehicleInfo(tempVehicleInfo);
        } else {
          setVehicleInfo({});
          Toast.show('Unable to fetch details');
        }
        setLoading(false);
      });
    // .catch((err) => {
    //   console.log('err', err.response);
    // });
  };
  const handleClick = () => {
    navigation.navigate('Features');
  };
  return (
    <View style={{flex: 1}}>
      <Headers />
      <KeyboardAvoidingView behavior={'height'}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={globalStyles.container}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 30,
              }}>
              Vehicle Information
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TextInput
                style={styles.input}
                placeholder="Enter vin Number"
                value={vin}
                onChangeText={(val) => {
                  setVin(val);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Stock Number"
                value={stock}
                onChangeText={(val) => {
                  setStock(val);
                }}
              />
            </View>
            {isLoading === true ? (
              <View style={{justifyContent: 'center', marginVertical: 20}}>
                <ActivityIndicator size={'large'} color={'crimson'} />
              </View>
            ) : (
              <View>
                {result._id ? (
                  <View>
                    <View>
                      <Text
                        style={{
                          marginLeft: 20,
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginTop: 30,
                          marginBottom: 20,
                        }}>
                        Results
                      </Text>
                    </View>
                    <View
                      style={{backgroundColor: 'white', marginHorizontal: 20}}>
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Year
                          </Text>
                          <Text>{result.Year}</Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Make
                          </Text>
                          <Text>{result.Make}</Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Model
                          </Text>
                          <Text>{result.Model}</Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Colour
                          </Text>
                          <Text>{result.ExteriorColor.Description}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                          marginBottom: 10,
                        }}>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Trim
                          </Text>
                          <Text>{result.Trim}</Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            InPbs
                          </Text>

                          {inPbs ? (
                            <FontAwesome
                              name="check-circle"
                              color={'crimson'}
                              size={20}
                            />
                          ) : (
                            <FontAwesome
                              name="times"
                              color={'crimson'}
                              size={20}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
                {vehicleInfo.Year ? (
                  <View>
                    <View>
                      <Text
                        style={{
                          marginLeft: 20,
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginTop: 30,
                          marginBottom: 20,
                        }}>
                        Results
                      </Text>
                    </View>
                    <View
                      style={{backgroundColor: 'white', marginHorizontal: 20}}>
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Year
                          </Text>
                          <Text>{vehicleInfo.Year}</Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Make
                          </Text>
                          <Text>{vehicleInfo.Make}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Model
                          </Text>
                          <Text>{vehicleInfo.Model}</Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Colour
                          </Text>
                          <Text>
                            {vehicleInfo.ExteriorColor &&
                            vehicleInfo.ExteriorColor.Description
                              ? vehicleInfo.ExteriorColor.Description
                              : '-'}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                          marginBottom: 10,
                        }}>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            Trim
                          </Text>
                          <Text>{vehicleInfo.Trim}</Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            InPbs
                          </Text>
                          {inPbs ? (
                            <FontAwesome
                              name="check-circle"
                              color={'crimson'}
                              size={20}
                            />
                          ) : (
                            <FontAwesome
                              name="times"
                              color={'crimson'}
                              size={20}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {result._id === undefined && vehicleInfo.Year === undefined ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'crimson',
            position: 'absolute',
            bottom: 0,
            height: 55,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '50%',
              borderRightWidth: 1,
              borderRightColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleSearch();
              }}>
              <FontAwesome
                name="search"
                size={20}
                color={'white'}
                style={{paddingRight: 10}}
              />

              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 22,
                }}>
                SEARCH
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setScan(true);
              }}>
              <FontAwesome
                name="barcode"
                size={20}
                color={'white'}
                style={{paddingRight: 10}}
              />

              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 22,
                }}>
                SCAN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Footer onClick={handleClick} />
      )}
      {scan == true ? (
        <View style={{flex: 1}}>
          <RNCamera
            // ref={(ref) => (this.camera = ref)}
            defaultTouchToFocus
            type={RNCamera.Constants.Type.back}
            flashMode={camera.flashMode}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={
              'We need your permission to use your camera phone'
            }
            type={camera.type}
            // onBarCodeRead={onSuccess}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              // console.log('barcodes', barcodes);
              onSuccess(barcodes);
            }}
            googleVisionBarcodeMode={
              RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode
                .ALTERNATE
            }
            camera1ScanMode="boost"
            onFocusChanged={(e) => {
              // console.log('focus', e);
            }}
            onZoomChanged={(e) => {
              // console.log('zoom', e);
            }}
            // aspect={RNCamera.Constants.Aspect.stretch}
            focusDepth={0.9}
            style={{height: '50%', width: '100%'}}>
            <BarcodeMask
              height={'70%'}
              width={'90%'}
              showAnimatedLine={true}
              backgroundColor={'rgba(0, 0, 0, 0)'}
            />
          </RNCamera>
        </View>
      ) : null}
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    vin: state.featureReducer.vin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateVinNumber: (vin) => dispatch(UpdateVinNumber(vin)),
  };
};

const styles = StyleSheet.create({
  input: {
    width: '85%',
    height: 60,
    backgroundColor: 'white',
    marginTop: 20,
    fontSize: 18,
    paddingLeft: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
