import { FlumeConfig } from 'flume';
import setFlumePortTypes from './setFlumePortTypes.js';

//Inputs
import {configureFlumeMat2Node} from '../../../application/js/editor/nodes/variables/Mat2.js';
import {configureFlumeVec2Node} from '../../../application/js/editor/nodes/variables/Vec2.js';

//Set up a new material node
const flumeConfig = new FlumeConfig();
setFlumePortTypes(flumeConfig);
configureFlumeMat2Node(flumeConfig);
configureFlumeVec2Node(flumeConfig);

export default flumeConfig;
