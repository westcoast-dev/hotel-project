import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import styled from "@emotion/styled";
import HotelListItem from "@/components/HotelListItem";

const Header = styled.h1`
  color: #0276fd;
  text-align: center;
`;

export default function Home() {
  return (
    <>
      <Header>hotel booking</Header>
      <HotelListItem />
    </>
  );
}
