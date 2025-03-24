import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.square} onPress={onPress}>
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = calculateWinner(newBoard);
    setWinner(gameWinner);
    if (gameWinner) {
      Alert.alert('Parabéns!', `Jogador ${gameWinner} venceu!`);
    } else if (!newBoard.includes(null)) {
      Alert.alert('Empate!', 'O jogo terminou sem vencedor!');
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.instrucao}>
        {winner ? `Vencedor: ${winner}` : 
         !board.includes(null) ? 'Empate!' : `Próximo jogador: ${isXNext ? 'X' : 'O'}`}
      </Text>

      <View style={styles.board}>
        <View style={styles.row}>
          <Square value={board[0]} onPress={() => handleClick(0)} />
          <Square value={board[1]} onPress={() => handleClick(1)} />
          <Square value={board[2]} onPress={() => handleClick(2)} />
        </View>
        <View style={styles.row}>
          <Square value={board[3]} onPress={() => handleClick(3)} />
          <Square value={board[4]} onPress={() => handleClick(4)} />
          <Square value={board[5]} onPress={() => handleClick(5)} />
        </View>
        <View style={styles.row}>
          <Square value={board[6]} onPress={() => handleClick(6)} />
          <Square value={board[7]} onPress={() => handleClick(7)} />
          <Square value={board[8]} onPress={() => handleClick(8)} />
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  instrucao: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  board: {
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
