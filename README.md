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
