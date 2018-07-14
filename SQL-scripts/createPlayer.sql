('Filipe Machado',1997,1,1,1), 
('Pedro Santos',1995,2,0,0),
('Paulo Calaia',1997,3,1,1),
('Duarte Jesus',1998,4,0,0),
('Joao Franco',1997,5,0,0),
('Goncalo Pereira',1997,6,0,0), 
('Nuno Gomes',1997,7,0,0),
('Rafael Francisco',1997,8,0,0), 
('Bernardo Cascais',1997,9,0,0),
('Filipe Ribeiro',1997,10,0,0), 
('Filipe Ferreira',1997,11,0,0), 
('Carolina Azeitona',1997,12,0,0),
('Jose Santos',1997,13,0,0), 
('Ricardo Martins',1997,14,0,0), 
('Andre Caetano',1997,15,0,0), 
('Manuel de Oliveira',1997,16,0,0), 
('Filipe Santos',1997,17,0,0),
('Bernardo Borges',1997,18,0,0),
('Diogo Mestre',1997,19,0,0), 
('Pipo Duarte',1997,20,1,0), 
('Miguel Silva',1998,21,1,0), 
('Joao Raminhas',1997,22,0,0), 
('Bruno Martins',1996,23,0,0), 
('Tiago Travassos',1997,24,0,0) 

CREATE TABLE Player (
        name varchar(50) not null,
		year_of_birth varchar(50) not null,
		id     numeric primary key,
		goals numeric not null,
		assists numeric not null
);

CREATE TABLE PlayerInfo (
		name varchar(50) ,
		year_of_birth varchar(50) ,
        id      numeric references Player(id),
        goals      numeric ,
        assists numeric ,
        description varchar(255),
		img varchar(255),
		position varchar(10)
);