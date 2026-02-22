# docker-labs  
This repository consist of multiple docker applications.

A typical top-level directory layout
```
docker-labs/
├── project1/
│   ├── Dockerfile
│   ├── app/
│   └── ...
├── project2/
│   ├── Dockerfile
│   ├── src/
│   └── ...
└── project3/
    ├── Dockerfile
    ├── service/
    └── ...
```
## 1. Docker App (sample JS APP)

## 2. Docker Python App
Run the code
> python rng.py
> docker run -it basic-python-app

## 3. Feedback node
Build image
> docker build -t feedback-node .
####Start container
> docker run -p 3000:80 -d --name feedback-app -d --rm feedback-node
#### --rm remove container once after stop the container
####Stop container
> docker stop feedback-app
####Start container
> docker start feedback-app


-------

# Docker

Docker is a tool that helps you package an application with everything it needs (code, libraries, dependencies, configuration) into one container so it can run anywhere without problems.

Docker ಅಂದ್ರೆ ನಿಮ್ಮ application-ನ್ನು ಅದರ ಎಲ್ಲಾ dependencies ಜೊತೆ ಒಂದು container ಒಳಗೆ package ಮಾಡಿ ಎಲ್ಲಿಯಾದರೂ run ಮಾಡೋ tool.

**Real Life Example**

Imagine you built a Python application on your laptop.

On your system:
- Python 3.11 installed
- Some pip libraries installed
- MongoDB installed
- Redis installed

You give your project to your friend.

On your friend’s laptop:
- Python 3.8
- Missing libraries
- No MongoDB
- Different OS

**The app won’t run**. This problem called as It works on my machine.

**How Docker Solves This**

Docker creates something called a Container.

A container includes:
- Application code
- Runtime (Python / NodeJS etc.)
- Libraries
- System tools
- Dependencies

So when you share it:

It runs the same everywhere: Laptop, Server, Cloud, AWS and Azure.

Application + Libraries + Runtime + Configuration ಇವೆಲ್ಲವನ್ನು ಒಂದು Container ಒಳಗೆ pack ಮಾಡುತ್ತದೆ. ಆ container ಅನ್ನು ಯಾರಿಗೆ ಕೊಟ್ಟರೂ Same ಆಗಿ run ಆಗುತ್ತದೆ & OS different ಇದ್ದರೂ problem ಇಲ್ಲ.

Docker is a containerization platform that uses OS-level virtualization to create lightweight, isolated environments called containers.

Containers share the host OS kernel but run independently.

## Docker Architecture 

Docker follows a Client–Server Architecture. There are mainly 3 core components:

**1. Docker Client**

The Docker Client is the command-line tool you use.
```
docker build .
docker run nginx
docker ps
```
When you type these commands, Client sends request to Docker Daemon and Docker Daemon does the actual work.

The client and daemon can: Run on same machine Or on different machines (remote Docker server)

**2. Docker Daemon / dockerd (Server)**

Docker Daemon is the main engine that manages:
- Images
- Containers
- Networks
- Volumes
- Build process

It listens for Docker API requests.
When you run
```
docker run nginx
```
Flow:
- Client sends request
- Daemon checks if nginx image exists
- If not, pulls from registry
- Creates container
- Starts container

Daemon runs in background as a service.

**3. Docker Registry**

Registry is where Docker images are stored. Default public registry is **Docker Hub**.

```
docker pull nginx
```
Docker will:
- Connect to Docker Hub
- Download nginx image
- Store locally

You can also have:
- Private registry
- Company internal registry

## How docker works

Example Scenario: We have a simple Python app.

```
#app.py

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello Docker!"

app.run(host="0.0.0.0", port=5000)
```
```
#requirements.txt
flask
```
**Step1: You write a Dockerfile**

A Dockerfile is a text file with instructions to build an image.

It tells Docker:
- Which base OS to use
- Which runtime to install
- Which files to copy
- Which command to run

```
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```
```
| Instruction | Meaning                               |
| ----------- | ------------------------------------- |
| FROM        | Base image                            |
| WORKDIR     | Set working directory                 |
| COPY        | Copy files                            |
| RUN         | Execute command during build          |
| CMD         | Default command when container starts |
```

