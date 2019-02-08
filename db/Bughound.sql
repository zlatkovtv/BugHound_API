CREATE TABLE Employee(
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	FIRSTNAME VARCHAR(32) NOT NULL,
	LASTNAME VARCHAR(32)  NOT NULL,
	PASSWORD VARCHAR(128) NOT NULL,
	EMAIL VARCHAR(32),
	PHONE VARCHAR(12) 
);

CREATE TABLE Program(
	NAME VARCHAR(32) NOT NULL PRIMARY KEY,
	DATE_STARTED DATETIME NOT NULL,
	`RELEASE` INT NOT NULL,
	VERSION INT NOT NULL
);
CREATE TABLE EmployeeProgram(
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EMPLOYEEID INT NOT NULL,
	PROGRAMID VARCHAR(32) NOT NULL,
	CONSTRAINT fk_employeeID FOREIGN KEY (EMPLOYEEID) 
	REFERENCES EMPLOYEE(ID),
	CONSTRAINT fk_programID FOREIGN KEY (PROGRAMID) REFERENCES PROGRAM(`NAME`)
);
CREATE TABLE Area(
	NAME VARCHAR(32) NOT NULL PRIMARY KEY
);
CREATE TABLE Bug(
	BUGID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PROGRAMID VARCHAR(32),
	CONSTRAINT fk_bug_programID FOREIGN KEY (PROGRAMID) REFERENCES PROGRAM(NAME),
	REPORT_TYPE INT NOT NULL,
	SEVERITY INT NOT NULL,
	PROBLEM_SUMMARY VARCHAR(500) NOT NULL,
	PROBLEM_DESCRIPTION VARCHAR(2000) NOT NULL,
	SUGGESTED_FIX VARCHAR(2000) NOT NULL,
	REPORTED_BY INT,
	CONSTRAINT fk_reportedby FOREIGN KEY (REPORTED_BY) REFERENCES EMPLOYEEPROGRAM(ID),
	DATE_REPORTED DATETIME NOT NULL,
	REPRODUCIBLE BIT NOT NULL,
	AREA VARCHAR(32),
	CONSTRAINT fk_area FOREIGN KEY (AREA) REFERENCES AREA(NAME),
	ASSIGNED_TO INT,
	CONSTRAINT fk_assigned FOREIGN KEY (ASSIGNED_TO) REFERENCES EMPLOYEEPROGRAM(ID),
	COMMENTS VARCHAR(2000),
	PRIORITY INT,
	STATUS INT,
	RESOLUTION INT,
	RESOLUTION_VERSION VARCHAR(10),
	RESOLVED_BY INT,
	CONSTRAINT fk_resolved FOREIGN KEY (RESOLVED_BY) REFERENCES EMPLOYEEPROGRAM(ID),
	DATE_RESOLVED DATETIME,
	RESOLUTION_TESTED_BY INT,
	CONSTRAINT fk_resolution FOREIGN KEY (RESOLUTION_TESTED_BY) REFERENCES EMPLOYEEPROGRAM(ID),
	RESOLUTION_TESTED_DATE DATETIME,
	DEFERRED BIT
);
CREATE TABLE Attachment(
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	FILENAME VARCHAR(100) NOT NULL ,
	DATE_SUBMITTED DATETIME,
	BUGID INT NOT NULL,
	CONSTRAINT fk_BUG FOREIGN KEY (BUGID) REFERENCES BUG(BUGID)
);
