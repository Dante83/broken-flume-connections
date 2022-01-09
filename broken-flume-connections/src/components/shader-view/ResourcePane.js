import React from 'react';
import { Menu, MenuItem } from "@blueprintjs/core";
import { useSelector, useDispatch } from 'react-redux';
import { viewMaterialGraph, selectActiveMaterial, selectMaterialList } from '../../application/js/features/materialListPaneSlice.js';
import { create, update } from '../../application/js/features/newMaterialModalSlice.js';
import './ResourcePane.css';

export default function ResourcePane(){
  const activeMaterialName = useSelector(selectActiveMaterial);
  const materialsList = Object.keys(useSelector(selectMaterialList));
  const dispatch = useDispatch();

  //
  //These button just let us click and choose a material, the currently active material should be highlighted...
  //
  const materialSelectionList = [];
  for(let i = 0, numElements = materialsList.length; i < numElements; ++i){
    const materialName = materialsList[i];
    if(materialName !== activeMaterialName){
      materialSelectionList.push(
        <div className="bp3-button-group bp3-fill bp3-vertical">
          <span className="bp3-button" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))}>{materialName}</span>
        </div>
      );
    }
    else{
      materialSelectionList.push(
        <div className="bp3-button-group bp3-fill bp3-vertical">
          <span className="bp3-button" id="selected-material-button" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))}>{materialName}</span>
        </div>
      );
    }
  }

  return(
    <div id="material-selector-panel">
      <section id="material-selector-flex-container">
        <header id="material-selector-header">
          <h5 className="bp3-heading">Node Graph Selector</h5>
        </header>
        <div id="material-selector-list-container">
          <div id="material-selector-list-flex-box">
            { materialSelectionList }
            <div div="material-selector-list-filler"></div>
          </div>
        </div>
        <footer id="material-selector-footer">
          <div className="bp3-button-group" id="add-delete-shader-buttons">
            <button className="bp3-button bp3-intent-primary" id="add-shader-button" onClick={(e)=>dispatch(create(true))} >
              <span className="bp3-icon bp3-icon-add" icon="add"></span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
