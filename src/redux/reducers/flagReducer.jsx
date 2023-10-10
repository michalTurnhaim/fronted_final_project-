import produce from "immer"

const mystate={
    flagO:false,
    flagI:false
}
export const FlagReducer=produce((state,action)=>{
switch (action.type) {
    case 'Fill-flago':{state.flagO=action.payload;}
        break;

        case 'Fill-flagi':{state.flagI=action.payload;}
        break;
    default:
        break;
}
},mystate)
export default FlagReducer