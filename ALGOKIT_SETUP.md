# AlgoKit 3 Prerequisites Setup

## Prerequisites Status

### ✅ Python 3.12+
- **Installed**: Python 3.14.0 (primary)
- **Also Available**: Python 3.13.9
- **Status**: ✅ **PASS** - Both versions meet the requirement

### ✅ PipX
- **Installed**: PipX 1.8.0
- **Location**: `C:\Users\tnu\pipx\venvs`
- **AlgoKit via PipX**: ✅ Installed (version 2.9.1)
- **Status**: ✅ **PASS** - PipX is properly configured

### ✅ Git
- **Installed**: Git 2.51.2.windows.1
- **Status**: ✅ **PASS** - Git is installed and ready

### ⚠️ Docker
- **Installed**: Docker 28.5.1
- **Status**: ⚠️ **Docker Desktop is not running**

## Action Required: Start Docker Desktop

Docker Desktop needs to be running for AlgoKit to work properly. Follow these steps:

1. **Start Docker Desktop**:
   - Open Docker Desktop from the Start menu or system tray
   - Wait for Docker to fully start (the Docker icon in the system tray should show "Docker Desktop is running")
   - This may take a minute or two on first startup

2. **Verify Docker is Running**:
   ```powershell
   docker ps
   ```
   This should return a list of containers (or an empty list if no containers are running) without errors.

3. **Test AlgoKit with Docker**:
   ```powershell
   algokit doctor
   ```
   This will verify that Docker is properly accessible by AlgoKit.

## Quick Verification Commands

Run these commands to verify all prerequisites:

```powershell
# Check Python version
python --version

# Check PipX
pipx --version

# Check Git
git --version

# Check Docker (must be running)
docker --version
docker ps

# Check AlgoKit
algokit --version
algokit doctor
```

## Next Steps

Once Docker Desktop is running, you can:

1. **Start LocalNet** (for local development):
   ```powershell
   algokit localnet start
   ```

2. **Initialize a new AlgoKit project** (if needed):
   ```powershell
   algokit init
   ```

3. **Bootstrap project dependencies**:
   ```powershell
   algokit project bootstrap
   ```

## Troubleshooting

### Docker Desktop Won't Start
- Ensure Docker Desktop is installed from [docker.com](https://www.docker.com/products/docker-desktop/)
- Check Windows WSL 2 is enabled (Docker Desktop requires WSL 2)
- Restart your computer if Docker Desktop fails to start

### PipX Not Found
- Ensure PipX is in your PATH
- Reinstall PipX: `python -m pip install --user pipx`
- Add to PATH: `python -m pipx ensurepath`

### Python Version Issues
- Your current Python versions (3.14.0 and 3.13.9) are both compatible
- AlgoKit works with Python 3.12 or higher

