CREATE DATABASE scheduling;

/*l

\c firstapi; */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users (name, email)
    VALUES ('joe', 'joe@ibm.com'),
    ('ryan', 'ryan@faztweb.com');

select * from users;



CREATE TABLE scheduling (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    idCustomer INTEGER,
    idStore INTEGER,
    idSlot INTEGER,
    schedulingStart TIMESTAMP ,
    strSchedulingStart VARCHAR(60)
);
-- INSERT INTO public.scheduling(
-- 	 name, idcustomer, idstore, idslot, schedulingstart, strschedulingstart)
-- 	VALUES ('primeiro', 1, 1, null, '2016-07-07 17:15:00', '20151217');

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    cli VARCHAR(100),
    cpf VARCHAR(11),
    email VARCHAR(100),
    phone1 VARCHAR(20),
    phone2 VARCHAR(20)
);
-- INSERT INTO public.customer(
-- 	 name, email)
-- 	VALUES ('Luiz Vicente' , 'lui23@gmailc.com');


CREATE TABLE store (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    address VARCHAR(250),
    maxSimultaneousSched INTEGER,
    schedulingStart TIMESTAMP,
    schedulingEnd TIMESTAMP,
    phone1 VARCHAR(20),
    phone2 VARCHAR(20)
);

