-- CREATE DATABASE hw4;

USE hw4

CREATE TABLE Questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    answerType ENUM("Number", "Boolean", "Text", "Multiple Choice") NOT NULL,
    multipleChoiceResponses TEXT,
    creationDate DATE NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE QuestionResponse(
    id INT AUTO_INCREMENT PRIMARY KEY,
    response VARCHAR(10000),
    question INT,
    date DATE
);

CREATE TABLE User (
    name VARCHAR(255),
    email VARCHAR(255),
    profile VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE Login (
    name VARCHAR(255),
    auth BOOLEAN
)