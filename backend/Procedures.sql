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
SET NOCOUNT ON;
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
BEGIN SET NOCOUNT ON;
INSERT INTO Person(Name,Surname,Pesel,Email) VALUES
(@Name,@Surname,@Pesel,(LOWER(@Name)+LOWER(@Surname)+'@silownia.com'));
INSERT INTO Employees(JobTitle,HireDate,HourlySalary) VALUES
(@JobTitle,@HireDate,@HourlySalary);
PRINT 'Employee Added'
END;
GO

IF OBJECT_ID('dbo.AddShift') is not null
DROP PROCEDURE dbo.AddShift
GO
CREATE PROCEDURE dbo.AddShift
@EmployeeID int ,
@RoomID int,
@StartTime datetime,
@durationTime decimal (4,2)
as 
BEGIN SET NOCOUNT ON;
INSERT INTO WorkShifts(EmployeeID,RoomID,StartTime,durationTime) VALUES
(@EmployeeID,@RoomID,@StartTime,@durationTime);
PRINT 'Shift added';
END;

IF OBJECT_ID('dbo.DeleteShift') is not null
DROP PROCEDURE dbo.DeleteShift
GO
CREATE PROCEDURE dbo.DeleteShift
@ShiftID int as
BEGIN SET NOCOUNT ON;
DELETE FROM WorkShifts 
WHERE ShiftID = @ShiftID
PRINT 'Delete added';
END;
GO

IF OBJECT_ID('dbo.UpdateShift') is not null
DROP PROCEDURE dbo.UpdateShift
GO
CREATE PROCEDURE dbo.UpdateShift
@ShiftID int,
@EmployeeID int,
@RoomID int,
@StartTime datetime,
@durationTime int
as
BEGIN  SET NOCOUNT ON;
UPDATE WorkShifts SET EmployeeID = @EmployeeID,
RoomID = @RoomID, StartTime = @StartTime,
durationTime = @durationTime WHERE ShiftID = @ShiftID
END;
