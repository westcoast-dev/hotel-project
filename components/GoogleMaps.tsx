import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "240px",
  height: "240px",
};

const center = {
  lat: 37.5645006108251,
  lng: 126.991000073031,
};

interface MapProps {
  title: string;
}

const GoogleMaps = ({ title }: MapProps) => {
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
