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
export default function Home() {
  return (
    <>
      <Container>
        <HotelList />
      </Container>
    </>
  );
}
