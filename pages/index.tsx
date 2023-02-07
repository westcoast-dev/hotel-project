import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import styled from "@emotion/styled";
import HotelList from "@/components/HotelList";

const Header = styled.h1`
  color: #0276fd;
  text-align: center;
`;

const Container = styled.div`
  margin: auto;
  width: 50rem;
`;
export default function Home() {
  return (
    <>
      <Header>hotel booking</Header>
      <Container>
        <HotelList />
      </Container>
    </>
  );
}
