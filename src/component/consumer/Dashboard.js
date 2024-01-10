import React from 'react';
import Header from './Header';
import HomeDummy from './restaurant/HomeDummy';
import AllRestaurants from './restaurant/AllRestaurants';
import MainFooter from '../../container/Landing Page/MainFooter';
import LandingUpper from '../../container/Landing Page/LandingUpper';
import { useLocation } from 'react-router-dom';


export default function Dashboard() {
  const { state } = useLocation();

  return (
    <>
      {state && state.isAuth 
        ?
        <>
          <Header />
          <HomeDummy />
          <AllRestaurants />
          <MainFooter />
        </>
        :
        <>
          <Header />
          <LandingUpper isAuth={true} />
        </>
      }
    </>
  )
}
