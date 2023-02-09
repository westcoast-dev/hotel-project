import { GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button } from "@/components/HotelList";
import { Room_List } from "Room_List";

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Content = styled.div`
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
    <>
      <Head>
        <title>호텔스카이파크 킹스타운 동대문</title>
        <meta
          name="description"
          content="호텔스카이파크 킹스타운 동대문은 지하철 1호선과 4호선 동대문역에서 350m 거리의 편리한 위치를 자랑하며, 동대문 쇼핑가에서 단 몇 걸음 거리에 있습니다. 호텔 바로 앞에는 아름다운 청계천이 있으며 호텔은 현대시티아울렛 동대문점과 바로 연결되어 있습니다. 이 호텔의 현대적인 각 객실은 카펫 바닥과 목재 가구로 꾸며져 있으며 넓은 업무용 책상, 벽걸이 TV, 소형 냉장고와 전기 주전자를 갖추고 있습니다. 실내 욕실에는 샤워 시설이 구비되어 있으며, 무료 세면도구, 목욕 가운, 헤어드라이어가 제공됩니다. 24시간 운영되는 프런트 데스크는 컨시어지 서비스, 환전, 수하물 보관 서비스 등을 제공합니다. 구내 피트니스 센터에서 운동을 즐기실 수 있으며 추가 요금으로 매일 조식을 이용하실 수 있습니다. 호텔에서 역사적인 인사동 문화 거리는 지하철 1호선을 타고 서쪽 방면으로 2정거장 거리에 있고, 명동 쇼핑 지역은 지하철 4호선을 타고 서쪽 방면으로 2정거장 거리에 있습니다. 인천국제공항까지는 차로 80분이 소요됩니다."
        />
      </Head>
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
    </>
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
