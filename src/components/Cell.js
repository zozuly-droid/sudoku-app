import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../utils/theme';

const Cell = ({ value, notes, isGiven, isSelected, isHighlighted, isSameNumber, row, col, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isSelected && styles.selected,
        isHighlighted && styles.highlighted,
        isSameNumber && styles.sameNumber,
      ]}
      onPress={() => onPress(row, col)}
      activeOpacity={0.7}
    >
      {value !== 0 ? (
        <Text style={[styles.cellText, isGiven && styles.givenText, !isGiven && styles.inputText]}>
          {value}
        </Text>
      ) : notes && notes.length > 0 ? (
        <View style={styles.notesContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <Text key={n} style={styles.noteText}>
              {notes.includes(n) ? n : ''}
            </Text>
          ))}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cellDefault,
    borderWidth: 0.5,
    borderColor: colors.cellBorder,
  },
  selected: {
    backgroundColor: colors.cellSelected,
  },
  highlighted: {
    backgroundColor: colors.cellHighlight,
  },
  sameNumber: {
    backgroundColor: colors.cellSameNumber,
  },
  cellText: {
    fontSize: 22,
    fontWeight: '500',
    color: colors.cellInput,
  },
  givenText: {
    color: colors.cellGiven,
    fontWeight: '700',
  },
  inputText: {
    color: colors.cellInput,
  },
  notesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  noteText: {
    width: '33.33%',
    height: '33.33%',
    fontSize: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.cellNote,
  },
});

export default React.memo(Cell);
