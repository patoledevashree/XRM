import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import FeatureReducer from './reducer/FeatureReducer';

const rootReducer = combineReducers({
  featureReducer: FeatureReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
