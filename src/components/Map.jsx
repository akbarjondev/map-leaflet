import React, { useEffect, useCallback, useState } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import RotatedMarker from "./RotatedMarker";
import * as data from "./../data/data";
import carIcon from "./../assets/icons/carIcon.png";

import { useSelector } from "react-redux";
import findBearer from "../helpers/findBearer";

const defaultIcon = new L.Icon({
  iconUrl: carIcon,
  iconSize: [25, 52],
});

const Map = () => {
  let [areaIndex, setAreaIndex] = useState(0);
  const [initialLocation, setInitialLocation] = useState(data.areas[areaIndex]);
  const [destination, setDestination] = useState(data.areas[areaIndex + 1]);

  const [lat, setLat] = useState(initialLocation.lat);
  const [lon, setLon] = useState(initialLocation.lng);

  const [heading, setHeading] = useState(0);

  const { speed } = useSelector((state) => state.speedControl);

  const cordinationSetter = useCallback(() => {
    if (destination.lat > initialLocation.lat) {
      setLat((lat) => lat + 0.01);
    } else {
      setLat((lat) => lat - 0.01);
    }

    if (destination.lng > initialLocation.lng) {
      setLon((lon) => lon + 0.01);
    } else {
      setLon((lon) => lon - 0.01);
    }
  }, [initialLocation, destination]);

  const changeLocations = useCallback(() => {
    setInitialLocation(data.areas[areaIndex]);
    setDestination(data.areas[areaIndex + 1]);
  }, [areaIndex]);

  // location changer
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (areaIndex < data.areas.length - 1) {
        changeLocations();
        setAreaIndex(areaIndex++);
      } else {
        clearInterval(intervalId);
      }
    }, speed + 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // cordinator changer
  useEffect(() => {
    const course = findBearer(initialLocation, destination);
    setHeading(course);
  }, [initialLocation, destination]);

  // maker drifter
  useEffect(() => {
    const interval = setInterval(() => {
      cordinationSetter();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [cordinationSetter, destination, initialLocation]);

  return (
    <MapContainer className="map" center={[lat, lon]} zoom={8}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RotatedMarker
        position={[lat, lon]}
        rotationAngle={heading}
        rotationOrigin="center"
        icon={defaultIcon}
      >
        <Popup>Buyurtmangiz yetkazilmoqda</Popup>
      </RotatedMarker>
    </MapContainer>
  );
};

export default Map;
