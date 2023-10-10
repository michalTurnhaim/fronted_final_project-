import produce from "immer"

const mystate = {
    list: []
}
export const ListInvitedReducer = produce((state, action) => {
    switch (action.type) {
        case 'getList': { debugger; state.list = action.payload; debugger}
            break;
        default:
            break;
    }
}, mystate)
export default ListInvitedReducer