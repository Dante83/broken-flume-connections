import { configureStore } from '@reduxjs/toolkit';
import { materialListPaneReducer } from './features/materialListPaneSlice.js';
import { newMaterialModalReducer } from './features/newMaterialModalSlice.js';

export const store = configureStore({
  reducer: {
    materialListPane: materialListPaneReducer,
    newMaterialModal: newMaterialModalReducer
  }
});
