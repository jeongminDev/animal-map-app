import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import hospitals from '@/data/hospitals';

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <ThemedView style={styles.container}>
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
            onPress={() => router.push(`/hospital/${hospital.id}`)}
          />
        ))}
      </MapView>
      <ThemedView style={styles.listContainer}>
        <ThemedText type="title">주변 병원</ThemedText>
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.hospitalItem}>
              <View>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                <ThemedText>거리: 500m</ThemedText>
              </View>
              <ThemedText style={{ color: item.isOpenNow ? 'green' : 'red' }}>
                {item.isOpenNow ? '영업중' : '영업종료'}
              </ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '55%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  hospitalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
