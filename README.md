```
Docker Learning Roadmap
Goal: Complete Docker from beginner to advanced with the best YouTube resources.

Phase 1 - Docker Basics (Hindi)
Primary Course: M Prashant - Docker Full Course (Hindi)
•	What is Docker?
•	Problems Docker solves
•	Virtual Machine vs Docker
•	Docker Architecture
•	Installing Docker
•	Docker Images
•	Docker Containers
•	Basic Docker Commands
•	Docker Hub
•	Dockerfile
•	Building Images
•	Docker Image Layers (Basics)
•	Docker Volumes
•	Bind Mounts
•	Docker Networking (Basics)
•	Environment Variables
•	Docker Compose
•	Multi-container Applications
•	Container Logs
•	docker exec
•	Port Mapping
•	Practical Examples
Phase 2 - Advanced Topics (Learn Separately)
Topic	Recommended YouTube Channel
Multi-stage Docker Builds	TechWorld with Nana
Docker BuildKit	TechWorld with Nana
Docker Swarm	TechWorld with Nana / Bret Fisher
Docker Security	TechWorld with Nana
Private Docker Registry	TechWorld with Nana
Advanced Docker Networking	TechWorld with Nana
Docker Secrets	TechWorld with Nana
Docker Health Checks	TechWorld with Nana
Docker Logging Drivers	TechWorld with Nana
Docker Resource Limits	TechWorld with Nana
Advanced Docker Volumes	TechWorld with Nana
Advanced Docker Compose	TechWorld with Nana
Dockerizing Django	Dennis Ivy / Very Academy / CodeWithHarry
PostgreSQL + Docker	TechWorld with Nana
Redis + Celery + Docker	Dennis Ivy / TestDriven.io
Nginx + Docker	TechWorld with Nana
.env Management	TechWorld with Nana
Docker in CI/CD	TechWorld with Nana
Image Optimization	TechWorld with Nana
Container Debugging	TechWorld with Nana
Docker + Kubernetes	TechWorld with Nana
Recommended Learning Order
1.	1. M Prashant (Hindi) - Docker Basics
2.	2. TechWorld with Nana - Advanced Docker
3.	3. Dennis Ivy - Docker + Django + PostgreSQL + Nginx
4.	4. TestDriven.io - Docker + Celery + Redis
5.	5. TechWorld with Nana - Kubernetes
6.	6. Learn Helm
7.	7. Learn GitHub Actions / GitLab CI
```

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

3. Reusability
- If we have ubuntu image, other 10 apps also use the same image without download it gain.

Layer = One Dockerfile instruction
Image = Stack of layers
Container = Image + Writable layer

**Docker commands**

```
# Run a new container from an image
docker run nginx

# Run container in background (detached mode)
docker run -d nginx

# Run container with port mapping (Host:Container)
docker run -p 80:80 nginx

# Run container with custom name
docker run --name mynginx nginx

# Run container interactively with terminal
docker run -it ubuntu bash

# Create container but do not start
docker create --name mycontainer nginx

# List running containers
docker ps

# List all containers (running + stopped)
docker ps -a

# Start a stopped container
docker start mycontainer

# Stop a running container (graceful shutdown)
docker stop mycontainer

# Force stop container immediately
docker kill mycontainer

# Restart container
docker restart mycontainer

# Remove a stopped container
docker rm mycontainer

# Force remove a running container
docker rm -f mycontainer

# View logs of a container
docker logs mycontainer

# View live logs (follow mode)
docker logs -f mycontainer

# Execute command inside running container
docker exec -it mycontainer bash

# Attach to running container's main process
docker attach mycontainer

# Copy file from host to container
docker cp file.txt mycontainer:/app/

# Copy file from container to host
docker cp mycontainer:/app/file.txt .

# Show detailed container information (JSON output)
docker inspect mycontainer

# Show running processes inside container
docker top mycontainer

# Show live CPU and memory usage
docker stats

# Pause container processes
docker pause mycontainer

# Resume paused container
docker unpause mycontainer

# Rename a container
docker rename oldname newname

# Remove all stopped containers
docker container prune
```
## Docker image

