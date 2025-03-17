DELETE FROM doors_users where (select count(*) from doors_users) > 0;
DELETE FROM users_roles where (select count(*) from users_roles) > 0;
DELETE FROM tenants_apartments where (select count(*) from tenants_apartments) > 0;
DELETE FROM lease_tenants where (select count(*) from lease_tenants) > 0;
DELETE FROM tenants_apartments where (select count(*) from tenants_apartments) > 0;
DELETE FROM leases where (select count(*) from leases) > 0;
DELETE FROM entry_codes where (select count(*) from entry_codes) > 0;
DELETE FROM users where (select count(*) from users) > 0;
DELETE FROM roles where (select count(*) from roles) > 0;
DELETE FROM doors where (select count(*) from doors) > 0;
DELETE FROM parkings where(select count(*) from parkings) > 0;
DELETE FROM apartments where (select count(*) from apartments) > 0;
DELETE FROM buildings where (select count(*) from buildings) > 0;
DELETE FROM tenants where (select count(*) from tenants) > 0;
DELETE FROM complaints where (select count(*) from complaints) > 0;


INSERT INTO roles (id,name) VALUES (1,'TENANT'),(2,'ADMIN');
INSERT INTO users (id,username, password, email, name)
VALUES
    (1,'superuser', '$2a$10$DngToCGxdfBYmj9O2l01c.JtNfvKSBOqgYbuHlMLBf52f9s6wJO7u', 'superuser@test.nl', 'Super User');

INSERT INTO users_roles (user_id, role_id) VALUES (1,1),(1,2);

INSERT INTO buildings (id) values (1);

INSERT INTO apartments (id, apartment_number,building_id) VALUES (1,1,1);

INSERT INTO parkings (id,number_of_guest_spots, number_of_tenant_spots, building_id) VALUES (1 ,10, 80,1);

INSERT INTO doors (id,door_status,building_id) VALUES (1,'LOCKED',1);

INSERT INTO doors (id,door_status,apartment_id) VALUES  (2,'LOCKED',1);

INSERT INTO doors (id,door_status,parking_id) VALUES (3,'LOCKED',1);

INSERT INTO tenants_apartments (user_id,apartment_id) VALUES (1,1);

INSERT INTO doors_users (user_id, door_id) VALUES (1,1);

