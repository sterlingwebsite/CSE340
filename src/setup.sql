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
		'2024-06-10'
	),
	(
		1,
		'Community Garden Prep',
		'Prepare soil and plant early crops.',
		'Community Garden Plot A',
		'2024-06-15'
	),
	(
		1,
		'Clothing Donation Event',
		'Organize and distribute donated clothing.',
		'Civic Center',
		'2024-06-20'
	),
	(
		1,
		'Senior Center Visit',
		'Visit seniors and help with activities.',
		'Rexburg Senior Center',
		'2024-06-25'
	),
	(
		1,
		'Park Cleanup',
		'Clean up trash and debris at the park.',
		'Porter Park',
		'2024-06-30'
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
		'2024-07-05'
	),
	(
		2,
		'Tech Support for Seniors',
		'Help seniors set up tablets and email.',
		'Community Center',
		'2024-07-07'
	),
	(
		2,
		'Book Drive',
		'Collect and sort books for local schools.',
		'City Library',
		'2024-07-12'
	),
	(
		2,
		'Art Class Assistant',
		'Help children with painting projects.',
		'Arts Council Bldg',
		'2024-07-15'
	),
	(
		2,
		'After-school Snack Prep',
		'Prepare healthy snacks for students.',
		'Elementary School',
		'2024-07-18'
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
		'2024-08-01'
	),
	(
		3,
		'Cat Room Socialization',
		'Spend time playing with rescue cats.',
		'Happy Paws Shelter',
		'2024-08-03'
	),
	(
		3,
		'Shelter Painting',
		'Paint the lobby and intake rooms.',
		'Happy Paws Shelter',
		'2024-08-10'
	),
	(
		3,
		'Adoption Event Help',
		'Assist families meeting potential pets.',
		'Local Pet Store',
		'2024-08-15'
	),
	(
		3,
		'Kennel Cleaning',
		'Deep clean the outdoor kennel areas.',
		'Happy Paws Shelter',
		'2024-08-20'
	);

SELECT
	*
FROM
	SERVICE_PROJECTS;

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- DROP TABLE IF EXISTS public.organizations CASCADE;
-- DROP TABLE IF EXISTS public.service_projects CASCADE;
