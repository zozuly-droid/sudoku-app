import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../utils/theme';

const DIFFICULTIES = [
  { key: 'easy', label: 'Лёгкий', color: colors.difficultyEasy, desc: '36 пустых клеток' },
  { key: 'medium', label: 'Средний', color: colors.difficultyMedium, desc: '44 пустые клетки' },
  { key: 'hard', label: 'Сложный', color: colors.difficultyHard, desc: '52 пустые клетки' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Судоку</Text>
        <Text style={styles.subtitle}>Маугли 🐺</Text>
      </View>

      <View style={styles.difficultiesContainer}>
        <Text style={styles.sectionTitle}>Выбери сложность</Text>
        {DIFFICULTIES.map(({ key, label, color, desc }) => (
          <TouchableOpacity
            key={key}
            style={[styles.difficultyBtn, { borderColor: color }]}
            onPress={() => navigation.navigate('Game', { difficulty: key })}
            activeOpacity={0.7}
          >
            <View style={styles.difficultyInfo}>
              <Text style={[styles.difficultyLabel, { color }]}>{label}</Text>
              <Text style={styles.difficultyDesc}>{desc}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Классическая головоломка.{'\n'}Заполни поле цифрами от 1 до 9.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 32,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  difficultiesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  difficultyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cellBorder,
  },
  difficultyInfo: {
    gap: 4,
  },
  difficultyLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  difficultyDesc: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  arrow: {
    fontSize: 22,
    color: colors.textMuted,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
