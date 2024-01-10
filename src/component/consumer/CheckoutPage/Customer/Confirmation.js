import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const history = useNavigate();

  setTimeout(() => {
    history("/restaurants");
  }, 3000);

  return (
    <div>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <img
            src="https://entrackr.com/storage/2018/12/swiggy.jpg"
            alt="swiggy"
            style={{ width: "90%" }}
          />
          <div>
            <h2
              className="text-success"
              style={{
                fontFamily: "sans-serif",
                fontSize: "50px",
              }}
            >
              ORDER HAS BEEN PLACED
            </h2>
          </div>
          <img
            src="https://www.freeiconspng.com/thumbs/checkmark-png/checkmark-png-5.png"
            alt="CheckMark"
            style={{
              width: "80px",
              marginTop: "40px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
