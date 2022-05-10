import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DriftMarker from "./DriftMaker";
import * as data from "./../data/data";

const Map = () => {
  const initialPosition = [data.areas[0].lat, data.areas[0].lng];

  return (
    <MapContainer center={initialPosition} zoom={9}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DriftMarker />
    </MapContainer>
  );
};

export default Map;