A Docker Image is a template (blueprint) used to create containers.

It contains:
- Application code
- Runtime (Python, Node, Java, etc.)
- Libraries
- Dependencies
- System tools

But it is not running.

Suppose you have a Python app. To run it manually, you need:
- Install Linux
- Install Python
- Install pip packages
- Copy your app code

Instead of doing this every time…

You create a Docker Image that already contains everything. whenever we run ```docker run myapp``` It creates a container and runs the app.

**Important Points About Image**
- Image is read-only
- Image is built using Dockerfile
- One image can create many containers
- Images are made of layers
- Images are stored in Docker Hub or registry 

**How Image is Created**
- Write a Dockerfile
- Build the file using ``` docker build -t myapp . ```
- Now myapp is an image.

**Docker image commands**

```
# Pull image from Docker Hub (download image)
docker pull nginx

# List all local images
docker images

# Alternative command to list images
docker image ls

# Build image from Dockerfile in current directory
docker build -t myapp .

# Build image with specific Dockerfile
docker build -t myapp -f Dockerfile.dev .

# Tag image (add new name or version)
docker tag myapp myrepo/myapp:v1

# Push image to Docker Hub or registry
docker push myrepo/myapp:v1

# Remove image
docker rmi myapp

# Force remove image
docker rmi -f myapp

# Show image history (layers)
docker history myapp

# Inspect image (detailed JSON info)
docker inspect myapp

# Search image in Docker Hub
docker search nginx

# Save image to tar file (backup/export)
docker save -o myapp.tar myapp

# Load image from tar file
docker load -i myapp.tar

# Show disk usage of images, containers, volumes
docker system df

# Remove dangling (unused) images
docker image prune

# Remove all unused images (not used by any container)
docker image prune -a

# Remove all unused data (images, containers, networks)
docker system prune

# Remove everything including unused images
docker system prune -a
```

## **Build and Run Your First Docker Image**

To build a Docker image, we write a Dockerfile starting with FROM instruction, then copy application files and define CMD. We build it using docker build and run it using docker run, which creates a container from the image.

Docker image build ಮಾಡಲು Dockerfile ಬರೆಯಬೇಕು, FROM instruction ಇಂದ start ಆಗಬೇಕು. ನಂತರ files copy ಮಾಡಿ CMD define ಮಾಡಬೇಕು. docker build ಮೂಲಕ image create ಮಾಡುತ್ತೇವೆ ಮತ್ತು docker run ಮೂಲಕ container run ಮಾಡುತ್ತೇವೆ.

**STEP 1: Create Simple Python File**

This is a simple Python program. When executed, it prints a message.
```
#app.py
print("Hello, Docker World!")
```

**STEP 2: Create Dockerfile**

File name must be exactly Dockerfile. No extension (.txt) and **D** must be capital.
```
#Dockerfile

FROM python:3.11
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```
Always Remember While Writing Dockerfile
- FROM must be first instruction
- Order matters (layer caching)
- Copy dependency files first (in real projects)
- Keep Dockerfile clean and small
- Use specific versions (avoid latest in production)

**STEP 3: Build Docker Image**

Open terminal in project folder and run: 
```
docker build -t mypythonapp .
```
- docker build,Build image
- -t mypythonapp → Tag name
- . → Current directory (build context)

Docker:
- Reads Dockerfile
- Executes each instruction
- Creates layers
- Builds image
- Stores image locally

**STEP 4: Run the Container**

```
docker run mypythonapp
```
Docker:
- Creates container from image
- Adds writable layer
- Runs CMD instruction
- Prints output : ```Hello, Docker World!```

## Dockerfile Instruction

### **1. FROM Instruction**

FROM is the first and most important instruction in a Dockerfile. It defines the base image on which your image will be built. (ಈ image ಇಂದ ನನ್ನ image build ಮಾಡು)

The FROM instruction defines the base image for building a Docker image. It must be the first instruction in the Dockerfile. It supports version tagging and multi-stage builds. Using specific versions instead of latest is recommended for production stability.

