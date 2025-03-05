@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo            Project Setup Wizard
echo ===================================================
echo.

REM Create a templates directory if it doesn't exist
if not exist "templates" mkdir templates

REM Set default values
set "project_name=my-app"
set "project_description=A React TypeScript project"
set "author_name=Developer"
set "project_type=react-typescript"
set "use_testing=y"
set "use_linting=y"
set "use_ci_cd=n"

REM Gather project information
echo Please answer the following questions to set up your project:
echo.

set /p "project_name=Project name (default: my-app): "
set /p "project_description=Project description (default: A React TypeScript project): "
set /p "author_name=Author name (default: Developer): "

echo.
echo Select project type:
echo 1. React TypeScript (default)
echo 2. Node.js TypeScript
echo 3. Vanilla JavaScript
echo.
set /p project_type_choice="Enter choice (1-3): "

if "%project_type_choice%"=="1" set "project_type=react-typescript"
if "%project_type_choice%"=="2" set "project_type=node-typescript"
if "%project_type_choice%"=="3" set "project_type=vanilla-js"

echo.
set /p "use_testing=Include testing setup? (y/n, default: y): "
set /p "use_linting=Include linting setup? (y/n, default: y): "
set /p "use_ci_cd=Include CI/CD setup? (y/n, default: n): "

REM Create project directory
echo.
echo Creating project: %project_name%
if not exist "%project_name%" mkdir "%project_name%"
cd "%project_name%"

REM Create project structure
mkdir src
mkdir docs

REM Create README.md
echo # %project_name% > README.md
echo. >> README.md
echo %project_description% >> README.md
echo. >> README.md
echo ## Getting Started >> README.md
echo. >> README.md
echo 1. Clone this repository >> README.md
echo 2. Install dependencies with `npm install` >> README.md
echo 3. Start development server with `npm start` >> README.md

REM Create package.json
echo {> package.json
echo   "name": "%project_name%",>> package.json
echo   "version": "0.1.0",>> package.json
echo   "description": "%project_description%",>> package.json
echo   "author": "%author_name%",>> package.json
echo   "scripts": {>> package.json
echo     "start": "echo \"Add your start script here\" && exit 1",>> package.json
echo     "build": "echo \"Add your build script here\" && exit 1">> package.json
echo   },>> package.json
echo   "dependencies": {},>> package.json
echo   "devDependencies": {}>> package.json
echo }>> package.json

REM Create project plan document
echo # Project Plan > docs/project_plan.md
echo. >> docs/project_plan.md
echo ## Project Overview >> docs/project_plan.md
echo. >> docs/project_plan.md
echo %project_description% >> docs/project_plan.md
echo. >> docs/project_plan.md
echo ## Goals and Objectives >> docs/project_plan.md
echo. >> docs/project_plan.md
echo *[Define your project goals here]* >> docs/project_plan.md
echo. >> docs/project_plan.md
echo ## Timeline >> docs/project_plan.md
echo. >> docs/project_plan.md
echo *[Add your project timeline here]* >> docs/project_plan.md
echo. >> docs/project_plan.md
echo ## Resources >> docs/project_plan.md
echo. >> docs/project_plan.md
echo *[List your project resources here]* >> docs/project_plan.md

REM Create requirements document
echo # Requirements Document > docs/requirements.md
echo. >> docs/requirements.md
echo ## Functional Requirements >> docs/requirements.md
echo. >> docs/requirements.md
echo *[List your functional requirements here]* >> docs/requirements.md
echo. >> docs/requirements.md
echo ## Non-Functional Requirements >> docs/requirements.md
echo. >> docs/requirements.md
echo *[List your non-functional requirements here]* >> docs/requirements.md
echo. >> docs/requirements.md
echo ## Constraints >> docs/requirements.md
echo. >> docs/requirements.md
echo *[List your project constraints here]* >> docs/requirements.md

REM Create architecture document
echo # Architecture Document > docs/architecture.md
echo. >> docs/architecture.md
echo ## System Overview >> docs/architecture.md
echo. >> docs/architecture.md
echo *[Provide a high-level overview of your system architecture]* >> docs/architecture.md
echo. >> docs/architecture.md
echo ## Components >> docs/architecture.md
echo. >> docs/architecture.md
echo *[Describe the main components of your system]* >> docs/architecture.md
echo. >> docs/architecture.md
echo ## Data Model >> docs/architecture.md
echo. >> docs/architecture.md
echo *[Describe your data model]* >> docs/architecture.md
echo. >> docs/architecture.md
echo ## Technology Stack >> docs/architecture.md
echo. >> docs/architecture.md
echo *[List your technology stack]* >> docs/architecture.md

