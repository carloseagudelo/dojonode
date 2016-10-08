-- Base de datos en http://www.elephantsql.com/

CREATE TABLE restaurant (
    id      SERIAL PRIMARY KEY,
    name        VARCHAR(40),
    city        VARCHAR(40),
    address VARCHAR(100),
    phone       INTEGER
);

CREATE TABLE menu (
    id      SERIAL PRIMARY KEY,
    name        VARCHAR(40),
    description     VARCHAR(40),
    price       INTEGER,
    restaurant  INTEGER NOT NULL references restaurant(id)
);