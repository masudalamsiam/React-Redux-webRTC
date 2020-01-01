export default (state, { type, payload }) => {
  switch (type) {
    case "ADD-TEST1":
      return { ...state, test1: [...state.test1, payload] };
    case "ADD-TEST2":
      return { ...state, test2: [...state.test2, payload] };
    case "ADD-TEST3":
      return { ...state, test3: [...state.test3, payload] };
    default:
      return state;
  }
};
