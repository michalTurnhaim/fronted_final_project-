import produce from "immer"

const mystate = {
    obj: {},
    passWord:0
}
export const InvitedtReducer = produce((state, action) => {
    switch (action.type) {
        case 'Fill-Invited': { state.obj = action.payload; }
            break;
        case 'Fill-passWord': { state.passWord = action.payload; }
            break;

        default:
            break;
    }
}, mystate)
export default InvitedtReducer