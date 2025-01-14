import React, {useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface ProgressBarProps {
  currentIndex: number; // Index of the currently playing video
  duration: number; // Duration of the video in seconds
  totalVideos: number; // Total number of videos
  onComplete: () => void; // Callback when the progress completes
}

const VideoProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  duration,
  totalVideos,
  onComplete,
}) => {
  const animatedValues = useMemo(
    () =>
      Array(totalVideos)
        .fill(0)
        .map(() => new Animated.Value(0)),
    [totalVideos],
  );

  useEffect(() => {
    // if (currentIndex < 0 || currentIndex >= totalVideos) {
    //   console.warn('Invalid currentIndex:', currentIndex);
    //   return;
    // }

    // Stop any ongoing animations
    // animatedValues.forEach(value => {
    //   value.stopAnimation();
    // });

    // Reset all animations when index changes
    animatedValues.forEach((value, idx) => {
      if (idx < currentIndex) {
        // Fully fill progress for previous videos
        Animated.timing(value, {
          toValue: width / totalVideos,
          duration: 0,
          useNativeDriver: false,
        }).start();
      } else {
        // Reset progress for upcoming videos
        Animated.timing(value, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    });

    // Animate the current video's progress
    Animated.timing(animatedValues[currentIndex], {
      toValue: width / totalVideos,
      duration: duration * 1000, // Convert duration to milliseconds
      useNativeDriver: false,
    }).start(() => {
      if (currentIndex < totalVideos - 1) {
        onComplete(); // Trigger the next video
      }
    });
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {animatedValues.map((value, idx) => (
        <View key={idx} style={[styles.segment, {width: width / totalVideos}]}>
          <Animated.View
            style={[
              styles.activeSegment,
              {
                width: value,
                backgroundColor: idx <= currentIndex ? '#fff' : '#555',
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    width: '100%',
    zIndex: 1,
  },
  segment: {
    height: 4,
    backgroundColor: '#555',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  activeSegment: {
    height: '100%',
    borderRadius: 2,
  },
});

export default VideoProgressBar;