FROM instruction Docker image build ಮಾಡಲು base image define ಮಾಡುತ್ತದೆ. ಇದು Dockerfile ನಲ್ಲಿ ಮೊದಲ instruction ಆಗಿರಬೇಕು. Version tag support ಮಾಡುತ್ತದೆ ಮತ್ತು multi-stage build ಕೂಡ support ಮಾಡುತ್ತದೆ. Production ನಲ್ಲಿ latest ಬಳಸದೇ specific version ಬಳಸಬೇಕು.

```
basic syntax
FROM image_name

FROM python:3.12
FROM ubuntu:22.04
```
A base image contains: Operating system, Runtime (optional) and Basic tools

**Keypoints**

- The base image must be defined first. Without FROM, Docker doesn’t know where to start.
- Avoid using latest. Version will change and build will break.
- You can use multiple FROM instructions
```
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

### **2. WORKDIR Instruction**

WORKDIR sets the working directory inside the container. From now on, all commands will run inside this folder.

It is just like ```cd /app``.

WORKDIR = cd + mkdir (persistent)

WORKDIR instruction container ಒಳಗೆ working directory set ಮಾಡುತ್ತದೆ. Folder ಇಲ್ಲದಿದ್ದರೆ create ಮಾಡುತ್ತದೆ. COPY, RUN, CMD ಎಲ್ಲಾ commands ಅದರಲ್ಲಿ execute ಆಗುತ್ತದೆ.

```
basic syntax
WORKDIR folder

WORKDIR /app
```
When Docker sees
- Creates /app folder (if not exists)
- Sets it as current working directory
- All next instructions run inside /app

Without WORKDIR, we must write full path everywhere
```
COPY app.py /app/app.py
RUN pip install -r /app/requirements.txt
```
with WORKDIR
```
WORKDIR /app
COPY app.py .
RUN pip install -r requirements.txt
```

For example
```
FROM node:18
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["node","app.js"]
```
working flow as follows
- Base image loaded
- /usr/src/app created
- package.json copied into that folder
- npm install runs inside that folder
- App runs from that folder

we can use multiple WORKDIR
```
WORKDIR /app
WORKDIR src
WORKDIR backend
```
Final working directory is : ```/app/src/backend```

### **3. COPY Instruction**

COPY is used to copy files or folders from your local system into the Docker image.

It copies from:
- Build context (your project folder)
- Into the container filesystem

COPY instruction build context ಇಂದ files ಅನ್ನು Docker image ಒಳಗೆ copy ಮಾಡುತ್ತದೆ. ಇದು ಹೊಸ layer create ಮಾಡುತ್ತದೆ. Build fast ಆಗಲು COPY order ಮುಖ್ಯ.

```
basic syntax
COPY <source> <destination>

COPY app.py /app/
```

For example : 

```
my project folder
project/
 ├── Dockerfile
 ├── app.py
```

```
Dockerfile

FROM python:3.11
WORKDIR /app
COPY app.py .
CMD ["python","app.py"]
```
- Docker reads Dockerfile
- Copies app.py into /app
- Image now contains the file

```
COPY . .
```
COPY everything from current folder into WORKDIR inside container.

**How COPY works**
- COPY creates a new layer
- That layer stores file changes
- Docker caches this layer
- If file changes this layer rebuilds

**Order matters**
If any file changes, pip install runs again
```
COPY . .
RUN pip install -r requirements.txt
```

Better approach
```
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
```
If app code changes, dependencies do not download again. Faster build.

### **4. ADD Instruction**

ADD is used to copy files into the Docker image, similar to COPY. But it has extra features:
- Can extract .tar files automatically
- Can download files from a URL

```
Basic syntx
ADD <source> <destination>

ADD app.py /app/
```

For example : Normal file, Same as COPY in this case
```
FROM python:3.11
WORKDIR /app
ADD app.py .
```
Auto Extract TAR File
```
project/
 ├── Dockerfile
 ├── app.tar.gz

Dockerfile

FROM ubuntu
WORKDIR /app
ADD app.tar.gz .
```
- Copies app.tar.gz
- Automatically extracts it into /app
- You don’t need tar -xvf.

Download From URL
```
FROM ubuntu
ADD https://example.com/file.txt /app/
```
- Downloads file
- Saves it into /app 

