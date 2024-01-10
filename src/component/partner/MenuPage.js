import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import RestaurantService from "../../services/Restaurant.service";
import MenuCard from "./MenuCard";

const Wrapper = styled.div`
  font-family: sans-serif;
  margin-top: 5%;
  font-size: 14px;
  line-height: 1.2;
  color: #babbbf;

  .thin {
    background: #fafafb;
  }
  .middlePart {
    background: #171a29;

    height: 245px;
    pointer-events: none;
  }
  p {
    margin-bottom: 1px;
    font-weight: bolder;
  }

  img {
    height: 165px;
    margin: 30px 0px 0px 200px;
  }

  h1 {
    margin-top: 12%;
    color: white;
    font-size: 32px;
    font-weight: 300;
  }

  h2 {
    font-size: 32px;
    letter-spacing: -0.3px;
    font-weight: bolder;
    color: #282c3f;
    line-height: 1.2;
    margin-bottom: 0px;
  }

  small {
    color: #686b78;
    margin-top: 0px;
    font-weight: bolder;
  }

  .offers {
    padding: 31px 40px 25px 25px;
  }

  .newOffer {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    background: #171a29;
    z-index: 8;
    display: inline-block;
    padding-right: 10px;
    padding-bottom: 10px;
    position: absolute;
    top: 34px;
    left: 19px;
  }
`;

const Menupages = () => {
  const [data, setData] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    RestaurantService.restaurant()
      .then((res) => {
        let result = res.data.data.filter(
          (i) => i.phNo === localStorage.getItem("phone")
        );
        setData(result[0]);
        RestaurantService.orderList()
          .then((res) => {
            let result1 = res.data.filter(
              (i) => i.restaurant_id === result[0].id
            );
            setOrderData(result1);
          })
          .catch((err) => console.log(err));

        // RestaurantService.DeliveryList()
        //   .then((res) => {
        //     if (
        //       res.data.filter(
        //         (i) =>
        //           i.restaurant_name === result[0].name &&
        //           i.restaurant_accepted === true
        //       ).length !== 0
        //     ) {
        //       debugger;
        //       setDisable(true);
        //     }
        //   })
        //   .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAccept = () => {
    // eslint-disable-next-line no-undef
    let deliveryData = {
      customer_address: orderData[0].CustomerCurrentLoc,
      restaurant_name: data.name,
      restaurant_img: data.img_url,
      restaurant_addr: data.address,
      restaurant_accepted: true,
      agent_accepted: false,
    };
    RestaurantService.delivery(deliveryData)
      .then((res) => {
        toast("Order has been Accepted");
        setDisable(true);
      })
      .catch((err) => console.log(err));
  };

  const handleDecline = () => {
    toast("Order has been Declined");
  };

  return (
    <div>
      {data && (
        <Wrapper>
          <div className="container-fluid middlePart">
            <div className="row">
              <div className="col-4">
                <img src={data.img_url} alt="restaurantImage" />
              </div>
              <div className="col-4 text-left">
                <h1>{data.name}</h1>
                <div className="my-2">{data.city}</div>
                <div className="row mt-3">
                  <div className="col-3">
                    <p>
                      <i className="fas fa-star mr-1"></i>
                      {data.rating}
                    </p>
                    <small>1000+ Ratings</small>
                  </div>
                </div>
              </div>
              <div className="col-4 mt-4">
                <div className="row">
                  <div className="newOffer">OFFER</div>
                  <div
                    className="col-lg-7 ml-4 mt-5 offers"
                    style={{
                      border: "1px solid white",
                      height: "150px",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <p
                          className="text-left ml-2 mt-2"
                          style={{
                            fontSize: "13px",
                            opacity: 0.9,
                            lineHeight: 1.2,
                            fontWeight: 550,
                            color: "#ffffff",
                          }}
                        >
                          50% off up to ₹100 on select items | Use code SPECIALS
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <p
                          className="text-left ml-2 mt-2"
                          style={{
                            fontSize: "13px",
                            opacity: 0.9,
                            lineHeight: 1.2,
                            fontWeight: 550,
                            color: "#ffffff",
                          }}
                        >
                          40% off up to ₹80 + ₹30 PhonePe cashback | Use code
                          SWIGGYIT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      )}
      <div
        className="container-fluid"
        style={{
          overflowX: "hidden",
        }}
      >
        <div className="row ml-5">
          <div
            className="col-8"
            style={{
              maxHeight: "88.9vh",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {data &&
              data.categories.map((elem, index) => (
                <React.Fragment key={index}>
                  <h2
                    className="text-left ml-3 mt-4"
                    style={{
                      marginLeft: "1.4rem !important",
                      color: "#282c3f",
                      fontWeight: "bolder",
                    }}
                  >
                    {elem}
                  </h2>

                  {data.items
                    .filter((item) => item.category === elem)
                    .map((item, index) => (
                      <div className="col pt-1 text-left" key={index}>
                        <MenuCard data={item} index={index} />
                      </div>
                    ))}
                </React.Fragment>
              ))}
          </div>
          <div className="col-3">
            <div className="text-left sticky">
              <h3
                className="text-left ml-3 mt-4"
                style={{
                  marginLeft: "1.4rem !important",
                  color: "#282c3f",
                  fontWeight: "bolder",
                }}
              >
                Order List
              </h3>
              {orderData.map((items) => (
                <>
                  <h6 className="text-muted ml-3">
                    Order Date - {items.orderDate}
                  </h6>
                  <h6 className="text-muted ml-3">
                    Order time - {items.orderTime}
                  </h6>
                  <div
                    className="customCart"
                    style={{
                      width: "300px",
                      maxHeight: "1000px",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      marginTop: "13px",
                      marginBottom: "10px",
                    }}
                  >
                    {items.orderData.map((item) => (
                      <div>
                        <div className="row">
                          <div className="col-6 text-left">
                            <h6 className="mt-3 font-weight-bold mb-0">
                              {item.name}
                            </h6>
                            <small className="text-muted font-weight-normal">
                              Quatity - {item.qty}
                            </small>
                          </div>
                          <div className="col-4 mt-3 text-right mr-2">
                            <b>{item.veg}</b>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ))}
              <div className="row pt-3">
                {!disable ? (
                  <>
                    <div className="col">
                      <button
                        className="btn btn-block btn-lg btn-success"
                        style={{ borderRadius: "0px" }}
                        onClick={handleAccept}
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
                  </>
                ) : (
                  <div className="col">
                    <button
                      className="btn btn-block btn-lg btn-secondary"
                      style={{ borderRadius: "0px" }}
                      onClick={handleDecline}
                    >
                      <h6 className="mt-2">Accepted</h6>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Menupages;
