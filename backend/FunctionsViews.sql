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
IF OBJECT_ID('dbo.GetAvailableTrainers') is not null
DROP FUNCTION dbo.GetAvailableTrainers
GO
CREATE FUNCTION dbo.GetAvailableTrainers(@Date DATE) 
RETURNS TABLE 
as
RETURN
SELECT CONCAT(P.Name,' ',P.Surname)[Trainer] FROM Employees E LEFT JOIN Person P on P.ID = E.ID WHERE P.ID not in (
SELECT E.ID FROM Employees E LEFT JOIN Person P on E.ID = P.ID CROSS JOIN EmployeesHolidays EH  WHERE E.JobTitle = 'Trener' and EH.EmployeeID = P.ID and (StartDate <@Date and @Date< EndDate)
) and E.JobTitle = 'trener'
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
    -- Je�li nie, sprawdzamy czy istnieje wej�cie jednorazowe
    IF EXISTS (SELECT 1 FROM SingleEntries WHERE CustomerID = @CustomerID AND CAST(EntryDate AS DATE) = @Date)
        RETURN 1;
    -- Je�li nic nie znalaz�
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
SELECT CS.ScheduleID,CS.ClassID,T.ClassName ,CS.Registered,CS.Max_slots,CONCAT(P.Name,' ',P.Surname)[Trainer],Cs.durationTime,CS.StartTime,LEFT(Cast(CS.StartTime as TIME(0)),5)[time]
FROM ClassSchedule CS LEFT JOIN Person P on P.ID = CS.EmployeeID LEFT JOIN ClassTypes T on T.ClassID = CS.ClassID
GO


--Srednia ilosc osob w danym dniu tygodnia (1-poniedzialek)
set dateFirst 1
go

if OBJECT_ID('dbo.GetAvgDayAWeek','V') is NOT NULL
drop view dbo.GetAvgDayAWeek
GO

create view dbo.GetAvgDayAWeek
AS
with ileNaDzien as (
    select CAST(eb.[Data] as date) as dzien, DATEPART(WEEKDAY,eb.[Data]) as dzienTygodnia, count(distinct eb.PersonID) as ileOsob
    from EntriesBacklog as eb
    GROUP BY CAST(eb.[Data] as date),DATEPART(WEEKDAY,eb.[Data])
)
select ileNaDzien.dzienTygodnia as [Dzień tygodnia], avg(ileNaDzien.ileOsob) AS sredniaIloscOsob
from ileNaDzien
GROUP BY ileNaDzien.dzienTygodnia
Go

-- 10 najbardziej obecnych klientow
if OBJECT_ID('dbo.TenBestActivePeople','V') is NOT NULL
drop view dbo.TenBestActivePeople
GO

create view dbo.TenBestActivePeople
AS
select top 10  p.Name,p.Surname, COUNT(*) as sumaWejsc
from EntriesBacklog as eb
join Person as p on eb.PersonID=p.ID
GROUP BY p.Name,p.Surname
ORDER BY sumaWejsc desc
GO
--Zwraca srednia ilosc osob w danej godzinie
if OBJECT_ID('dbo.AvgNumberInHour','V') is not null
drop view dbo.AvgNumberInHour
GO

create view dbo.AvgNumberInHour
AS
with ileNaDzienGodzina As(
    SELECT DATEPART(hour, eb.[Data]) as godzina,CAST(eb.[Data] as date) as dzien,COUNT(*) as zliczaj
    FROM EntriesBacklog as eb
    GROUP BY DATEPART(hour, eb.[Data]),CAST(eb.[Data] as date)
)
select dod.godzina,AVG(dod.zliczaj) as sredniaIloscOsob
from ileNaDzienGodzina as dod
GROUP BY dod.godzina
GO


--Suma rejestracji na danego trenera personalnego
if OBJECT_ID('dbo.TrainerPopularity','V') is NOT NULL
drop VIEW dbo.TrainerPopularity
GO

create view dbo.TrainerPopularity
AS
select p.Name, p.Surname,e.JobTitle,COUNT(pts.SessionID) as ileTreningow
from Employees as e
left join PersonalTrainingSessions as pts on e.ID=pts.EmployeeID
join Person as p on e.ID=p.ID
where e.JobTitle='Trener'
GROUP BY p.Name, p.Surname, e.JobTitle
go

--Wiek osoby
if OBJECT_ID('dbo.GetAge','fn') is NOT NULL
drop FUNCTION dbo.GetAge
GO

CREATE FUNCTION dbo.GetAge (@someoneId int)
returns INT
AS
BEGIN
    declare @age INT, @pesel CHAR(11);

    SELECT @pesel=p.Pesel
    from Person as p
    where p.ID=@someoneId

    declare @rok int, @miesiac int, @dzien int;
    set @rok=CAST(SUBSTRING(@pesel,1,2) as int);
    set @miesiac=CAST(SUBSTRING(@pesel,3,2) as int);
    set @dzien=CAST(SUBSTRING(@pesel,5,2) as int);
    if @miesiac BETWEEN 21 and 32
    BEGIN
        SET @rok+=2000;
        set @miesiac-=20;
    END
    else if @miesiac BETWEEN 1 and 12
    BEGIN
        set @rok+=1900;
    END
    declare @dataUrodzenia date;
    set @age=YEAR(GETDATE())-@rok
    if @miesiac>MONTH(GETDATE())
    BEGIN
        SET @age-=1;
    END
    if @miesiac=MONTH(GETDATE()) and @dzien>DAY(GETDATE())
    BEGIN
        SET @age-=1;
    END

    IF @rok < 1900 OR @rok > 2026 or @miesiac>12 or @miesiac<1 or @dzien>31 or @dzien<1
        RETURN NULL;
        
    RETURN @age;
END
go