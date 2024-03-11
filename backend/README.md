# Basic and Low Level Payments App

This is a payments app and why I call it low level because these might not be done in a production ready application but these are the basic things you need to consider when you start off.

## Getting started

To get started clone the project, [https://github.com/harshiempire/Paytm.git](https://github.com/harshiempire/Paytm.git) to your local system.

```bash
git clone https://github.com/harshiempire/Paytm.git
```
You will get 2 folders which are backend and frontend.

### Backend
 
The backend is written in express and MongoDB is used as database. I used a MongoDB atlas where we need to build a docker image first and then a container is created, this is to start a MongoDB client at the port 27017 and connect the mongo compass to it so you can communicate to the database which is in you system which would be same as using the MongoDB atlas (cloud service). 

This command is to create a image

```bash
docker build ./ -t mongodb:4.7-replset
 ```

This command is to convert the image into a container and run the container in the local system

```bash
docker run --name mongodb-replset22 -p 27017:27017 -d mongodb:4.7-replset
 ```

Open the compass and connect to it now.

create a ``` config.js ``` file in backend and export a ```JWT_SECRET``` key

```javascript
module.exports = {
  JWT_SECRET: "secretkey",
};
```
Backend code is ready to use now 

### FrontEnd
Is in development 