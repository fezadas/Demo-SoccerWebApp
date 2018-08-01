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

('Pedro Santos',1997,29,0,1)
( 

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

        name        | year_of_birth | id | goals | assists |                                                     description                                                     |                                                                              img                                                                               | position
--------------------+---------------+----+-------+---------+---------------------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+----------
 Filipe Machado     | 1997          |  1 |     1 |       1 | Normalmente joga no lado direito do campo. No entanto pode assumir qualquer posicao (polivalente).                  | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/16406850_1524056217623351_522742296701848008_n.jpg?_nc_cat=0&oh=9ec75c8d19f85cfc836c25825eee96ed&oe=5BE82A28   | LD,M,A
 Pedro Santos       | 1995          |  2 |     0 |       0 | Central de raiz, muito forte no corte e sustenta a defesa da equipa pela qual joga.                                 | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/14316894_10210679443451104_8499401262329469812_n.jpg?_nc_cat=0&oh=9f201e3d60ab973e21efd43ffed1f8f0&oe=5BD26609 | C
 Paulo Calaia       | 1997          |  3 |     1 |       1 | Maestro do meio campo, conhecido pelas cuecas que tenta dar em todos os jogos. Remate forte e colocado.             | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/10413332_717321094982469_397968563054184262_n.jpg?_nc_cat=0&oh=d4be21dfded9355b56e91db1ece38427&oe=5BDCE4F8    | M
 Duarte Jesus       | 1998          |  4 |     0 |       0 | Ponta de lança que pode jogar como extremo. Raramente nao acerta no poste.                                          | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/11114084_956074437771083_1624936962195619420_n.jpg?_nc_cat=0&oh=b70206e23c7425db44b552cb62f92d67&oe=5BCD7EAB   | A
 Joao Franco        | 1997          |  5 |     0 |       0 | Guarda redes desde pequenino, faz defesas espetaculares e frangos magnificos.                                       | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/15894281_10209110084045102_3333362404553883033_n.jpg?_nc_cat=0&oh=5d027153695ae742f5b6e294f78a0130&oe=5B9E864A | GR
 Goncalo Pereira    | 1997          |  6 |     0 |       0 | Joga como extremos, e rapido e forte na disputa de bola.                                                            | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/11041804_1024302730931371_1722118603171641895_n.jpg?_nc_cat=0&oh=7ccd39afc0db0195d42d6d3050942e01&oe=5BCA4B48  | L,E
 Nuno Gomes         | 1997          |  7 |     0 |       0 | Sabe o que fazer com a bola, trata-a com cuidado. Forte na corrida e controlo de bola.                              | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/16708492_1374997925878626_6467159753258285528_n.jpg?_nc_cat=0&oh=8768ff402c3514170617c1a6f2cca3c8&oe=5BDAF8A1  | M
 Rafael Francisco   | 1997          |  8 |     0 |       0 | Jogador mais alto do grupo. Desempenha muito bem o papel de defesa e transporta bem a bola nas transicoes.          | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/19884528_1984444318247723_5110853024727795632_n.jpg?_nc_cat=0&oh=57a079ae52bdb91a0546101588bbd0a0&oe=5BDDADB6  | C,L
 Bernardo Cascais   | 1997          |  9 |     0 |       0 | Rápido, tem  tecnica e remate potente. Um matador fora e dentro de area.                                            | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/15823303_1702055476486622_1703738634341264569_n.jpg?_nc_cat=0&oh=3e53b0e6a76787736ed84c7d439333e2&oe=5BDCD2AE  | A,E
 Filipe Ribeiro     | 1997          | 10 |     0 |       0 | Tem rasgos de central, mas pode desempenhar posicao de trinco. Forte no corte de bola.                              | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/1184992_689949401018756_1407918259_n.jpg?_nc_cat=0&oh=bcc231bfa7d7c20f61107df4fecbafac&oe=5BD46A43             | M,C
 Filipe Ferreira    | 1997          | 11 |     0 |       0 | Claramente o melhor defesa do grupo, agressivo na forma como chega a bola, dificil de passar por ele.               | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/13012672_1167242109983095_7996329996045966389_n.jpg?_nc_cat=0&oh=d91b14b33429fbb7fcda09d69fced9e4&oe=5BDC8308  | C
 Carolina Azeitona  | 1997          | 12 |     0 |       0 | Unica mulher no grupo e claramente encosta muito homens a um canto. Exelente tecnica e forte na posicao de lateral. | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/11215116_1033748449983251_2718166895718898789_n.jpg?_nc_cat=0&oh=17da0623e34f973d277fdc9c6f8460ef&oe=5BD5B2E4  | LE
 Jose Santos        | 1997          | 13 |     0 |       0 | Costuma jogar a extremo, mas e muito forte nas transicoes defensivas e recuperacao de bola. Rapido.                 | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/24232080_788139971393892_6493669978712752679_n.jpg?_nc_cat=0&oh=86e92c31b879a7e01505cabb20886249&oe=5BD47282   | L,E
 Ricardo Martins    | 1997          | 14 |     0 |       0 | Tem um faro para o golo. Pressiona muito bem na frente e remata bem, marcando muitos golos.                         | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/11960107_1189397577751643_3756667246795575640_n.jpg?_nc_cat=0&oh=c12dd22bd1e4699b60689093ec13ef29&oe=5BE0BC2D  | A
 Andre Caetano      | 1997          | 15 |     0 |       0 | Ao longo do tempo foi se tornando um defesa maduro, tem um remate potente e colocado.                               | https://scontent.flis9-1.fna.fbcdn.net/v/t31.0-8/10494916_689535881132870_356236474718920188_o.jpg?_nc_cat=0&oh=717019dccdf1812d7952e42ac1fa64c0&oe=5BEBAECB   | C
 Manuel de Oliveira | 1997          | 16 |     0 |       0 | Impressionante de cabeça, sabe segurar a bola na frente e marcar golos.                                             | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/12196164_920958717983417_3887431041173011046_n.jpg?_nc_cat=0&oh=7fabf226f66c6ed19a6b1b84571ebfc2&oe=5BCF6D84   | A
 Filipe Santos      | 1997          | 17 |     0 |       0 | Um defesa com muita qualidade a sair com a bola, podendo jogar em posicoes mais adiantadas.                         | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/14495305_1314582595242344_1861537514373035029_n.jpg?_nc_cat=0&oh=ca53c94285f415926ad24190f6432b4b&oe=5BE6BD64  | C,L
 Bernardo Borges    | 1997          | 18 |     0 |       0 | Muita tecnica nos pes e sabe o que fazer com a bola. Exelente na visao de jogo.                                     | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/19642627_1826200497399863_4068695832518683993_n.jpg?_nc_cat=0&oh=cef9f62cd5e41925b841b3db49c39b11&oe=5BD8DC98  | M
 Diogo Mestre       | 1997          | 19 |     0 |       0 | Desepenha qualquer posicao na defesa, podendo jogar um pouco mais subido. Rapido.                                   | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/27067904_1133137546828505_6130067207581500860_n.jpg?_nc_cat=0&oh=9ef8329f36df88ddf21efd2903a24e7b&oe=5BDE2F8B  | L,C
 Pipo Duarte        | 1997          | 20 |     1 |       0 | Pode jogar em qualquer posicao. Tem tecnica e bom remate.                                                           | https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/26907837_1612564858819143_8359354381257285975_n.jpg?_nc_cat=0&oh=830c3c8eafb77788a0c420105df0bf58&oe=5BDA80AC  | M,C
 Miguel Silva       | 1998          | 21 |     1 |       0 | Lateral esquerdo puro, rapido e cruza bem.                                                                          |                                                                                                                                                                |
 Joao Raminhas      | 1997          | 22 |     0 |       0 | Joga em posicoes mais interiores, no entanto sabe conduzir a bola em transicoes ofensivas.                          |                                                                                                                                                                |
 Bruno Martins      | 1996          | 23 |     0 |       0 | Ponta de lança que segura bem a bola e sempre a procura de espaco para o golo.                                      |                                                                                                                                                                |
 Tiago Travassos    | 1997          | 24 |     0 |       0 | Tecnicamente evoluido e sabe distribuir jogo, jogando no meio do terreno.                                           |                                                                                                                                                                |