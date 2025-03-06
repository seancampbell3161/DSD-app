DELETE FROM users_roles WHERE (select count(*) from users_roles) > 0;
DELETE FROM roles WHERE (select count(*) from roles) > 0;
DELETE FROM doors_users WHERE (select count(*) from doors_users) > 0;
DELETE FROM users_roles WHERE (select count(*) from users_roles) > 0;
DELETE FROM tenants_apartments WHERE (select count(*) from tenants_apartments) > 0;
DELETE FROM door_codes_doors WHERE (select count(*) from door_codes_doors) > 0;
DELETE FROM door_codes WHERE (select count(*) from door_codes) > 0;
DELETE FROM users WHERE (select count(*) from users) > 0;
DELETE FROM doors WHERE (select count(*) from doors) > 0;
DELETE FROM apartments WHERE (select count(*) from apartments) > 0;
DELETE FROM buildings WHERE (select count(*) from buildings) > 0;


INSERT INTO roles (id,name) VALUES (1,'TENANT'),(2,'ADMIN');
INSERT INTO users (id,username, password, email, name)
VALUES
    (1,'superuser', '$2a$10$DngToCGxdfBYmj9O2l01c.JtNfvKSBOqgYbuHlMLBf52f9s6wJO7u', 'superuser@test.nl', 'Super User');

INSERT INTO users_roles (user_id, role_id) VALUES (1,1),(1,2);
INSERT INTO buildings (id) VALUES (1);

INSERT INTO apartments (id, apartment_number,building_id) VALUES (1,1,1);

INSERT INTO doors (id,door_status,building_id) VALUES (1,'LOCKED',1);

INSERT INTO doors (id,door_status,apartment_id) VALUES  (2,'LOCKED',1);

INSERT INTO tenants_apartments (user_id,apartment_id) VALUES (1,1);

INSERT INTO doors_users (user_id, door_id) VALUES (1,1);

