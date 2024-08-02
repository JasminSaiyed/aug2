Task02
you are tasked to setting up a CI/CD pipeline for a micro-service based application,the application will be containerized with docker and orchestrated using kubernetes,ansible will be used for configuration management and deployment,the entire setup should be managed using git for version control and jenkins will be used to automate CI/CD process


Step 1: Set Up the Directory Structure

    Create Directories for Each Component
        Organize your project files into appropriate directories.

![alt text](<Screenshot from 2024-08-02 23-55-04.png>)

Step 2: Create Dockerfiles for Each Microservice

![alt text](<Screenshot from 2024-08-02 23-57-03.png>)

Front-End Microservice



   (1) Create Dockerfile for Front-End
    # Dockerfile for Front-End
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]

create package.json

{
  "name": "front-end",
  "version": "1.0.0",
  "description": "Front-end microservice",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
 create app.json

 const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Front-End Microservice!');
});

app.listen(port, () => {
  console.log(`Front-End Microservice listening at http://localhost:${port}`);
});

![alt text](<Screenshot from 2024-08-02 22-12-46.png>)
![alt text](<Screenshot from 2024-08-02 22-12-51.png>)
![alt text](<Screenshot from 2024-08-02 22-14-37.png>)

(2) Creating Dockerfile for Product Catalog Microservice
# Use a base image with Java runtime
FROM openjdk:11-jre-slim

# Create a working directory inside the container
WORKDIR /usr/src/app

# Copy the JAR file from the host to the container
COPY target/product-catalog-1.0-SNAPSHOT.jar /usr/src/app/product-catalog.jar

# Expose the port on which the application will run
EXPOSE 8080

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "/usr/src/app/product-catalog.jar"]

craeting Application.java 

ackage com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
}
creating application.properties

spring.application.name=myapp
server.port=8080

creating MainApplicationTests


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MainApplicationTests {

    @Test
    void contextLoads() {
    }
}

creating Pom.xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Parent POM for Spring Boot -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.example</groupId>
    <artifactId>product-catalog</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>product-catalog</name>
    <description>Product Catalog Application</description>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starter Web Dependency -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.6.6</version>
            </plugin>
        </plugins>
    </build>
</project>
![alt text](<Screenshot from 2024-08-02 22-13-55.png>)
![alt text](<Screenshot from 2024-08-02 22-14-07.png>)
![alt text](<Screenshot from 2024-08-02 22-14-16.png>)
![alt text](<Screenshot from 2024-08-02 22-15-01-1.png>)

(3) creating docker files for order-processing

# Dockerfile for Order Processing
FROM python:3.8-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD [ "python", "app.py" ]

creating app.py

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Order Processing Microservice!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

creating requirements.txt
flask

![alt text](<Screenshot from 2024-08-02 22-15-15.png>)
![alt text](<Screenshot from 2024-08-02 22-15-21.png>)
