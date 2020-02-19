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
    default:
      return state;
  }
};
