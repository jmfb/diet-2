param(
	[Parameter(Mandatory=$false)]
	[Switch]
	$clean,

	[Parameter(Mandatory=$false)]
	[Switch]
	$init
)

$ErrorActionPreference = "Stop"

try {
	Write-Host "[$(Get-Date)] Changing to terraform directory..."
	Push-Location "$PSScriptRoot\terraform"

	Write-Host "[$(Get-Date)] Configuring terraform environment variables..."
	if ([string]::IsNullOrEmpty($Env:AuthClientSecret)) {
		Write-Host "[$(Get-Date)] Missing AuthClientSecret environment variable."
		exit -1
	}

	if ([string]::IsNullOrEmpty($Env:TokenSecret)) {
		Write-Host "[$(Get-Date)] Missing TokenSecret environment variable."
		exit -1
	}

	$Env:TF_VAR_auth_client_secret = $Env:AuthClientSecret
	$Env:TF_VAR_token_secret = $Env:TokenSecret

	if ($clean) {
		Write-Host "[$(Get-Date)] Checking for old plan..."
		if (Test-Path tfplan) {
			Write-Host "[$(Get-Date)] Deleting old plan..."
			Remove-Item tfplan
		}

		Write-Host "[$(Get-Date)] Cleaning up old terraform output..."
		if (Test-Path .terraform*) {
			Write-host "[$(Get-Date)] Deleting old terraform output..."
			Get-Item .terraform* | Remove-Item -Force -Recurse -Confirm:$false
		}
	}

	if ($init) {
		Write-Host "[$(Get-Date)] Initializing terraform..."
		& terraform_0.14.8 init
		if ($lastexitcode -ne 0) {
			exit $lastexitcode
		}
	}

	Write-Host "[$(Get-Date)] Planning terraform with tfplan output..."
	& terraform_0.14.8 plan -out tfplan
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Successfully planned terraform."
	exit 0
} catch {
	Write-Host $_ -BackgroundColor Red
	exit -1
} finally {
	Pop-Location
}
