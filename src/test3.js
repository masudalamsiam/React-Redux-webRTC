import React from "react";
import { useDispatch, useSelector } from "react-redux"

const Test3 = () => {
  const test = useSelector(state => state.test3)
  const dispatch = useDispatch()
  return (
    <div>
      {test.map((name, i) => (
        <div key={i}>{name}</div>
      ))}
      {console.log("Test3")}
      <button
        onClick={() =>
          dispatch({
            type: "ADD-TEST3",
            payload: "Test3"
          })
        }
      >
        Add Name
      </button>
    </div>
  );
};

export default React.memo(Test3);


// import React from "react";
// import { connect } from "react-redux";

// const Test3 = ({ test, dispatch }) => {
//   return (
//     <div>
//       {test.map((name, i) => (
//         <div key={i}>{name}</div>
//       ))}
//       {console.log("Test3")}
//       <button
//         onClick={() =>
//           dispatch({
//             type: "ADD-TEST3",
//             payload: "Test3"
//           })
//         }
//       >
//         Add Name
//       </button>
//     </div>
//   );
// };

// const mapStateToItemProps = (state) => {
//   return {
//     test: state.test3
//   }
// }

// export default connect(mapStateToItemProps)(Test3);

