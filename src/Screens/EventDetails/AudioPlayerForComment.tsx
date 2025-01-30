import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  IWaveformRef,
  PlayerState,
  Waveform,
} from '@simform_solutions/react-native-audio-waveform';
import {Colors} from '../../Utilities/Styles/colors';
import {moderateScale} from '../../Utilities/Styles/responsiveSize';

const AudioPlayerForComment = ({path}: {path: string}) => {
  const WaveRef = useRef<IWaveformRef>(null);

  const [audioDuration, setAudioDuration] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.stopped,
  );

  // Handle play/pause button click
  const handlePlayPause = async () => {
    console.log('wwww');

    if (playerState === PlayerState.playing) {
      // Pause the player and countdown
      await WaveRef.current?.pausePlayer();
      // toggleCountdown(false);
    } else if (playerState === PlayerState.paused) {
      // Resume the player and countdown
      await WaveRef.current?.resumePlayer();
      // toggleCountdown(true);
    } else {
      // Start the player and countdown
      await WaveRef.current?.startPlayer();
      // toggleCountdown(true);
    }
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const resetTimer = () => {
    setSecondsLeft(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      setIsRunning(false); // Automatically stop when timer reaches 0
    }

    return () => clearInterval(timer); // Cleanup on unmount or when dependencies change
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    const stop = WaveRef.current?.stopPlayer;
    return () => {
      stop?.()
        .then(() => {
          console.log('sss');
        })
        .catch(console.error);
    };
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: moderateScale(5),
      }}>
      <VectorIcon
        groupName="Ionicons"
        name={
          playerState === PlayerState.playing
            ? 'pause-circle-sharp'
            : 'caret-forward'
        }
        size={25}
        color={Colors.white}
        onPress={handlePlayPause}
      />
      <Text style={{color: 'white'}}>{formatTime(secondsLeft)}</Text>
      <Waveform
        containerStyle={{
          height: 75,
          flex: 1,
        }}
        key={path}
        mode="static"
        ref={WaveRef}
        path={path}
        candleSpace={2}
        candleWidth={4}
        scrubColor="white"
        waveColor="#FAFF02"
        onPlayerStateChange={state => {
          setPlayerState(state);
          if (state === PlayerState.playing) {
            setIsRunning(true); // Resume the timer
          } else {
            setIsRunning(false); // Pause the timer
          }
          if (state === PlayerState.stopped) {
            setIsRunning(false); // Stop the countdown
            // setSecondsLeft(0); // Reset the timer when audio ends
            // setAudioDuration(0);
          }
        }}
        onCurrentProgressChange={(progress, totalDuration) => {
          const totalSeconds = Math.ceil(totalDuration / 1000); // Convert to seconds
          // if (!audioDuration || audioDuration === 0) {
          //   setAudioDuration(totalSeconds); // Set total audio duration
          //   setSecondsLeft(
          //     audioDuration - Math.ceil(progress / 1000),
          //   );
          // }
        }}
        onError={error => console.error('Waveform Error:', error)}
      />
    </View>
  );
};

export default AudioPlayerForComment;

const styles = StyleSheet.create({});
