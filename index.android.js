/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';
import Index from './components/index.js';
import SQLite from 'react-native-sqlite-storage';

AppRegistry.registerComponent('SMS', () => Index);
