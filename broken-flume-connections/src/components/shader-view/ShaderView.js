import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import NodeGraphPane from './NodeGraphPane.js';
import ResourcePane from './ResourcePane.js';
import NewMaterialModal from './NewMaterialModal.js'
import './ShaderView.css';
import '../../../node_modules/react-mosaic-component/react-mosaic-component.css';
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  'node-graph-pane': <div>
    <NodeGraphPane/>
  </div>,
  'resource-pane': <ResourcePane/>
};

export default function ShaderView(){
  return (
    <div id="view-container">
      <div id="view-space">
        <NewMaterialModal></NewMaterialModal>
        <Mosaic
          id="view-pane-container"
          renderTile={(id, path) => (
            <MosaicWindow
              path={path}
              createNode={() => 'new'}
              title={ELEMENT_MAP[id]}>
              <h1>{ELEMENT_MAP[id]}</h1>
            </MosaicWindow>
          )}
          initialValue={{
            direction: 'row',
            first: 'node-graph-pane',
            second: 'resource-pane',
            splitPercentage: 80,
          }}
          className={THEMES}
        />
      </div>
    </div>
  );
}