### **5. RUN Instruction**

RUN is used to execute commands while building the image. It runs the command during build ```docker build```. Not during ```docker run```.

RUN instruction Docker image build ಸಮಯದಲ್ಲಿ command execute ಮಾಡುತ್ತದೆ. ಪ್ರತಿಯೊಂದು RUN ಹೊಸ layer create ಮಾಡುತ್ತದೆ. ಸಾಮಾನ್ಯವಾಗಿ packages install ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ. Image optimize ಮಾಡಲು multiple commands ಒಂದೇ RUN ನಲ್ಲಿ ಬರೆಯಬೇಕು.

```
Basic syntax
RUN command

RUN apt-get update
```

Simple example
```
FROM ubuntu
RUN apt-get update
RUN apt-get install -y python3
```
During build
- Base image loaded
- apt-get update runs
- python3 installed
- Changes saved as new layer
- Creates a new layer

Best practice is always combining RUN commands
```
#Bad practice
RUN apt-get update
RUN apt-get install -y curl

#Good practice
RUN apt-get update && apt-get install -y curl
```

Major diff b/w RUN and CMD command
```
| RUN                      | CMD                           |
| ------------------------ | ----------------------------- |
| Executes during build    | Executes during container run |
| Creates layer            | Does NOT create layer         |
| Used to install packages | Used to start app             |

RUN pip install flask
CMD ["python","app.py"]

here RUN install the flask and CMD run the app
```
Shell Form vs Exec Form
```
shell form
RUN apt-get update

Exec form
RUN ["apt-get", "update"]
```
Shell form is most commonly used

### **6. CMD Instruction**

CMD defines the default command that runs when a container starts. It runs during ```docker run``` NOT during docker build.

CMD ಅಂದ್ರೆ container start ಆದಾಗ run ಆಗುವ default command.

The CMD instruction defines the default command that runs when a container starts. It executes during docker run, not during docker build. Only one CMD is allowed in a Dockerfile, and it can be overridden at runtime.

CMD instruction container start ಆದಾಗ run ಆಗುವ default command define ಮಾಡುತ್ತದೆ. ಇದು docker build ಸಮಯದಲ್ಲಿ ಅಲ್ಲ, docker run ಸಮಯದಲ್ಲಿ execute ಆಗುತ್ತದೆ. ಒಂದೇ CMD effective ಆಗುತ್ತದೆ ಮತ್ತು runtime ನಲ್ಲಿ override ಮಾಡಬಹುದು.

```
Basic syntax

#Exec Form
CMD ["python", "app.py"]

#Shell Form
CMD python app.py
```

Simple example
```
FROM python:3.11
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```
- Image builds
- Container runs
- CMD starts python app.py
- Program executes

```
RUN pip install flask
CMD ["python", "app.py"]
```
Run command install flask and CMD runs the application

CMD Can Be Overridden by ```docker run myapp python test.py```. This command overrides ```CMD ["python", "app.py"]```. Now it run as ```python test.py```.

### **7. ENTRYPOINT Instruction**

ENTRYPOINT defines the main command that will always run when the container starts. This container is meant to run this program.

ENTRYPOINT ಅಂದ್ರೆ container start ಆದಾಗ ಯಾವಾಗಲೂ run ಆಗುವ main command.

ENTRYPOINT defines the main command that always runs when a container starts. It makes the container behave like a fixed executable. Unlike CMD, it is not easily overridden. ENTRYPOINT is often combined with CMD to provide default arguments.

ENTRYPOINT container start ಆದಾಗ ಯಾವಾಗಲೂ run ಆಗುವ main command define ಮಾಡುತ್ತದೆ. ಇದು container ಅನ್ನು executable ಹಾಗೆ behave ಮಾಡಿಸುತ್ತದೆ. CMD ಗಿಂತ override ಮಾಡುವುದು ಕಷ್ಟ. CMD ಜೊತೆಗೆ default arguments ನೀಡಲು ಬಳಸಬಹುದು.
```
#Basic syntax

#Exec form
ENTRYPOINT ["python", "app.py"]

#Shell form
ENTRYPOINT python app.py
```
Exec form is recommended.

