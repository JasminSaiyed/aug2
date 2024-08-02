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
