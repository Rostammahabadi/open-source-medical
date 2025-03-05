@echo off
echo ===================================================
echo        Software Project Setup Launcher
echo ===================================================
echo.
echo Welcome to the Project Setup Wizard!
echo This tool will help you create a new software project with proper structure and documentation.
echo.
echo Please choose which generator to use:
echo.
echo 1. Basic Project Setup (simple templates)
echo 2. Advanced Project Generator (with AI guidance documents)
echo.

set /p generator_choice="Enter your choice (1-2): "

if "%generator_choice%"=="1" (
    call project_setup.bat
) else if "%generator_choice%"=="2" (
    call project_generator.bat
) else (
    echo Invalid choice. Please run the script again and select 1 or 2.
    goto :EOF
)

echo.
echo Thank you for using the Project Setup Wizard!
echo If you have any feedback, please let us know.
echo.
pause 