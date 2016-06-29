create database base;
use base;

create table user(
	uname nvarchar(50),
	uid nvarchar(50) primary key,
	pwd nvarchar(50),
	utype enum('teacher','admin','student') 
);

create table attendance(
	uid nvarchar(50),
	course nvarchar(50),
	batch nvarchar(50)
);

create table course(
	course nvarchar(50) unique
);

create table question(
	queid nvarchar(20) unique,
    que text,
    a text,
    b text,
    c text,
    d text,
    awkey enum('a','b','c','d')
);

create table testmake(
	testid nvarchar(50),
	queid nvarchar(20),
	unique key(testid,queid)
);

create table examsche(
	exid nvarchar(50) unique,
	testid nvarchar(50) not null,
	starttime datetime not null,
	endtime datetime not null,
	keycode nvarchar(50) not null
);

create table stuexam(
	uid nvarchar(50) not null,
	exid nvarchar(50) not null,
	queid nvarchar(50) not null,
	answer nvarchar(50) default null,
	unique key(uid, exid, queid)
);

create table stutest(
	uid nvarchar(50) not null,
	testid nvarchar(50) not null,
	queid nvarchar(50) not null,
	answer nvarchar(50) default null
);

DELIMITER //
	create trigger coursealter after update on course for each row
    begin
		set @old = OLD.course;
        set @new = NEW.course;
        update attendance set course=@new where course=@old; 
    end //
DELIMITER ;
/*触发器delimiter和end的格式一定要注意*/

DELIMITER //
	create trigger examschetime before insert on examsche for each row
    begin
		if new.starttime >= new.endtime then
			insert lala values('haha');
		end if;
    end //
DELIMITER ;

insert user values('dodd', 'd', '123', 'student'), ('eric', 'e', '123', 'student'), 
('fallon', 'f', '123', 'admin'), ('hair', 'h', '123', 'teacher'), ('god', 'g', '123', 'teacher'),
('jack', 'j', '123', 'student'), ('karl', 'k', '123', 'student'), ('lala', 'l', '123', 'teacher');

insert course values('english'), ('chinese'), ('computer'), ('history'), ('economy'), ('math');

insert attendance values('d', 'chinese', 'op01'), ('f', 'chinese', 'op01'), ('g', 'chinese', 'op01'), 
('h', 'chinese', 'op01'), ('j', 'computer', 'java02'), ('k', 'computer', 'java02'), ('l', 'economy', 'ms01');

insert question values('a', 'is steve smart', 'yes', 'yes', 'yes', 'no yes is SB', 'd'), 
('b', '1+1=?', '1', '2', '3', '4', 'b'), ('c', '2*2=?', '3', '4', '5', '0', 'b');


select q.que, q.a, q.b, q.c, q.d from testmake t join question q on t.queid=q.queid where t.testid='a';

select q.que, q.a, q.b, q.c, q.d from examsche e join testmake t join question q on e.testid=t.testid and t.queid=q.queid where e.exid='a';

select a.uid, u.uname, a.course, a.batch, count(*)'Attendance Times' from attendance a join user u on a.uid=u.uid 
where a.course='math' and a.batch='op01' group by a.course, a.uid;

select s.uid, s.exid, e.testid, sum(s.answer!=q.awkey)'fault amount',sum(s.answer=q.awkey)'correct amount', (sum(s.answer=q.awkey)/(sum(s.answer!=q.awkey)+
sum(s.answer=q.awkey))*100)'correct percent' from stuexam s join question q join examsche e on s.queid=q.queid and s.exid=e.exid group by s.uid, s.exid having s.exid='a';

select exid, testid, starttime, endtime from examsche where endtime>now();

select q.que, q.a, q.b, q.c, q.d from examsche e join testmake t join question q on e.testid=t.testid and t.queid=q.queid where e.exid='fd' and e.keycode='fd';

select starttime, endtime from examsche where exid='a';
select * from examsche;
insert examsche values('b', 'l', '2015-11-11 09:00:00', '2015-11-11 11:00:00', 'awdawd');
