-- LAB 25: Transacciones - César Ignacio Saucedo Rodríguez 

-- Transacción 1: Agrega 2 entregas 
START TRANSACTION;
INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1000, 'ACM010101AAA', 5000, '2025-06-01', 250);
INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1300, 'CEM020202BBB', 5000, '2025-06-01', 300);
COMMIT;

----------------------------------------------------------------------

-- Transacción 2: Error forzado
START TRANSACTION;
INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (9999, 'RFCNOEXISTE', 9999, '2025-06-01', 100); -- Falla por FK
COMMIT;


-----------------------------------------------------------------------

-- Transacción 3: Rollback manual por condición
START TRANSACTION;
INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1300, 'CEM020202BBB', 5002, '2025-06-02', 10);
ROLLBACK;