ENTRYPOINT vs CMD
```
| CMD                      | ENTRYPOINT                             |
| ------------------------ | -------------------------------------- |
| Default command          | Main fixed command                     |
| Can be overridden easily | Hard to override                       |
| Optional                 | Makes container behave like executable |
```

CMD is default but ENTRYPOINT is mandatory 

### **8. ENV Instruction**

ENV is used to set environment variables inside a Docker image.

These variables:
- Are available during build
- Are available when container runs
- Stay inside the container

it's like ```export VARIABLE=value``` in linux.

The ENV instruction sets environment variables inside a Docker image. These variables are available during both build and runtime and remain inside the container. ENV is commonly used for application configuration and runtime settings.

ENV instruction container ಒಳಗೆ environment variables set ಮಾಡುತ್ತದೆ. ಇದು build ಮತ್ತು runtime ಎರಡರಲ್ಲೂ available ಇರುತ್ತದೆ. Application configuration ಮತ್ತು runtime settings ಗಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.
```
#Basic syntax
ENV KEY=value

#single variable
ENV APP_ENV=production

#multiple variables
ENV APP_ENV=production \
    PORT=5000 \
    DEBUG=false
```

Simple example
```
FROM python:3.11
WORKDIR /app
ENV APP_ENV=production
COPY app.py .
CMD ["python","app.py"]
```
Now inside container if we run ```echo $APP_ENV``` will print ```production```.

ENV is used for Used for:
- App configuration
- Port numbers
- Database URLs
- API keys
- Runtime settings

Instead of hardcoding values in code.

ENV vs ARG
```
| ENV                     | ARG                       |
| ----------------------- | ------------------------- |
| Available at build time | Available at build time   |
| Available at run time   | NOT available at run time |
| Stored in image         | Not stored permanently    |
```

we can override ENV using ```docker run -e APP_ENV=development myapp```. Now container uses development.

ENV Works Internally
- ENV creates a new image layer
- Variables stored in image metadata
- Available to all future instructions
- Available to running container

ARG is available in Build only but ENV is avilable in Build and Run

### **9. EXPOSE Instruction**

EXPOSE tells Docker, This container listens on this port. It is documentation inside the image. EXPOSE does NOT publish the port to your system automatically.

The EXPOSE instruction informs Docker that the container listens on a specific port. It does not publish the port to the host. Port mapping must be done using the -p option in the docker run command.

EXPOSE instruction container ಯಾವ port ನಲ್ಲಿ listen ಮಾಡುತ್ತದೆ ಎಂದು ತಿಳಿಸುತ್ತದೆ. ಇದು port publish ಮಾಡುವುದಿಲ್ಲ. Port mapping ಮಾಡಲು docker run ನಲ್ಲಿ -p option ಬಳಸಬೇಕು.

```
#Basic syntax
EXPOSE <port>

EXPOSE 5000
```
Simple example: python app
```
FROM python:3.11
WORKDIR /app
COPY app.py .
EXPOSE 5000
CMD ["python","app.py"]
```
- Container listens on port 5000
- But it is not accessible from outside yet

EXPOSE does NOT open port. To access container from host run ```docker run -p 5000:5000 myapp```.
Here:
- First 5000 is Host port
- Second 5000 is Container port

EXPOSE vs -p
```
| EXPOSE            | -p (Port Mapping)  |
| ----------------- | ------------------ |
| Documentation     | Actually maps port |
| Inside Dockerfile | Used in docker run |
| Does not publish  | Publishes port     |
```

simple app: Node app
```
FROM node:18
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node","app.js"]
```
run this ```docker run -p 3000:3000 mynodeapp```. Access via ```http://localhost:3000```.

- Always use EXPOSE in Dockerfile
- Always use -p in docker run
- Document correct container port 

### **10. LABEL Instruction**

LABEL is used to add metadata (information) to a Docker image. It only stores information like Author, version, description, project name, maintainer and so on.

LABEL instruction Docker image ಗೆ metadata add ಮಾಡುತ್ತದೆ. Version, author, description ಹೀಗೆ ಮಾಹಿತಿ store ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ. ಇದು container runtime behavior ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವುದಿಲ್ಲ, documentation ಮತ್ತು management ಗೆ ಉಪಯೋಗವಾಗುತ್ತದೆ.

