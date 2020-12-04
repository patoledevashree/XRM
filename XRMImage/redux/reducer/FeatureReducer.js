import {
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FALIURE,
} from '../action/types';

const initialState = {
  features: [],
  loading: true,
  error: '',
  featureList: [],
  vin: '',
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
    default:
      return state;
  }
};

export default FeatureReducer;
