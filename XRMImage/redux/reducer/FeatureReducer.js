import {
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FALIURE,
} from '../action/types';

const initialState = {
  features: [],
  loading: false,
  error: '',
  featureList: [],
  vin: '',
  isLoading: false,
};

const FeatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FEATURES_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_FEATURES_SUCCESS': {
      return {
        ...state,
        loading: false,
        features: action.payload,
        error: '',
      };
    }
    case 'GET_FEATURES_FALIURE': {
      return {
        ...state,
        loading: false,
        features: [],
        error: action.payload,
      };
    }
    case 'UPDATE_FEATURE_LIST': {
      return {
        ...state,
        featureList: action.temp,
      };
    }
    case 'VIN_NUMBER': {
      // console.log('reducer');
      return {
        ...state,
        vin: action.data,
      };
    }
    case 'UPLOAD_IMAGE_REQUEST': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPLOAD_IMAGE_SUCCESS': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'UPLOAD_IMAGE_FALIURE': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default FeatureReducer;
