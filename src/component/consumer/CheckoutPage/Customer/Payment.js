import React from "react";
import styled from "styled-components";
import { InputAdornment, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../../../../services/Restaurant.service";

const Wrapper = styled.div`
  font-family: system-ui !important;
  line-height: 1.2;
  background: #fff;
  margin-bottom: 20px;
  padding-top: 35px;
  padding-bottom: 39px;
  div {
    // border: 1px solid red;
  }
`;

const Logo = styled.div`
  left: -35px;
  width: 0px;
  height: 0px;
  background-color: #282c3f;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
  top: -10px;
  padding: 0px !important;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  color: #282c3f;
`;

const Wallet = styled.img`
  height: 50px;
  width: 50px;
  vertical-align: inherit;
  margin-radius: 0px;
  box-shadow: 0 3px 5px 0 rgba(40, 44, 63, 0.4);
`;

const WarningText = styled.p`
  font-size: 13px;
  color: #93959f;
  margin-bottom: 8px;
  font-weight: 300;
  line-height: 16px;
  overflow: hidden;
  border: 1px dashed #60b246;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

function Payment() {
  const history = useNavigate();

  const confirmOrder = () => {
    let restaurantData = JSON.parse(localStorage.getItem("hotel"));
    let orderData = JSON.parse(localStorage.getItem("order"));
    let CustomerCurrentLoc = JSON.parse(
      localStorage.getItem("CustomerCurrentLoc")
    );
    var today = new Date();

    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    var time = today.getHours() + ":" + today.getMinutes();

    let data = {
      orderTime: time,
      orderDate: date,
      restaurant_id:restaurantData.id,
      CustomerCurrentLoc,
      orderData: orderData,
    };

    RestaurantService.order(data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    history("/confirmation");
  };

  return (
    <Wrapper className="container">
      <div className="row">
        <Logo className="col-1">
          <Wallet src="Icons/wallet.svg" alt="placeholder" />
        </Logo>
        <div className="col-11">
          <div className="row row-cols-1">
            <div className="col">
              <Title>Payment</Title>
            </div>
            <div className="col">
              <TextField
                id="input-with-icon-textfield"
                label="Amount"
                className="col-8 mt-2"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fa fa-rupee" aria-hidden="true"></i>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="col-8 btn btn-outline-success text-uppercase mt-2"
                style={{
                  borderRadius: "0px",
                }}
                onClick={confirmOrder}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Payment;
