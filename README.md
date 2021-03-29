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

## Deployment

```PowerShell
. .\PublishImage.ps1 -buildClient
. .\PlanTerraform.ps1 -clean -init
. .\ApplyTerraform.ps1
```

NOTE: You can manually clean up old images in the ECR repository to reduce AWS storage.

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

## Local Dynamo DB Setup

```PowerShell
docker pull amazon/dynamodb-local:latest
docker run -it --rm -p 8000:8000 amazon/dynamodb-local
aws dynamodb create-table `
	--endpoint-url http://localhost:8000 `
	--table-name "diet-weights" `
	--attribute-definitions `
		AttributeName=UserId,AttributeType=S `
		AttributeName=Date,AttributeType=S `
	--key-schema `
		AttributeName=UserId,KeyType=HASH `
		AttributeName=Date,KeyType=RANGE `
	--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
aws dynamodb list-tables --endpoint-url http://localhost:8000
aws dynamodb scan --endpoint-url http://localhost:8000 --table-name diet-weights
```
