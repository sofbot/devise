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
custom_id       | string    | not null, indexed, unique
image_url       | string    | not null
url             | string    | not null
title           | string    | not null
summary         | text      | not null
description     | text      | not null
start_time      | datetime  | not null
end_time        | datetime  | not null
created_at      | datetime  | not null

## userevents
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key
event_id        | integer   | not null, foreign key
liked           | boolean   | not null
seconds_viewed  | integer   | not null
created_at      | datetime  | not null

## invitations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_event_id    | integer   | not null, foreign key
user_id         | text      | not null
created_at      | datetime  | not null
