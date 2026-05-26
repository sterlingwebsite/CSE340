CREATE TABLE IF NOT EXISTS PUBLIC.ORGANIZATIONS (
	ORGANIZATION_ID SERIAL PRIMARY KEY,
	NAME VARCHAR(150) NOT NULL,
	DESCRIPTION TEXT NOT NULL,
	CONTACT_EMAIL VARCHAR(255) NOT NULL,
	LOGO_FILENAME VARCHAR(255) NOT NULL
);

INSERT INTO
	PUBLIC.ORGANIZATIONS (NAME, DESCRIPTION, CONTACT_EMAIL, LOGO_FILENAME)
VALUES
	(
		'BrightFuture Builders',
		'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
		'info@brightfuturebuilders.org',
		'brightfuture-logo.png'
	),
	(
		'GreenHarvest Growers',
		'An urban farming collective promoting food sustainability and education in local neighborhoods.',
		'contact@greenharvest.org',
		'greenharvest-logo.png'
	),
	(
		'UnityServe Volunteers',
		'A volunteer coordination group supporting local charities and service initiatives.',
		'hello@unityserve.org',
		'unityserve-logo.png'
	);

SELECT
	*
FROM
	ORGANIZATIONS;

CREATE TABLE IF NOT EXISTS SERVICE_PROJECTS (
    PROJECT_ID SERIAL PRIMARY KEY,
	ORGANIZATION_ID INTEGER NOT NULL,
	TITLE VARCHAR(200) NOT NULL,
	DESCRIPTION TEXT NOT NULL,
	LOCATION VARCHAR(200) NOT NULL,
	PROJECT_DATE DATE NOT NULL,
	CONSTRAINT FK_SERVICE_PROJECTS_ORG
		FOREIGN KEY (ORGANIZATION_ID)
        REFERENCES ORGANIZATIONS (ORGANIZATION_ID)
        ON DELETE CASCADE
);

INSERT INTO
	SERVICE_PROJECTS (
		ORGANIZATION_ID,
		TITLE,
		DESCRIPTION,
		LOCATION,
		PROJECT_DATE
	)
VALUES
	(
		1,
		'Food Drive Sorting',
		'Sort and package donated food items.',
		'Rexburg Food Bank',
		'2026-06-10'
	),
	(
		1,
		'Community Garden Prep',
		'Prepare soil and plant early crops.',
		'Community Garden Plot A',
		'2026-06-15'
	),
	(
		1,
		'Clothing Donation Event',
		'Organize and distribute donated clothing.',
		'Civic Center',
		'2026-06-20'
	),
	(
		1,
		'Senior Center Visit',
		'Visit seniors and help with activities.',
		'Rexburg Senior Center',
		'2026-06-25'
	),
	(
		1,
		'Park Cleanup',
		'Clean up trash and debris at the park.',
		'Porter Park',
		'2026-06-30'
	);

INSERT INTO
	SERVICE_PROJECTS (
		ORGANIZATION_ID,
		TITLE,
		DESCRIPTION,
		LOCATION,
		PROJECT_DATE
	)
VALUES
	(
		2,
		'Youth Mentoring',
		'After-school tutoring for middle schoolers.',
		'Public Library',
		'2026-07-05'
	),
	(
		2,
		'Tech Support for Seniors',
		'Help seniors set up tablets and email.',
		'Community Center',
		'2026-07-07'
	),
	(
		2,
		'Book Drive',
		'Collect and sort books for local schools.',
		'City Library',
		'2026-07-12'
	),
	(
		2,
		'Art Class Assistant',
		'Help children with painting projects.',
		'Arts Council Bldg',
		'2026-07-15'
	),
	(
		2,
		'After-school Snack Prep',
		'Prepare healthy snacks for students.',
		'Elementary School',
		'2026-07-18'
	);

INSERT INTO
	SERVICE_PROJECTS (
		ORGANIZATION_ID,
		TITLE,
		DESCRIPTION,
		LOCATION,
		PROJECT_DATE
	)
