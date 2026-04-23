// Генерация и решение судоку

/**
 * Создаёт пустое поле 9x9 (все нули)
 */
const createEmptyGrid = () => Array.from({ length: 9 }, () => Array(9).fill(0));

/**
 * Проверяет, можно ли поставить число в позицию
 */
const isValid = (grid, row, col, num) => {
  // Проверка строки
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) return false;
  }
  // Проверка столбца
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) return false;
  }
  // Проверка блока 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  return true;
};

/**
 * Решает судоку (backtracking) — возвращает true если решено
 */
const solve = (grid) => {
  const g = grid.map(r => [...r]);
  return _solve(g) ? g : null;
};

const _solve = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (_solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

/**
 * Генерирует полностью решённое поле с помощью backtracking + shuffle
 */
const generateSolvedGrid = () => {
  const grid = createEmptyGrid();
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const fill = (g) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (g[row][col] === 0) {
          const shuffled = [...nums].sort(() => Math.random() - 0.5);
          for (const num of shuffled) {
            if (isValid(g, row, col, num)) {
              g[row][col] = num;
              if (fill(g)) return true;
              g[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  
  fill(grid);
  return grid;
};

/**
 * Проверяет, имеет ли головоломка единственное решение
 */
const hasUniqueSolution = (grid) => {
  let solutions = 0;
  
  const count = (g) => {
    if (solutions > 1) return;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (g[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(g, row, col, num)) {
              g[row][col] = num;
              count(g);
              g[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    solutions++;
  };
  
  count(grid.map(r => [...r]));
  return solutions === 1;
};

/**
 * Создаёт головоломку заданной сложности
 * difficulty: 'easy' | 'medium' | 'hard'
 * 
 * Easy: ~36-40 пустых
 * Medium: ~41-47 пустых
 * Hard: ~48-54 пустых
 */
export const generatePuzzle = (difficulty = 'medium') => {
  // Сколько клеток оставить пустыми
  const emptyCounts = { easy: 36, medium: 44, hard: 52 };
  const targetEmpty = emptyCounts[difficulty] || 44;
  
  // Генерируем решённое поле
  const solution = generateSolvedGrid();
  
  // Создаём копию для головоломки
  const puzzle = solution.map(r => [...r]);
  
  // Удаляем клетки
  const positions = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  
  // Перемешиваем
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= targetEmpty) break;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    removed++;
  }
  
  return { puzzle, solution };
};

/**
 * Получает заметки (pencil marks) для всех пустых клеток
 */
export const getNotes = (grid) => {
  const notes = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => []));
  
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, r, c, num)) {
            notes[r][c].push(num);
          }
        }
      }
    }
  }
  
  return notes;
};

/**
 * Проверяет, полностью ли решена головоломка
 */
export const isComplete = (grid) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) return false;
    }
  }
  // Проверяем валидность каждого заполнения
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = grid[r][c];
      grid[r][c] = 0;
      if (!isValid(grid, r, c, num)) {
        grid[r][c] = num;
        return false;
      }
      grid[r][c] = num;
    }
  }
  return true;
};

export { isValid, solve };
