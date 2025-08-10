import { Hospital } from '@/types/hospital';

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
  {
    id: '3',
    name: '세번째 병원',
    latitude: 37.5655,
    longitude: 126.975,
    isOpenNow: true,
  },
];

export default hospitals;
