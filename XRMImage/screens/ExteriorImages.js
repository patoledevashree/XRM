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
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import ImageResizer from 'react-native-image-resizer';

/**
 * @author Devashree Patole
 * @description This component is to upload exterior images of vehicle.
 * @param {*} props contains uploadImage function and vin number from redux
 * @returns JSX of Exterior Image component
 */
function ExteriorImages(props) {
  const [front_right_45, setfront_right_45] = useState('');
  const [rear_right_45, setrear_right_45] = useState('');
  const [rear_left_45, setrear_left_45] = useState('');
  const [front_left_45, setfront_left_45] = useState('');
  const [full_driver_side_view, setfull_driver_side_view] = useState('');
  const [trunk, settrunk] = useState('');
  const [onCamera, setCamera] = useState(false);
  const [modal, setModal] = useState(false);
  const [key, setKey] = useState('');
  const [grid, setGrid] = useState(false);
  const navigation = useNavigation();
  let camera = null;

  const handleClick = () => {
    if (
      front_right_45 === '' ||
      rear_right_45 === '' ||
      rear_left_45 === '' ||
      front_left_45 === '' ||
      full_driver_side_view === '' ||
      trunk === ''
    ) {
      Toast.show('Upload Images First');
    } else {
      navigation.navigate('InteriorImages');
    }
  };
  const handelPhoto = (data) => {
    setKey(data);
    setModal(true);
  };
  const selectCamera = (val) => {
    setGrid(true);
    setCamera(val);
  };
  const selectImage = (val) => {
    setCamera(val);
    handleImage(key);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleImage = (data) => {
    console.log('handleImage');
    const options = {
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('res', response);
      if (response.uri) {
        if (data === 'front_right_45') {
          setfront_right_45(response);
        }
        if (data === 'rear_right_45') {
          setrear_right_45(response);
        }
        if (data === 'rear_left_45') {
          setrear_left_45(response);
        }
        if (data === 'front_left_45') {
          setfront_left_45(response);
        }
        if (data === 'full_driver_side_view') {
          setfull_driver_side_view(response);
        }
        if (data === 'trunk') {
          settrunk(response);
        }
        let sizeInKb = response.fileSize / 1024;
        let sizeInMb = sizeInKb / 1024;
        if (sizeInMb < 10) {
          props.uploadImage(props.vin, data, response);
        } else {
          compressImage(response);
        }
      }
    });
  };
  const compressImage = (response) => {
    console.log('compress');
    console.log('response', response.fileSize);
    ImageResizer.createResizedImage(response.path, 1920, 1080)
      .then((compressedImage) => {
        console.log('compressImage', compressedImage);
      })
      .catch((err) => {
        console.log('err', err);
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
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log('pic', data);
    setGrid(false);
    if (key === 'front_right_45') {
      setfront_right_45(data);
    }
    if (key === 'rear_right_45') {
      setrear_right_45(data);
    }
    if (key === 'rear_left_45') {
      setrear_left_45(data);
    }
    if (key === 'front_left_45') {
      setfront_left_45(data);
    }
    if (key === 'full_driver_side_view') {
      setfull_driver_side_view(data);
    }
    if (key === 'trunk') {
      settrunk(data);
    }
    props.uploadImage(props.vin, key, data, data);
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
              marginBottom: 90,
              marginTop: 20,
            }}>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                marginBottom: 30,
              }}>
              <View
                style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 15}}>
                <Text style={{fontWeight: 'bold'}}>Exterior</Text>
              </View>
              <View style={styles.mainStyle}>
                <View style={styles.textStyle}>
                  <Text>45{'\u00b0'} Right Front</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('front_right_45');
                    }}>
                    {!front_right_45 ? (
                      <View style={styles.displayStyle}>
                        <Image
                          source={require('../assests/images/front_right_45.png')}
                        />
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <Image
                          source={{uri: front_right_45.uri}}
                          style={{height: 50, width: 50}}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                  <Text>45{'\u00b0'} Front Left</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('front_left_45');
                    }}>
                    {!front_left_45 ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/front_left_45.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: front_left_45.uri}}
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
                  <Text>45{'\u00b0'} Rear Left</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('rear_left_45');
                    }}>
                    {!rear_left_45 ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/rear_left_45.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: rear_left_45.uri}}
                            style={{height: 50, width: 50}}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                  <Text>45{'\u00b0'} Rear Rigth</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('rear_right_45');
                    }}>
                    {!rear_right_45 ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/rear_right_45.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: rear_right_45.uri}}
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
                  <Text>Full Driver Side View</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('full_driver_side_view');
                    }}>
                    {!full_driver_side_view ? (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={require('../assests/images/full_driver_side_view.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 10}}>Upload</Text>
                      </View>
                    ) : (
                      <View style={styles.displayStyle}>
                        <View>
                          <Image
                            source={{uri: full_driver_side_view.uri}}
                            style={{height: 50, width: 50}}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.textStyle}>
                  <Text>Trunk</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handelPhoto('trunk');
                    }}>
                    {!trunk ? (
                      <View
                        style={{
                          marginTop: 5,
                          borderStyle: 'dashed',
                          borderWidth: 1,
                          paddingHorizontal: '30%',
                          paddingTop: 25,
                          borderColor: '#777',
                          paddingBottom: 10,
                          borderRadius: 1,
                        }}>
                        <View>
                          <Image
                            source={require('../assests/images/trunk.png')}
                          />
                        </View>
                        <Text style={{paddingTop: 5}}>Upload</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          marginTop: 5,
                          borderStyle: 'dashed',
                          borderWidth: 1,
                          paddingHorizontal: '30%',
                          paddingTop: 25,
                          borderColor: '#777',
                          paddingBottom: 10,
                          borderRadius: 1,
                        }}>
                        <View>
                          <Image
                            source={{uri: full_driver_side_view.uri}}
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
      <Footer onClick={handleClick} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ExteriorImages);
