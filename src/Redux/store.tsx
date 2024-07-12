import reducer from './Reducers';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
const middlewares = [thunk];

export default createStore(reducer, applyMiddleware(...middlewares));
