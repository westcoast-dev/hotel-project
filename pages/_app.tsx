import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";

const Nav = styled.nav`
  display: flex;
  padding: 1rem;
  background-color: #241e92;

  div {
    color: #fff;
    font-size: 1.6rem;
    margin: 0 1rem;
  }
  input {
    font-size: 1rem;
    margin: 0 0.2rem;
    padding: 0.6rem;
    border: none;
    border-radius: 8px;
  }
  input::placeholder {
    padding-left: 0.3rem;
    color: #20263a;
  }
  button {
    background-color: #7b6cf6;
    margin: 0 0.8rem;
    border: none;
    border-radius: 1.5rem;
    padding: 0.4rem 1.8rem;
    color: #fff;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState<string>();
  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };
  const params = { name: search, locale: "ko" };

  const searchLocation = async () => {
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      {
        params: params,
        headers: headers,
      }
    );
    console.log(res.data);
  };
  useEffect(() => {
    if (search) searchLocation();
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Nav>
        <div>Woochans.com</div>
        <input
          style={{ width: "18rem" }}
          type="text"
          placeholder="목적지"
          onChange={handleChange}
        />
        <input style={{ width: "12rem" }} type="text" placeholder="날짜" />
        <input style={{ width: "12rem" }} type="text" placeholder="인원수" />
        <button>검색</button>
      </Nav>
      <Component {...pageProps} />
    </>
  );
}
