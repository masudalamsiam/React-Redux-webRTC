import React from "react";
import { useDispatch, useSelector } from "react-redux"

const Test1 = () => {
  const test = useSelector(state => state.test1)
  const dispatch = useDispatch()
  return (
    <div>
      {test.map((name, i) => (
        <div key={i}>{name}</div>
      ))}
      {console.log("Test1")}
      <button
        onClick={() =>
          dispatch({
            type: "ADD-TEST1",
            payload: "Test1"
          })
        }
      >
        Add Name
      </button>
    </div>
  );
};

export default React.memo(Test1);
