import React from 'react';
import ShaderView from './components/shader-view/ShaderView.js';
import { FocusStyleManager } from "@blueprintjs/core";
import '../node_modules/normalize.css/normalize.css';

export default function App(){
  FocusStyleManager.onlyShowFocusOnTabs();
  return(
    <div className="bp3-dark">
      <ShaderView />
    </div>
  );
}
