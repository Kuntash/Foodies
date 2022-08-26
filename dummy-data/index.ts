import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 0,
    title: 'Barbecue Nation',
    subtitle: 'Eat like you always wanted',
    source: {
      uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    dishes: [],
  },
  {
    id: 1,
    title: 'Pizza home',
    subtitle: 'Each slice tastes perfect',
    source: {
      uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    dishes: [
      {
        id: 1,
        category: ['veg-pizza'],
        description:
          'Loaded with a delicious creamy tomato pasta topping, green capsicum, crunchy red and yellow bell peppers and black olives',
        isVeg: true,
        name: 'Creamy Tomato Pasta Pizza - Veg',
        price: 489,
        source: {
          uri: 'https://images.dominos.co.in/new_veggie_paradise.jpg',
        },
      },
      {
        id: 2,
        category: ['non-veg-pizza'],
        description:
          'Supreme combination of black olives, onion, capsicum, grilled mushroom, pepper barbecue chicken, peri-peri chicken & grilled chicken rashers',
        isVeg: false,
        name: 'Non Veg Supreme',
        price: 629,
        source: {
          uri: 'https://feenix.co.in/wp-content/uploads/2018/02/140418-Web-Pizza_NonVegSuperme.jpg',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Pancake Stall',
    subtitle: 'Pancake with maple syrups',
    source: {
      uri: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    dishes: [],
  },
];
