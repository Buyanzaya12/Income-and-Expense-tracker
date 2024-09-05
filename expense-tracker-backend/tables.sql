CREATE TABLE category (
    id char(36) PRIMARY KEY,
    name varchar(64) NOT NULL,
    color varchar(16),
    icon varchar(16),
)
DROP TABLE transaction;
CREATE TYPE transactionType AS ENUM ('INCOME', 'EXPENSE');
CREATE TABLE transaction (
    id char(36) PRIMARY KEY,
    amount decimal(10,2),
    categoryId char(36),
    type transactionType,
    date DATE, 
    payee varchar(36),
    note TEXT,
    FOREIGN KEY (categoryID) REFERENCES category(id)
    )

insert into transaction values ('asd', 1000, 'id', 'INCOME', CURRENT_DATE, 'buyana', 'lending') 

select 
transaction.amount, 
transaction.type,  
category.name, 
category.icon 
from 
transaction left join category 
on 
transaction.categoryID = category.id

ALTER TABLE category
ADD COLUMN color varchar(16),
ADD COLUMN icon varchar(16);

SELECT id, name FROM category;
SELECT * FROM category;

INSERT INTO playing_with_neon(name, value)
SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
SELECT * FROM playing_with_neon;