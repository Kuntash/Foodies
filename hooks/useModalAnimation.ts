import { useEffect } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Position } from '../types/index';

const FULL_HEIGHT = Dimensions.get('screen').height;
const FULL_WIDTH = Dimensions.get('window').width;

export const useModalAnimation = (
  position: Position,
  animationDuration: number
): [
  {
    width: number;
    height: number;
    top: number;
    left: number;
  },
  {
    height: string;
  },
  () => void,
  () => void,
  (e: NativeSyntheticEvent<NativeScrollEvent>) => void
] => {
  const modalHeight = useSharedValue(position.height);
  const modalWidth = useSharedValue(position.width);
  const modalX = useSharedValue(position.pageX);
  const modalY = useSharedValue(position.pageY);
  const buttonOpacity = useSharedValue(0);
  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: modalWidth.value,
      height: modalHeight.value,
      top: modalY.value,
      left: modalX.value,
    };
  }, [modalHeight, modalWidth, modalY, modalX]);
  const mainImageHeight = useSharedValue(100);
  const mainImageAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: `${mainImageHeight.value}%`,
    };
  }, [mainImageHeight]);

  const initializeModal = () => {
    modalHeight.value = withTiming(FULL_HEIGHT, {
      duration: animationDuration,
    });
    modalWidth.value = withTiming(FULL_WIDTH, { duration: animationDuration });
    modalX.value = withTiming(0, { duration: animationDuration });
    modalY.value = withTiming(0, { duration: animationDuration });
    buttonOpacity.value = withTiming(1, { duration: animationDuration });
    mainImageHeight.value = withTiming(50, { duration: animationDuration });
  };
  const handleOnMenuScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x, y } = e.nativeEvent.contentOffset;
    if (y > 10) {
      mainImageHeight.value = withSpring(25, {
        stiffness: 50,
      });
    } else if (y <= 0) {
      mainImageHeight.value = withSpring(50);
    }
  };
  const handleBeginTap = () => {
    modalHeight.value = withTiming(position.height, {
      duration: animationDuration,
    });
    modalWidth.value = withTiming(position.width, {
      duration: animationDuration,
    });
    modalX.value = withTiming(position.pageX, {
      duration: animationDuration,
    });
    modalY.value = withTiming(position.pageY, {
      duration: animationDuration,
    });
    buttonOpacity.value = withTiming(0, {
      duration: animationDuration,
    });
    mainImageHeight.value = withTiming(100, {
      duration: animationDuration,
    });
  };
  return [
    modalAnimatedStyle,
    mainImageAnimatedStyle,
    initializeModal,
    handleBeginTap,
    handleOnMenuScroll,
  ];
};
