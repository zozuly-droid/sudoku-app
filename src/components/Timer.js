import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

const Timer = ({ running, onTick }) => {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (onTick) onTick(next);
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⏱</Text>
      <Text style={styles.time}>{formatTime(elapsed)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 16,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.timer,
    fontVariant: ['tabular-nums'],
  },
});

export default Timer;
