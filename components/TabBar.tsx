import { View,  StyleSheet, LayoutChangeEvent} from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import TabBarButton from './TabBarButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const [dimensions, setDimensions] = useState({ height:20, width:100 });
  const [isLayoutReady, setIsLayoutReady] = useState(false);  // Nuevo estado para controlar la actualización de layout.

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;
    setDimensions({ height, width });
    setIsLayoutReady(true); // Cuando las dimensiones están listas.
  };

  const tabPositionX = useSharedValue(buttonWidth * state.index);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    };
    
  });

  useEffect(() => {
    if (isLayoutReady) {
      tabPositionX.value = withSpring(buttonWidth * state.index, { duration: 2000 });
    }
  }, [isLayoutReady, state.index, buttonWidth]);

  // Controlamos la actualización de tabPositionX al cambiar la pestaña activa
  useEffect(() => {
    if (state.index !== undefined) {
      // Sin animación al cambiar entre pestañas (incluyendo cuando se regresa atrás)
      tabPositionX.value = buttonWidth * state.index;
    }
  }, [state.index, buttonWidth]);




  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
        <Animated.View style={[animatedStyle, {
            position: 'absolute',
            backgroundColor: '#047857',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
        }]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 2000});  
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (

            <TabBarButton 
            key={route.name} 
            routeName={route.name} 
            isFocused={isFocused} 
            onPress={onPress} 
            onLongPress={onLongPress}
            color={isFocused ? '#FFF' : '#222'}
            label={label} />
        );
      })}
       
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar:{
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 5
    },
    tabbaarItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
    });