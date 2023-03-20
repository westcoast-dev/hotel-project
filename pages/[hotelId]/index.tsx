import { GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button } from "@/components/HotelList";
import GoogleMaps from "@/components/GoogleMaps";

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1374px;
  display: flex;
  justify-content: center;

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 1406px) {
    width: 916px;
  }
  @media screen and (max-width: 948px) {
    width: 458px;
  }
`;

const Content = styled.div`
  max-width: 440px;
  margin: 0.5rem 0.5rem;
  border: 1px solid #d7d4d2;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
  .box {
    margin: 1rem;
  }

  @media screen and (max-width: 458px) {
    max-width: 360px;
    margin: auto;
    margin-bottom: 0.5rem;
  }
`;

const List = styled.div`
  margin: 2rem;

  span {
    display: inline-block;
    margin: 0.5rem 1rem;
    white-space: nowrap;
  }
`;

interface Item {
  block_id: string;
  room_name: string;
  photo: string;
  product_price_breakdown: { gross_amount: { value: number } };
  rooms: { [block_id: number]: { photos: [{ url_original: string }] } };
}

interface facility {
  facility_name: string;
  hotelfacilitytype_id: number;
}

// const HotelDetailPage = ({ list, name, photo, desc, facilities }: any) => {
//   return (
//     <>
//       <h1 style={{ margin: "2rem" }}>나인트리 프리미어 호텔 명동2</h1>
//       <div style={{ margin: "2rem", display: "flex" }}>
//         <div style={{ flex: 1, marginRight: "1rem" }}>
//           조식이 포함된 객실의 경우, 아동 조식에는 추가 요금이 부과됩니다. 만
//           36개월 이하 아동에게는 조식이 무료로 제공됩니다. 주차 공간이 협소한
//           관계로 주차장은 가능한 경우에 한해 이용하실 수 있습니다.
//           코로나바이러스감염증-19 확산 방지를 위해, 피트니스 센터는 추후 공지가
//           있을 때까지 이용하실 수 없습니다.
//         </div>
//         <GoogleMaps title="나인트리 프리미어 호텔 명동2" />
//       </div>
//     </>
//   );
// };
const HotelDetailPage = ({
  list,
  name,
  photo,
  desc,
  facilities,
  location,
}: any) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={desc} />
        <meta
          property="og:url"
          content={`https://hotel-project-westcoast.vercel.app/${list.hotel_id}`}
        />
        <meta property="og:image" content={photo} />
      </Head>
      <h1 style={{ margin: "2rem" }}>{name}</h1>
      <div style={{ margin: "3rem", display: "flex" }}>
        <div>
          <div style={{ flex: 1, marginRight: "1rem" }}>{desc}</div>
          <List>
            {facilities.map((item: facility) => (
              <span key={item.hotelfacilitytype_id}>{item.facility_name}</span>
            ))}
          </List>
        </div>
        <div style={{ flex: 1 }}>
          <GoogleMaps title={name} location={location} />
        </div>
      </div>
      <Section>
        <Container>
          <div className="flex-wrap">
            {list.block.map((item: Item) => (
              <Content key={item.block_id}>
                <Image
                  src={
                    list.rooms[parseInt(item.block_id)].photos[0].url_original
                  }
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
          </div>
        </Container>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hotelId = context.params?.hotelId as string;

  const params = {
    checkin_date: "2023-07-15",
    adults_number_by_rooms: "2,1",
    units: "metric",
    locale: "ko",
    currency: "KRW",
    hotel_id: hotelId,
    checkout_date: "2023-07-16",
    children_number_by_rooms: "2,0",
    children_ages: "5,0",
  };

  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };

  try {
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/room-list",
      {
        params: params,
        headers: headers,
      }
    );

    const res_data = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/data",
      {
        params: { locale: "ko", hotel_id: hotelId },
        headers: headers,
      }
    );
    const res_desc = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/description",
      {
        params: { locale: "ko", hotel_id: hotelId },
        headers: headers,
      }
    );

    const res_facil = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/facilities",
      {
        params: { locale: "ko", hotel_id: hotelId },
        headers: headers,
      }
    );

    const photo = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/photos",
      {
        params: { locale: "ko", hotel_id: hotelId },
        headers: headers,
      }
    );

    return {
      props: {
        name: res_data.data.name,
        location: res_data.data.location,
        photo: photo.data[0].url_1440,
        desc: res_desc.data.description,
        facilities: res_facil.data,
        list: res.data[0],
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default HotelDetailPage;
