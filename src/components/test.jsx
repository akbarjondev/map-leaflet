import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
  iconSize: [20, 40],
  iconAnchor: [18, 18],
  popupAnchor: [0, -10],
  shadowAnchor: [10, 10],
});

const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
  const markerRef = useRef();

  const { rotationAngle, rotationOrigin } = props;

  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.setRotationAngle(rotationAngle);
      marker.setRotationOrigin(rotationOrigin);
    }
  }, [rotationAngle, rotationOrigin]);

  return (
    <Marker
      ref={(ref) => {
        markerRef.current = ref;
        if (forwardRef) {
          forwardRef.current = ref;
        }
      }}
      {...props}
    >
      {children}
    </Marker>
  );
});

const MySimpleMap = () => {
  const [lat, setLat] = useState(22.899397);
  const [lon, setLon] = useState(89.508279);
  const [heading, setHeading] = useState(300);

  const myfun = useCallback(() => {
    setLat((lat) => lat + 0.00001);
    setLon((lon) => lon + 0.00001);
    setHeading((heading) => heading + 5);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      myfun();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [myfun]);

  return (
    <MapContainer className="map" center={[lat, lon]} zoom={21}>
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
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </RotatedMarker>
    </MapContainer>
  );
};

export default MySimpleMap;
