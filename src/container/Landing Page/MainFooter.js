import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    overflow: hidden;
    ul {
        list-style: none;
    }
    ul > li {
        margin-bottom: 15px;
        text-align: left;
        color: white;
    }
`;

function MainFooter() {
    return (
        <Header>
            <div
                className='container-fluid'
                style={{
                    background: 'black',
                    textAlign: 'left',
                    fontFamily: 'sans-serif',
                }}
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <div>
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <li style={{ marginTop: '35%' }}>
                                        <b className='text-muted'>COMPANY</b>
                                    </li>
                                    <li>About Us</li>
                                   
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div>
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        padding: '10px',
                                        color: 'white',
                                    }}
                                >
                                    <li style={{ marginTop: '28%' }}>
                                        <b className='text-muted'>CONTACT</b>
                                    </li>
                                    <li>Help & Support</li>
                                    <li>Partner with Us</li>
                                    <li>Ride with us</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div>
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        padding: '10px',
                                        color: 'white',
                                    }}
                                >
                                    <li style={{ marginTop: '28%' }}>
                                        <b className='text-muted'>LEGAL</b>
                                    </li>
                                    <li>Terms & Conditions</li>
                                    <li>Refund & Cancellation</li>
                                    <li>Privacy Policy</li>
                                    
                                </ul>
                            </div>
                        </div>
                       
                        <div
                            style={{
                                borderBottom: '1px solid grey',
                                width: '100%',
                                marginLeft: '3%',
                                marginTop: '3%',
                            }}
                        ></div>
                    </div>
                </div>
               
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-2 mt-5'>
                            <img
                                src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza'
                                alt='Swaggy'
                                className='img-fluid ml-4 mb-5'
                            />
                        </div>
                        <div className='col-lg-5 text-right mt-5 text-white'>
                            <h5 className='mt-2'>
                                <span>&#169;</span> 2022 Swiggy{' '}
                            </h5>
                        </div>
                        <div className='col-lg-5'>
                            <div className='row'>
                                <div
                                    className='col-lg-12 mt-5'
                                    style={{
                                        float: 'right',
                                        marginLeft: '65%',
                                    }}
                                >
                                    <img
                                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-facebook_tfqsuc'
                                        alt='facebook'
                                        style={{
                                            width: '25px',
                                            marginRight: '18px',
                                        }}
                                    />
                                    <img
                                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-pinterest_kmz2wd'
                                        alt='Instagram'
                                        style={{
                                            width: '25px',

                                            marginRight: '18px',
                                        }}
                                    />
                                    <img
                                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-instagram_b7nubh'
                                        alt='pinterest'
                                        style={{
                                            width: '25px',
                                            marginRight: '18px',
                                        }}
                                    />
                                    <img
                                        src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-twitter_gtq8dv'
                                        alt='twitter'
                                        style={{
                                            width: '25px',
                                            marginRight: '18px',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default MainFooter;
