import { getInitialData } from "../utils/api";
import { receiveTweets } from "../actions/tweets";
import { receiveUsers } from "../actions/users";
import { setAuthedUser } from "../actions/authUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export default function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
