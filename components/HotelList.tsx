import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
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

const HotelListItem = () => {
  const [hotelList, setHotelList] = useState<Hotel[]>();

  const router = useRouter();

  const moveToDetailPage = (id: number) => {
    router.push(`/${id}`);
  };

  const params = {
    dest_id: "254475",
    order_by: "popularity",
    filter_by_currency: "KRW",
    adults_number: "2",
    room_number: "1",
    checkout_date: "2023-04-09",
    units: "metric",
    checkin_date: "2023-04-08",
    dest_type: "hotel",
    locale: "ko",
    children_ages: "5,0",
    categories_filter_ids: "class::2,class::4,free_cancellation::1",
    page_number: "0",
    include_adjacency: "true",
    children_number: "2",
  };

  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };

  const getHotelList = async () => {
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/search",
      {
        params: params,
        headers: headers,
      }
    );
    setHotelList(res.data.result);
  };

  useEffect(() => {
    getHotelList();
  }, []);

  return (
    <>
      {hotelList?.map((item) => (
        <Container key={item.hotel_id}>
          <div>
            <Image
              src={item.max_1440_photo_url}
              alt={item.hotel_name_trans}
              width={200}
              height={220}
            />
          </div>
          <div className="content">
            <div className="header">
              <h3>{item.hotel_name_trans}</h3>
              <div className="score-box">
                <div>
                  <div>{item.review_score_word}</div>
                  <span>{item.review_nr}개의 후기</span>
                </div>
                <Score>{item.review_score}</Score>
              </div>
            </div>
            <div>
              <div>
                ₩{" "}
                {parseInt(item.price_breakdown.gross_price).toLocaleString(
                  "ko-KR"
                )}
              </div>
              <Button onClick={() => moveToDetailPage(item.hotel_id)}>
                예약하기
              </Button>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   return {
//     props: {}
//   }
// }

export default HotelListItem;
