import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.ADD_COMENTARIO:
      let new_id = state.comentarios[state.comentarios.length -1].id+1;
      action.payload["id"] = new_id;
      return {...state, errMess: null, comentarios: state.comentarios.concat([action.payload])};


    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};