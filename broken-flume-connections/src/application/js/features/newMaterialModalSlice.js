import { createSlice } from '@reduxjs/toolkit';

const blankState = {
  materialName: {
    value: '',
    errors: []
  },
  isFormValid: false,
  isUpdate: false,
  isVisible: false
};

export const newMaterialModalSlice = createSlice({
  name: 'newMaterialModal',
  initialState: {...blankState},
  reducers: {
    closeNewMaterialModal: (state, action) => {
      state.isVisible = false;
    },
    create: (state, action) => {
      //Reset our state to the default values
      state.materialName = {
        value: '',
        errors: []
      };
      state.isUpdate = false;
      state.isFormValid = false;
      state.isVisible = true;
    },
    update: (state, action) => {
      //Reset our state to the value presented
      const formValues = action.payload;
      state.materialName.value = formValues.materialName;
      state.isFormValid = true;
      state.isUpdate = true;
      state.isVisible = true;
    },
    displayErrors: (state, action) => {
      const payload = action.payload;
      state.materialName.errors = [...payload.materialName.errors];
      state.materialName.value = payload.materialName.value;
    }
  }
});

export const { closeNewMaterialModal, create, update, displayErrors } = newMaterialModalSlice.actions;
export const selectIsEditMaterialModalVisible = function(state){
  return state.newMaterialModal.isVisible
};
export const selectModalFormState = function(state){
  return {...state.newMaterialModal};
}
export const newMaterialModalReducer = newMaterialModalSlice.reducer;
