CREATE TABLE category (
    id char(36) PRIMARY KEY,
    name varchar(64) NOT NULL,
    color varchar(16),
    icon varchar(16),
)

CREATE TABLE transaction (
    id char(36) PRIMARY KEY,
    amount decimal(),
    categoryId char(36),
    type VARCHAR(10),
    date DATE, 
    payee varchar(),
    note TEXT,
    )

ALTER TABLE category
ADD COLUMN color varchar(16),
ADD COLUMN icon varchar(16);

SELECT id, name FROM category;
SELECT * FROM category;

INSERT INTO playing_with_neon(name, value)
SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
SELECT * FROM playing_with_neon;