Step2: Docker builds Image

when we run the command
```
docker build -t myflaskapp .
```
- Docker Client sends build request
- Docker Engine reads Dockerfile
- Docker creates layers step-by-step

Each instruction creates a layer:
- Layer 1 → python:3.11
- Layer 2 → WORKDIR /app
- Layer 3 → Copy requirements
- Layer 4 → Install flask
- Layer 5 → Copy app code

These layers are read-only, Cached and Reused if unchanged

**Step3: Image runs as Container**

when we run command
```
docker run -d -p 5000:5000 myflaskapp
```

Docker Engine:
- Checks if image exists
- Creates writable container layer
- Creates namespaces
- Applies cgroups
- Sets up networking
- Runs CMD instruction
- Container starts

Image is like blueprint/template (class) and Container is Running instance of image (object). You can create multiple containers from one image.

Container Filesystem Structure

Image Layers (Read-only) + Container Writable Layer (Read-write).

If we deleted container, writable layer gets deleted.

**Step4: Docker Engine manages everything**

Docker Engine consists of:
- Docker Daemon (dockerd)
- REST API
- Container runtime (containerd)

Docker Engine Responsibilities
- Image Management: Pull, Build, Store and Remove image

- Container Lifecycle: Create, Start, Stop, Restart and Remove the container

- Network Management: Bridge network, Port mapping and Container DNS

- Volume Management: Persistent storage

complete flow
```
Developer writes Dockerfile
        ↓
docker build
        ↓
Docker Engine creates Image (layers)
        ↓
docker run
        ↓
Engine creates Container
        ↓
Sets isolation + networking
        ↓
Runs application
        ↓
App accessible via port mapping
```

## Core Concepts of Docker

**1. Docker Engine (Heart of Docker)**

Docker Engine is the main software that:
- Builds images
- Runs containers
- Manages networking
- Manages volumes

It runs as a background service (dockerd).

when we type
```
docker run node
```
docker engine does the actual work.

**2. Docker Image (Blueprint)**

An Image is a read-only template used to create containers.

It contains:
- Base OS
- Runtime (Node/Python)
- App code
- Dependencies

```
#Dockerfile

FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]
```
Build image
```
docker build -t mynodeapp .
```
Now mynodeapp is an Image.

**3. Container (Running Application)**

A container is a running instance of an image. Image is like class and container is object.

when we run 
```
docker container run -p 3000:3000 mynodeapp
```
Now app is running inside the container.

**4. Dockerfile**

A text file that tells Docker how to build the image.
It contains instructions like:
- FROM
- COPY
- RUN
- CMD and more

without this we can not create custom image.

**5. Docker Layers**

Each Dockerfile instruction creates a layer.
```
#Dockerfile

FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
```
Layers are 5 in above dockerfile and those are node:18, WORKDIR, COPY package.json, RUN npm install and COPY app code.

Why important?
- Layers are cached
- Layers are reusable
- Saves space
- Faster builds

**6. Networking (Container Communication)**

When you install Docker, it automatically creates a default network called **bridge**. This allows containers to talk to each other inside the same machine.

```
#Docker creates a private internal network
docker network create mynetwork

# Both containers are on default bridge network. But they cannot talk using container name (like backend)
docker run --name backend myapi
docker run --name frontend myui

# Now both containers are inside mynetwork
docker run --name backend --network mynetwork myapi
docker run --name frontend --network mynetwork myui
```
Frontend can access over ```http://backend:3000```

**7. Volumes (Data Persistence)**

By default, container data is Temporary, if we delete container data will lost.

Solution is:
```
docker volume create mydata
docker run -v mydata:/app/data mynodeapp
```
Now data persists even if container removed.

**8. Docker Registry (Image Storage)**

Registry stores images. Default public registry is **Docker Hub**.

## Diff b/w Virtual Machine and Docker

### **1. Virtual Machine**

A Virtual Machine (VM) is a virtual computer that runs on top of your computer.

