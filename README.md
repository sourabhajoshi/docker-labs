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

