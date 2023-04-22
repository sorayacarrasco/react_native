import * as ActionTypes from './ActionTypes';

export const favoritos = (state = {favoritos: []}, action) => {
    switch(action.type){
        case ActionTypes.ADD_FAVORITO:
            if(!state.favoritos.some(id => id === action.payload)){
                return {...state, favoritos: state.favoritos.concat(action.payload)}
            }
            else{
                return state;
            }

        default:
            return state;
    }
};