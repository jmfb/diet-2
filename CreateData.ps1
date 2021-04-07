param(
	[Parameter(Mandatory=$true)]
	[string]
	$userId
)

$ErrorActionPreference = "Stop"

try {
	Write-Host "[$(Get-Date)] Creating diet-profiles record..."
	$profile = @{
		UserId = @{ S = $userId }
		TargetWeightInPounds = @{ N = "200" }
		BirthDate = @{ S = "1980-01-01" }
		HeightInInches = @{ N = "72" }
		Gender = @{ N = "0" }
	}
	& aws dynamodb put-item `
		--endpoint-url http://localhost:8000 `
		--table-name "diet-profiles" `
		--item ($profile | ConvertTo-Json).Replace("`"", "\`"") | Out-Null
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	Write-Host "[$(Get-Date)] Creating diet-weights records..."
	$count = 100
	$today = [DateTime]::Today
	$startingWeight = 300
	$endingWeight = 220
	$increment = ($startingWeight - $endingWeight) / $count
	for ($index = 0; $index -lt $count; ++$index) {
		$date = $today.AddDays(-$index).ToString("yyyy-MM-dd")
		$targetWeight = $endingWeight + $index * $increment
		$weight = [Math]::Round((Get-Random -Minimum ($targetWeight - 5.0) -Maximum ($targetWeight + 5.0)), 1)
		$item = @{
			UserId = @{ S = $userId }
			Date = @{ S = $date }
			WeightInPounds = @{ N = "$weight" }
		}
		Write-Host "[$(Get-Date)] $date = $weight..."
		& aws dynamodb put-item `
			--endpoint-url http://localhost:8000 `
			--table-name "diet-weights" `
			--item ($item | ConvertTo-Json).Replace("`"", "\`"") | Out-Null
		if ($lastexitcode -ne 0) {
			exit $lastexitcode
		}
	}

	Write-Host "[$(Get-Date)] Done."
	exit 0
} catch {
	Write-Host $_ -BackgroundColor Red
	exit -1
}
