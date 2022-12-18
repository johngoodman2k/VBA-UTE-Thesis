
create table tournaments
(
    id character varying(40),
    name character varying(40),
    description character varying(120),
    startDate  timestamp with time zone,
    endDate  timestamp with time zone,
    type character varying(40),
    competitor character varying(10),
    seasons jsonb[],
    createdAt timestamp with time zone default now(),
    constraint tournaments_pkey primary key (id)
);

insert into tournaments (id, name, description, startdate, enddate, type, competitor) values ('1', 'LeagueA', 'TMA Solution lab6', '2022-8-7', '2022-8-7','elimination' ,'double' );
insert into tournaments (id, name, description, startdate, enddate, type, competitor) values ('2', 'LeagueB', 'TMA Solution lab6', '2022-8-7', '2022-8-7','roundrobin' ,'double');


-- insert into teams (id, name, status, description,logo) values ('001','VTV Bình Điền Long An','A','bảng A','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg');
-- insert into teams (id, name, status, description,logo) values ('002','Ngân hàng Công thương','I','bảng A','https://media.loveitopcdn.com/3807/logo-viettinbank-1.png');
-- insert into teams (id, name, status, description,logo) values ('003','Than Quảng Ninh','A','bảng B','https://upload.wikimedia.org/wikipedia/vi/thumb/a/a0/Logo_CLB_Than_Qu%E1%BA%A3ng_Ninh.svg/206px-Logo_CLB_Than_Qu%E1%BA%A3ng_Ninh.svg.png');


create table matches (
    id character varying(40),
    tournamentId character varying(40),
    round character varying(40),
    home jsonb,
    away jsonb,
    homeResult integer DEFAULT 0,
    awayResult integer DEFAULT 0,
    createdAt timestamp with time zone default now(),
    matchDay timestamp with time zone default now(),
    referee  character varying(40),
    spectators character varying(40),
    assistance jsonb,
    process jsonb[],
    endmatch boolean default false,
    constraint matchs_pkey primary key (id)
); 


-- insert into matches (id, tournamentId, round, team1, team2, score1, score2, dateCreated) values (DEFAULT,'ironman','01','VTV Bình Điền Long An','Ngân hàng Công thương',2,1,'2022-06-22');



insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('1','A','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);

insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('2','B','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('3','C','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('4','D','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('5','E','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('6','F','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('7','G','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('8','H','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('9','M','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('10','N','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('11','R','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('12','T','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('13','Y','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('14','U','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('15','I','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,tournaments) values ('16','O','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg','unknown','hello form downtown','2022-2023 NBA Champs','draft',array['1']::jsonb[]);

insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('1','Hanoi Buffaloes','http://api-news.vba.vn/storage/images/hanoi-buffaloes-logo.png','Hoàng Mai','hello form downtown','2022-2023 NBA Champs','draft','#005aa9',array['1','2']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('2','Thang Long Warriors','http://api-news.vba.vn/storage/images/tlw-audi.png','Tây Hồ','hello form downtown','2022-2023 NBA Champs','draft','#e62027',array['1','2']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('3','Da Nang Dragons','http://api-news.vba.vn/storage/images/danang-dragons-logo.png','Quân Khu 5','hello form downtown','2022-2023 NBA Champs','draft','#F04E23',array['1','2']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('4','Nha Trang Dolphins','http://api-news.vba.vn/storage/images/nha-trang-dolphins-2.png','Nha Trang University','hello form downtown','2022-2023 NBA Champs','draft','#ffd353',array['1','2']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('5','Sai Gon Heat','http://api-news.vba.vn/storage/images/logo-7.png','CIS','hello form downtown','2022-2023 NBA Champs','draft','#D5212E',array['1','2']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('6','Ho Chi Minh City Wings','http://api-news.vba.vn/storage/images/hcmc-wings-new-logo.png','Hồ Xuân Hương','hello form downtown','2022-2023 NBA Champs','draft','#8bc1f4',array['1','2']::jsonb[]);
insert into teams (id, teamname, teamlogo, stadiumname,stadiumpic,description,status,color,tournaments) values ('7','Can Tho Catfish','http://api-news.vba.vn/storage/images/ctc-white.png','Tân Bình','hello form downtown','2022-2023 NBA Champs','draft','#207046',array['1','2']::jsonb[]);


create table teams (
    id character varying(40),
    teamName character varying(40),
    teamLogo character varying(400),
    stadiumname character varying(40),
    stadiumpic character varying(400),
    description character varying(200),
    status character varying(40),
    color character varying(40),
    seasonId character varying(40),
    eliminated boolean default false,
    shortName character varying(40),
    players json[],
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
    seasonId character varying(40),
    statistics jsonb[],
    createdAt timestamp with time zone default now(),
    constraint standings_pkey primary key (id)

);


create table players
(
    id character varying(40),
    firstname character varying(40),
    lastname character varying(40),
    dateOfBirth timestamp with time zone default now(),
    image character varying(120),
    shirtNumber integer,
    height float(3),
    weight integer,
    createdAt  timestamp with time zone default now(),
    teamId character varying(40),
    country character varying(100),
    constraint player_pkey primary key (id)
);
--player
insert into players (id, firstname,lastname, dateOfBirth, image, shirtNumber, teams, card) values ('1', 'Henry','Shane', '2000-10-10', 'https://newsmd2fr.keeng.net/tiin/archive/imageslead/2022/06/25/90_e18184d88e8fe3b9dd0271d1f1a6f7d1.jpg', '8',array['{"id":"1"}']::jsonb[] ,'{"red":"0","yellow":"0"}'::jsonb);
insert into players (id, firstname,lastname, dateOfBirth, image, shirtNumber, teams, card) values ('2', 'Stubbs', 'Jefferey', '2000-10-10', 'https://znews-photo.zingcdn.me/w660/Uploaded/qxjrcqjwq/2022_08_21/HTUG8851.jpg', '15',array['{"id":"1"}']::jsonb[] ,'{"red":"0","yellow":"0"}'::jsonb);
insert into players (id, firstname,lastname, dateOfBirth, image, shirtNumber, teams, card) values ('3',  'Tâm','Đinh Thanh', '2000-10-10', 'https://znews-photo.zingcdn.me/w660/Uploaded/qxjrcqjwq/2022_07_31/Tam_Dinh_an_mung_3_diem.jpg', '23',array['{"id":"1"}']::jsonb[] ,'{"red":"0","yellow":"0"}'::jsonb);


create table process
(
    id character varying(40),
    type character varying(40),
    mins character varying(40),
    quater character varying(40),
    player jsonb[],
    cardcolor character varying(40),
    side  character varying(40),
    match character varying(40),
    option character varying(40),
	description character varying(120),
    createdAt  timestamp with time zone default now(),
    constraint process_pkey primary key (id)
);

create table seasons
(
    id character varying(40),
    name character varying(40),
    status character varying(40),
    rounds jsonb[],
    tournamentId character varying(40),
    standingsId character varying(40),
    teams jsonb[],
    createdAt timestamp with time zone default now(),
    constraint seasons_pkey primary key (id)

);


create table users
(
    id character varying(40),
    username character varying(40),
    password character varying(120),
    email character varying(40),
    name character varying(40),
    image character varying(360),
    role integer,
    lock boolean,
    resetLink character varying(40),
    otp character varying(40),
    otpFG character varying(40),
    activated boolean,
    createdAt timestamp with time zone default now(),
    constraint users_pkey primary key (id)
);
