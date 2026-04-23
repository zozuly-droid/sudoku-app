import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';
import Board from '../components/Board';
import NumberPad from '../components/NumberPad';
import Timer from '../components/Timer';
import { generatePuzzle, isComplete, isValid } from '../utils/sudoku';
import { colors } from '../utils/theme';

const GameScreen = ({ route, navigation }) => {
  const { difficulty = 'medium' } = route.params || {};

  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [grid, setGrid] = useState(null);
  const [initialGrid, setInitialGrid] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null); // [row, col]
  const [noteMode, setNoteMode] = useState(false);
  const [notes, setNotes] = useState(null); // 9x9 массив массивов чисел
  const [gameOver, setGameOver] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  // Инициализация игры
  useEffect(() => {
    const { puzzle: p, solution: s } = generatePuzzle(difficulty);
    setPuzzle(p);
    setSolution(s);
    setGrid(p.map(r => [...r]));
    setInitialGrid(p.map(r => [...r]));
    setNotes(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));
    setSelectedCell(null);
    setNoteMode(false);
    setGameOver(false);
    setTimerRunning(true);
  }, [difficulty]);

  // Подсчёт оставшихся цифр
  const remainingCounts = useMemo(() => {
    if (!grid || !solution) return {};
    const counts = {};
    for (let n = 1; n <= 9; n++) counts[n] = 9;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] !== 0 && counts[grid[r][c]] > 0) {
          counts[grid[r][c]]--;
        }
      }
    }
    return counts;
  }, [grid, solution]);

  const handleCellPress = useCallback((row, col) => {
    if (gameOver) return;
    setSelectedCell([row, col]);
  }, [gameOver]);

  const handleNumberPress = useCallback((num) => {
    if (!selectedCell || gameOver) return;
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== 0) return; // данная клетка

    const newGrid = grid.map(r => [...r]);

    if (noteMode) {
      // Режим заметок
      const newNotes = notes.map(r => r.map(c => [...c]));
      const currentNotes = newNotes[row][col];
      if (currentNotes.includes(num)) {
        newNotes[row][col] = currentNotes.filter(n => n !== num);
      } else {
        newNotes[row][col] = [...currentNotes, num].sort();
      }
      setNotes(newNotes);
    } else {
      // Обычный ввод
      newGrid[row][col] = num;
      setGrid(newGrid);

      // Проверка на победу
      if (isComplete(newGrid)) {
        setGameOver(true);
        setTimerRunning(false);
        Alert.alert(
          'Победа! 🎉',
          `Ты решил судоку уровня "${difficulty}"!`,
          [{ text: 'Отлично!', onPress: () => {} }]
        );
      }
    }
  }, [selectedCell, grid, initialGrid, notes, noteMode, gameOver, difficulty]);

  const handleErase = useCallback(() => {
    if (!selectedCell || gameOver) return;
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== 0) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = 0;
    setGrid(newGrid);

    // Очищаем заметки
    const newNotes = notes.map(r => r.map(c => [...c]));
    newNotes[row][col] = [];
    setNotes(newNotes);
  }, [selectedCell, grid, initialGrid, notes, gameOver]);

  const handleNoteToggle = useCallback(() => {
    setNoteMode(prev => !prev);
  }, []);

  // Пока инициализация
  if (!grid) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Генерируем судоку...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Верхняя панель */}
      <View style={styles.topBar}>
        <Text style={styles.difficultyLabel}>
          {difficulty === 'easy' ? 'Лёгкий' : difficulty === 'medium' ? 'Средний' : 'Сложный'}
        </Text>
        <Timer running={timerRunning} />
        <View style={styles.topBarRight}>
          <Text style={styles.mistakesLabel}>
            {noteMode ? '✏️ Заметки' : ''}
          </Text>
        </View>
      </View>

      {/* Игровое поле */}
      <View style={styles.boardWrapper}>
        <Board
          grid={grid}
          initialGrid={initialGrid}
          selectedCell={selectedCell}
          notes={notes}
          onCellPress={handleCellPress}
        />
      </View>

      {/* Панель ввода */}
      <NumberPad
        onNumberPress={handleNumberPress}
        onErase={handleErase}
        onNoteToggle={handleNoteToggle}
        noteMode={noteMode}
        remainingCounts={remainingCounts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  topBarRight: {
    alignItems: 'flex-end',
  },
  mistakesLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  boardWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default GameScreen;
