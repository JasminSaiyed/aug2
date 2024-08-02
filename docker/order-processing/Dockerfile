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

