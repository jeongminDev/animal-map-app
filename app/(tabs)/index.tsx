import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import type { Hospital } from '../../types/hospital';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // mock 병원 데이터
  const hospitals: Hospital[] = [
    {
      id: '1',
      name: '첫번째 병원',
      latitude: 37.5665,
      longitude: 126.978,
      isOpenNow: true,
    },
    {
      id: '2',
      name: '두번째 병원',
      latitude: 37.5672,
      longitude: 126.982,
      isOpenNow: false,
    },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('위치 권한이 필요합니다');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5DB075" />
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* 내 위치 마커 */}
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="내 위치"
        pinColor="blue"
      />

      {/* 병원 마커 */}
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.id}
          coordinate={{
            latitude: hospital.latitude,
            longitude: hospital.longitude,
          }}
          title={hospital.name}
          description={hospital.isOpenNow ? '영업중' : '영업종료'}
          pinColor={hospital.isOpenNow ? 'green' : 'red'}
          // onPress={() => router.push()}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
