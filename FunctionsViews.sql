--CheatSheet for HR 
IF OBJECT_ID('dbo.GetMonthlyPayouts') is not null
DROP FUNCTION GetMonthlyPayouts
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


-- HOW MUCH MONEY EACH Customer Spent 
IF OBJECT_ID('CustomersSpending') is not null
DROP VIEW CustomersSpending
GO
CREATE VIEW CustomersSpending as
SELECT P.ID,P.Name,P.Surname,COALESCE(S.[Money Spent],0)[Money Spent] FROM PERSON P  LEFT JOIN 
(SELECT ClientID,SUM(Amount)[Money Spent]FROM PAYMENTS
GROUP BY ClientID ) S on S.ClientID = P.ID
where P.ID in ( SELECT * FROM CUSTOMERS)
GO
SELECT * FROM CustomersSpending
ORDER BY [Money Spent] DESC
