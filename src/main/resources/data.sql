insert into image values (next value for image_seq, false,  'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg');
insert into image values (next value for image_seq, true, 'https://sample-videos.com/img/Sample-jpg-image-500kb.jpg');
insert into image values (next value for image_seq, true, '/path/1');
insert into image values (next value for image_seq, true, '/path/99');

insert into post values (next value for post_seq, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' ||
 'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it' ||
  ' to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' ||
   ' It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing' ||
    ' software like Aldus PageMaker including versions of Lorem Ipsum.

', '10.10.10', 'ants', current_date , 'chrome',1);
insert into post values (next value for post_seq, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' ||
 ' industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ' ||
  'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the' ||
   ' 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker' ||
    ' including versions of Lorem Ipsum.

', '8.8.8.8', 'karbo', current_date , 'ie',2);
insert into post values (next value for post_seq, 'post jauno 3', '7.7.7.', 'aunt', current_date , 'firefox',3);
insert into post values (next value for post_seq, 'post rehooo 4', '6.6.6', 'olme', current_date , 'opera',4);
insert into post values (next value for post_seq, 'post ewga 5', '54.3.45', 'juha', current_date , 'safari',null);
insert into post values (next value for post_seq, 'post daun 6', '54.3.45', 'juha', current_date , 'safari',null);

insert into thread values (next value for thread_seq, 'tore pilt',1);
insert into thread values (next value for thread_seq, 'jama pilt',2);

insert into post_replies values (next value for post_replay_seq, 1,3);
insert into post_replies values (next value for post_replay_seq, 1,4);
insert into post_replies values (next value for post_replay_seq, 3,5);