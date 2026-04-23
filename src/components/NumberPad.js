import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

const NumberPad = ({ onNumberPress, onErase, onNoteToggle, noteMode, remainingCounts }) => {
  return (
    <View style={styles.container}>
      <View style={styles.numbersRow}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberBtn,
              remainingCounts?.[num] === 0 && styles.numberBtnComplete,
            ]}
            onPress={() => onNumberPress(num)}
            activeOpacity={0.6}
          >
            <Text style={[
              styles.numberText,
              remainingCounts?.[num] === 0 && styles.numberTextComplete,
            ]}>
              {num}
            </Text>
            {remainingCounts && (
              <Text style={styles.remainingCount}>
                {remainingCounts[num] ?? 9}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={onErase} activeOpacity={0.6}>
          <Text style={styles.actionText}>Стереть</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, noteMode && styles.actionBtnActive]}
          onPress={onNoteToggle}
          activeOpacity={0.6}
        >
          <Text style={[styles.actionText, noteMode && styles.actionTextActive]}>
            Заметки
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 12,
  },
  numberBtn: {
    width: 36,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cellBorder,
  },
  numberBtnComplete: {
    borderColor: 'transparent',
    opacity: 0.35,
  },
  numberText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  numberTextComplete: {
    color: colors.textMuted,
  },
  remainingCount: {
    fontSize: 8,
    color: colors.textMuted,
    position: 'absolute',
    top: 2,
    right: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    maxWidth: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cellBorder,
  },
  actionBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  actionTextActive: {
    color: colors.text,
  },
});

export default React.memo(NumberPad);
