import produce from "immer"

const mystate={
    listTypeEvent:[]
}
export const TypeEventReducer=produce((state,action)=>{
switch (action.type) {
    case 'FilltypeEvent-Data':{state.listTypeEvent=action.payload;
    }
        break;
    default:
        break;
}
},mystate)
export default TypeEventReducer