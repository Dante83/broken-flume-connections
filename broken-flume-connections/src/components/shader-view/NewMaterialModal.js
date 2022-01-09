import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMaterialList, createOrUpdateMaterial } from '../../application/js/features/materialListPaneSlice.js';
import { selectModalFormState, selectIsEditMaterialModalVisible, closeNewMaterialModal, displayErrors } from '../../application/js/features/newMaterialModalSlice.js';
import { Dialog, InputGroup, FormGroup, Button } from "@blueprintjs/core";
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './NewMaterialModal.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

function submitFormAction(formValues, isUpdate, createOrUpdateMaterialReducer, displayErrorsReducer, closeModalReducer, dispatch, materialName){
  const noBlankFormFieldsError = 'This form field cannot be left blank.';
  let state = {
    materialName: {
      value: formValues.materialName,
      errors: []
    },
    isUpdate: isUpdate,
  };
  let isValid = true;
  const currentMaterialNames = formValues.currentMaterialNames;

  //Material Name
  if(!isUpdate){
    const materialName = formValues.materialName;
    state.materialName.errors = [];
    if(materialName === null || materialName === ''){//Name must not be null
      state.materialName.errors = [noBlankFormFieldsError];
    }
    else if(materialName.length > 64){//Name must be under 64 characters in length
      state.materialName.errors = ['The material name must not be over 64 characters in length.'];
    }
    else if(!(/^[A-Za-z0-9_@.~\/#&+\-\s!?%^$*()-\[\]\\]*$/i).test(materialName)){
      //Name must contain only alphanumeric characters
      state.materialName.errors = ['The material must only contain alphanumeric characters, spaces, and some special characters.'];
    }
    else if(currentMaterialNames.includes(materialName)){//Name must be unique
      state.materialName.errors = ['The material name must be unique. No other material may share the same name as this material.'];
    }
    if(state.materialName.errors.length > 0){
      isValid = false;
    }
  }

  if(isValid){
    dispatch(createOrUpdateMaterialReducer(state));
    dispatch(closeModalReducer());
  }
  else{
    dispatch(displayErrorsReducer(state));
  }
}

export default function NewMaterialModal(){
  const currentMaterials = useSelector(selectMaterialList);
  const currentMaterialNames = Object.keys(currentMaterials);
  const newMaterialModalVisible = useSelector(selectIsEditMaterialModalVisible);
  const currentModalData = useSelector(selectModalFormState);
  const dispatch = useDispatch();
  let createOrUpdateText;
  let title;
  if(currentModalData.isUpdate){
    createOrUpdateText = 'update';
    title = 'Edit Material';
  }
  else{
    createOrUpdateText = 'create';
    title = 'New Material';
  }
  const formSubmit = function(e){
    e.preventDefault();
    const target = e.target;
    const formData = {
      currentMaterialNames: currentMaterialNames,
      materialName: target[0].value
    };
    submitFormAction(formData, currentModalData.isUpdate, createOrUpdateMaterial, displayErrors, closeNewMaterialModal, dispatch);
  }

  return(
    <Dialog
      title={title}
      usePortal={true}
      isOpen={newMaterialModalVisible}
      className={THEMES}
      onClose={(e)=>dispatch(closeNewMaterialModal())}>
        <form id="new-material-form-modal" onSubmit={formSubmit}>
          <FormGroup
              label="Material Name"
              labelFor="material-name-input"
              labelInfo="(required)"
              intent={currentModalData.materialName.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.materialName.errors.join('<br/>')}
          >
              <InputGroup autoFocus id="material-name-input" placeholder="Material Name" />
          </FormGroup>

          <div id="new-material-button-group">
            <Button type="submit" id="create-material-button" intent="success" align="right">
              {createOrUpdateText}
            </Button>
            &nbsp;
            <Button id="cancel-material-creation-button" align="right" onClick={(e)=>dispatch(closeNewMaterialModal())}>
              Cancel
            </Button>
          </div>
        </form>
    </Dialog>
  );
}
