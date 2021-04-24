import React from "react";
import "./styles.css";
import { useEffect, useState } from "react";

const axios = require("axios").default;

// 'https://randomuser.me/api/'

const fetchRandomData = (pageNumber = 1) => {
  return axios
    .get("https://randomuser.me/api?page=${pageNumber}")
    .then(({ data }) => {
      return data;
    });
};

const getFullUserName = (userInfo) => {
  return userInfo.name.first;
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [randomUserDataJson, setRandomUserDataJas0n] = useState("");
  const [userInfos, setUserInfos] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = () => {
    fetchRandomData().then((responseData) => {
      setRandomUserDataJas0n(
        JSON.stringify(responseData, null, 2) || "no user data"
      );
      setCounter(counter + 1);
      setUserInfos([...userInfos, ...responseData.results]);
      setNextPageNumber(responseData.info.page + 1);
    });
  };

  return (
    <div className="App">
      <h1>Total fetched Users</h1>
      <h1>{counter}</h1>

      <button onClick={fetchNextUser}> Fetch Next User </button>

      {userInfos.map((userInfo, idx) => (
        <div key={idx}>
          <p> {getFullUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail} alt="{userInfo.name.first}" />
        </div>
      ))}
    </div>
  );
}
