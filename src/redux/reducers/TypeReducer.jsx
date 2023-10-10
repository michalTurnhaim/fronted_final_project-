import produce from "immer"

const mystate={
    typeofEmail:0
}
export const TypeReducer=produce((state,action)=>{
switch (action.type) {
    case 'typeOfEmail':state.typeofEmail=action.payload; 
        break;
    default:
        break;
}
},mystate)
export default TypeReducer