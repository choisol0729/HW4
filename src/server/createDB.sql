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
    name TEXT,
    email VARCHAR(255),
    profile VARCHAR(255),
    address VARCHAR(255)
);