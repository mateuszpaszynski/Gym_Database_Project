IF OBJECT_ID('dbo.AddCustomer') is not null
DROP PROCEDURE dbo.AddCustomer
GO
CREATE PROCEDURE dbo.AddCustomer
@Name NVARCHAR(256),
@Surname NVARCHAR(256),
@Pesel char(11),
@Email NVARCHAR(256) = NULL
AS
BEGIN
INSERT INTO Person(Name,Surname,Pesel,Email) VALUES
(@Name,@Surname,@Pesel,@Email);
INSERT INTO Customers(ID) VALUES
((SELECT COUNT(*) FROM PERSON));
PRINT 'Customer Added'
END;
GO
IF OBJECT_ID('dbo.AddEmployee') is not null
DROP PROCEDURE dbo.AddEmployee 
GO
CREATE PROCEDURE dbo.AddEmployee
@Name NVARCHAR(256),
@Surname NVARCHAR(256),
@Pesel char(11),
@JobTitle NVARCHAR(256),
@HireDate date,
@HourlySalary MONEY
AS 
BEGIN
INSERT INTO Person(Name,Surname,Pesel,Email) VALUES
(@Name,@Surname,@Pesel,(LOWER(@Name)+LOWER(@Surname)+'@silownia.com'));
INSERT INTO Employees(JobTitle,HireDate,HourlySalary) VALUES
(@JobTitle,@HireDate,@HourlySalary);
PRINT 'Employee Added'
END;