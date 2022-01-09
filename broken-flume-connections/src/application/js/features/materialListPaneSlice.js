import { createSlice, current } from '@reduxjs/toolkit';

export const materialListPaneSlice = createSlice({
  name: 'materialListPane',
  initialState: {
    deleteMaterialAlertVisible: false,
    activeMaterial: 'Example Graph 1',
    materialGraphs: {
      'Example Graph 1': {
        materialGraph: {},
        materialComments: {},
      },
      'Example Graph 2': {
        materialGraph: {},
        materialComments: {},
      }
    }
  },
  reducers: {
    createOrUpdateMaterial: (state, action) => {
      //Get information from the current form and create a new material from this information
      const payload = action.payload;
      const materialName = payload.materialName;
      state.materialGraphs[payload.materialName.value] = {
        materialGraph: {},
        materialComments: {}
      };
    },
    viewMaterialGraph: (state, action) => {
      state.activeMaterial = action.payload;
    },
    updateMaterialNodes: (state, action) => {
      state.materialGraphs[state.activeMaterial].materialGraph = action.payload;
    },
    updateMaterialComments: (state, action) => {
      state.materialGraphs[state.activeMaterial].materialComments = action.payload;
    }
  }
});

export const { createOrUpdateMaterial, showRemoveMaterialAlert, hideRemoveMaterialAlert, removeMaterial,
viewMaterialGraph, updateMaterialNodes, updateMaterialComments } = materialListPaneSlice.actions;
export const selectActiveMaterial = (state) => state.materialListPane.activeMaterial;
export const selectMaterialList = (state) => state.materialListPane.materialGraphs;
export const selectDeleteMaterialAlertVisible = (state) => state.materialListPane.deleteMaterialAlertVisible;
export const selectActiveNodes = function(state){
  const materialGraphs = state.materialListPane.materialGraphs;
  const activeMaterial = state.materialListPane.activeMaterial;
  if(activeMaterial && materialGraphs.hasOwnProperty(activeMaterial)){
    const nodes = materialGraphs[activeMaterial].materialGraph;
    return !!nodes ? nodes : {};
  }
  return {};
}
export const selectActiveComments = function(state){
  const materialGraphs = state.materialListPane.materialGraphs;
  const activeMaterial = state.materialListPane.activeMaterial;
  if(activeMaterial && materialGraphs.hasOwnProperty(activeMaterial)){
    const comments = materialGraphs[activeMaterial].materialComments;
    return !!comments ? comments : {};
  }
  return {};
}
export const materialListPaneReducer = materialListPaneSlice.reducer;
