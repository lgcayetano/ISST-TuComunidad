INSERT INTO Comunidad (id, nombre, codigopresidente, codigovecino, estado) VALUES (1, 'Comunidad 1','PresiCom1','VeciCom1',1),(2, 'Comunidad 2','PresiCom2','VeciCom2',1),(3, 'Com. de Prop. C/Princesa 21','2a3b4637-a527-4dfa-ae99-3f9541278be7','61a487f1-b82a-4889-8537-fb9376aa8c13',1);

INSERT INTO Usuario (id,nombre,email,contrasena,nivel,estado,idcomunidad,permisos) VALUES (1,'Presidente 1','presi1@email.com','$2a$04$IFTCx6sRH/wNOeicYkX61uYu3nwvSirAmErY2XJeplqiuTqh4xNMO',1,1,1,1),(2,'Vecino 1','veci1@email.com','$2a$04$pc/5mYsDW3xz/bhKU.8zPuNqWNa51.oBkMH0AcoQuOHG9lSe.JVsi',2,1,1,1),(3,'Presidente 2','presi2@email.com','$2a$04$tbSqcU7WmYa39HT4b7PdnO4BHk8HGPwu9dyNmkgZ88VFLsdOMaBHC',1,1,2,1),(4,'Vecino 2','veci2@email.com','$2a$04$X6kM4i3qUNXfgf0eDdJLFeoJM1tOSgZl1n4/KFFMpcgAzj/1XQxGG',2,1,2,1);

INSERT INTO COMUNICADO VALUES (1, '2023-04-07', 1, 1, 'msjcom1','titulocom1');
INSERT INTO COMUNICADO VALUES (2, '2023-04-07', 1, 1, 'msjcom1.2','titulocom1.2');
INSERT INTO COMUNICADO VALUES (3, '2023-04-07', 2, 3, 'msjcom2','titulocom2');
INSERT INTO COMUNICADO VALUES (4, '2023-04-07', 2, 3, 'msjcom2.2','titulocom2.2');