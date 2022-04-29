import { devToolsEnhancer } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import reducer from './bugs';

export default function configureStore() {
  return createStore(reducer, devToolsEnhancer({ trace: true }));
}
