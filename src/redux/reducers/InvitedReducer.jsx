import produce from "immer"

const mystate={
    obj:{}
}
export const InvitedtReducer=produce((state,action)=>{
switch (action.type) {
    case 'Fill-Invited':{state.obj=action.payload;}
        break;
    default:
        break;
}
},mystate)
export default InvitedtReducer