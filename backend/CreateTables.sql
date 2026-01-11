USE MASTER;
GO
IF DB_ID('Silownia') is not NULL
BEGIN 
ALTER DATABASE Silownia SET SINGLE_USER with ROLLBACK IMMEDIATE;
DROP DATABASE Silownia
END
GO
CREATE DATABASE Silownia
Go
-- Przelaczenie na nowa baze bez tego nie dziala 
USE Silownia
GO
-- Tabela nadrzêdna
CREATE TABLE Person (
ID int IDENTITY(1,1) not Null,
Name nvarchar(256) not null,
Surname nvarchar(256) not null,
Pesel char(11) not Null,
Email nvarchar(256),
CONSTRAINT PK_Person PRIMARY KEY(ID),
CONSTRAINT CHECK_PESEL CHECK (LEN(PESEL) = 11 AND PESEL not like '%[^0-9]%')
)
--Tabela podrzedna
CREATE TABLE Employees (
ID int not null,
JobTitle nvarchar(256) not null,
HireDate date not null,
HourlySalary decimal(10,2),
CONSTRAINT PK_Employees PRIMARY KEY(ID),
CONSTRAINT FK_Employees FOREIGN KEY (ID) REFERENCES Person(ID)
)
CREATE TABLE Customers (
ID int not NULL,
CONSTRAINT PK_Customers PRIMARY KEY(ID),
CONSTRAINT FK_Customers  FOREIGN KEY (ID) REFERENCES Person(ID)
)
CREATE TABLE Rooms(
ID int IDENTITY(1,1) PRIMARY KEY not null,
Name nvarchar(256) not null,
SurfaceArea decimal(6,2),
)
CREATE TABLE [Services] (
ServiceID int IDENTITY(1,1) not null,
ServiceName nvarchar(256) not null,
Price decimal(10,2) not null,
CONSTRAINT PK_Memberships_offers PRIMARY KEY (ServiceID)
)
CREATE TABLE Memberships (
ID int IDENTITY(1,1) PRIMARY KEY,
CustomerID INT not null,
ServiceID INT not null,
PurchaseDate datetime not null,
StartDate date not null,
EndDate date not null,
CONSTRAINT FK_ClientMembershipsCustomerID FOREIGN KEY (CustomerID) REFERENCES Customers(ID),
CONSTRAINT FK_ClientMembershipsServiceID FOREIGN KEY (ServiceID) REFERENCES [Services](ServiceID)
)
CREATE TABLE SingleEntries(
ID INT IDENTITY(1,1) PRIMARY KEY,
CustomerID int not null,
EntryDate datetime not null,
CONSTRAINT FK_SingleEntriesCustomerID FOREIGN KEY (CustomerID) REFERENCES Customers(ID)
)

CREATE TABLE Payments (
PaymentID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
ClientID INT not NULL,
ServiceID int not null,
UnitPrice int not null,
Amount decimal (10,2) not null,
Data datetime not null,
CONSTRAINT FK_PaymentsClient FOREIGN KEY (ClientID) REFERENCES Customers(ID),
CONSTRAINT FK_PaymentsService FOREIGN KEY (ServiceID) REFERENCES [Services](ServiceID)
)
CREATE TABLE EmployeesHolidays (
HolidayID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
EmployeeID INT not null,
StartDate DATE not null,
EndDate Date,
HolidayType nvarchar(256),
CONSTRAINT FK_EmployeesHolidaysEmployee FOREIGN KEY(EmployeeID) REFERENCES Employees(ID)
)
CREATE TABLE Reservations (
ReservationID INT IDENTITY(1,1) not NULL PRIMARY KEY,
ClientID int not null,
RoomID int not null,
Data datetime not null,
Duration decimal(2,1) not null,
CONSTRAINT FK_ReservationsClient FOREIGN KEY(ClientID) REFERENCES Customers(ID),
CONSTRAINT FK_ReservationsRoom FOREIGN KEY(RoomID) REFERENCES Rooms(ID),
)
CREATE TABLE EntriesBacklog(
EntryID  INT IDENTITY(1,1) not null PRIMARY KEY,
PersonID int not null,
RoomID int not null,
InorOut nvarchar(3) not null,
Data datetime not null,
CONSTRAINT FK_EntriesBacklogID FOREIGN KEY(PersonID) REFERENCES Person(ID),
CONSTRAINT FK_EntriesBaclogRoom FOREIGN KEY (RoomID) REFERENCES Rooms(ID),
)
CREATE TABLE ClassTypes (
ClassID int IDENTITY(1,1) not null,
RoomID int not null,
ClassName nvarchar(256) not null,
CONSTRAINT PK_ClassTypesClasses PRIMARY KEY(ClassID),
CONSTRAINT FK_ClassTypesRoom FOREIGN KEY(RoomID) REFERENCES Rooms(ID),
)
CREATE TABLE ClassSchedule(
ScheduleID int IDENTITY(1,1) not null PRIMARY KEY,
ClassID int not null,
Registered int not null,
Max_slots int not null,
EmployeeID int not null,
StartTime datetime not null,
durationTime decimal(4,2),
CONSTRAINT FK_ClassScheduleClassID FOREIGN KEY(CLASSID) REFERENCES ClassTypes(ClassID),
CONSTRAINT FK_ClassScheduleEmployeeID FOREIGN KEY(EmployeeID) REFERENCES Employees(ID)
)
CREATE TABLE ClassRegistrations(
ScheduleID int not null,
CustomerID int not null,
CONSTRAINT PK_ClassRegistrations PRIMARY KEY(ScheduleID,CustomerID),
CONSTRAINT FK_ClassRegistrationsScheduleID FOREIGN KEY (ScheduleID) References ClassSchedule(ScheduleID),
CONSTRAINT FK_ClassRegistrationsCustomer FOREIGN KEY (CustomerID) References Customers(ID),
)
CREATE TABLE WorkShifts(
ShiftID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
EmployeeID INT NOT NULL,
RoomID int NULL,
StartTime datetime not null,
durationTime decimal(4,2),
CONSTRAINT FK_WorkShiftsEmployeeID FOREIGN KEY(EmployeeID) REFERENCES Employees(ID),
CONSTRAINT FK_WorkShiftsRoomID FOREIGN KEY(RoomID) References ROOMS(ID)

)
CREATE TABLE PersonalTrainingSessions(
SessionID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
CustomerID int not null,
EmployeeID int not null,
RoomID int not null,
startTime datetime not null,
duration decimal(4,2) not null
CONSTRAINT FK_PersonalTrainingSessionsCustomerID FOREIGN KEY(CustomerID) REFERENCES Customers(ID),
CONSTRAINT FK_PersonalTrainingSessionsEmployeeID FOREIGN KEY(EmployeeID) REFERENCES Employees(ID),
CONSTRAINT FK_PersonalTrainingSessionsRoomID FOREIGN KEY(RoomID) REFERENCES ROOMS(ID),
)


