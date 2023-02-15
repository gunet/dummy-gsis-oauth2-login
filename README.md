
# Set-up

## Build
  

```sh
./build_docker.sh
```

 
## Run
  

```sh
./run_docker.sh
```


## Stop
  

```sh
docker stop <container_name>
docker rm <container_name> #otherwise you won't be able to rerun
```

## Useful Commands
  

```sh
docker ps -a                     # see container names
docker logs <container_name>     # see the logs of a running container
docker exec -it  <container_name> bash   # shell inside a running container
```

```
docker run -d -p 8081:8080 -v $PWD:/usr/src/app/ --name=<container_name> <image_name>
# -d for detached process
# -p for port mapping
# -v for volume mapping
```
