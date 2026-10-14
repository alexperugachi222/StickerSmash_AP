import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, sticker }) {
  const scaleImage = useSharedValue(1); 
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== 2) {
        scaleImage.value = 2;
      } else {
        scaleImage.value = 1;
      }
    });

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scaleImage.value) }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      {/* CORRECCIÓN: Quitamos position: 'absolute'. 
          Al ser relativo, top: -350 lo sube justo por encima de la foto. */}
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.View style={imageStyle}>
            <Text style={{ fontSize: imageSize }}>{sticker}</Text>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}