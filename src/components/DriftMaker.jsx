import React, { useEffect, useState } from "react";
import L from "leaflet";
import carIcon from "./../assets/icons/carIcon.png";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
// import RotatedMarker from "./RotatedMarker";
import { Tooltip, useMapEvents } from "react-leaflet";
import { useSelector } from "react-redux";
import * as data from "./../data/data";
import findBearer from "../helpers/findBearer";

const markerIcon = new L.Icon({
  iconUrl: carIcon,
  iconSize: [25, 52],
});

const DriftMarker = () => {
  const { areas } = data;
  const [position] = data.areas;
  let [counter, setCounter] = useState(1);
  const [initialPosition, setInitialPosition] = useState(position);

  const { speed } = useSelector((state) => state.speedControl);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (counter >= areas.length) {
        setCounter(0);
        clearInterval(intervalId);
      } else {
        setCounter(counter++);
      }
    }, speed + 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setInitialPosition(areas[counter]);
  }, [counter]);

  let firstPointIndex = areas.findIndex((pos) => pos.lat === position.lat);

  let secondPoint = areas[firstPointIndex + 1]
    ? areas[firstPointIndex + 1]
    : areas[0];

  const map = useMapEvents({});
  map.flyTo(initialPosition);

  const course = Number(findBearer(initialPosition, secondPoint).toFixed(2));

  // distance in km/h
  let distance = map.distance(initialPosition, secondPoint).toFixed(2);

  return (
    <ReactLeafletDriftMarker
      // if position changes, marker will drift its way to new position
      position={initialPosition}
      // time in ms that marker will take to reach its destination
      duration={speed}
      icon={markerIcon}
    >
      <Tooltip>Buyurtmangiz yetkazilmoqda\nMasofa: {distance}</Tooltip>
    </ReactLeafletDriftMarker>
  );
};

export default DriftMarker;
