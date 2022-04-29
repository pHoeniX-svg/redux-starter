import { devToolsEnhancer } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer, devToolsEnhancer({ trace: true }));
export default store;
