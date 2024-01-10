import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import RestaurantService from "../../services/Restaurant.service";

const Div = styled.div`
  font-family: sans-serif !important;
  overflow: hidden;
  border: 0;
  width: 18.2rem !important;
  border: 1px solid white;
  border-radius: 0px;
  div > span {
    margin-right: 12px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #d3d5df;
    box-shadow: 0 4px 7px 0 rgba(218, 220, 230, 0.6);
  }
`;

const Tag = styled.p`
  font-weight: 300 !important;
  color: #686b78;
  font-size: 13px !important;
  margin-top: 3px !important;
`;

const Badge = styled.span`
  fontsize: 14px;
  padding: 5px;
  border-radius: 0px;
  background-color: ${(props) => {
    if (props.rating < 4) {
      return "#db7c38";
    } else {
      return "none";
    }
  }};
`;

const QuickView = styled.div`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Discount = styled.p`
  font-size: 14px !important;
  line-height: 1.2 !important;
  font-weight: 400 !important;
  color: #8a584b;
  margin-top: 15px;
`;

const Wrapper = styled.div`
  font-family: ProximaNova, Arial, Helvetica Neue, sans-serif;
  letter-spacing: 0;
  background: #35728a;
  min-height: calc(100vh - 368px);
  // overflow-x: hidden;
  // overflow-y: auto;
  position: relative;
  z-index: 2;
  padding-bottom: 60px;
  div {
    // border: 1px solid red;
  }

  h4 {
    text-transform: capitalize;
  }
`;
const Title = styled.div`
  // border: 1px solid red;
  height: 190px;
  background: inherit;
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  margin: auto;
  margin-top: 80px;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: left;
  text-transform: capitalize;
  cursor: pointer;
  contain: strict;
`;

export default function DeliveryCard() {
  const [deliveryData, setDeliveryData] = useState([]);

  useEffect(() => {
    RestaurantService.DeliveryList()
      .then((res) => {
        setDeliveryData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAccept = (data1) => {
    let data = {
      customer_address: data1.customer_address,
      restaurant_name: data1.restaurant_name,
      restaurant_img: data1.restaurant_img,
      restaurant_addr: data1.restaurant_addr,
      restaurant_accepted: data1.restaurant_accepted,
      agent_accepted: true,
    };
    RestaurantService.updateDelivery(data, data1.id)
      .then((res) => {
        if (res.data)
          RestaurantService.DeliveryList()
            .then((res) => {
              setDeliveryData(res.data);
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    toast("Order has been Accepted");
  };
  const handleDecline = () => {
    toast("Order has been Declined");
  };

  return (
    <>
      <Wrapper>
        <div className="container-fluid" style={{ width: "90%" }}>
          <div className="row row-cols-1">
            <Title className="col row-cols-1">
              <div className="row">
                <div className="col text-left">Delivery Agent</div>
                <div className="w-100"></div>
                <h4 className="col text-left">
                  You can accept or decline the restaurant request
                </h4>
              </div>
            </Title>
            <div className="row row-cols-4">
              {deliveryData.map((data) => (
                <div className="col">
                  <Wrapper>
                    <div className="row row-cols-4">
                      <div className="col">
                        <Div className="card mb-2 btn">
                          <img
                            className="card-img-top align-self-center mt-3 "
                            src={data.restaurant_img}
                            alt="Restaurant Img"
                            style={{
                              width: "90%",
                              borderRadius: "0px",
                            }}
                          />
                          <div className="card-body text-left">
                            <h5
                              className="card-title"
                              style={{ color: "#171a29" }}
                            >
                              {data.restaurant_name}
                              <br />
                              <Tag>{data.restaurant_addr}</Tag>
                            </h5>
                            <div
                              className="card-text font-weight-normal"
                              style={{ fontSize: "12px" }}
                            >
                              <div className="dropdown-divider"></div>
                              <Discount className="font-weight-normal">
                                <h4>Customer Details</h4>
                                <h6> {data.customer_address.fname} </h6>
                                <h6> {data.customer_address.address}</h6>
                              </Discount>
                            </div>
                            {!data.agent_accepted ? (
                              <div className="row pt-3">
                                <div className="col">
                                  <button
                                    className="btn btn-block btn-lg btn-success"
                                    style={{ borderRadius: "0px" }}
                                    onClick={() => handleAccept(data)}
                                  >
                                    <h6 className="mt-2">Accept</h6>
                                  </button>
                                </div>
                                <div className="col">
                                  <button
                                    className="btn btn-block btn-lg btn-danger"
                                    style={{ borderRadius: "0px" }}
                                    onClick={handleDecline}
                                  >
                                    <h6 className="mt-2">Decline</h6>
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </Div>
                      </div>
                    </div>
                  </Wrapper>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
