# PowerShell script to merge website from another git repository
# Usage: .\merge-website.ps1 -RepoUrl "https://github.com/user/repo.git" -Branch "main" -TargetFolder "website"

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "main",
    
    [Parameter(Mandatory=$false)]
    [string]$TargetFolder = "website",
    
    [Parameter(Mandatory=$false)]
    [switch]$MergeHistory = $false
)

Write-Host "🚀 Starting website merge process..." -ForegroundColor Green

# Step 1: Check current status
Write-Host "`n📋 Checking current git status..." -ForegroundColor Yellow
git status

# Step 2: Create temporary directory
$TempDir = "../temp-website-merge"
if (Test-Path $TempDir) {
    Write-Host "⚠️  Removing existing temp directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $TempDir
}

# Step 3: Clone the other repository
Write-Host "`n📥 Cloning repository: $RepoUrl" -ForegroundColor Yellow
git clone -b $Branch $RepoUrl $TempDir

if (-not (Test-Path $TempDir)) {
    Write-Host "❌ Failed to clone repository" -ForegroundColor Red
    exit 1
}

# Step 4: Copy files
Write-Host "`n📂 Copying files..." -ForegroundColor Yellow

if ($MergeHistory) {
    # Option 1: Merge with history
    Write-Host "Merging with git history..." -ForegroundColor Cyan
    git remote add website-repo $RepoUrl
    git fetch website-repo
    git merge website-repo/$Branch --allow-unrelated-histories -m "Merge website from $RepoUrl"
    git remote remove website-repo
} else {
    # Option 2: Copy files manually
    if ($TargetFolder -ne ".") {
        New-Item -ItemType Directory -Force -Path $TargetFolder | Out-Null
        Copy-Item -Path "$TempDir\*" -Destination $TargetFolder -Recurse -Force
        Write-Host "✅ Files copied to $TargetFolder/" -ForegroundColor Green
    } else {
        # Copy to root, but be careful
        Write-Host "⚠️  Copying to root - this may overwrite files!" -ForegroundColor Yellow
        Copy-Item -Path "$TempDir\*" -Destination . -Recurse -Force -Exclude ".git"
        Write-Host "✅ Files copied to root" -ForegroundColor Green
    }
}

# Step 5: Clean up
Write-Host "`n🧹 Cleaning up..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $TempDir
Write-Host "✅ Temporary directory removed" -ForegroundColor Green

# Step 6: Show status
Write-Host "`n📊 Current git status:" -ForegroundColor Yellow
git status

Write-Host "`n✅ Merge complete! Next steps:" -ForegroundColor Green
Write-Host "1. Review changes: git status" -ForegroundColor Cyan
Write-Host "2. Check for conflicts and resolve them" -ForegroundColor Cyan
Write-Host "3. Merge package.json dependencies if needed" -ForegroundColor Cyan
Write-Host "4. Test: npm install && npm run dev" -ForegroundColor Cyan
Write-Host "5. Commit: git add . && git commit -m 'Merge website from other repo'" -ForegroundColor Cyan

