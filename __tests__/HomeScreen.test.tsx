jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(() =>
      Promise.resolve({
        isConnected: true,
      })
    ),
  },
}));
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import * as api from '../src/api/foodApi';

jest.mock('../src/api/foodApi');

const mockData = [
  {
    id: 1,
    title: 'Masala Dosa',
    rating: 4.6,
    category: 'Breakfast',
    cuisine: 'South Indian',
    tags: ['veg'],
    thumbNailImage: '',
    mainImage: '',
    description: 'Test description',
    price: 120,
    prepTimeMins: 20,
    isVeg: true,
  },
];

describe('HomeScreen', () => {
  it('renders food list correctly', async () => {
    (api.fetchFoods as jest.Mock).mockResolvedValue(mockData);

    const { getByText } = render(
      <HomeScreen navigation={{ navigate: jest.fn() }} />
    );

    await waitFor(() => {
      expect(getByText('Masala Dosa')).toBeTruthy();
    });
  });
});