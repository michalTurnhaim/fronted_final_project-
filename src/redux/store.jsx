import { combineReducers } from "redux";
import { createStore } from "redux";
import { TypeEventReducer } from "./reducers/typeEventReducer"
import { InvitedToEventReducer } from "./reducers/invitedToEventReducer"
import { OwnerOfEventReducer } from "./reducers/ownerOfEventReducer"
import { TypeReducer } from "./reducers/TypeReducer"
import { FlagReducer } from "./reducers/flagReducer"
import { InvitedtReducer } from "./reducers/InvitedReducer"
import { ListInvitedReducer } from "./reducers/listInvitedReducer"


const reducer = combineReducers({ TypeEventReducer, InvitedToEventReducer, OwnerOfEventReducer, TypeReducer, FlagReducer, ListInvitedReducer, InvitedtReducer })
const newstore = createStore(reducer)
window.store = newstore
export default newstore