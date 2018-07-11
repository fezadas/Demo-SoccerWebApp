
INSERT INTO "Game" VALUES
(4,'Sunday 8 July 2018',30,'7-6','Jogo bem disputado, resultado poderia ter caido para qualquer lado. Salientar nota artistica no meio campo...'),
(3,'Sunday 1 July 2018',30,'11-4','Equipa muito mais dominadora e eficaz que a outra. Diferenca de golos um pouco injusta para o jogo disputado.'),
(2,'Sunday 26 June 2018',40,'5-2','Ganhou a melhor equipa, com os jogadores de maior qualidade e talento.'),
(1,'Sunday 22 June 2018',49,'7-5','Jogo bem disputado, resumiu-se aos pormenores taticos e eficacia.')

CREATE TABLE public."Game"
(
  id numeric NOT NULL,
  date VARCHAR(30),
  price numeric,
  result VARCHAR(30),
  comments VARCHAR(255),
  CONSTRAINT "Game_pkey" PRIMARY KEY (id)
)