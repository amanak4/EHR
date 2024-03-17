import React, { useState, useEffect } from 'react';

const LabCenter = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [labLocations, setLabLocations] = useState([
    { name: "Dr. Pathlab's", latitude: 40.7128, longitude: -74.0060 },
    { name: 'Relifclif Lab', latitude: 40.7306, longitude: -73.9352 }
  ]);
  const [centerPoint, setCenterPoint] = useState(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Calculate center point
    if (userLocation && labLocations.length > 0) {
      const totalLat = labLocations.reduce((acc, lab) => acc + lab.latitude, userLocation.latitude);
      const totalLng = labLocations.reduce((acc, lab) => acc + lab.longitude, userLocation.longitude);
      const avgLat = totalLat / (labLocations.length + 1);
      const avgLng = totalLng / (labLocations.length + 1);
      setCenterPoint({ latitude: avgLat, longitude: avgLng });
    }
  }, [userLocation, labLocations]);

  return (
    <div>
      {centerPoint && (
        <p>
          The center point of Dr. Pathlab's and Relifclif Lab near your location is: 
          Latitude: {centerPoint.latitude}, Longitude: {centerPoint.longitude}
        </p>
      )}
    </div>
  );
};

export default LabCenter;
