import { GetStaticProps, GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button } from "@/components/HotelList";
import { Room_List } from "Room_List";

const Section = styled.section`
  width: 100%;
  // margin: auto;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  // margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Content = styled.div`
  min-width: 410px;
  width: 31%;
  margin: 0.5rem 0.5rem;
  border: 1px solid #d7d4d2;
  border-radius: 0.5rem;
  overflow: hidden;

  .box {
    margin: 1rem;
  }
`;

interface Item {
  block_id: string;
  room_name: string;
  product_price_breakdown: { gross_amount: { value: number } };
  rooms: { [block_id: number]: { photos: [{ url_original: string }] } };
}

const HotelDetailPage = ({ list }: any) => {
  return (
    <Section>
      <Container>
        {list.block.map((item: Item) => (
          <Content key={item.block_id}>
            <Image
              src={list.rooms[parseInt(item.block_id)].photos[0].url_original}
              alt={item.room_name}
              width={440}
              height={360}
            />
            <div className="box">
              <div>{item.room_name}</div>
              <h3>
                ₩
                {item.product_price_breakdown.gross_amount.value.toLocaleString(
                  "ko-KR"
                )}
              </h3>
              <Button>예약하기</Button>
            </div>
          </Content>
        ))}
      </Container>
    </Section>
  );
};
// const HotelDetailPage = ({ room_name, price, description }: Detail) => {
//   return (
//     <div>
//       <div>{room_name}</div>
//       <div>{price}</div>
//       <div>{description}</div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const hotelId = context.params?.hotelId as string;

//   // axios로 데이터 페칭

//   const params = {
//     checkin_date: "2023-07-15",
//     adults_number_by_rooms: "2,1",
//     units: "metric",
//     locale: "ko",
//     currency: "KRW",
//     hotel_id: hotelId,
//     checkout_date: "2023-07-16",
//     children_number_by_rooms: "2,0",
//     children_ages: "5,0",
//   };

//   const headers = {
//     "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
//     "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
//   };

//   try {
//     const res = await axios.get(
//       "https://booking-com.p.rapidapi.com/v1/hotels/room-list",
//       {
//         params: params,
//         headers: headers,
//       }
//     );

//     const list = res.data[0];

//     const data = res.data[0].block[0];
//     const rooms = res.data[0].rooms;

//     return {
//       props: {
//         block_id: data.block_id.split("_", 1),
//         room_name: data.name,
//         price: data.product_price_breakdown.gross_amount.value,
//         rooms: rooms,
//         list: list,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {},
//     };
//   }
// };

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          hotelId: "1778038",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const hotelId = context.params?.hotelId as string;

  const list = Room_List;

  const data = Room_List.block[0];
  const rooms = Room_List.rooms;

  return {
    props: {
      block_id: data.block_id.split("_", 1),
      room_name: data.name,
      price: data.product_price_breakdown.gross_amount.value,
      rooms: rooms,
      list: list,
    },
  };
};

export default HotelDetailPage;
