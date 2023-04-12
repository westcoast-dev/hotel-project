import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import styled from "@emotion/styled";
import HotelList from "@/components/HotelList";

const Container = styled.div`
  margin: auto;
  margin-top: 2rem;
  width: 50rem;
`;

interface HomeProps {
  hotelList: [
    {
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
  ];
}

export default function Home({ hotelList }: HomeProps) {
  return (
    <>
      <Container>
        <HotelList hotelList={hotelList} />
      </Container>
    </>
  );
}
