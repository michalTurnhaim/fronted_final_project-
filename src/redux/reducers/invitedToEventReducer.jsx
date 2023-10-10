import produce from "immer"

const mystate = {
    listInvitedToEvent: [],
    listInvitedToEventFilter: [],
    objInvit:{}
}
export const InvitedToEventReducer = produce((state, action) => {
    switch (action.type) {
        case 'FillInvitedToEvent-Data': {
            state.listInvitedToEvent = action.payload;
        }
            break;

        case 'FillInvitedToEventFilter-Data': {
            state.listInvitedToEventFilter = action.payload;
        }
            break;

        case 'FillInvitedToEventObj-Data': {
            state.objInvit = action.payload;
        }
            break;
        default:
            break;
    }

}, mystate)
export default InvitedToEventReducer