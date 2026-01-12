--CheatSheet for HR 
IF OBJECT_ID('dbo.GetMonthlyPayouts') is not null
DROP FUNCTION dbo.GetMonthlyPayouts
GO
CREATE FUNCTION dbo.GetMonthlyPayouts(@Month INT)
RETURNS TABLE
as
RETURN
Select S1.ID,S1.Name,S1.Surname,S1.[Month],CAST(S1.[Hours] * E.HourlySalary as MONEY)  [Paycheck]FROM Employees E LEFT JOIN 
(SELECT P.ID [ID],P.Name [Name],P.Surname [Surname],S.miesiac[Month],S.Godziny [Hours]FROM Person P LEFT JOIN
( SELECT P.ID,month(StartTime)[miesiac],SUM(W.durationTime) [Godziny] FROM Person P Right JOIN Workshifts W on P.ID = W.EmployeeID
GROUP BY P.ID,Month(StartTime)) S on S.ID = P.ID) S1 on S1.ID = E.ID
WHERE @Month = S1.[Month];
GO

IF OBJECT_ID('dbo.PopularClasses') is not null
DROP VIEW PopularClasses
GO
CREATE VIEW PopularCLasses as
SELECT T.ClassName,SUM(C.Registered)[Total Registrations] FROM ClassSchedule C LEFT JOIN ClassTypes T on C.ClassID = T.ClassID
GROUP BY T.ClassName
GO
--Check if Customers has Access to facility at given time 
IF OBJECT_ID('dbo.CheckAccessPermission') is not null
DROP FUNCTION dbo.CheckAccessPermission
GO
CREATE FUNCTION dbo.CheckAccessPermission (@CustomerID INT, @Date DATE)
RETURNS BIT
AS
BEGIN
    -- Sprawdzamy czy istnieje karnet
    IF EXISTS (SELECT 1 FROM Memberships WHERE CustomerID = @CustomerID AND @Date BETWEEN StartDate AND EndDate)
        RETURN 1;
    -- Jeœli nie, sprawdzamy czy istnieje wejœcie jednorazowe
    IF EXISTS (SELECT 1 FROM SingleEntries WHERE CustomerID = @CustomerID AND CAST(EntryDate AS DATE) = @Date)
        RETURN 1;
    -- Jeœli nic nie znalaz³
    RETURN 0;
END;
GO
-- HOW MUCH MONEY EACH Customer Spent 
IF OBJECT_ID('dbo.CustomersSpending') is not null
DROP VIEW CustomersSpending
GO
CREATE VIEW CustomersSpending as
SELECT P.ID,P.Name,P.Surname,COALESCE(S.[Money Spent],0)[Money Spent] FROM PERSON P  LEFT JOIN 
(SELECT ClientID,SUM(Amount)[Money Spent]FROM PAYMENTS
GROUP BY ClientID ) S on S.ClientID = P.ID
where P.ID in ( SELECT * FROM CUSTOMERS)
GO

IF OBJECT_ID('dbo.GetClassSchedule') is not null
DROP VIEW dbo.GetClassSchedule
GO

CREATE VIEW dbo.GetClassSchedule 
AS
SELECT CS.ScheduleID,T.ClassName ,CS.Registered,CS.Max_slots,P.Name,P.Surname,CS.StartTime,Cs.durationTime FROM ClassSchedule CS LEFT JOIN Person P on P.ID = CS.EmployeeID LEFT JOIN ClassTypes T on T.ClassID = CS.ClassID
GO


