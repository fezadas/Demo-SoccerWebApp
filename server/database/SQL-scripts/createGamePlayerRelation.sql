CREATE TABLE GamePlayerRelation
(
  FOREIGN KEY (idGame) REFERENCES "Game"(id),
  FOREIGN KEY (idPlayer) REFERENCES Player(id),
  idGame numeric NOT NULL,
  idPlayer numeric NOT NULL,
  goals numeric NOT NULL,
  assits numeric NOT NULL,
  team numeric NOT NULL,
  CONSTRAINT pk_GamePlayerRelation PRIMARY KEY (idGame,idPlayer)
)

INSERT INTO GamePlayerRelation VALUES 
(7,1,0,1,1),
(7,2,2,0,1),
(7,26,2,0,1),
(7,6,1,0,2),
(7,7,2,0,1),
(7,8,0,0,1),
(7,13,0,0,1),
(7,21,0,0,2),
(7,20,1,0,2),
(7,25,0,0,2)


INSERT INTO GamePlayerRelation VALUES 
(5,1,2,1,1),
(6,1,0,1,1),
(5,2,0,0,1),
(6,2,0,1,1),
(5,3,1,1,1),
(6,3,2,1,1),
(6,4,2,2,1),
(6,5,0,0,1),
(5,8,0,0,1),
(6,8,0,0,1),
(5,21,1,0,1),
(6,21,0,0,2),
(5,12,0,0,1),
(6,22,2,0,2),
(6,6,1,0,2),
(6,7,1,1,1),
(6,11,2,1,2),
(5,20,1,0,2)



SELECT idGame,idPlayer,name,P.goals,P.assits,team FROM Player INNER JOIN (
	SELECT idGame,idPlayer,GamePlayerRelation.goals,GamePlayerRelation.assits,GamePlayerRelation.team FROM (
	(SELECT * FROM "Game" where id=5) as G INNER JOIN GamePlayerRelation ON G.id = GamePlayerRelation.idGame)) as P
ON Player.id=P.idPlayer 



