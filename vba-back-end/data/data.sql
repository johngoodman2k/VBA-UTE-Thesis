
create table tournaments
(
    id character varying(40),
    name character varying(40),
    description character varying(120),
    startDate  timestamp with time zone,
    endDate  timestamp with time zone,
    type character varying(40),
    status character varying(40),
    competitor character varying(10),
    rounds jsonb[],
    standingId character varying(40),
    createdAt timestamp with time zone default now(),
    constraint tournaments_pkey primary key (id)
);

insert into tournaments (id, name, description, startdate, enddate, type, competitor ,status) values ('1', 'LeagueA', 'TMA Solution lab6', '2022-8-7', '2022-8-7','roundrobin' ,'double' ,'cai gi do');


-- insert into teams (id, name, status, description,logo) values ('001','VTV Bình Điền Long An','A','bảng A','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg');
-- insert into teams (id, name, status, description,logo) values ('002','Ngân hàng Công thương','I','bảng A','https://media.loveitopcdn.com/3807/logo-viettinbank-1.png');
-- insert into teams (id, name, status, description,logo) values ('003','Than Quảng Ninh','A','bảng B','https://upload.wikimedia.org/wikipedia/vi/thumb/a/a0/Logo_CLB_Than_Qu%E1%BA%A3ng_Ninh.svg/206px-Logo_CLB_Than_Qu%E1%BA%A3ng_Ninh.svg.png');


create table matches (
    id character varying(40),
    tournamentId character varying(40),
    round character varying(40),
    home jsonb,
    away jsonb,
    homeResult character varying(40) DEFAULT '0',
    awayResult character varying(40) DEFAULT '0',
    createdAt timestamp with time zone default now(),
    matchDay timestamp with time zone default now(),
    referee  character varying(40),
    spectators character varying(40),
    assistance jsonb,
    process jsonb,
    constraint matchs_pkey primary key (id)
); 


-- insert into matches (id, tournamentId, round, team1, team2, score1, score2, dateCreated) values (DEFAULT,'ironman','01','VTV Bình Điền Long An','Ngân hàng Công thương',2,1,'2022-06-22');



insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('1','A','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('2','B','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('3','C','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('4','D','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('5','E','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('6','F','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('7','G','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('8','H','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('9','M','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('10','N','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('11','R','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('12','T','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('13','Y','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('14','U','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('15','I','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournamentId) values ('16','O','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft','1');

create table teams (
    id character varying(40),
    teamname character varying(40),
    teamlogo character varying(200),
    stadiumname character varying(40),
    stadiumpic character varying(200),
    description character varying(200),
    status character varying(40),
    color character varying(40),
    tournamentId character varying(40),
    eliminated boolean default false,
    createdAt timestamp with time zone default now(),
    constraint teams_pkey primary key (id)
); 


create table rounds
(
    id character varying(40),
    roundname character varying(120),
    tournamentid character varying(120),
    matches jsonb[],
    createdAt timestamp with time zone default now(),
    constraint rounds_pkey primary key (id)
);

create table standings
(
    id character varying(40),
    tournamentId character varying(40),
    statistics jsonb[],
    createdAt timestamp with time zone default now()
);


