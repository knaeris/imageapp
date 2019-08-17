DROP SCHEMA PUBLIC CASCADE;

create sequence post_seq start with 1;
create sequence image_seq start with 1;
create sequence thread_seq start with 1;
create sequence thread_replay_seq start with 1;
create sequence post_replay_seq start with 1;

create table image (
id bigint primary key identity,
nsfw boolean,
image_path varchar(255),
);

create table post (
id bigint primary key identity,
content varchar(2000),
ip varchar(30),
poster varchar(30),
dateposted date,
browser varchar(2000),
image_id bigint, foreign key(image_id) references image on delete cascade
);

create table thread(
id bigint primary key identity,
title varchar(100),
initialpost_id bigint,
foreign key(initialpost_id) references post on delete cascade,
);

create table post_replies(
id bigint primary key identity,
post_id bigint,
foreign key(post_id) references post on delete cascade,
replies_id bigint, foreign key(replies_id) references post on delete cascade
);

