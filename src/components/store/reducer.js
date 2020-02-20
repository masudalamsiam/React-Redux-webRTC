export default (state, { type, payload }) => {
  switch (type) {
    case "CREATE-SOCKET-CONNECTION":
      return { ...state, socket: payload };
    case "UPDATE-USER-NAME":
      return { ...state, user: { ...state.user, name: payload } };
    case "SET-USERS":
      return { ...state, users: payload }
    case "ADD-USER":
      return { ...state, users: [...state.users, payload] };
    case "DELETE-USER":
      return { ...state, users: state.users.filter((user) => user.socket_id === payload) }
    case "CALLING":
      return { ...state, calling: { ...state.calling, ...payload } }
    case "CALL-END":
      return { ...state, calling: { ...state.calling, ...payload } }
    case "INCOMING-CALL":
      return { ...state, incoming_call: { ...state.incoming_call, ...payload } }
    default:
      return state;
  }
};
