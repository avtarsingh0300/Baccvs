import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { width } from '../Styles/responsiveSize';

const CircularProgressBar = ({ progress }) => {
  const radius = 70; // Increased radius for a larger circle
  const strokeWidth = 10; 
  const center = radius + strokeWidth / 2; 

  // Calculate the circumference of the circle
  const circumference = Math.PI * 3 * radius;

  // Calculate the strokeDasharray and strokeDashoffset for the progress
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate pointer position
  const pointerX = center + radius * Math.cos((progress / 100) * 3 * Math.PI - Math.PI / 2);
  const pointerY = center + radius * Math.sin((progress / 100) * 3 * Math.PI - Math.PI / 2);

  return (
    <View style={styles.container}>
      <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e0e0e0" // Background color
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#007bff" // Progress color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          rotation="-90" // Rotate to start from the top
          originX={center}
          originY={center}
        />
        {/* Pointer at the end of the progress arc */}
        <Circle
          cx={pointerX}
          cy={pointerY}
          r={strokeWidth/2 }
          fill="#ffffff" // Pointer color
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%"
  },
});

export default CircularProgressBar;
