IF OBJECT_ID('dbo.AddClass') is not null
DROP PROCEDURE dbo.AddClass
GO
CREATE PROCEDURE dbo.AddClass
@ClassID int, 
@Max_slots int,
@EmployeeID int,
@StartTime datetime,
@durationTime decimal (4,2)
AS
BEGIN SET NOCOUNT ON;
INSERT INTO ClassSchedule(ClassID,Registered,Max_slots,EmployeeID,StartTime,durationTime)
VALUES (@ClassID,0,@Max_slots,@EmployeeID,@StartTime,@durationtime)
END;


IF OBJECT_ID('dbo.RegisterForClass') is not null
DROP PROCEDURE dbo.RegisterForClass
GO
CREATE PROCEDURE dbo.RegisterForClass
@ScheduleID int,
@CustomerID int
AS 
BEGIN SET NOCOUNT ON;
INSERT INTO ClassRegistrations(ScheduleID,CustomerID) VALUES
(@ScheduleID,@CustomerID)
END;


IF OBJECT_ID('dbo.UpdateClass') is not null
DROP PROCEDURE dbo.UpdateClass
GO
CREATE PROCEDURE dbo.UpdateClass
@ScheduleID int,
@ClassID int,
@Max_slots int,
@EmployeeID int,
@StartTime datetime,
@durationTime int
AS
BEGIN SET NOCOUNT ON;
UPDATE ClassSchedule SET ClassID = @ClassID,Max_slots = @Max_slots,EmployeeID = @EmployeeID, StartTime = @StartTime,durationTime=@durationTime  WHERE ScheduleID = @ScheduleID
END;
GO

IF OBJECT_ID('dbo.DeleteClass') is not null
DROP PROCEDURE dbo.DeleteClass
GO
CREATE PROCEDURE dbo.DeleteClass
@ScheduleID int
AS
BEGIN SET NOCOUNT ON;
DELETE FROM ClassRegistrations WHERE ScheduleID = @ScheduleID

DELETE FROM ClassSchedule WHERE ScheduleID = @ScheduleID
END;
GO

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

if OBJECT_ID('dbo.AddEntry','P') is NOT NULL
drop PROCEDURE dbo.AddEntry
GO
CREATE PROC dbo.AddEntry
    @personId int,
    @data datetime
AS
BEGIN
    set NOCOUNT ON
    if @personId is null or @data is NULL
    BEGIN
        ;THROW 50001, 'Parametry @personId i @data nie moga byc NULL', 1;
    end
    INSERT into dbo.EntriesBacklog(PersonID,[Data])
    VALUES(@personId,@data);
end;