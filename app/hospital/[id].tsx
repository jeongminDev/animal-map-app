import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// API 연동 전 사용할 Mock 데이터
const mockHospitalDetail = {
  name: '튼튼 동물병원',
  address: '서울시 강남구 테헤란로 123',
  phone: '02-1234-5678',
  hours: '평일 09:00 - 18:00 (점심시간 12:00 - 13:00)',
  description:
    '소중한 반려동물을 위한 최상의 진료를 제공합니다. 최신 의료 장비와 전문 의료진이 함께합니다.',
};

export default function HospitalDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      {/* 페이지 헤더 제목 설정 */}
      <Stack.Screen options={{ title: '병원 상세 정보' }} />
      <ThemedView style={styles.content}>
        <ThemedText type="title">{mockHospitalDetail.name}</ThemedText>
        <ThemedText style={styles.subtitle}>병원 ID: {id}</ThemedText>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">주소</ThemedText>
          <ThemedText>{mockHospitalDetail.address}</ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">연락처</ThemedText>
          <ThemedText>{mockHospitalDetail.phone}</ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">진료시간</ThemedText>
          <ThemedText>{mockHospitalDetail.hours}</ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">병원 소개</ThemedText>
          <ThemedText>{mockHospitalDetail.description}</ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
});
