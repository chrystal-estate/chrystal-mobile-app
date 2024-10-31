import React from 'react';
import { View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

export default function MapComponent({ region, markers }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={false} // Turn off user location display if not needed
        loadingEnabled
        customMapStyle={styles.customMapStyle} // Use custom style from styles.js
        zoomEnabled={true} // Disable zoom for fixed view
        scrollEnabled={true} // Disable scrolling for a static map
      >
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor="#546E7A" // Set marker color to match the screenshot
          />
        ))}
      </MapView>
    </View>
  );
}
