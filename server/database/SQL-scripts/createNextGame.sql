CREATE TABLE NextGame(
   id INT PRIMARY KEY     NOT NULL,
   date           varchar(255)    NOT NULL,
   price            INT     NOT NULL,
   team1        varchar(255),
   team2         varchar(255)
);

INSERT INTO NextGame VALUES(1,'Friday 18 July', 30,'{"Filipe Machado","Pedro Santos","Paulo Calaia","Gonçalo Pereira","Eduardo Dinis","Amigo Eduardo","Joao Franco"}',
												  '{"Rafael Francisco","Nuno Gomes","Pipo Duarte","Diogo Pereira","Miguel Silva","Joao Raminhas","Ruben Bexiga"}')
												   
												   
												  
												  