import React from "react";
import { useDispatch, useSelector } from "react-redux"
import Test3 from "./test3"

const Test2 = () => {
  const test = useSelector((state) => state.test2)
  const dispatch = useDispatch()
  return (
    <div>
      {test.map((name, i) => (
        <div key={i}>{name}</div>
      ))}
      {console.log("Test2")}
      <button
        onClick={() =>
          dispatch({
            type: "ADD-TEST2",
            payload: "Test2"
          })
        }
      >
        Add Name
      </button>
      <Test3 />
    </div>
  );
};

export default React.memo(Test2);

