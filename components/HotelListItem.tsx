import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Hotel {
  id: number;
  name: string;
  photoMainUrl: string;
}

const HotelListItem = () => {
  const [hotelList, setHotelList] = useState<Hotel[]>();

  const params = {
    units: "metric",
    checkin_date: "2023-02-18",
    dest_type: "city",
    dest_id: "-716583",
    checkout_date: "2023-02-19",
    order_by: "popularity",
    filter_by_currency: "KRW",
    locale: "ko",
    adults_number: "2",
    room_number: "1",
    include_adjacency: "true",
    categories_filter_ids: "class::2,class::4,free_cancellation::1",
    children_number: "2",
    children_ages: "5,0",
    page_number: "0",
  };

  const headers = {
    "X-RapidAPI-Key": "896b2f10c7mshb4c2758bf8764f8p10746djsn3dbe7fc2c98d",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  };

  const getHotelList = async () => {
    const res = await axios.get(
      "https://booking-com.p.rapidapi.com/v2/hotels/search",
      {
        params: params,
        headers: headers,
      }
    );
    setHotelList(res.data.results);
    console.log(res.data.results);
  };

  useEffect(() => {
    getHotelList();
  }, []);

  return (
    <>
      {hotelList?.map((item) => (
        <div key={item.id}>
          <Image
            src={item.photoMainUrl}
            alt={item.name}
            width={240}
            height={320}
          />
          <h3>{item.name}</h3>
        </div>
      ))}
    </>
  );
};

export default HotelListItem;
