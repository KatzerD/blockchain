const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 2; // Número de ceros iniciales requeridos en el hash para considerarlo válido
const MINE_RATE = 5000; // Tiempo en milisegundos para ajustar la dificultad del minado

class Block {
  constructor(time, previousHash, hash, data, nonce, difficulty) {
    this.time = time; // Tiempo en el que se creó el bloque
    this.previousHash = previousHash; // Hash del bloque anterior
    this.hash = hash; // Hash del bloque actual
    this.data = data; // Datos almacenados en el bloque
    this.nonce = nonce; // Número utilizado para encontrar un hash válido
    this.difficulty = difficulty; // Dificultad del bloque, afecta la minería
  }

  // Método estático para crear el bloque génesis
  static get genesis() {
    const time = new Date('2009-03-01').getTime();
    return new this(
      time,
      'undefined',
      'genesis_block',
      'Genesis Block',
      0,
      DIFFICULTY
    );
  }

  // Método estático para minar un nuevo bloque
  static mine(previousBlock, data) {
    const { hash: previousHash, difficulty: prevDifficulty, time: prevTime } = previousBlock;
    let difficulty = prevDifficulty;
    let hash;
    let time;
    let nonce = 0;
    
    // Minado: buscar un nonce que produzca un hash con la dificultad requerida
    do {
      time = Date.now();
      nonce += 1;

      // Genera un hash basado en el hash anterior, tiempo, datos, nonce y dificultad
      hash = SHA256(previousHash + time + data + nonce + difficulty).toString();

      // Ajusta la dificultad basada en el tiempo de creación del bloque anterior
      if (time - prevTime > MINE_RATE) {
        difficulty = Math.max(prevDifficulty - 1, 1); // No permitir dificultad menor a 1
      } else {
        difficulty = prevDifficulty + 1;
      }

    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty)); // Proof of Work: Verifica que el hash cumple con la dificultad

    return new this(time, previousHash, hash, data, nonce, difficulty);
  }

  // Método para representar el bloque como una cadena
  toString() {
    const {
      time,
      previousHash,
      hash,
      data,
      nonce,
      difficulty
    } = this;

    return `📦 Block - 
    Time: ${time}
    Previous Hash: ${previousHash}
    Hash: ${hash}
    Data: ${data}
    Nonce: ${nonce}
    Difficulty: ${difficulty}
    ---------------------------------------`;
  }
}

module.exports = Block;