VALUES
	(
		3,
		'Animal Shelter Feeding',
		'Help feed and walk rescue dogs.',
		'Happy Paws Shelter',
		'2026-08-01'
	),
	(
		3,
		'Cat Room Socialization',
		'Spend time playing with rescue cats.',
		'Happy Paws Shelter',
		'2026-08-03'
	),
	(
		3,
		'Shelter Painting',
		'Paint the lobby and intake rooms.',
		'Happy Paws Shelter',
		'2026-08-10'
	),
	(
		3,
		'Adoption Event Help',
		'Assist families meeting potential pets.',
		'Local Pet Store',
		'2026-08-15'
	),
	(
		3,
		'Kennel Cleaning',
		'Deep clean the outdoor kennel areas.',
		'Happy Paws Shelter',
		'2026-08-20'
	);

SELECT
	*
FROM
	SERVICE_PROJECTS;

CREATE TABLE IF NOT EXISTS PUBLIC.CATEGORIES (
	CATEGORY_ID SERIAL PRIMARY KEY,
	CATEGORY_NAME VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS PUBLIC.PROJECT_CATEGORIES (
    PROJECT_ID INT NOT NULL,
    CATEGORY_ID INT NOT NULL,
    PRIMARY KEY (PROJECT_ID, CATEGORY_ID),
    CONSTRAINT FK_PROJECT FOREIGN KEY (PROJECT_ID) 
        REFERENCES SERVICE_PROJECTS (PROJECT_ID) ON DELETE CASCADE,
    CONSTRAINT FK_CATEGORY FOREIGN KEY (CATEGORY_ID) 
        REFERENCES CATEGORIES (CATEGORY_ID) ON DELETE CASCADE
);

INSERT INTO PUBLIC.CATEGORIES (CATEGORY_NAME)
VALUES 
    ('Community Support'),
    ('Education'),
    ('Animal Care'),
    ('Environment'),
    ('Food Assistance');

SELECT
	*
FROM
	CATEGORIES;

INSERT INTO
	PUBLIC.PROJECT_CATEGORIES (PROJECT_ID, CATEGORY_ID)
VALUES
	(1, 5), -- Food Drive Sorting → Food Assistance
	(2, 4), -- Community Garden Prep → Environment
	(3, 1), -- Clothing Donation Event → Community Support
	(4, 1), -- Senior Center Visit → Community Support
	(5, 4); -- Park Cleanup → Environment

INSERT INTO
	PUBLIC.PROJECT_CATEGORIES (PROJECT_ID, CATEGORY_ID)
VALUES
	(6, 2), -- Youth Mentoring → Education
	(7, 1), -- Tech Support for Seniors → Community Support
	(8, 2), -- Book Drive → Education
	(9, 2), -- Art Class Assistant → Education
	(10, 1); -- After-school Snack Prep → Community Support

INSERT INTO
	PUBLIC.PROJECT_CATEGORIES (PROJECT_ID, CATEGORY_ID)
VALUES
	(11, 3), -- Animal Shelter Feeding → Animal Care
	(12, 3), -- Cat Room Socialization → Animal Care
	(13, 3), -- Shelter Painting → Animal Care
	(14, 3), -- Adoption Event Help → Animal Care
	(15, 3); -- Kennel Cleaning → Animal Care

CREATE TABLE ROLES (
	ROLE_ID SERIAL PRIMARY KEY,
	ROLE_NAME VARCHAR(50) UNIQUE NOT NULL,
	ROLE_DESCRIPTION TEXT
);

INSERT INTO
	ROLES (ROLE_NAME, ROLE_DESCRIPTION)
VALUES
	('user', 'Standard user with basic access'),
	('admin', 'Administrator with full system access');

SELECT
	*
FROM
	ROLES;

CREATE TABLE USERS (
	USER_ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL,
	EMAIL VARCHAR(100) UNIQUE NOT NULL,
	PASSWORD_HASH VARCHAR(255) NOT NULL,
	ROLE_ID INTEGER REFERENCES ROLES (ROLE_ID),
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);