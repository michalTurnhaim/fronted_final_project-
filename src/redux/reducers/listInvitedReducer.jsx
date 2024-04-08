import produce from "immer"

const mystate = {
    list: []
}
export const ListInvitedReducer = produce((state, action) => {
    switch (action.type) {
        case 'getList': { ; state.list = action.payload; }
            break;
        default:
            break;
    }
}, mystate)
export default ListInvitedReducer