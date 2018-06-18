import update from 'immutability-helper'

import {
  CAD_DRAW_DXF,
  CAD_DO_SELECTION,
  CAD_TOGGLE_VISIBLE,
  CAD_TOGGLE_VISIBLE_LAYER,
  CAD_SHOW_ALL,
  CAD_GROUP_ENTITIES,
  CAD_EDITMODE_SET_ACTIVE_LINE
} from '../actions/cad'

import {
  SNAPSHOT_LOAD_SCENE
} from '../actions/panelSnapshots'

import {
  EDIT_IS_EDIT,
  EDIT_SELECT_POINT,
  EDIT_CANCEL,
  EDIT_SAVE_POINT,
  EDIT_NEW_LINE,
  EDIT_CANCEL_NEW_LINE,
  EDIT_LINE_FIRST_POINT,
  EDIT_NEW_LINE_SAVE
} from '../actions/edit'

import {
  POINT_INFO_ACTIVE,
  POINT_INFO_MOVE,
  POINT_INFO_DISABLE
} from '../actions/pointInfo'

let initialState = {
  scene: null,
  camera: null,
  renderer: null,
  cadCanvas: null,
  activeEntities: [],
  editMode: {
    isEdit: false,
    beforeEdit: {},
    editObject: {},
    activeLine: {},
    selectPointIndex: null,
    isNewLine: false,
    newLineFirst: null,
    isNewCurve: false
  },
  pointInfo: {
    style: {
      display: 'none'
    },
    message: ''
  },

  loading: false,
  didInvalidate: false,
  items: [],
  error: null,
  lastUpdated: null
}

const cad = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NEW_LINE_SAVE:
      return update(state, {
        editMode: {
          isNewLine: {$set: action.payload.isNewLine},
          newLineFirst: {$set: action.payload.firstPoint}
        }
      })
    case EDIT_LINE_FIRST_POINT:
      return update(state, {
        editMode: {newLineFirst: {$set: action.payload.firstPoint}}
      })
    case EDIT_CANCEL_NEW_LINE:
      return update(state, {
        editMode: {
          isNewLine: {$set: action.payload.isNewLine},
          newLineFirst: {$set: action.payload.newLineFirst}
        }
      })
    case EDIT_NEW_LINE:
      return update(state, {
        editMode: {isNewLine: {$set: action.payload.isNewLine}}
      })

    case POINT_INFO_ACTIVE:
      return update(state, {
        pointInfo: {style: {$set: action.payload.style}}
      })
    case POINT_INFO_MOVE:
      return update(state, {
        pointInfo: {
          style: {$set: action.payload.style},
          message: {$set: action.payload.message}
        }
      })
    case POINT_INFO_DISABLE:
      return update(state, {
        pointInfo: {
          style: {$set: action.payload.style},
          message: {$set: action.payload.message}
        }
      })

    case EDIT_SAVE_POINT:
      return update(state, {
        editMode: {selectPointIndex: {$set: action.payload.index}}
      })
    case EDIT_CANCEL:
      return update(state, {
        editMode: {$set: action.payload.editMode}
      })
    case EDIT_SELECT_POINT:
      return update(state, {
        editMode: {
          selectPointIndex: {$set: action.payload.selectPointIndex}
        }
      })

    case CAD_EDITMODE_SET_ACTIVE_LINE:
      return update(state, {
        editMode: {
          activeLine: {$set: action.payload.activeLine}
        }
      })
    case EDIT_IS_EDIT:
      return update(state, {
        editMode: {
          isEdit: {$set: action.payload.isEdit},
          beforeEdit: {$set: action.payload.beforeEdit},
          editObject: {$set: action.payload.editObject}
        },
        scene: {$set: action.payload.scene}
      })
    case SNAPSHOT_LOAD_SCENE:
      return {
        ...state,
        scene: action.payload.scene
      }
    case CAD_DRAW_DXF:
      return {
        ...state,
        scene: action.payload.scene,
        camera: action.payload.camera,
        renderer: action.payload.renderer,
        cadCanvas: action.payload.cadCanvas
      }
    case CAD_DO_SELECTION:
      return update(state, {activeEntities: {$set: [...action.payload.activeEntities]}})
    case CAD_TOGGLE_VISIBLE:
      return update(state, {activeEntities: {$set: [...state.activeEntities]}})
    case CAD_TOGGLE_VISIBLE_LAYER:
      return update(state, {scene: {children: {$set: [...state.scene.children]}}})
    case CAD_SHOW_ALL:
      return update(state, {
        scene: {children: {$set: [...state.scene.children]}},
        activeEntities: {$set: [...state.activeEntities]}
      })
    case CAD_GROUP_ENTITIES:
      return update(state, {
        scene: {children: {$set: [...state.scene.children]}}
      })
    default:
      return state
  }
}

export default cad
