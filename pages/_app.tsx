import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Nav = styled.nav`
  display: flex;
  padding: 1rem;
  background-color: #241e92;

  div {
    color: #fff;
    font-size: 1.6rem;
    margin: 0 1rem;
    cursor: pointer;
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

interface Hotel {
  hotel_id: number;
  hotel_name_trans: string;
  max_1440_photo_url: string;
  review_score: number;
  review_score_word: string;
  review_nr: number;
  price_breakdown: {
    gross_price: string;
  };
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  const [hotelList, setHotelList] = useState<Hotel[]>();
  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };
  const params = { name: search, locale: "ko" };

  const getHotelList = async (des: any) => {
    const body = {
      dest_id: des.dest_id,
      dest_type: des.dest_type,
      adults_number: "2",
      checkin_date: "2023-07-15",
      checkout_date: "2023-07-16",
      order_by: "class_descending",
      filter_by_currency: "KRW",
      room_number: "1",
      units: "metric",
      locale: "ko",
      children_ages: "5,0",
      categories_filter_ids: "class::2,class::4,free_cancellation::1",
      page_number: "0",
      include_adjacency: "true",
      children_number: "2",
    };
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/search",
      {
        params: body,
        headers: headers,
      }
    );
    setHotelList(res.data.result);
  };

  const searchLocation = async () => {
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      {
        params: params,
        headers: headers,
      }
    );
    const des = {
      dest_id: res.data[0].dest_id,
      dest_type: res.data[0].dest_type,
    };
    router.pathname !== "/" && router.push("/");
    getHotelList(des);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Nav>
        <div onClick={() => router.push("/")}>Woochans.com</div>
        <input
          style={{ width: "18rem" }}
          type="text"
          placeholder="목적지"
          onChange={handleChange}
        />
        <input style={{ width: "12rem" }} type="text" placeholder="날짜" />
        <input style={{ width: "12rem" }} type="text" placeholder="인원수" />
        <button onClick={searchLocation}>검색</button>
      </Nav>
      <Component {...pageProps} hotelList={hotelList} />
    </>
  );
}