It has:
- Full OS
- Own kernel
- Own RAM
- Own CPU

It behaves like a real separate physical machine (computer).

For example, 
- Your laptop has **Windows OS**
- You install: **VirtualBox (Hypervisor)**
- Inside VirtualBox: **Install Ubuntu (Guest OS)**

Now Ubuntu runs like a separate machine.

You can: Install Nginx, Install MySQL and Run applications

But it uses:
- Separate OS
- Separate kernel
- More RAM
- More CPU

### **2. Docker**

Docker uses containerization.

Containers:
- Share the host OS kernel
- Do NOT install full OS
- Are lightweight
- Start in seconds

Each container:
- Has isolated environment
- Has its own filesystem
- Shares same kernel

For example,
Instead of installing Ubuntu inside VM:

You simply run:
```
docker run nginx
```
Docker:
- Pulls nginx image
- Creates container
- Runs app

No full OS installed inside container.

```
| Feature        | VM             | Docker         |
| -------------- | -------------- | -------------- |
| OS             | Full OS per VM | Shares host OS |
| Boot Time      | Minutes        | Seconds        |
| Size           | GBs            | MBs            |
| Performance    | Slower         | Faster         |
| Resource Usage | High           | Low            |
| Isolation      | Strong         | Process-level  |
| Startup        | Heavy          | Lightweight    |
```
VM = Full Computer inside a Computer

Docker = App inside a Container

## Docker Container

A Docker Container is a running instance of a Docker Image.

It is:
- Lightweight
- Isolated
- Portable
- Fast

It contains:
- Application code
- Runtime
- Libraries
- Dependencies
- System tools

But it shares the host OS kernel.

Image is blueprint and Container is Running App. First we need to build an image '''docker build -t myapp .``` and run the app ```docker run myapp```. Now it becomes a container.

**Internal working of container when we run the container**

When we run the command
```
docker run -p 5000:5000 myapp
```
Docker Engine does:
- Creates a writable layer
- Sets up namespaces
- Applies cgroups
- Creates network interface
- Starts main process (PID 1)
- Maps ports
- Container starts running

Docker containers use Linux Kernel Features

Before containers, applications were deployed on physical servers or VMs with full OS, which caused resource wastage and dependency issues. After containers, applications run in lightweight, isolated environments sharing the host OS, improving efficiency, portability, and scalability.

Container ಮೊದಲು applications VM ಅಥವಾ physical server ಮೇಲೆ full OS ಜೊತೆಗೆ run ಆಗುತ್ತಿತ್ತು, ಇದು resource wastage ಮತ್ತು dependency issues ಕೊಡುತ್ತಿತ್ತು. Container ನಂತರ lightweight environment ನಲ್ಲಿ run ಆಗುತ್ತದೆ, host OS share ಮಾಡುತ್ತದೆ, deployment fast ಮತ್ತು scalable ಆಗುತ್ತದೆ.

## Docker Layers

A Docker layer is a read-only filesystem created for each instruction in a Dockerfile. A Docker layer is one step in building a Docker image. Every line in a Dockerfile creates a new layer.

Now Docker creates layers on each instruction.
```
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y python3
COPY app.py /app/
CMD ["python3","/app/app.py"]
```

```
| Instruction        | Layer Created  |
| ------------------ | -------------- |
| FROM ubuntu        | Base layer     |
| RUN update         | Layer 2        |
| RUN install python | Layer 3        |
| COPY app.py        | Layer 4        |
| CMD                | Metadata layer |
```

Image Layers are
- Read-only
- Built during docker build
- Shared between containers

Container Writable Layer
- A writable layer on top of image layers
when we ```run docker run myimage```

```
Image Layer 1 (read-only)
Image Layer 2 (read-only)
Image Layer 3 (read-only)
--------------------------
Container Layer (read-write)
```
If container deleted, writable layer deleted.

**Why Docker Uses Layers?**

1. Storage Efficiency
- If 10 images use Ubuntu base, Ubuntu layer stored only once.

2. Faster Builds (Build Cache)
- If you rebuild image and only change last step, Docker reuses previous layers.
