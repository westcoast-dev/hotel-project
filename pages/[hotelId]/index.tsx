import { GetStaticProps } from "next";

interface Detail {
  room_name: string;
  price: number;
  description: string;
}

const HotelDetailPage = ({ room_name, price, description }: Detail) => {
  return (
    <div>
      <div>{room_name}</div>
      <div>{price}</div>
      <div>{description}</div>
    </div>
  );
};

// export const getServerSideProps = async (context) => {

//   // axios로 데이터 페칭

//   return {
//     props: {}
//   }
// }

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

  return {
    props: {
      room_name: "스탠다드 트윈룸",
      price: 160395,
      description: "이 객실 요금에는 식사 요금이 포함되어 있지 않습니다.",
    },
  };
};

export default HotelDetailPage;
