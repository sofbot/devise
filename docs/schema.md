# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
userName        | string    | not null, indexed, unique
emailAddress    | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
imageUrl        | string    | not null
timestamps      | timestamp | not null

## events
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
source          | string    | not null
compositeId     | string    | not null, indexed, unique
imageUrl        | string    | not null
title           | string    | not null
summary         | text      | not null
description     | text      | not null
startDate       | date      | not null
startTime       | time      | not null
endDate         | date      | not null
endTime         | time      | not null
timestamps      | timestamp | not null

## userevents
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
userId          | integer   | not null, foreign key
eventId         | integer   | not null, foreign key
liked           | boolean   | not null
timestamps      | timestamp | not null

## invitations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
userevent_id    | integer   | not null, foreign key
inviteeEmail    | text      | not null
timestamps      | timestamp | not null
