import produce from "immer"

const mystate={
    obj:[],
    object:{}
}
export const OwnerOfEventReducer=produce((state,action)=>{
switch (action.type) {
    case 'getOwnerOfEventByEmail':{state.obj=action.payload;}
        break;
    case 'objownerOfEvent':{state.object=action.payload;}
    default:
        break;
}
},mystate)
export default OwnerOfEventReducer