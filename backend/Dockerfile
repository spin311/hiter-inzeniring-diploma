# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set /app as the working directory
WORKDIR /app

# Copy the JAR file to the working directory
COPY target/backend-1.0-SNAPSHOT.jar /app

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/backend-1.0-SNAPSHOT.jar"]