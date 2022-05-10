export default function (initialPoint, destination) {
  // directions with degree
  const X = Math.cos(
    destination.lat * Math.sin(destination.lng - initialPoint.lng)
  );

  const Y =
    Math.cos(initialPoint.lat) * Math.sin(destination.lat) -
    Math.sin(initialPoint.lat) *
      Math.cos(destination.lat) *
      Math.cos(destination.lng - initialPoint.lng);

  // radian
  const BAtan = Math.atan2(X, Y);

  // convert into degree
  const Bdegree = (BAtan * 180) / Math.PI;

  return Bdegree;
}
