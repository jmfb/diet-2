$ErrorActionPreference = "Stop"

try {
	Write-Host "[$(Get-Date)] Creating diet-weights table..."
	& aws dynamodb create-table `
		--endpoint-url http://localhost:8000 `
		--table-name "diet-weights" `
		--attribute-definitions `
			AttributeName=UserId,AttributeType=S `
			AttributeName=Date,AttributeType=S `
		--key-schema `
			AttributeName=UserId,KeyType=HASH `
			AttributeName=Date,KeyType=RANGE `
		--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 | Out-Null
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Creating diet-profiles table..."
	& aws dynamodb create-table `
		--endpoint-url http://localhost:8000 `
		--table-name "diet-profiles" `
		--attribute-definitions `
			AttributeName=UserId,AttributeType=S `
		--key-schema `
			AttributeName=UserId,KeyType=HASH `
		--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 | Out-Null
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	exit 0
} catch {
	Write-Host $_ -BackgroundColor Red
	exit -1
}
