import React, { useState, useEffect } from 'react';
import CheckoutNavigator from './CheckoutNavigator';
import styled from 'styled-components';
import Address from './Customer/Address';
import Payment from './Customer/Payment';
import Orders from './Customer/Orders';
import MainFooter from '../../../container/Landing Page/MainFooter';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
    overflow: hidden;
    font-family: sans-serif;
    min-height: 100%;
    background: #e9ecee;
    margin-top: 5.2%;
    padding-bottom: 10%;
    font-size: 14px;
    line-height: 1.2;
    min-height: 100%;
    div {
        // border: 1px solid red;
    }
`;

const CheckoutPage = () => {

    const { state } = useLocation();
    const [isAddrSelected, setIsAddrSelected] = useState(false);

    useEffect(() => {
        setIsAddrSelected(state || false);
    }, [state]);

    return (
        <>
            <CheckoutNavigator />
            <Wrapper className='container-fluid'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='row row-cols-1 text-left'>
                                <div className='col'>
                                    <Address flag={isAddrSelected} addr={JSON.parse(localStorage.getItem('CustomerCurrentLoc'))} />
                                </div>
                                {isAddrSelected ? (
                                    <div className='col'>
                                        <Payment />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                        <div className='col-4'>
                            <Orders />
                        </div>
                    </div>
                </div>
            </Wrapper>
            <MainFooter />
        </>
    );
};
export default CheckoutPage;
