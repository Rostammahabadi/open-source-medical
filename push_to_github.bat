@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo        GitHub Repository Setup Wizard
echo ===================================================
echo.
echo This script will help you push your Project Setup Wizard to GitHub.
echo.

REM Check if git is installed
git --version > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    goto :EOF
)

REM Get repository information
set /p "repo_name=Repository name (default: Rogers_Build_Guide): "
if "!repo_name!"=="" set "repo_name=Rogers_Build_Guide"

set /p "repo_description=Repository description (default: A comprehensive project setup wizard): "
if "!repo_description!"=="" set "repo_description=A comprehensive project setup wizard"

set /p "github_username=Your GitHub username: "
if "!github_username!"=="" (
    echo GitHub username is required.
    goto :EOF
)

echo.
echo Initializing Git repository...
git init

echo.
echo Creating .gitignore file...
echo # Project specific > .gitignore
echo *.log >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore
echo .vscode/ >> .gitignore
echo .idea/ >> .gitignore
echo node_modules/ >> .gitignore
echo dist/ >> .gitignore
echo build/ >> .gitignore
echo *.tmp >> .gitignore

echo.
echo Adding files to Git...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Project Setup Wizard"

echo.
echo Creating GitHub repository...
echo Please enter your GitHub Personal Access Token when prompted.
echo If you don't have one, create it at https://github.com/settings/tokens
echo Ensure it has 'repo' permissions.
echo.

set /p "github_token=GitHub Personal Access Token: "

echo.
echo Creating repository on GitHub...
curl -H "Authorization: token !github_token!" https://api.github.com/user/repos -d "{\"name\":\"!repo_name!\",\"description\":\"!repo_description!\",\"private\":false}"

echo.
echo Adding remote origin...
git remote add origin https://github.com/!github_username!/!repo_name!.git

echo.
echo Pushing to GitHub...
git push -u origin master

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo Success! Your Project Setup Wizard has been pushed to GitHub.
    echo.
    echo Repository URL: https://github.com/!github_username!/!repo_name!
    echo ===================================================
) else (
    echo.
    echo There was an error pushing to GitHub.
    echo Please check your credentials and try again.
)

echo.
echo Press any key to exit...
pause > nul 