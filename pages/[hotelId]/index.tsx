import { GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button } from "@/components/HotelList";

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
`;

const List = styled.div`
  margin: 1rem 4rem;

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
}

const HotelDetailPage = ({ list, name, photo, desc, facilities }: any) => {
  // facilities.map((item: facility) => {
  //   console.log(item.facility_name);
  // });
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
      <h1>{name}</h1>
      <div>{desc}</div>
      <List>
        {facilities.map((item: facility) => (
          <span key={item.facility_name}>{item.facility_name}</span>
        ))}
      </List>
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
// const HotelDetailPage = ({ room_name, price, description }: Detail) => {
//   return (
//     <div>
//       <div>{room_name}</div>
//       <div>{price}</div>
//       <div>{description}</div>
//     </div>
//   );
// };

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

    return {
      props: {
        name: res_data.data.name,
        photo: res_data.data.main_photo_url,
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

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           hotelId: "1778038",
//         },
//       },
//     ],
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const hotelId = context.params?.hotelId as string;

//   const list = Room_List;

//   const data = Room_List.block[0];
//   const rooms = Room_List.rooms;

//   return {
//     props: {
//       block_id: data.block_id.split("_", 1),
//       room_name: data.name,
//       price: data.product_price_breakdown.gross_amount.value,
//       rooms: rooms,
//       list: list,
//     },
//   };
// };

export default HotelDetailPage;
