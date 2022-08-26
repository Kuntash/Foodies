import { View, Text } from 'react-native';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type IProps = {
  children: React.ReactNode;
};
const RestroCardGestures = ({ children }: IProps) => {
  const tapGesture = Gesture.Tap().maxDistance(0);
  const longPressGesture = Gesture.LongPress().minDuration(250).maxDistance(0);
  const composedGesture = Gesture.Race(tapGesture, longPressGesture);
  return (
    <GestureDetector gesture={composedGesture}>{children}</GestureDetector>
  );
};

export default RestroCardGestures;
