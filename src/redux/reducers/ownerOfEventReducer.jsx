import produce from "immer"

const mystate={
    obj:[]
}
export const OwnerOfEventReducer=produce((state,action)=>{
switch (action.type) {
    case 'getOwnerOfEventByEmail':{state.obj=action.payload;}
        break;
    default:
        break;
}
},mystate)
export default OwnerOfEventReducer