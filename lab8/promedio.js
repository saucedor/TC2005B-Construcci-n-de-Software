// promedio.js
function promedio(arr) {
    if (arr.length === 0) return 0;
    const suma = arr.reduce((a, b) => a + b, 0);
    return suma / arr.length;
}

// Prueba
console.log(promedio([10, 20, 30])); // Debería imprimir 20
