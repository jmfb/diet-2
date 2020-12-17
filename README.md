# Diet Website V2

AWS hosted website for tracking diet.

## Goals

To host a React frontend/Lambda backend using AWS free tier services.

## Prerequisites

* Download terraform 0.14.2 and alias to terraform_0.14.2
* Choco install awscli

## AWS Bootstrapping

* Create an AWS free tier account.
* Create an IAM User `diet` with AdministratorAccess.
	* Store credentials in LastPass.
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
terraform_0.14.2 init
terraform_0.14.2 plan -out tfplan
```

### Deploy

```sh
terraform_0.14.2 apply tfplan
```
