
INSERT INTO "Game" VALUES
(4,'Sunday 8 July 2018',30,'7-6','Jogo bem disputado, resultado poderia ter caido para qualquer lado. Salientar nota artistica no meio campo...'),
(3,'Sunday 1 July 2018',30,'11-4','Equipa muito mais dominadora e eficaz que a outra. Diferenca de golos um pouco injusta para o jogo disputado.'),
(2,'Sunday 26 June 2018',40,'5-2','Ganhou a melhor equipa, com os jogadores de maior qualidade e talento.'),
(1,'Sunday 22 June 2018',49,'7-5','Jogo bem disputado, resumiu-se aos pormenores taticos e eficacia.')
(6,'Sunday 15 July 2018',30,'5-7','Jogo equilibrado com a equipa que perdeu a comecar melhor e adiantar-se no marcador. No entanto boa recuperacao da equipa adversaria, acabando por ganhar o jogo'),
(8,'Sunday 22 July 2018',30,'5-8','A equipa que perdeu ate comecou a ganhar, mas devido a erros permitiu que a outra equipa chegasse ao empate. Bruno Santos e decisivo e acaba por marcar os golos que dao a vitoria.')
(9,'Thursday 26 July 2018',40,'6-7','Jogo bastante equilibrado, ambas as equipas mereciam ganhar, acabando porque fazer a diferença a eficacia dos remates de uma equipa.')
(10,'Sunday 29 July 2018',30,'7-10','Equipa vencedora ganha uma confortavel vantagem no inicio do jogo. De seguida boa resposta do adversario mas a qualidade do Bruno Santos mais uma vez faz a diferença.Jogo bem dispotado.'),
(11,'Tuesday 31 July 2018',40,'8-5','Jogo a um ritmo bastante elevado, bem disputado e o resultado podia ter caida para qualquer lado.'),

update "Game" set weather='Clear sky Temp:23 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606807.svg' where id=1;
update "Game" set weather='Passing clouds Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=2	;
update "Game" set weather='Passing clouds Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=3	;
update "Game" set weather='Passing clouds Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=4	;
update "Game" set weather='Passing clouds Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=5	;
update "Game" set weather='Passing clouds Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=6	;
update "Game" set weather='Passing clouds Temp:18 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=7	;
update "Game" set weather='Passing clouds Temp:18 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=8	;
update "Game" set weather='Clear sky Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606807.svg' where id=9	;
update "Game" set weather='Passing clouds Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606796.svg' where id=10	;
update "Game" set weather='Clear sky Temp:19 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606807.svg' where id=11;
update "Game" set weather='Clear sky Temp:32 C ' , weatherImg='https://image.flaticon.com/icons/svg/606/606807.svg' where id=12;

CREATE TABLE public."Game"
(
  id numeric NOT NULL,
  date VARCHAR(30),
  price numeric,
  result VARCHAR(30),
  comments VARCHAR(255),
  CONSTRAINT "Game_pkey" PRIMARY KEY (id)
)

CREATE TABLE GameInfo(
   id numeric PRIMARY KEY  NOT NULL references "Game"(id),
   date           varchar(255)    NOT NULL,
   price            INT     NOT NULL,
   result VARCHAR(30),
   description varchar(255),
   team1         varchar(255)array,
   team2         varchar(255)array
);

INSERT INTO gameinfo VALUES
(7,'Wednesday 18 July 2018',40,'6-5','Jogo bastante equilibrado e bem disputado, sendo que a equipa da casa acaba por ganhar devido aos golos que surgiram ao cair do pano.'),
(6,'Sunday 15 July 2018',30,'5-7','Jogo equilibrado com a equipa que perdeu a comecar melhor e adiantar-se no marcador. No entanto boa recuperacao da equipa adversaria, acabando por ganhar o jogo'),
(5,'Friday 13 July 2018',30,'5-7','Jogo começou mal para a equipa que perdeu, demonstrando descoordenacao tatica. Teve uma boa reaccao chegando a esta apenas a perder por um golo. No entanto a outra equipa teve merito e mereceu a vitoria.','{"{"name":"Filipe Machado","id":1}","{"name":"Carolina Azeitona","id":12}","{"name":"Pedro Santos","id":2}","{"name":"Paulo Calaia","id":3}","{"name":"Rafael Francisco","id":8}","{"name":"Miguel Silva","id":21}","{"name":"Amigo do Silva"}"}','{"{"name":"Daniel Filipe"}","{"name":"Pipo","id":20}","{"name":"Amigo Daniel"}","{"name":"Amigo Daniel"}","{"name":"Amigo Daniel"}","{"name":"Amigo Daniel"}","{"name":"Amigo Daniel"}"}'),
(4,'Sunday 8 July 2018',30,'7-6','Jogo bem disputado, resultado poderia ter caido para qualquer lado. Salientar nota artistica no meio campo...','{"Informacao indisponivel"}','{"Informacao indisponivel"}'),
(3,'Sunday 1 July 2018',30,'11-4','Equipa muito mais dominadora e eficaz que a outra. Diferenca de golos um pouco injusta para o jogo disputado.','{"Informacao indisponivel"}','{"Informacao indisponivel"}'),
(2,'Sunday 26 June 2018',40,'5-2','Ganhou a melhor equipa, com os jogadores de maior qualidade e talento.','{"Informacao indisponivel"}','{"Informacao indisponivel"}'),
(1,'Sunday 22 June 2018',49,'7-5','Jogo bem disputado, resumiu-se aos pormenores taticos e eficacia.','{"Informacao indisponivel"}','{"Informacao indisponivel"}')
