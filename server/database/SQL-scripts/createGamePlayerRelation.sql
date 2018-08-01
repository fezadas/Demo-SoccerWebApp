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
(11,1,0,1,1),  
(11,2,0,1,1),
(11,3,1,1,1),
(11,11,2,2,1), 
(11,28,1,1,1),  
(11,27,4,1,1), 
(11,6,0,1,1),  
(11,16,1,0,2),   
(11,18,1,1,2),  
(11,21,1,2,2),
(11,20,1,1,2)

update player set assists=assists+1 where id=



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



