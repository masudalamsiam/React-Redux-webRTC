import { createStore } from "redux";
import reducer from "./reducer"

export default createStore(reducer, {
  test1: ["Test1"],
  test2: ["Test2"],
  test3: ["Test3"]
})