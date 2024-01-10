import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import RegisterDrawer from "./RegisterDrawer";
import { useRef } from "react";
import { useImperativeHandle } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../../services/Auth.service";

const Div = styled.div`
  font-family: sans-serif;
`;

const useStyles = makeStyles({
  list: {
    width: 450,
  },
  fullList: {
    width: "auto",
  },
});

const LoginDrawer = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState({});
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });
  const [loginData, setLoginData] = useState({
    phoneNumber: "",
    role: "customer",
  });
  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    openLogin() {
      setState({ ...state, right: true });
    }
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    switch (name) {
      case "phoneNumber":
        if (value.length != 10) setValidated({ phNo: "invalid" });
        else {
          delete validated.phNo;
        }
        break;
      default:
        break;
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const submit = (e) => {
    e.preventDefault();
    AuthService.login()
      .then((res) => {
        debugger
        let userData = res.data.filter(
          (i) => i.phNo === loginData.phoneNumber && i.role === loginData.role
        );
        if (userData.length !== 0) {
          localStorage.setItem("email", userData[0].email);
          localStorage.setItem("name", userData[0].name);
          localStorage.setItem("phone", userData[0].phNo);
          localStorage.setItem("jwt-token", "test");
          localStorage.setItem("role", userData[0].role);

          if (localStorage.getItem('order')) {
            navigate('/checkout')
          }
          else {
            if (userData[0].role == "customer") {
              navigate("/restaurants");
            } else if (userData[0].role == "partner") {
              navigate("/partner-dashboard");
            } else {
              navigate("/delivery-dashboard");
            }
          }
        } else {
          toast.error("Please login with valid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      style={{ right: 0 }}
      role="presentation"
    >
      <Div className="container mt-3" style={{ width: "90%" }}>
        <Div className="row">
          <Div className="col text-left">
            <button
              type="button"
              className="btn btn-sm"
              onClick={toggleDrawer(anchor, false)}
            >
              <i className="fas fa-times fa-lg"></i>
            </button>
            <div className="container mt-2">
              <div className="row">
                <div className="col-lg-5 ml-3">
                  <h3>Login</h3>
                  <small>
                    or{" "}
                    <b style={{ color: "#fc8019" }} onClick={() => childRef.current.openSignup()}>
                      create an account
                    </b>
                    <RegisterDrawer openFromLogin={true} ref={childRef} />
                  </small>
                </div>
                <div className="col-lg-5 ml-4">
                  <img
                    className="img-fluid"
                    style={{
                      width: "105px",
                      height: "100px",
                      borderRadius: "50%",
                      fload: "right",
                    }}
                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                    alt="logo of wrap"
                  />
                </div>
              </div>
            </div>
            <form onSubmit={submit} style={{ marginTop: "10%" }}>
              <div className="col-lg-12 ml-2" style={{ marginTop: "2%" }}>
                <b>Please select your role:</b>
                <div
                  style={{
                    display: "flex",
                    marginTop: "8%",
                    marginBottom: "15%",
                  }}
                >
                  <div className="form-check" style={{ paddingRight: "10px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value={"customer"}
                      id="flexRadioDefault1"
                      onChange={handleChange}
                      checked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Customer
                    </label>
                  </div>
                  <div className="form-check" style={{ paddingRight: "10px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value={"partner"}
                      id="flexRadioDefault2"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Partner
                    </label>
                  </div>
                  <div className="form-check" style={{ paddingRight: "10px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value={"agent"}
                      id="flexRadioDefault3"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      Delivery Agent
                    </label>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-3">
                <div className="row">
                  <div className="col-lg-12">
                    <TextField
                      id="outlined-textarea"
                      label="Phone Number"
                      name="phoneNumber"
                      error={validated.phNo}
                      placeholder=""
                      fullWidth
                      variant="outlined"
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="button"
                    style={{
                      background: "#fc8019",
                      border: "1px solid #fc8019",
                      color: "white",
                      marginTop: "15px",
                      width: "345px",
                      borderRadius: "2%",
                      marginLeft: "15px",
                    }}
                    onClick={submit}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        marginTop: "9px",
                      }}
                    >
                      {"LOGIN"}
                    </p>
                  </button>
                </div>
              </div>
            </form>
          </Div>
        </Div>
      </Div>
    </div>
  );

  return (
    <>
      {!props.openFromSignup ?

        <button
          type="button"
          className=" btn btn-lg align-self-center font-weight-bold"
          onClick={toggleDrawer("right", true)}
        >
          {"Login"}
        </button>
        :
        null
      }
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
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
    </>
  );
})

export default LoginDrawer;