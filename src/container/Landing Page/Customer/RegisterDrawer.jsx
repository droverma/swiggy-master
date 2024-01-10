import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import LoginDrawer from './LoginDrawer';
import { useRef } from 'react';
import AuthService from '../../../services/Auth.service';

const nameExpresion = RegExp(/^[a-zA-Z ]+$/);
const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

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

const RegisterDrawer = forwardRef((props, ref) => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState({});
  const classes = useStyles();

  const [registerData, setRegisterData] = useState({
    phNo: "",
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [state, setState] = React.useState({
    bottom: false,
  });
  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    openSignup() {
      setState({ ...state, right: true });
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    switch (name) {
      case "email":
        if (!emailExpresion.test(value)) setValidated({ email: "invalid" });
        else {
          delete validated.email;
        }
        break;
      case "password":
        if (value.length < 6) setValidated({ pass: "invalid" });
        else {
          delete validated.pass;
        }
        break;
      case "name":
        if (!nameExpresion.test(value)) setValidated({ name: "invalid" });
        else {
          delete validated.name;
        }
        break;
      case "phNo":
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
    AuthService.register(registerData)
      .then((res) => {
        
        // if (registerData.phNo !== res.data.phNo) {
        localStorage.setItem('jwt-token', "test");
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('role', res.data.role)
        localStorage.setItem("phone", res.data.phNo);
        if (res.data.role == "customer") {
          navigate('/restaurants');
        }
        else if (res.data.role == "partner") {
          navigate('/partner-dashboard');
        }
        else {
          navigate('/delivery-dashboard');
        }
        // }
        // else
        //   console.error('Already have an account, Please try again')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      style={{ right: 0 }}
      role='presentation'
    >
      <Div className='container mt-3' style={{ width: '90%' }}>
        <Div className='row'>
          <Div className='col text-left'>
            <button
              type='button'
              className='btn btn-sm'
              onClick={toggleDrawer(anchor, false)}
            >
              <i className='fas fa-times fa-lg'></i>
            </button>
            <div className='container mt-2'>
              <div className='row'>
                <div className='col-lg-6 ml-3'>
                  <h3>Sign up</h3>
                  <small>
                    or{' '}
                    <b style={{ color: '#fc8019' }} onClick={() => childRef.current.openLogin()}>
                      login to your account
                    </b>
                    <LoginDrawer openFromSignup={true} ref={childRef} />

                  </small>
                </div>
                <div className='col-lg-4 ml-3'>
                  <img
                    className='img-fluid'
                    style={{
                      width: '105px',
                      height: '100px',
                      borderRadius: '50%',
                      fload: 'right',
                    }}
                    src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'
                    alt='logo of wrap'
                  />
                </div>
              </div>
              <form onSubmit={submit}>
                <div>
                  <p>Please select your role:</p>
                  <div style={{ display: "flex" }}>
                    <div className="form-check" style={{ paddingRight: "10px" }}>
                      <input className="form-check-input" type="radio" name="role" value={'customer'} id="flexRadioDefault1" onChange={handleChange} checked />
                      <label className="form-check-label" htmlFor="flexRadioDefault1" >
                        Customer
                      </label>
                    </div>
                    <div className="form-check" style={{ paddingRight: "10px" }}>
                      <input className="form-check-input" type="radio" name="role" value={'partner'} id="flexRadioDefault2" onChange={handleChange} />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Partner
                      </label>
                    </div>
                    <div className="form-check" style={{ paddingRight: "10px" }}>
                      <input className="form-check-input" type="radio" name="role" value={'agent'} id="flexRadioDefault3" onChange={handleChange} />
                      <label className="form-check-label" htmlFor="flexRadioDefault3">
                        Delivery Agent
                      </label>
                    </div>
                  </div>
                </div>

                <div className='container-fluid mt-3'>
                  <div className='row'>
                    <div className='col-lg-12' style={{ marginBottom: "5%" }}>
                      <TextField
                        label='Phone Number'
                        name='phNo'
                        required
                        error={validated.phNo}
                        placeholder=''
                        fullWidth
                        variant='outlined'
                        style={{
                          marginLeft: '0px',
                          borderRadius: '0px',
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-12' style={{ marginBottom: "5%" }}>
                      <TextField
                        label='Name'
                        name='name'
                        required
                        error={validated.name}
                        placeholder=''
                        fullWidth
                        variant='outlined'
                        style={{
                          marginLeft: '0px',
                          borderRadius: '0px',
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-12' style={{ marginBottom: "5%" }}>
                      <TextField
                        label='Email'
                        name='email'
                        required
                        error={validated.email}
                        placeholder=''
                        fullWidth
                        variant='outlined'
                        style={{
                          marginLeft: '0px',
                          borderRadius: '0px',
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-12' style={{ marginBottom: "5%" }}>
                      <TextField
                        label='Password'
                        name='password'
                        required
                        error={validated.pass}
                        type={'password'}
                        placeholder=''
                        fullWidth
                        variant='outlined'
                        style={{
                          marginLeft: '0px',
                          borderRadius: '0px',
                        }}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type='submit'
                      style={{
                        background: '#fc8019',
                        border: '1px solid #fc8019',
                        color: 'white',
                        marginTop: '15px',
                        width: '318px',
                        borderRadius: '2%',
                        marginLeft: '15px'
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 'bold',
                          marginTop: '9px',
                        }}
                      >
                        {'Sign Up'}
                      </p>
                    </button>
                    {/* <div className='col-lg-12 text-center'>
                                        <OtpDrawer
                                            phoneNumber={phNo}
                                            name={name}
                                            email={email}
                                            password={password}
                                            setState={setState}
                                            state={state}
                                        />
                                    </div> */}
                    <div>
                      <small
                        style={{
                          fontSize: '9px',
                          fontWeight: 'bold',
                        }}
                        className='text-muted mx-3'
                      >
                        By creating an account, I accept the{' '}
                        <small
                          style={{
                            color: '#5d8ed5',
                            fontSize: '9px',
                            fontWeight: 'bold',
                          }}
                        >
                          Terms & Conditions
                        </small>
                      </small>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Div>
        </Div>
      </Div>
    </div>
  );

  return (
    <div>
      {!props.openFromLogin ?
        <button
          type='button'
          className=' btn btn-lg align-self-center font-weight-bold'
          onClick={toggleDrawer('right', true)}
          style={{
            borderRadius: '0px',
            color: 'white',
            backgroundColor: 'black',
          }}
        >
          {'Sign up'}
        </button>
        :
        null
      }
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  );
})
export default RegisterDrawer;
