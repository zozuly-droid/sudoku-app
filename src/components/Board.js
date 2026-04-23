import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import { colors } from '../utils/theme';

const Board = ({ grid, initialGrid, selectedCell, notes, onCellPress }) => {
  const [selectedRow, selectedCol] = selectedCell || [-1, -1];
  const selectedValue = (selectedRow >= 0 && selectedCol >= 0) ? grid[selectedRow][selectedCol] : 0;

  // Какие ячейки подсвечиваем
  const isHighlighted = useCallback((r, c) => {
    if (selectedRow < 0) return false;
    // Та же строка, столбец или блок
    if (r === selectedRow || c === selectedCol) return true;
    const br = Math.floor(selectedRow / 3) * 3;
    const bc = Math.floor(selectedCol / 3) * 3;
    return r >= br && r < br + 3 && c >= bc && c < bc + 3;
  }, [selectedRow, selectedCol]);

  const isSameNumber = useCallback((r, c) => {
    if (selectedValue === 0) return false;
    return grid[r][c] === selectedValue;
  }, [grid, selectedValue]);

  const renderRow = (row, rowIndex) => (
    <View key={rowIndex} style={[
      styles.row,
      rowIndex % 3 === 0 && styles.rowTopBorder,
      rowIndex === 8 && styles.rowBottomBorder,
    ]}>
      {row.map((cell, colIndex) => (
        <Cell
          key={colIndex}
          value={cell}
          notes={notes?.[rowIndex]?.[colIndex] || []}
          isGiven={initialGrid[rowIndex][colIndex] !== 0}
          isSelected={selectedRow === rowIndex && selectedCol === colIndex}
          isHighlighted={isHighlighted(rowIndex, colIndex)}
          isSameNumber={isSameNumber(rowIndex, colIndex)}
          row={rowIndex}
          col={colIndex}
          onPress={onCellPress}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.board}>
      <View style={styles.grid}>
        {grid.map((row, i) => renderRow(row, i))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: '100%',
    maxWidth: 360,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.cellBorderThick,
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  rowTopBorder: {
    borderTopWidth: 2,
    borderTopColor: colors.cellBorderThick,
  },
  rowBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: colors.cellBorderThick,
  },
});

export default React.memo(Board);