```
#basic syntax
LABEL key=value

LABER Author="Joshi"

#multiple labels
LABEL version="1.0" \
      description="Python Application" \
      maintainer="joshi@example.com"

LABEL version="1.0" description="My App"
```
Simple app
```
FROM python:3.11

LABEL app="MyPythonApp" \
      version="1.0" \
      maintainer="sourabha@example.com"

WORKDIR /app
COPY . .
CMD ["python","app.py"]
```
After build image ```docker inspect myapp```. you see
```
"Labels": {
    "app": "MyPythonApp",
    "version": "1.0",
    "maintainer": "sourabha@example.com"
}
```

### **11. VOLUME Instruction**

VOLUME is used to create a mount point for persistent data inside a container. It tells Docker Store data from this folder outside the container.

This means:
- Data will NOT be lost if container is removed.
- Data is stored separately from image layers.

VOLUME instruction container ಒಳಗೆ persistent storage mount point define ಮಾಡುತ್ತದೆ. Container delete ಆದರೂ ಆ directory ಒಳಗಿನ data ಉಳಿಯುತ್ತದೆ. Volume data container writable layer ಹೊರಗೆ store ಆಗುತ್ತದೆ.

```
#Basic syntax
VOLUME /data

FROM ubuntu
VOLUME /data
```

Simple Node example. Suppose you have a Node app that stores files in ```/app/uploads```.
```
FROM node:18
WORKDIR /app
COPY . .
VOLUME /app/uploads
CMD ["node","app.js"]
```
Now ```/app/uploads``` becomes persistent storage.

Without VOLUME:
- Data stored in writable layer
- If container deleted, data lost

With VOLUME:
- Data stored outside container
- Container deleted, data remains

```
Image Layers (read-only)
+
Container Writable Layer
+
Volume (external storage)
```

Even without Dockerfile VOLUME, you can mount manually
```
docker run -v myvolume:/app/data myapp
```

VOLUME in Dockerfile vs -v in docker run
```
| VOLUME (Dockerfile)         | -v (docker run)        |
| --------------------------- | ---------------------- |
| Declares mount point        | Actually mounts volume |
| Inside image                | At runtime             |
| Documentation + auto-create | Manual control         |
```
VOLUME is Declare storage and -v = Attach storage

### **12. USER Instruction**

USER defines which user will run the next instructions and the container.

By default, Docker containers run as root user. Using USER, you can switch to Non-root user (recommended for security).

USER instruction container ಯಾವ user ಮೂಲಕ run ಆಗಬೇಕು ಎಂದು define ಮಾಡುತ್ತದೆ. Default ಆಗಿ container root ಆಗಿ run ಆಗುತ್ತದೆ. ಆದರೆ production ನಲ್ಲಿ non-root user ಬಳಸುವುದು security ಗಾಗಿ ಉತ್ತಮ.
```
FROM python:3.11

# Create new user
RUN useradd -m appuser

WORKDIR /app
COPY . .

# Switch to non-root user
USER appuser

CMD ["python","app.py"]
``` 

### Docker Port Mapping

Port mapping connects Host machine port to container port. It allows you to access the container application from your system or browser.

Without port mapping:
- Container runs
- But you cannot access it from outside 

Host port means Port on your local machine (example: 5000). ನಿಮ್ಮ computer ನಲ್ಲಿ ಇರುವ port.

Container port means Port inside the container where app is running. Container ಒಳಗೆ app listen ಮಾಡುತ್ತಿರುವ port.

Port mapping ಅಂದ್ರೆ host machine port ಅನ್ನು container port ಗೆ connect ಮಾಡುವುದು. Container isolated network ನಲ್ಲಿ private IP ಹೊಂದಿರುವುದರಿಂದ ಹೊರಗಿನಿಂದ access ಮಾಡಲು -p option ಬಳಸಬೇಕು. ಇದು NAT ಮೂಲಕ traffic forward ಮಾಡುತ್ತದೆ.

