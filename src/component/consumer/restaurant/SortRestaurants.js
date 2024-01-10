import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RestaurantService from "../../../services/Restaurant.service";
import HotelCard from "./HotelCard";

const Wrapper = styled.div`
  color: #171a29;
  // border: 1px solid black;
  font-family: sans-serif;

  h3 {
    margin: 0px 0px 10px 0px;
    font-weight: bolder;
  }

  .big-box {
    padding: 40px 0px 25px 0px;
  }

  .list-inline-item {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.2;
    color: #686b78;
    cursor: pointer;
    border-radius: 0px;
    &:hover {
      border-bottom: 1px solid black;
    }
  }

  .filter {
    color: black;
  }

  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
`;

const Equal = styled.img`
  width: 34px;
  height: 34px;
  border: 1px solid transparent;
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
  margin-left: 2px;
  box-shadow: 0 1px 4px 0 rgba(40, 44, 63, 0.4);
`;

const SortRestaurants = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    RestaurantService.restaurant()
      .then((res) => {
        let city = JSON.parse(localStorage.getItem("Coordinates"));
        let citydata = res.data.data.filter((i) => i.city === city.area);
        setData(citydata);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <Wrapper>
      <div className="row row-cols-4">
        {data.map((item, index) => (
          <HotelCard data={item} key={index} myKey={index} />
        ))}
      </div>
    </Wrapper>
  );
};

export default SortRestaurants;
