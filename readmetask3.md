Task03

Create kubernetes configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: microservices-config
data:
  DATABASE_URL: "postgres://user:password@hostname:port/dbname"
  OTHER_CONFIG: "value"

 create secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: microservices-secrets
type: Opaque
data:
  SECRET_KEY: bXlzZWNyZXRrZXk=

(1) front-end 
 deployment file
 apiVersion: apps/v1
kind: Deployment
metadata:
  name: front-end
spec:
  replicas: 3
  selector:
    matchLabels:
      app: front-end
  template:
    metadata:
      labels:
        app: front-end
    spec:
      containers:
        - name: front-end
          image: yourusername/front-end:latest
          ports:
            - containerPort: 80
          envFrom:
            - configMapRef:
                name: microservices-config
            - secretRef:
                name: microservices-secrets

create service.yaml

apiVersion: v1
kind: Service
metadata:
  name: front-end
spec:
  selector:
    app: front-end
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP


(2) product-catalog

create deployment file

apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-catalog
spec:
  replicas: 3
  selector:
    matchLabels:
      app: product-catalog
  template:
    metadata:
      labels:
        app: product-catalog
    spec:
      containers:
        - name: product-catalog
          image: yourusername/product-catalog:latest
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: microservices-config
            - secretRef:
                name: microservices-secrets

craete service.yaml

apiVersion: v1
kind: Service
metadata:
  name: product-catalog
spec:
  selector:
    app: product-catalog
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP

  (3) Order-processing 

  creating deployment files

  apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-processing
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-processing
  template:
    metadata:
      labels:
        app: order-processing
    spec:
      containers:
        - name: order-processing
          image: yourusername/order-processing:latest
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: microservices-config
            - secretRef:
                name: microservices-secrets

creating service.yaml

apiVersion: v1
kind: Service
metadata:
  name: product-catalog
spec:
  selector:
    app: product-catalog
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP

  ![alt text](<Screenshot from 2024-08-02 23-24-08.png>)
  ![alt text](<Screenshot from 2024-08-02 23-25-45.png>)
  ![alt text](<Screenshot from 2024-08-02 23-26-11.png>)