# webby-lab-test-task
WebbyLab test task
This project was created using the DDD architectural approach. It was important to make the application logic multi-layered. I set myself the goal of distinguishing between the transport layer, the business logic layer and the layer associated with the specifics of data storage.
How to start a project (all steps in the same dir):
```console
git clone git@github.com:oxb4f/webby-lab-test-task.git
```
```console
cd webbly-lab-test-task
```
```console
sudo docker build --no-cache --pull  . -t oxb4f/webby-lab-test-task
```
```console
sudo docker run -p 8000:8050 --env-file .env -v $(pwd)/db:/usr/src/webby-lab-test-task/db oxb4f/webby-lab-test-task
```
