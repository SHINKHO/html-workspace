CREATE TABLE MD_USER(
    user_id varchar2(100) primary key,
    user_pw varchar2(100),
    user_nm varchar2(100)
);

CREATE SEQUENCE file_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE files(
    file_seq number,
    user_id varchar2(100),
    originalname varchar2(100),
    mimetype varchar2(100),
    f_size number,
    destination varchar2(100),
    filename varchar2(100),
    constraint file_pk primary key(file_seq, user_id)
);
INSERT INTO files(file_seq,user_id,originalname,mimetype,f_size,destination,filename)
VALUES (file_seq.nextval, :user_id, :originalname, :mimetype, :f_size, :destination, :filename);


INSERT INTO MD_USER
VALUES(:user_id, :user_pw, user_nm);


SELECT *
FROM MD_USER
WHERE user_id =:1;
