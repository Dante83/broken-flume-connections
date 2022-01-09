import { Colors, Controls } from 'flume';

export default function setFlumePortTypes(config){
  config.addPortType({
    type: 'floatConst',
    name: 'floatConst',
    label: 'Float',
    color: Colors.blue,
    hidePort: true,
    controls: [
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 1.0
      })
    ]
  });

  config.addPortType({
    type: 'float',
    name: 'float',
    label: 'Float',
    color: Colors.blue,
    noControls: true
  });

  config.addPortType({
    type: 'vec2',
    name: 'vec2',
    label: '2-Vector',
    color: Colors.green,
    noControls: true
  });

  config.addPortType({
    type: 'mat2',
    name: 'mat2',
    label: '2x2 Matrix',
    color: Colors.red,
    noControls: true
  });
}
