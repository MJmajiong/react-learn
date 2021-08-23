import { SETLOGINUSERTYPE } from "../action/loginUserAction";

const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SETLOGINUSERTYPE:
        return payload

    default:
        return state
    }
}
