import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(uid => uid !== action.authedUser)
              : state[action.id].likes.concat([action.authedUser])
        }
      };
    case ADD_TWEET:
      const { tweet } = action;

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyTo].replies.concat([tweet.id])
          }
        };
      }

      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo
      };
      //when we add a new tweet we need to add it to the array of our tweets slice of the state. which is an oblect (...state) if the new tweet is a reply to the other tweet then we are going to grab it and add it onto the replies array and spread it onto the state tweets array
      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo
      };
    default:
      return state;
  }
}