REM Add React TypeScript specific setup if selected
if "%project_type%"=="react-typescript" (
    mkdir src\components
    mkdir src\hooks
    mkdir src\pages
    mkdir src\types
    mkdir src\utils
    mkdir src\lib
    
    echo # React TypeScript Project Structure > docs/react_guidelines.md
    echo. >> docs/react_guidelines.md
    echo ## Core Principles >> docs/react_guidelines.md
    echo. >> docs/react_guidelines.md
    echo 1. **Component-Based Architecture** >> docs/react_guidelines.md
    echo    - Build small, focused components (< 300 lines) >> docs/react_guidelines.md
    echo    - Use composition over inheritance >> docs/react_guidelines.md
    echo    - One main component per file >> docs/react_guidelines.md
    echo. >> docs/react_guidelines.md
    echo 2. **Type Safety** >> docs/react_guidelines.md
    echo    - Define explicit interfaces for all props >> docs/react_guidelines.md
    echo    - Use TypeScript features to ensure type safety >> docs/react_guidelines.md
    echo    - Avoid using `any` type >> docs/react_guidelines.md
    echo. >> docs/react_guidelines.md
    echo 3. **Performance First** >> docs/react_guidelines.md
    echo    - Memoize expensive calculations and callbacks >> docs/react_guidelines.md
    echo    - Implement virtualization for long lists >> docs/react_guidelines.md
    echo    - Use React.memo for pure components >> docs/react_guidelines.md
    
    REM Create a sample component
    echo // Sample component> src\components\Button.tsx
    echo import React, { useState } from 'react';>> src\components\Button.tsx
    echo. >> src\components\Button.tsx
    echo // Component interface>> src\components\Button.tsx
    echo interface Props {>> src\components\Button.tsx
    echo   label: string;>> src\components\Button.tsx
    echo   onClick: () => void;>> src\components\Button.tsx
    echo   variant?: 'primary' | 'secondary';>> src\components\Button.tsx
    echo }>> src\components\Button.tsx
    echo. >> src\components\Button.tsx
    echo // Component definition>> src\components\Button.tsx
    echo export const Button: React.FC^<Props^> = ({ >> src\components\Button.tsx
    echo   label, >> src\components\Button.tsx
    echo   onClick, >> src\components\Button.tsx
    echo   variant = 'primary' >> src\components\Button.tsx
    echo }) => {>> src\components\Button.tsx
    echo   // 1. Hooks>> src\components\Button.tsx
    echo   const [isHovered, setIsHovered] = useState(false);>> src\components\Button.tsx
    echo   >> src\components\Button.tsx
    echo   // 2. Event handlers>> src\components\Button.tsx
    echo   const handleMouseEnter = () => setIsHovered(true);>> src\components\Button.tsx
    echo   const handleMouseLeave = () => setIsHovered(false);>> src\components\Button.tsx
    echo   >> src\components\Button.tsx
    echo   // 3. Return JSX>> src\components\Button.tsx
    echo   return (>> src\components\Button.tsx
    echo     ^<button>> src\components\Button.tsx
    echo       className={`btn btn-${variant} ${isHovered ? 'hovered' : ''}`}>> src\components\Button.tsx
    echo       onClick={onClick}>> src\components\Button.tsx
    echo       onMouseEnter={handleMouseEnter}>> src\components\Button.tsx
    echo       onMouseLeave={handleMouseLeave}>> src\components\Button.tsx
    echo     ^>>> src\components\Button.tsx
    echo       {label}>> src\components\Button.tsx
    echo     ^</button^>>> src\components\Button.tsx
    echo   );>> src\components\Button.tsx
    echo };>> src\components\Button.tsx
)

echo.
echo ===================================================
echo Project %project_name% has been created successfully!
echo ===================================================
echo.
echo Project structure:
echo - README.md: Project overview and getting started guide
echo - package.json: Project configuration and dependencies
echo - docs/: Project documentation
echo - src/: Source code

REM Display next steps
echo.
echo Next steps:
echo 1. Navigate to your project: cd %project_name%
echo 2. Open the project in your IDE: code .
echo 3. Review and customize the generated documentation
echo 4. Use AI assistance to develop specific plans based on these documents
echo.
echo Thanks for using Project Setup Wizard!

pause 