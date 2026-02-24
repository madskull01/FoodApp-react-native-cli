import axios from 'axios';
import { FoodItem } from '../types/Food';

const API_URL =
  'https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf';

export const fetchFoods = async (): Promise<FoodItem[]> => {
  const response = await axios.get(API_URL);
  return response.data.record.data;
};