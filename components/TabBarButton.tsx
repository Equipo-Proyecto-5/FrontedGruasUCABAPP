import React, {useEffect} from "react";
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { Feather } from "@expo/vector-icons";
import { icons } from "../constants/icon";
import { useTheme } from '@react-navigation/native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// Definición de tipos más específica
type TabBarButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  routeName: string;
  isFocused: boolean;
  color: string;
  label: string;
};

const TabBarButton = ({ onPress, onLongPress, routeName, isFocused, color, label }: TabBarButtonProps) => {
  const { colors } = useTheme();
  const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {duration:350});
    }, [scale,isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
        const top = interpolate(scale.value, [0, 1], [0, 9]);

        return {
            transform: [{ scale: scaleValue }],
            top

        }
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);
        return {
            opacity,
        };
        });
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbaarItem}
    >
        <Animated.View style={animatedIconStyle}>
      <Feather name={icons[routeName]} size={24} color={isFocused ? '#FFF' : '#222'} />
      </Animated.View>

      <Animated.Text style={[{ color: isFocused ? '#047857' : '#222' },, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbaarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  }
});

export default TabBarButton;
