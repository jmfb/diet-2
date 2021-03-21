# Diet Website V2

AWS hosted website for tracking diet.

## Goals

To host a React frontend/Lambda backend using AWS free tier services.

## Prerequisites

* Download terraform 0.14.8 and alias to terraform_0.14.8
* `choco install awscli` (min version 2.1.29)
* `choco install dotnet` (min version 5.0.4)
* `choco install nodejs` (min version 15.12.0)
* `choco install yarn` (min version 1.22.5)

## AWS Bootstrapping

* Create an AWS free tier account.
* Create an IAM User `deployment` with AdministratorAccess.
	* Store credentials in BitWarden.
	* Set up local AWS CLI configuration to use account.
* Create an S3 Bucket `jmfb-terraform` with versioning enabled.
* Create a DynamoDB table `tfstate-lock` with primary key `LockID` of type string.

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

### Build

```sh
TODO
```

### Plan

```sh
terraform_0.14.8 init
terraform_0.14.8 plan -out tfplan
```

### Deploy

```sh
terraform_0.14.8 apply tfplan
```
