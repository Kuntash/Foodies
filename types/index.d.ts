import { ImageSourcePropType } from 'react-native';

export type Position = {
  width: number;
  height: number;
  x: number;
  y: number;
  pageX: number;
  pageY: number;
};

export type Restaurant = {
  id: number;
  title: string;
  subtitle: string;
  source: {
    uri: string;
  };
  dishes?: Dish[];
};

export type RestroModalProp = {
  restaurant: Restaurant;
  position: Position;
};

export type Dish = {
  id: number;
  name: string;
  source: {
    uri: string;
  };
  isVeg: boolean;
  price: number;
  description: string;
  category: string[];
};
