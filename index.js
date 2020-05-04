/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import  menu from './Plantfinder/Menu';
import  camera from './Plantfinder/Camera';
import {name as appName} from './app.json';
import PlantData from './Plantfinder/PlantData'

AppRegistry.registerComponent(appName, () => menu);
