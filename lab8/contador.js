// contador.js
function contarNumeros(arr) {
    let positivos = 0, negativos = 0, ceros = 0;

    for (let num of arr) {
        if (num > 0) positivos++;
        else if (num < 0) negativos++;
        else ceros++;
    }

    return { positivos, negativos, ceros };
}

// Prueba
const resultado = contarNumeros([3, -1, 0, 7, -5, 0, 2]);
console.log(resultado);
// Esperado: { positivos: 3, negativos: 2, ceros: 2 }
