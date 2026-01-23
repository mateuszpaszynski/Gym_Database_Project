IF OBJECT_ID('dbo.UpdateRegisteredCount') is not null
DROP TRIGGER dbo.UpdateRegisteredCount
GO
CREATE TRIGGER dbo.UpdateRegisteredCount
ON ClassRegistrations
AFTER INSERT,DELETE
AS 
BEGIN
SET NOCOUNT ON;
IF EXISTS (
		SELECT 1 FROM ClassSchedule S JOIN inserted I ON S.ScheduleID = I.ScheduleID
        WHERE (SELECT COUNT(*) FROM ClassRegistrations WHERE ScheduleID = S.ScheduleID) > S.Max_slots
    )
BEGIN 
RAISERROR('Brak wolnych miejsc na te zajecia!',16,1)
ROLLBACK TRANSACTION;
RETURN;
END
IF EXISTS ( SELECT 1 FROM inserted)
BEGIN
UPDATE CS SET Registered = Registered + 1
FROM ClassSchedule CS Join inserted i on CS.ScheduleID = i.ScheduleID;
END
IF EXISTS(SELECT 1 FROM DELETED) 
BEGIN
UPDATE CS SET Registered = Registered - 1
FROM ClassSchedule CS Join DELETED d on Cs.ScheduleID = D.ScheduleID
END
END;
GO
IF OBJECT_ID('dbo.GeneratePaymentForSingleEntry') is not null
DROP TRIGGER dbo.GeneratePaymentForSingleEntry
GO
CREATE TRIGGER dbo.GeneratePaymentForSingleEntry
ON SingleEntries
AFTER INSERT AS
BEGIN SET NOCOUNT ON;

INSERT INTO PAYMENTS(ClientID,ServiceID,Data,UnitPrice,Amount)  
SELECT CustomerID,4,EntryDate,S.Price,S.Price FROM Inserted I LEFT JOIN [Services] S on S.ServiceID = 4
END;
GO

IF OBJECT_ID('dbo.GeneratePaymentForMembership') is not null
DROP TRIGGER dbo.GeneratePaymentForMembership
GO
CREATE TRIGGER dbo.GeneratePaymentForMembership
ON Memberships
AFTER INSERT AS
BEGIN SET NOCOUNT ON;
INSERT INTO PAYMENTS(ClientID,ServiceID,Data,UnitPrice,Amount)
SELECT CustomerID,I.ServiceID,I.PurchaseDate,S.Price,S.Price FROM INSERTED I LEFT JOIN [SERVICES] S on S.ServiceID = I.ServiceID
END;
GO
IF OBJECT_ID('dbo.GeneratePaymentForReservations') is not null
DROP TRIGGER dbo.GeneratePaymentForReservations

GO
CREATE TRIGGER dbo.GeneratePaymentForReservations
ON Reservations
AFTER INSERT AS
BEGIN SET NOCOUNT ON;
INSERT INTO Payments(ClientID,ServiceID,Data,UnitPrice,Amount) 
Select I.ClientID,I.RoomID + 6 [ServiceID],I.Data,S.Price,I.duration*S.Price [Amount] From Inserted I LEFT JOIN [Services] S on (I.RoomID + 6) = S.ServiceID
END;
GO
IF OBJECT_ID('dbo.GeneratePaymentForPersonalTrainingSessions') is not null
DROP TRIGGER dbo.GeneratePaymentForPersonalTrainingSessions
GO
CREATE TRIGGER dbo.GeneratePaymentForPersonalTrainingSessions
ON PersonalTrainingSessions
AFTER INSERT AS
BEGIN SET NOCOUNT ON;
INSERT INTO Payments(ClientID,ServiceID,Data,UnitPrice,Amount) 
SELECT I.CustomerID, 6 [ServiceID],I.startTime,S.Price,CAST(duration * S.Price as MONEY)[Amount] FROM INSERTED I LEFT JOIN [Services] S on S.ServiceID = 6
END;

if OBJECT_ID('dbo.TR_MinorAlertMembership','TR') is NOT NULL
drop TRIGGER dbo.TR_MinorAlertMembership
GO
create TRIGGER dbo.TR_MinorAlertMembership
on Memberships
after INSERT, UPDATE
AS
BEGIN 
    set NOCOUNT on;
    IF EXISTS(
        SELECT 1
        from inserted t
        where dbo.GetAge(t.CustomerID)<18 or dbo.GetAge(t.CustomerID) is null
    )
    BEGIN
        ;THROW 50000, 'Osoba musi byc pelnoletnia', 1;
    END
END;
GO
