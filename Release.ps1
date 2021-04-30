$ErrorActionPreference = "Stop"

try {
	Write-Host "[$(Get-Date)] Releasing new version."

	Write-Host "[$(Get-Date)] Publishing new image with full client build."
	. .\PublishImage.ps1 -buildClient
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Planning terraform changes."
	. .\PlanTerraform.ps1 -clean -init
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host
	$apply = Read-Host "Type 'apply' to continue"
	if ($apply -ne "apply") {
		exit -1
	}

	Write-Host "[$(Get-Date)] Applying terraform changes."
	. .\ApplyTerraform.ps1
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Previewing which old images will be deleted."
	. .\DeleteOldImages.ps1 -dryRun
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host
	$delete = Read-Host "Type 'delete to continue"
	if ($delete -ne "delete") {
		exit -1
	}

	Write-Host "[$(Get-Date)] Deleting old images."
	. .\DeleteOldImages.ps1
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Successfully released new version."
	exit 0
} catch {
	Write-Host $_ -BackgroundColor Red
	exit -1
}
