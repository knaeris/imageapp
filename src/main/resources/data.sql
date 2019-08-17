insert into image values (next value for image_seq, false,  '/location/bb/2');
insert into image values (next value for image_seq, true, '/locatrion/1');
insert into image values (next value for image_seq, true, '/path/1');
insert into image values (next value for image_seq, true, '/path/99');

insert into post values (next value for post_seq, 'post content 1', '10.10.10', 'ants', current_date , 'chrome',1);
insert into post values (next value for post_seq, 'post comment2', '8.8.8.8', 'karbo', current_date , 'ie',2);
insert into post values (next value for post_seq, 'post jauno 3', '7.7.7.', 'aunt', current_date , 'firefox',3);
insert into post values (next value for post_seq, 'post rehooo 4', '6.6.6', 'olme', current_date , 'opera',4);
insert into post values (next value for post_seq, 'post ewga 5', '54.3.45', 'juha', current_date , 'safari',null);
insert into post values (next value for post_seq, 'post daun 6', '54.3.45', 'juha', current_date , 'safari',null);

insert into thread values (next value for thread_seq, 'tore pilt',1);
insert into thread values (next value for thread_seq, 'jama pilt',2);

insert into post_replies values (next value for post_replay_seq, 1,3);
insert into post_replies values (next value for post_replay_seq, 1,4);
insert into post_replies values (next value for post_replay_seq, 3,5);