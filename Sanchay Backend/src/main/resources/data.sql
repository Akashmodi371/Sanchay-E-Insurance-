INSERT INTO Role (roleid,rolename) VALUES (1,'ROLE_CUSTOMER')ON DUPLICATE KEY UPDATE rolename = rolename;
INSERT INTO Role (roleid,rolename) VALUES (2,'ROLE_ADMIN')ON DUPLICATE KEY UPDATE rolename = rolename;
INSERT INTO Role (roleid,rolename) VALUES (3,'ROLE_AGENT')ON DUPLICATE KEY UPDATE rolename = rolename;
INSERT INTO Role (roleid,rolename) VALUES (4,'ROLE_EMPLOYEE')ON DUPLICATE KEY UPDATE rolename = rolename;