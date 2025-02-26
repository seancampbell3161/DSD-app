DELETE FROM users where (select count(*) from users) > 0;

INSERT INTO users (username, password, email, name)
VALUES
    ('alice_j', 'securepassword1', 'alice@example.com', 'Alice Johnson');
