import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ tweets }) => {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        noWrap={true} // Prevent multiple Earth maps
        bounds={[
          [-90, -180], // Southwest corner
          [90, 180],   // Northeast corner
        ]}
      />
      {tweets.map((tweet) => (
        <Marker position={[tweet.geo.lat, tweet.geo.lon]} key={tweet.id}>
          <Popup>{tweet.text}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
