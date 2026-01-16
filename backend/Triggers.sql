IF OBJECT_ID('TR_UpdateRegisteredCount') is not null
DROP TRIGGER TR_UpdateRegisteredCount
GO
CREATE TRIGGER TR_UpdateRegisteredCount
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
IF OBJECT_ID('TR_GeneratePaymentForSingleEntry') is not null
DROP TRIGGER TR_GeneratePaymentForSingleEntry
GO
CREATE TRIGGER TR_GeneratePaymentForSingleEntry
ON SingleEntries
AFTER INSERT AS
BEGIN SET NOCOUNT ON;

INSERT INTO PAYMENTS(ClientID,ServiceID,Data,UnitPrice,Amount)  
SELECT CustomerID,4,EntryDate,S.Price,S.Price FROM Inserted I LEFT JOIN [Services] S on S.ServiceID = 4
END;
GO

IF OBJECT_ID('TR_GeneratePaymentForMembership') is not null
DROP TRIGGER TR_GeneratePaymentForMembership
GO
CREATE TRIGGER TR_GeneratePaymentForMembership
ON Memberships
AFTER INSERT AS
BEGIN SET NOCOUNT ON;
INSERT INTO PAYMENTS(ClientID,ServiceID,Data,UnitPrice,Amount)
SELECT CustomerID,I.ServiceID,I.PurchaseDate,S.Price,S.Price FROM INSERTED I LEFT JOIN [SERVICES] S on S.ServiceID = I.ServiceID
END;
GO
IF OBJECT_ID('TR_GeneratePaymentForReservations') is not null
DROP TRIGGER TR_GeneratePaymentForReservations

GO
CREATE TRIGGER TR_GeneratePaymentForReservations
ON Reservations
AFTER INSERT AS
BEGIN SET NOCOUNT ON;
INSERT INTO Payments(ClientID,ServiceID,Data,UnitPrice,Amount) 
Select I.ClientID,I.RoomID + 6 [ServiceID],I.Data,S.Price,I.duration*S.Price [Amount] From Inserted I LEFT JOIN [Services] S on (I.RoomID + 6) = S.ServiceID
END;
GO
IF OBJECT_ID('TR_GeneratePaymentForPersonalTrainingSessions') is not null
DROP TRIGGER TR_GeneratePaymentForPersonalTrainingSessions
GO
CREATE TRIGGER TR_GeneratePaymentForPersonalTrainingSessions
ON PersonalTrainingSessions
AFTER INSERT AS
BEGIN SET NOCOUNT ON;
INSERT INTO Payments(ClientID,ServiceID,Data,UnitPrice,Amount) 
SELECT I.CustomerID, 6 [ServiceID],I.startTime,S.Price,CAST(duration * S.Price as MONEY)[Amount] FROM INSERTED I LEFT JOIN [Services] S on S.ServiceID = 6
END;

if OBJECT_ID('TR_MinorAlertMembership','TR') is NOT NULL
drop TRIGGER TR_MinorAlertMembership
GO
create TRIGGER TR_MinorAlertMembership
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
END
GO
