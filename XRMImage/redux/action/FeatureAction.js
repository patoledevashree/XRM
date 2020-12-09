import {
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FALIURE,
  UPDATE_FEATURE_LIST,
  VIN_NUMBER,
  UPLOAD_IMAGE_FALIURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from './types';
import axios from 'axios';
import {baseURL} from '../../shared/config';
import {getFeatures, submitImage} from '../../shared/ApiEndPOints';

export const getFeaturesRequest = () => {
  return {
    type: GET_FEATURES_REQUEST,
  };
};
export const getFeaturesSuccess = (data) => {
  return {
    type: GET_FEATURES_SUCCESS,
    payload: data,
  };
};
export const getFeaturesFaliure = (error) => {
  return {
    type: GET_FEATURES_SUCCESS,
    payload: error,
  };
};
export const uploadImageRequest = () => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
  };
};
export const uploadImageSuccess = () => {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
  };
};
export const uploadImageFaliure = () => {
  return {
    type: UPLOAD_IMAGE_FALIURE,
  };
};

export const getAllFeatures = () => {
  return (dispatch) => {
    dispatch(getFeaturesRequest());
    axios
      .get(`${baseURL}/${getFeatures}`, {
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((response) => {
        // console.log('response', response);
        const data = response.data.message;
        dispatch(getFeaturesSuccess(data));
      })
      .catch((error) => {
        // console.log('error', error.response);
        dispatch(getFeaturesFaliure(error));
      });
  };
};

export const UpdateFeatureList = (temp) => {
  return {
    type: UPDATE_FEATURE_LIST,
    temp: temp,
  };
};

export const UpdateVinNumber = (vin) => {
  return {
    type: VIN_NUMBER,
    data: vin,
  };
};

export const uploadImage = (vin, data, response, img) => {
  console.log('uploadImage');
  return (dispatch) => {
    var formData = new FormData();
    // const image = 'data:image/jpeg;base64,' + response.data;
    // let obj = {[data]: response.fileName};
    // console.log('obj', obj);
    // formData.append(obj);
    if (img !== undefined) {
      let str = response.uri.split('/');
      let fname = str[str.length - 1];
      formData.append([data], {
        uri: response.uri,
        name: fname,
        type: 'image/jpeg',
      });
    } else {
      formData.append([data], {
        uri: response.uri,
        name: response.fileName,
        type: 'image/jpeg',
      });
    }
    dispatch(uploadImageRequest());
    axios
      .put(`${baseURL}/${submitImage}/${vin}`, formData, {
        headers: {
          'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6',
          'Content-Type': 'multipart/form-data;',
        },
      })
      .then((response) => {
        console.log('response', response);
        dispatch(uploadImageSuccess());
      })
      .catch((err) => {
        console.log('err', err.response);
        dispatch(uploadImageFaliure());
      });
  };
};
