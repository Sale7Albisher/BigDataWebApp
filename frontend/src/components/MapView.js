import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ tweets }) => {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        noWrap={true} 
        bounds={[
          [-90, -180], 
          [90, 180],   
        ]}
      />
      {tweets.map((tweet) => tweet?.location?.coordinates?.latitude && (
        <CircleMarker
          key={tweet.id}
          center={[tweet?.location?.coordinates?.latitude || 0, tweet?.location?.coordinates?.longitude || 0]}
          radius={1.7} 
          fillColor="red" 
          color="red" 
          fillOpacity={0.7} 
        >
          <Popup>{tweet.text}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapView;
