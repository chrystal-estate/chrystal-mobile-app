import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapComponent from '../../components/MapComponent';
import DashboardHeader from '../../components/DashboardHeader'; // Import the header component

const Dashboard = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([
    {
      coordinate: { latitude: 37.78825, longitude: -122.4324 },
      title: 'Marker 1',
      description: 'Description for Marker 1',
    },
    {
      coordinate: { latitude: 37.75825, longitude: -122.4624 },
      title: 'Marker 2',
      description: 'Description for Marker 2',
    },
  ]);

  useEffect(() => {
    // Here you could fetch or update region and marker data from an API or database if needed
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <DashboardHeader/> Add the DashboardHeader here */}
      <MapComponent region={region} markers={markers}/>
    </View>
  );
};

export default Dashboard;
