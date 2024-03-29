import React, { useEffect, useRef, useState } from "react";
import Promotions from "./Promotions";
import styled from "styled-components";
import HotelCard from "./HotelCard";
import MoreCard from "./MoreCard";
import { Link } from "react-scroll";
import RestaurantService from "../../../services/Restaurant.service";
var axios = require("axios");

const Wrapper = styled.div`
  color: #535665;
  font-family: sans-serif;

  p {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 1px;
  }

  small {
    color: "light grey";
    font-size: 10px;
    opacity: 0.8;
    text-transform: uppercase;
    margin-top: 1px;
    font-weight: 300;
  }

  .item {
    padding-left: 25px;
    padding-top: 15px;
    padding-bottom: 15px;

    &:hover {
      color: #e46d47;
    }
  }

  .topHeader {
    margin-top: 1px;
    position: sticky;
    top: 90px;
  }

  .active {
    background: #e46d47;
    margin-right: 15px;
    color: #fff;
    &:hover {
      color: #fff !important;
    }
  }

  .content {
    p {
      margin: 0;
      margin-top: 0.5rem;
      line-height: 1.2;
    }
    small {
      margin: 0;
    }
  }

  .img-wrap {
    img {
      width: 40px;
      border: 1px solid #e26d4d;
      border-radius: 50%;
    }

    &:hover img {
      transform: scale(1.2);
    }
  }
`;

const Section = styled.div`
  // border: 1px solid red;
  margin-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #bebfc5;
`;

const Title = styled.p`
  // border: 1px solid black;
  font-size: 28px !important;
  font-weight: 600;
  color: #282c3f;
  line-height: 1.2;
  margin-left: 12px;
`;

function HomeDummy() {
  const [topPicks, setTopPicks] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [premium, setPremium] = useState([]);
  const [veg, setVeg] = useState([]);

  const [totalTopPicks, setTotalTopPicks] = useState([]);
  const [totalExclusive, setTotalExclusive] = useState([]);
  const [totalPremium, setTotalPremium] = useState([]);
  const [totalVeg, setTotalVeg] = useState([]);

  const [restaurant, setRestaurant] = useState([]);

  const getData = () => {
    RestaurantService.restaurant().then((res) => {
      let city = JSON.parse(localStorage.getItem("Coordinates"));
      let citydata = res.data.data.filter((i) => i.city === city.area);
      setTopPicks(citydata.filter((i) => i.top_pick === true))
      setTotalTopPicks(citydata.filter((i) => i.top_pick === true).length)
      setExclusive(citydata.filter((i) => i.exclusive === true))
      setTotalExclusive(citydata.filter((i) => i.exclusive === true).length)
      setPremium(citydata.filter((i) => i.newly_added === true))
      setTotalPremium(citydata.filter((i) => i.newly_added === true).length)
      setVeg(citydata.filter((i) => i.veg === true))
      setTotalVeg(citydata.filter((i) => i.veg === true).length)
     
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Promotions />
      <div className="container">
        <Wrapper>
          <div className="row">
            <div className="col-3">
              <div className="border-left border-right border-bottom shadow topHeader pt-5">
                <div className="item" activeclass="active">
                  <div className="row" id="list">
                    <div className="col-3 img-wrap nohover">
                      <img
                        src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/rng/md/carousel/production/vt13uzhjrg5r49kh9oru"
                        alt="Img1"
                      />
                    </div>
                    <div className="col-9 text-left content">
                      <p>
                        <Link to="topPicks" spy={true} smooth={true}>
                          Top-Picks
                        </Link>
                      </p>
                      <small>{totalTopPicks} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-3 text-center img-wrap">
                      <img
                        src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/hxizld3pqhnk0smw27sl"
                        alt="Img"
                      />
                    </div>
                    <div className="col-9 text-left content">
                      <p>
                        <Link to="exclusive" spy={true} smooth={true}>
                          Exclusive
                        </Link>
                      </p>
                      <small>{totalExclusive} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className="item ">
                  <div className="row">
                    <div className="col-3 text-right img-wrap">
                      <img
                        src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/marketing-dashboard/carousel/ftnsdmo6fotidtzobbm2"
                        alt="Img"
                      />
                    </div>
                    <div className="col-9 text-left content">
                      <p>
                        <Link to="premium" spy={true} smooth={true}>
                          Premium
                        </Link>
                      </p>
                      <small>{totalPremium} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-3 text-center img-wrap">
                      <img
                        src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/qtjc8dzfexg72lug37a0"
                        alt="Img"
                      />
                    </div>
                    <div className="col-9 text-left content">
                      <p>
                        <Link to="vegOnly" spy={true} smooth={true}>
                          Veg Only
                        </Link>
                      </p>
                      <small>{totalVeg} OPTIONS</small>
                    </div>
                  </div>
                </div>
                <div className="item" href="allItems">
                  <div className="row">
                    <div className="col-3 text-center img-wrap ">
                      <img
                        src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_90,h_90/See_all_cj8kln"
                        alt="Img"
                      />
                    </div>
                    <div className="col-9 text-left  mb-5 content">
                      <p>SEE ALL</p>
                      <small>RESTAURANTS</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-9"
              data-spy="scroll"
              data-target="#list"
              data-offset="0"
            >
              <div id="topPicks">
                <Section className="row">
                  <Title>Top Picks</Title>
                  <div className="row row-cols-3" id="topPicks">
                    {topPicks.slice(0, 5).map((item, index) => (
                      <HotelCard data={item} key={index} myKey={index} />
                    ))}
                    {totalTopPicks > 5 ? (
                      <MoreCard filter={"top_pick"} more={totalTopPicks - 5} />
                    ) : null}
                  </div>
                </Section>
              </div>
              <Section className="row" id="exclusive">
                <Title>Exclusive</Title>
                <div className="row row-cols-3" id="Exclusive">
                  {exclusive.slice(0, 5).map((item, index) => (
                    <HotelCard data={item} key={index} myKey={index} />
                  ))}
                  {totalExclusive > 5 ? (
                    <MoreCard filter={"exclusive"} more={totalExclusive - 5} />
                  ) : null}
                </div>
              </Section>
              <Section className="row" id="premium">
                <Title>Premium</Title>
                <div className="row row-cols-3" id="Premium">
                  {premium.slice(0, 5).map((item, index) => (
                    <HotelCard data={item} key={index} myKey={index} />
                  ))}
                  {totalPremium > 5 ? (
                    <MoreCard filter={"newly_added"} more={totalPremium - 5} />
                  ) : null}
                </div>
              </Section>
              <Section className="row" id="vegOnly">
                <Title>Veg Only</Title>
                <div className="row row-cols-3" id="vegOnly">
                  {veg.slice(0, 5).map((item, index) => (
                    <HotelCard data={item} key={index} myKey={index} />
                  ))}
                  {totalVeg > 5 ? (
                    <MoreCard filter={"veg"} more={totalVeg - 5} />
                  ) : null}
                </div>
              </Section>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}

export default HomeDummy;
