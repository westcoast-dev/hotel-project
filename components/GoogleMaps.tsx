import styled from "@emotion/styled";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "280px",
  height: "280px",
};

interface MapProps {
  title: string;
  location: { latitude: number; longitude: number };
}

const GoogleMaps = ({ title, location }: MapProps) => {
  const center = { lat: location.latitude, lng: location.longitude };
  const key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY || "";
  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        <MarkerF position={center} title={title} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
