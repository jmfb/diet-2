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
