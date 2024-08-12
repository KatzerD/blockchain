const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis]; // Inicia la cadena con el bloque génesis
  }

  // Método para agregar un nuevo bloque a la cadena
  addBlock(data) {
    const previousBlock = this.chain[this.chain.length - 1]; // Obtiene el bloque anterior
    const block = Block.mine(previousBlock, data); // Mina un nuevo bloque con los datos proporcionados
    this.chain.push(block); // Agrega el nuevo bloque a la cadena

    return block;
  }

  // Método para imprimir toda la cadena de bloques
  print() {
    this.chain.forEach(block => console.log(block.toString()));
  }

  // Método para validar la cadena de bloques
  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      const previousBlock = this.chain[i - 1];
        
      // Verificar el hash del bloque anterior
      if (block.previousHash !== previousBlock.hash) {
        console.error(`Bloque ${i} tiene un hash previo invalido`);
        return false;
      }
  
      // Verificar que el hash del bloque cumple con la dificultad
      if (block.hash.substring(0, block.difficulty) !== "0".repeat(block.difficulty)) {
        console.error(`Bloque ${i} tiene un hash invalido`);
        return false;
      }
    }
  
    console.log('Blockchain es valido.');
    return true;
  }
}

module.exports = Blockchain;
