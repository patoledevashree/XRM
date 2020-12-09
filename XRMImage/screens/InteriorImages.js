import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import Headers from '../screens/Header/header';
import {globalStyles} from '../shared/globalStyles';
import Footer from '../screens/Footer/footer';
import {connect} from 'react-redux';
import OptionModal from '../screens/OptionModal';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import {uploadImage} from '../redux/action/FeatureAction';
import {baseURL} from '../shared/config';
import {submitForm} from '../shared/ApiEndPOints';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

/**
 * @author Devashree Patole
 * @description This component is for the user to upload interior images of vehicle
 * and also to submit the data to backend
 * @param {*} props contains the uploadImage function and vin number
 * @returns JSx of Interior Images
 */
function InteriorImages(props) {
  const [dash_view_from_rear_seat, setdash_view_from_rear_seat] = useState('');
  const [sun_roof_if_applicable, setsun_roof_if_applicable] = useState('');
  const [back_up_camera, setback_up_camera] = useState('');
  const [navigation_system, setnavigation_system] = useState('');
  const [onCamera, setCamera] = useState(false);
  const [modal, setModal] = useState(false);
  const [key, setKey] = useState('');
  const [grid, setGrid] = useState(false);
  let camera = null;

  const handleClick = () => {
    if (dash_view_from_rear_seat === '') {
      Toast.show('Upload Image First');
    } else {
      submitform();
    }
  };
  const handelPhoto = (data) => {
    setKey(data);
    setModal(true);
  };
  const selectCamera = (val) => {
    setGrid(true);
    setCamera(val);
    console.log(key);
    // handleCamera(key);
  };
  const selectImage = (val) => {
    setCamera(val);
    handleImage(key);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleImage = (data) => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('res', response);
      if (response.uri) {
        if (data === 'dash_view_from_rear_seat') {
          setdash_view_from_rear_seat(response);
        }
        if (data === 'sun_roof_if_applicable') {
          setsun_roof_if_applicable(response);
        }
        if (data === 'back_up_camera') {
          setback_up_camera(response);
        }
        if (data === 'navigation_system') {
          setnavigation_system(response);
        }
        props.uploadImage(props.vin, data, response);
      }
    });
  };
  const data = [
    {key: 'A'},
    {key: 'B'},
    {key: 'C'},
    {key: 'D'},
    {key: 'E'},
    {key: 'F'},
    {key: 'G'},
    {key: 'H'},
    {key: 'I'},
  ];

  const ImgformatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true, width: 500, height: 500};
    const data = await camera.takePictureAsync(options);
    // console.log('pic', data);
    setGrid(false);
    if (key === 'dash_view_from_rear_seat') {
      setdash_view_from_rear_seat(data);
    }
    if (key === 'sun_roof_if_applicable') {
      setsun_roof_if_applicable(data);
    }
    if (key === 'back_up_camera') {
      setback_up_camera(data);
    }
    if (key === 'navigation_system') {
      setnavigation_system(data);
    }
    props.uploadImage(props.vin, key, data, data);
  };

  const submitform = () => {
    axios
      .post(
        `${baseURL}/${submitForm}/${props.vin}`,
        {
          features: props.featureList,
        },
        {
          headers: {
            'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('response', response);
        Toast.show('Data Submitted Successfully');
      })
      .catch((err) => {
        console.log('err', err.response);
        Toast.show(err.response.data.message);
      });
  };

  return (
    <View style={{flex: 1}}>
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
              Images
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 10,
              marginVertical: 10,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                marginBottom: 30,
              }}>
              <View
                style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 15}}>
                <Text style={{fontWeight: 'bold'}}>Interior</Text>
              </View>
              <View style={styles.mainStyle}>
                <View style={styles.textStyle}>
                  <Text>Dash View From</Text>
                  <Text>Rear Seat</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('dash_view_from_rear_seat');
                    }}>
                    {!dash_view_from_rear_seat ? (
                      <View style={styles.displayStyle}>
                        <Image
                          source={require('../assests/images/dash_view_from_rear_seat.png')}
                        />
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <Image
                          source={{uri: dash_view_from_rear_seat.uri}}
                          style={{height: 50, width: 50}}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                  <Text>Sun Roof</Text>
                  <Text>(if applicable)</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('sun_roof_if_applicable');
                    }}>
                    {!sun_roof_if_applicable ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/sun_roof_if_applicable.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: sun_roof_if_applicable.uri}}
                            style={{height: 50, width: 50}}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.mainStyle}>
                <View style={styles.textStyle}>
                  <Text>Back up Camera</Text>
                  <Text>(if applicable)</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('back_up_camera');
                    }}>
                    {!back_up_camera ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/back_up_camera.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: back_up_camera.uri}}
                            style={{height: 50, width: 50}}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                  <Text>Navigation system</Text>
                  <Text>(if applicable)</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('navigation_system');
                    }}>
                    {!navigation_system ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/navigation_system.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: navigation_system.uri}}
                            style={{height: 50, width: 50}}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleClick();
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              paddingTop: 10,
              fontSize: 22,
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
      <OptionModal
        visible={modal}
        closeModal={closeModal}
        selectCamera={selectCamera}
        selectImage={selectImage}
      />
      {grid ? (
        <View>
          <RNCamera
            ref={(ref) => (camera = ref)}
            defaultTouchToFocus
            type={RNCamera.Constants.Type.back}
            // flashMode={camera.flashMode}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={
              'We need your permission to use your camera phone'
            }
            flashMode={RNCamera.Constants.FlashMode.auto}
            // type={camera.type}
            // onBarCodeRead={onSuccess}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              // console.log('barcodes', barcodes);
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
            focusDepth={0.9}
            style={{
              height: '100%',
              width: '100%',
            }}>
            <FlatList
              data={ImgformatData(data, 3)}
              style={{flex: 1}}
              numColumns={3}
              renderItem={({item, index}) => {
                if (item.empty === true) {
                  return <View style={[styles.item, styles.itemInvisible]} />;
                }
                return (
                  <View style={styles.item}>
                    <Text style={styles.itemText}></Text>
                  </View>
                );
              }}
            />

            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  takePicture(camera);
                }}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </RNCamera>
          <View></View>
        </View>
      ) : null}
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    vin: state.featureReducer.vin,
    featureList: state.featureReducer.featureList,
    isLoading: state.featureReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (vin, data, response, img) =>
      dispatch(uploadImage(vin, data, response, img)),
  };
};

const styles = StyleSheet.create({
  textStyle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayStyle: {
    marginTop: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    paddingHorizontal: '30%',
    paddingTop: 30,
    borderColor: '#777',
    paddingBottom: 10,
    borderRadius: 1,
  },
  mainStyle: {
    flexDirection: 'row',
    marginTop: 20,
  },
  item: {
    borderColor: '#777',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').height / 4, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: 'crimson',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 55,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InteriorImages);
