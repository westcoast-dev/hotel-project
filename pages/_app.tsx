import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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

const SearchList = styled.ul`
  position: absolute;
  padding-left: 0 !important;
  margin: 0;
  color: black;
  top: 60px;
  left: 228px;
  padding-left: 8px;
  background-color: #fff;
  width: 24rem;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.24);
  border-radius: 4px;

  li {
    list-style: none;
    padding: 8px;
    min-height: 36px;
    line-height: 36px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
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
interface SearchList {
  name: string;
  dest_id: string;
  dest_type: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  const [hotelList, setHotelList] = useState<Hotel[]>();
  const [searchList, setSearchList] = useState<SearchList[]>([]);
  const [show, setShow] = useState(false);
  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };
  const params = { name: search, locale: "ko" };

  const searchRef = useRef<HTMLInputElement>(null);

  const showList = (e: any) => {
    searchRef.current === e.target ? setShow(true) : setShow(false);
  };

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
    if (search === undefined || search.length <= 1) return;
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      {
        params: params,
        headers: headers,
      }
    );
    // const des = {
    //   dest_id: res.data[0].dest_id,
    //   dest_type: res.data[0].dest_type,
    // };
    setSearchList(res.data);
    console.log(res.data);
    // console.log(res.data);
    // router.pathname !== "/" && router.push("/");
    // getHotelList(des);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 2) {
      setSearch(e.target.value);
    }
    if (e.target.value.length === 0) {
      setSearch("");
    }
    // setSearch(e.target.value);
  };

  useEffect(() => {
    searchLocation();
  }, [search]);

  //검색어에 2글자 이상 입력하면 검색결과 드롭다운
  //페이지네이션 : total_count_with_filters / 20

  return (
    <div onClick={showList}>
      <Nav>
        <div onClick={() => router.push("/")}>Woochans.com</div>
        <input
          ref={searchRef}
          style={{ width: "18rem" }}
          type="text"
          placeholder="목적지"
          onChange={handleChange}
        />
        {show && (
          <SearchList>
            {(search === undefined || search.length <= 1) && (
              <div style={{ color: "#000" }}>
                목적지, 숙소 또는 랜드마크로 검색해 보세요.
              </div>
            )}
            {searchList.map((item) => (
              <li key={item.dest_id}>{item.name}</li>
            ))}
            {/* <li>애월</li>
            <li>애월스테이</li>
            <li>애월읍</li> */}
          </SearchList>
        )}
        <input style={{ width: "12rem" }} type="text" placeholder="날짜" />
        <input style={{ width: "12rem" }} type="text" placeholder="인원수" />
        <button
        // onClick={searchLocation}
        >
          검색
        </button>
      </Nav>
      <Component {...pageProps} hotelList={hotelList} />
    </div>
  );
}
