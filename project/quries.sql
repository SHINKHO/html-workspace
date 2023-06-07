create table user_catch(
    user_id VARCHAR2(20),
    user_nm VARCHAR2(20),
    user_pw VARCHAR2(20),
    user_profile_loc VARCHAR2(50),
    
    CONSTRAINT pk_user_catch primary key (user_id)
);

insert into USER_CATCH(user_id,user_nm,user_pw,user_profile_loc) values('sss','tripleS','asdf',null);

select * from user_catch;

SELECT count(*) FROM user_catch WHERE user_id = :1 AND user_pw=:2;
