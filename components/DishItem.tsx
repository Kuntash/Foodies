import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Animated from 'react-native-reanimated';
import { ThemeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme';
import { Dish } from '../types';

type IProps = {
  dish: Dish;
};
const DishItem = ({ dish }: IProps) => {
  const { colorMode } = useContext(ThemeContext);
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme[colorMode].cardBackground },
      ]}
    >
      <Animated.View style={styles.contentContainer}>
        <Animated.Text
          style={{
            fontSize: 18,
            textTransform: 'capitalize',
            flexWrap: 'wrap',
            flexShrink: 1,
            color: theme[colorMode].heading,
            fontWeight: '600',
            marginBottom: 8,
          }}
        >
          {dish.name}
        </Animated.Text>
        <Animated.Text
          style={{
            fontSize: 14,
            textTransform: 'capitalize',
            flexWrap: 'wrap',
            flexShrink: 1,
            color: theme[colorMode].subHeading,
            fontWeight: '600',
            marginBottom: 16,
          }}
        >
          ₹{dish.price}
        </Animated.Text>
        <Animated.Text
          ellipsizeMode="tail"
          numberOfLines={3}
          style={{
            fontSize: 14,
            textTransform: 'capitalize',
            flexWrap: 'wrap',
            flexShrink: 1,
            color: theme[colorMode].body,
            fontWeight: '600',
          }}
        >
          {dish.description}
        </Animated.Text>
      </Animated.View>
      <Animated.Image source={dish.source} style={[styles.dishImage]} />
    </Animated.View>
  );
};

export default DishItem;

const styles = StyleSheet.create({
  contentContainer: {
    flexBasis: '50%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    shadowRadius: 5,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
  },
  dishImage: {
    borderRadius: 10,
    aspectRatio: 1 / 1,
    width: 125,
  },
});
