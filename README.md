# Diet Website V2

AWS hosted website for tracking diet.

## Goals

To host a React frontend/Lambda backend using AWS free tier services.

## Prerequisites

* Download terraform 0.14.8 and alias to terraform_0.14.8
* `choco install awscli` (min version 2.1.29)
* `choco install dotnet` (min version 5.0.4)
* `choco install dotnet-sdk` (min version 5.0.201)
* `choco install nodejs` (min version 15.12.0)
* `choco install yarn` (min version 1.22.5)
* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)

## AWS Bootstrapping

* Create an AWS free tier account.
* Create an IAM User `deployment` with AdministratorAccess.
	* Store credentials in BitWarden.
	* Set up local AWS CLI configuration to use account.
* Create an S3 Bucket `jmfb-terraform` with versioning enabled.
* Create a DynamoDB table `tfstate-lock` with primary key `LockID` of type string.
* Register the `buysse.link` domain in Route 53.
* Create `diet` ECR repository

## Google OAuth Setup

Go to the [API Credentials Page](https://console.cloud.google.com/apis/credentials) and create an OAuth 2 Client ID
with the Name `Diet`.

**JavaScript Origins**
* https://diet.buysse.link
* https://localdiet.buysse.link:5001

**Authorized Redirect URIs**
* https://diet.buysse.link/authenticate
* https://localdiet.buysse.link:5001/authenticate

## Local Machine Setup

Add the following entry to your hosts file: `C:\Windows\System32\drivers\etc\hosts`
```
127.0.0.1 localdiet.buysse.link
```

Get the following secrets from BitWarden and run in powershell to setup local environment variables.
```PowerShell
[Environment]::SetEnvironmentVariable("AuthClientSecret", "TODO", [EnvironmentVariableTarget]::Machine)
[Environment]::SetEnvironmentVariable("TokenSecret", "TODO", [EnvironmentVariableTarget]::Machine)
```

## Docker Setup (Work in progress)

```sh
sudo docker run -it -p 5000:5000 -p 5001:5001 debian
apt-get update -y
apt-get install -y git wget curl vim
wget https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
dpkg -i packages-microsoft-prod.deb
apt-get update -y
apt-get install -y apt-transport-https
apt-get update -y
apt-get install -y dotnet-sdk-5.0
curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
apt-get install -y nodejs
npm install --global yarn
cd home
git clone https://github.com/jmfb/diet-2.git
cd diet-2/client
yarn install
yarn build-prod
cd ../server
dotnet run
```

## Deployment

### Build

```PowerShell
cd client
yarn install
yarn run build-prod
cd ..
$version = (Get-Date).ToString("y.Mdd.Hmm.s")
docker build --build-arg version=$version -t diet .
& aws ecr get-login-password --region us-east-1 | `
	& docker login --username AWS --password-stdin `
	862438233085.dkr.ecr.us-east-1.amazonaws.com
docker tag diet:latest 862438233085.dkr.ecr.us-east-1.amazonaws.com/diet:$version
docker push 862438233085.dkr.ecr.us-east-1.amazonaws.com/diet:$version
docker tag diet:latest 862438233085.dkr.ecr.us-east-1.amazonaws.com/diet:latest
docker push 862438233085.dkr.ecr.us-east-1.amazonaws.com/diet:latest
```

### Plan

```PowerShell
cd terraform
$Env:TF_VAR_token_secret = $Env:TokenSecret
$Env:TF_VAR_auth_client_secret = $Env:AuthClientSecret
& terraform_0.14.8 init
& terraform_0.14.8 plan -out tfplan
```

### Deploy

```PowerShell
& terraform_0.14.8 apply tfplan
```
