DELETE FROM doors_users where (select count(*) from doors_users) > 0;
DELETE FROM users_roles where (select count(*) from users_roles) > 0;
DELETE FROM tenants_apartments where (select count(*) from tenants_apartments) > 0;
DELETE FROM door_codes_doors where (select count(*) from door_codes_doors) > 0;
DELETE FROM door_codes where (select count(*) from door_codes) > 0;
DELETE FROM users where (select count(*) from users) > 0;
DELETE FROM doors where (select count(*) from doors) > 0;
DELETE FROM apartments where (select count(*) from apartments) > 0;
DELETE FROM buildings where (select count(*) from buildings) > 0;

INSERT INTO users (id,username, password, email, name)
VALUES
    (1,'alice_j', 'securepassword1', 'alice@example.com', 'Alice Johnson');

INSERT INTO buildings (id) values (1);

INSERT INTO apartments (id, apartment_number,building_id) VALUES (1,1,1);

INSERT INTO doors (id,door_status,building_id) VALUES (1,'LOCKED',1);

INSERT INTO doors (id,door_status,apartment_id) VALUES  (2,'LOCKED',1);

INSERT INTO users_roles (user_id,role) VALUES (1,0);

INSERT INTO tenants_apartments (user_id,apartment_id) VALUES (1,1);

INSERT INTO doors_users (user_id, door_id) VALUES (1,1);

