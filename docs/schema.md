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
source          | string    | not null
custom_id       | string    | not null, primary key
image_url       | string    | not null
url             | string    | not null
title           | string    | not null
location        | string    | not null
address         | string    | not null
summary         | text      | not null
free            | Boolean   | not null
description     | text      | not null
start_date      | date      | not null
start_time      | time      | not null
end_time        | date      | not null
end_date        | time      | not null
create_date     | date      | not null
create_time     | time      | not null

## eventquery
column name     | data type | details
----------------|-----------|-----------------------
source          | string    | not null
date            | date      | not null
create_date     | date      | not null
create_time     | time      | not null

## userevents
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null
event           | integer   | not null, foreign key (=custom_id)
liked           | boolean   | not null
seconds_viewed  | integer   | not null
seen_date       | date      | not null
seen_time       | time      | not null

## invitations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null
userevent       | integer   | not null, foreign key
create_date     | date      | not null
create_time     | time      | not null
