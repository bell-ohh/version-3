CREATE TABLE userprofile (
	user_id INT PRIMARY KEY,
	user_name VARCHAR(100),
	email VARCHAR(255),
	country_name VARCHAR(100),
	bio TEXT
);
CREATE TABLE country_count (
	country_name VARCHAR(100) PRIMARY KEY,
	times_clicked INT DEFAULT 0
);
CREATE TABLE country_stats (
	country_name VARCHAR(100) PRIMARY KEY,
	number INT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES userprofile(user_id),
	FOREIGN KEY (country_name) REFERENCES country_count(country_name)
);
CREATE TABLE saved_countries (
	country_name VARCHAR(100),
	times_clicked INT DEFAULT 0,
	user_id INT,
	PRIMARY KEY (country_name, user_id),
	FOREIGN KEY (user_id) REFERENCES userprofile(user_id),
	FOREIGN KEY (country_name) REFERENCES country_count(country_name)
);
-- Insert Users
INSERT INTO userprofile (user_id, user_name, email, country_name, bio)
VALUES (
		1,
		'Bello Carrington',
		'belloaise@carringtondesigns.com',
		'Sweden',
		'Bello Carrington is a software developer with over 10 years of experience in full-stack web development.  
    She specializes in React.js, HTML, CSS, and forum-structured design as well.
    In her free time, she enjoys crocheting, reading about historical events, and baking.'
	),
	(
		2,
		'Sammie A.',
		'sam@sammiea.com',
		'United States',
		'Sammie A. is a digital marketing strategist with a passion for e-commerce and SEO.  
    With years of experience in brand development, Sammie helps businesses grow their online presence.  
    Outside of work, she enjoys traveling, photography, and exploring the latest tech trends.'
	),
	(
		3,
		'Candance Arring',
		'candance@arring.com',
		'United States',
		'Candance Arring is a UX/UI designer with a focus on creating intuitive and aesthetically pleasing digital experiences.  
    With a background in graphic design, she bridges the gap between art and functionality.  
    Outside of work, Candance enjoys painting, playing the piano, and mentoring aspiring designers.'
	);
-- Insert Country Counts
INSERT INTO country_count (country_name, times_clicked)
VALUES ('United States', 0),
	('Canada', 0),
	('Sweden', 0);
-- Insert Saved Countries
INSERT INTO saved_countries (country_name, times_clicked, user_id)
VALUES ('United States', 5, 1),
	('Canada', 3, 2),
	('Sweden', 2, 3);
-- Insert Country Stats
INSERT INTO country_stats (country_name, number, user_id)
VALUES ('United States', 100, 1),
	('Canada', 75, 2),
	('Sweden', 50, 3);
	
	
	





-- 1. get ALL users with their saved countries
SELECT u.user_name, u.email, s.country_name, s.times_clicked
FROM saved_countries s
JOIN userprofile u ON s.user_id = u.user_id;

-- 2. Get all country stats with user info
SELECT cs.country_name, cs.number, u.user_name, u.email
FROM country_stats cs
JOIN userprofile u ON cs.user_id = u.user_id;

-- 3. get user profiles and their country stats
SELECT u.user_name, u.email, u.country_name, u.bio, cs.number
FROM userprofile u
LEFT JOIN country_stats cs ON u.user_id = cs.user_id;

-- 4. Get total clicks for each country
SELECT country_name, SUM(times_clicked) AS total_clicks
FROM saved_countries
GROUP BY country_name
ORDER BY total_clicks DESC;

-- Get users who saved a specific country (exaple US) 
SELECT u.user_name, u.email, s.times_clicked
FROM saved_countries s
JOIN userprofile u ON s.user_id = u.user_id
WHERE s.country_name = 'United States';
