const Blockchain = require('./src/blockchain');

const blockchain = new Blockchain();

async function run() {
    // Agregar bloques a la cadena y medir el tiempo para el Proof of Work
    const startTime = Date.now();

    for (let i = 1; i <= 100; i++) {
        const block = blockchain.addBlock(`Bloque ${i}`);
        console.log(block.toString());
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    // Imprimir la cadena de bloques
    await blockchain.print();

    // Validar la cadena
    await blockchain.validateChain();

    console.log(`------------- Tiempo total para minar 10 bloques: ${elapsedTime} ms -------------`);
}

run();