```
#basic syntax
docker run -p HOST_PORT:CONTAINER_PORT image_name

docker run -p 5000:5000 myapp
```

when we run 
```
docker run -p 5000:5000 myapp
```
- Creates container
- Sets up network namespace
- Assigns private IP
- Configures NAT (Network Address Translation)
- Forwards host port 5000 → container port 5000

### Multi-Stage Build in Docker

Using multiple FROM instructions in one Dockerfile to separate build environment and runtime environment.

Multi-stage build is a Docker feature that allows us to use multiple FROM instructions in a single Dockerfile. The first stage is used to build the application, and the final stage copies only the required artifacts. This helps reduce image size, improve security, and optimize performance.

Multi-stage build ಅಂದ್ರೆ ಒಂದೇ Dockerfile ನಲ್ಲಿ ಹಲವು FROM instructions ಬಳಸುವ ವಿಧಾನ. ಮೊದಲ stage ನಲ್ಲಿ application build ಮಾಡಲಾಗುತ್ತದೆ, ಮತ್ತು final stage ನಲ್ಲಿ ಅಗತ್ಯವಿರುವ files ಮಾತ್ರ copy ಮಾಡಲಾಗುತ್ತದೆ. ಇದರಿಂದ image size ಕಡಿಮೆ ಆಗುತ್ತದೆ, security ಉತ್ತಮವಾಗುತ್ತದೆ ಮತ್ತು performance improve ಆಗುತ್ತದೆ.

It helps:
- Reduce image size
- Improve security
- Remove unnecessary build tools

Problem Without Multi-Stage
- If you build app normally:
- Install compiler
- Install dependencies
- Install build tools
- App files

Final image contains: Build tools, Compilers and Extra files

So image becomes BIG.

**Without Multi-Stage Build Node App Example**
```
FROM node:18

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["node","dist/app.js"]
```
Problem:
- node_modules
- build cache
- dev dependencies
- npm
- full Node image
Everything stays in final image.

**With Multi-Stage Build**
```
# Stage 1 - Builder
FROM node:18 AS builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Production
FROM node:18-alpine

WORKDIR /app

# Copy only build output
COPY --from=builder /app/dist ./dist

CMD ["node","dist/app.js"]
```
Stage 1:
- We build the app
- We create dist folder

Stage 2:
- We only copy dist folder
- We ignore build tools

Final image is SMALL

**Simple beginner python example**

We will:
- Create a simple Python app
- Install dependency
- Use multi-stage
- Keep final image SMALL

STEP 1 – Create Simple Python File

Create file:
```
#app.py
print("Hello Multi-Stage Python Docker!")
```
That’s it 

First See Normal Dockerfile (Without Multi-Stage)
```
FROM python:3.11

WORKDIR /app
COPY . .

RUN pip install requests

CMD ["python", "app.py"]
```
Final image contains:
- Python
- pip
- build tools
- cache files
- everything

Image is bigger than needed.

Now Multi-Stage Version (Very Simple)
```
# Stage 1 - Builder
FROM python:3.11 AS builder

WORKDIR /app

COPY app.py .
RUN pip install requests --user


# Stage 2 - Final Image
FROM python:3.11-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /root/.local /root/.local

# Copy app file
COPY --from=builder /app/app.py .

ENV PATH=/root/.local/bin:$PATH

CMD ["python", "app.py"]
```
What Happened?

Stage 1 (Builder Stage)
- Uses full Python image
- Installs dependency
- Builds environment
- Heavy stage.

Stage 2 (Final Stage)
- Uses smaller image: python:3.11-slim
- Copies only installed packages
- Copies only app file
- No build tools

Final image = Smaller 

Build and Run

Build:
```docker build -t hello-python```

Run:
```docker run hello-python```

Output:
```Hello Multi-Stage Python Docker!```

What Final Image Contains?

ONLY:
```
Slim Python
+
Installed packages
+
app.py
```

NOT:
- pip cache
- unnecessary build files
- full heavy image

Stage 1 = Install everything and Stage 2 = Keep only what is needed

**Why Multi-Stage Is Useful?**
- Smaller image
- Faster deployment
- Better security
- Clean production image

Build big but Run small


