## ZEISS Machine Monitor UI


### System Requirements
* Linux
* Node.js LTS >= 14.x

### Local development environment setup
1. Clone repo and enter "zeiss-monitor" 
2. npm install
3. npm run serve

then you can use your favorite IDE to edit the code.

### Deployment
#### Build
in folder "zeiss-monitor"
```bash
docker build -t zeiss-monitor .
```

#### Deploy
```bash
 docker run -d -p "8000:80" zeiss-monitor
```

#### Access
Open browser and access `http://localhost:8000`