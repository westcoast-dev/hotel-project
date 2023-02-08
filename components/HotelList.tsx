import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Dummy_List } from "Dummy_List";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  margin: 1rem 0;

  .content {
    width: 100%;
    padding: 1rem 1.5rem;

    .header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;

      .score-box {
        display: flex;

        div {
          margin: 0;
        }
        span {
          font-size: 0.7rem;
        }
      }
    }

    h3 {
      margin: 0;
      margin-bottom: 1rem;
    }
    div {
      font-weight: 700;
      text-align: right;
      margin-bottom: 1rem;
    }
  }
`;

export const Button = styled.button`
  color: #fff;
  width: 8rem;
  height: 1.7rem;
  background-color: #0276fd;
  border: none;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;

const Score = styled.p`
  width: max-content;
  height: 1.2rem;
  padding: 0.4rem;
  margin: 0.1rem 0 0 0.7rem;
  border-radius: 3px;
  color: #fff;
  background-color: #5027c2;
`;

interface Hotel {
  id: number;
  name: string;
  photoMainUrl: string;
}

const HotelListItem = () => {
  const [hotelList, setHotelList] = useState<Hotel[]>();

  const router = useRouter();

  const moveToDetailPage = (id: number) => {
    router.push(`/${id}`);
  };

  // const params = {
  //   units: "metric",
  //   checkin_date: "2023-02-18",
  //   dest_type: "city",
  //   dest_id: "-716583",
  //   checkout_date: "2023-02-19",
  //   order_by: "popularity",
  //   filter_by_currency: "KRW",
  //   locale: "ko",
  //   adults_number: "2",
  //   room_number: "1",
  //   include_adjacency: "true",
  //   categories_filter_ids: "class::2,class::4,free_cancellation::1",
  //   children_number: "2",
  //   children_ages: "5,0",
  //   page_number: "0",
  // };

  // const headers = {
  //   "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
  //   "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  // };

  // const getHotelList = async () => {
  //   const res = await axios.get(
  //     "https://booking-com.p.rapidapi.com/v2/hotels/search",
  //     {
  //       params: params,
  //       headers: headers,
  //     }
  //   );
  //   setHotelList(res.data.results);
  //   console.log(res.data.results);
  // };

  // useEffect(() => {
  //   getHotelList();
  // }, []);

  const params = {
    checkin_date: "2023-07-15",
    adults_number_by_rooms: "2,1",
    units: "metric",
    locale: "ko",
    currency: "KRW",
    hotel_id: 1778038,
    checkout_date: "2023-07-16",
    children_number_by_rooms: "2,0",
    children_ages: "5,0",
  };

  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };

  const getHotelDetail = async () => {
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/room-list",
      {
        params: params,
        headers: headers,
      }
    );

    console.log(res.data[0]);
  };

  useEffect(() => {
    getHotelDetail();
  }, []);

  return (
    <>
      {Dummy_List?.map((item) => (
        <Container key={item.id}>
          <div>
            <Image
              src={item.photoMainUrl}
              alt={item.name}
              width={200}
              height={240}
            />
          </div>
          <div className="content">
            <div className="header">
              <h3>{item.name}</h3>
              <div className="score-box">
                <div>
                  <div>{item.reviewScoreWord}</div>
                  <span>{item.reviewCount}개의 후기</span>
                </div>
                <Score>{item.reviewScore}</Score>
              </div>
            </div>
            <div>
              <div>
                ₩{" "}
                {Math.round(
                  item.priceBreakdown.grossPrice.value
                ).toLocaleString("ko-KR")}
              </div>
              <Button onClick={() => moveToDetailPage(item.id)}>
                예약하기
              </Button>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
};

export default HotelListItem;
