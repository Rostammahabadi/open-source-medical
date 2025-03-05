@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo         Advanced Project Generator Wizard
echo ===================================================
echo.

REM Set the script directory
set "SCRIPT_DIR=%~dp0"

REM Check if template_config.json exists
if not exist "template_config.json" (
    echo Error: template_config.json not found in the current directory.
    echo Please make sure this file exists before running the script.
    goto :EOF
)

REM Set default values
set "project_name=my-app"
set "project_description=A new project"
set "author_name=Developer"
set "project_type=react-typescript"
set "include_ci=false"
set "custom_questions=false"

REM Gather project information
echo Please answer the following questions to set up your project:
echo.

set /p "project_name=Project name (default: my-app): "
set /p "project_description=Project description (default: A new project): "
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
set /p "include_ci=Include GitHub Actions CI setup? (y/n, default: n): "
if /i "%include_ci%"=="y" set "include_ci=true"

echo.
set /p "custom_questions=Would you like to add custom project questions? (y/n, default: n): "
if /i "%custom_questions%"=="y" set "custom_questions=true"

REM Custom questions if requested
if "%custom_questions%"=="true" (
    echo.
    echo Please provide information for custom project questions:
    echo These answers will be added to your project's AI guidance document.
    echo.
    
    set /p "target_audience=Who is the target audience for this project? "
    set /p "success_criteria=What are the success criteria for this project? "
    set /p "technical_constraints=Are there any technical constraints to consider? "
    set /p "timeline=What is the expected timeline for completion? "
)

REM Create project directory
echo.
echo Creating project: %project_name%
if not exist "%project_name%" mkdir "%project_name%"
cd "%project_name%"

REM Create main project directories
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

REM Create AI guidance document with all project information
echo # AI Guidance Document > docs/ai_guidance.md
echo. >> docs/ai_guidance.md
echo ## Project Information >> docs/ai_guidance.md
echo. >> docs/ai_guidance.md
echo - **Project Name**: %project_name% >> docs/ai_guidance.md
echo - **Project Description**: %project_description% >> docs/ai_guidance.md
echo - **Author**: %author_name% >> docs/ai_guidance.md
echo - **Project Type**: %project_type% >> docs/ai_guidance.md
echo. >> docs/ai_guidance.md

REM Add custom question answers if provided
if "%custom_questions%"=="true" (
    echo ## Custom Project Information >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo - **Target Audience**: %target_audience% >> docs/ai_guidance.md
    echo - **Success Criteria**: %success_criteria% >> docs/ai_guidance.md
    echo - **Technical Constraints**: %technical_constraints% >> docs/ai_guidance.md
    echo - **Timeline**: %timeline% >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
)

echo ## Project Structure Guide >> docs/ai_guidance.md
echo. >> docs/ai_guidance.md
echo This project follows a specific structure. Here's how to navigate and extend it: >> docs/ai_guidance.md
echo. >> docs/ai_guidance.md

REM Add structure guidance based on project type
if "%project_type%"=="react-typescript" (
    echo - **src/components/**: UI components organized by domain >> docs/ai_guidance.md
    echo - **src/hooks/**: Custom React hooks >> docs/ai_guidance.md
    echo - **src/pages/**: Route components >> docs/ai_guidance.md
    echo - **src/types/**: TypeScript definitions >> docs/ai_guidance.md
    echo - **src/utils/**: Helper functions >> docs/ai_guidance.md
    echo - **src/lib/**: Third-party integrations >> docs/ai_guidance.md
    echo - **src/assets/**: Static assets like images >> docs/ai_guidance.md
    echo - **src/styles/**: CSS and styling files >> docs/ai_guidance.md
)

if "%project_type%"=="node-typescript" (
    echo - **src/controllers/**: Request handlers >> docs/ai_guidance.md
    echo - **src/models/**: Data models >> docs/ai_guidance.md
    echo - **src/routes/**: API route definitions >> docs/ai_guidance.md
    echo - **src/middleware/**: Express middleware >> docs/ai_guidance.md
    echo - **src/utils/**: Helper functions >> docs/ai_guidance.md
    echo - **src/config/**: Configuration files >> docs/ai_guidance.md
)

if "%project_type%"=="vanilla-js" (
    echo - **src/js/**: JavaScript modules >> docs/ai_guidance.md
    echo - **src/css/**: CSS stylesheets >> docs/ai_guidance.md
    echo - **src/assets/**: Static assets like images >> docs/ai_guidance.md
)

echo. >> docs/ai_guidance.md
echo ## Development Guidelines >> docs/ai_guidance.md
echo. >> docs/ai_guidance.md

REM Add guidelines based on project type
if "%project_type%"=="react-typescript" (
    echo ### React TypeScript Guidelines >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 1. **Component-Based Architecture** >> docs/ai_guidance.md
    echo    - Build small, focused components (< 300 lines) >> docs/ai_guidance.md
    echo    - Use composition over inheritance >> docs/ai_guidance.md
    echo    - One main component per file >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 2. **Type Safety** >> docs/ai_guidance.md
    echo    - Define explicit interfaces for all props >> docs/ai_guidance.md
    echo    - Use TypeScript features to ensure type safety >> docs/ai_guidance.md
    echo    - Avoid using `any` type >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 3. **Performance First** >> docs/ai_guidance.md
    echo    - Memoize expensive calculations and callbacks >> docs/ai_guidance.md
    echo    - Implement virtualization for long lists >> docs/ai_guidance.md
    echo    - Use React.memo for pure components >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 4. **Naming Conventions** >> docs/ai_guidance.md
    echo    - Component files: PascalCase (Button.tsx) >> docs/ai_guidance.md
    echo    - Utility files: camelCase (formatDate.ts) >> docs/ai_guidance.md
    echo    - CSS modules: kebab-case (button-styles.module.css) >> docs/ai_guidance.md
    echo    - Component names: PascalCase (UserProfile) >> docs/ai_guidance.md
    echo    - Functions: camelCase (calculateTotal) >> docs/ai_guidance.md
    echo    - Constants: UPPER_SNAKE_CASE (MAX_ITEMS) >> docs/ai_guidance.md
)

if "%project_type%"=="node-typescript" (
    echo ### Node.js TypeScript Guidelines >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 1. **API Structure** >> docs/ai_guidance.md
    echo    - Follow RESTful principles >> docs/ai_guidance.md
    echo    - Use controllers for request handling logic >> docs/ai_guidance.md
    echo    - Separate routes from business logic >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 2. **Type Safety** >> docs/ai_guidance.md
    echo    - Define interfaces for request/response objects >> docs/ai_guidance.md
    echo    - Use enums for constants >> docs/ai_guidance.md
    echo    - Leverage TypeScript's type system for validation >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 3. **Error Handling** >> docs/ai_guidance.md
    echo    - Use middleware for centralized error handling >> docs/ai_guidance.md
    echo    - Return consistent error responses >> docs/ai_guidance.md
    echo    - Log errors with appropriate detail >> docs/ai_guidance.md
)

if "%project_type%"=="vanilla-js" (
    echo ### Vanilla JavaScript Guidelines >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 1. **Module Structure** >> docs/ai_guidance.md
    echo    - Use ES modules for code organization >> docs/ai_guidance.md
    echo    - Keep modules focused on a single responsibility >> docs/ai_guidance.md
    echo    - Use IIFE for encapsulation when needed >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 2. **DOM Manipulation** >> docs/ai_guidance.md
    echo    - Cache DOM elements for better performance >> docs/ai_guidance.md
    echo    - Use event delegation for dynamic elements >> docs/ai_guidance.md
    echo    - Create elements using templates >> docs/ai_guidance.md
    echo. >> docs/ai_guidance.md
    echo 3. **Performance** >> docs/ai_guidance.md
    echo    - Minimize reflows and repaints >> docs/ai_guidance.md
    echo    - Use requestAnimationFrame for animations >> docs/ai_guidance.md
    echo    - Debounce and throttle expensive operations >> docs/ai_guidance.md
)

REM Create package.json based on project type
echo {> package.json
echo   "name": "%project_name%",>> package.json
echo   "version": "0.1.0",>> package.json
echo   "description": "%project_description%",>> package.json
echo   "author": "%author_name%",>> package.json
echo   "scripts": {>> package.json

REM Add scripts based on project type
if "%project_type%"=="react-typescript" (
    echo     "start": "vite",>> package.json
    echo     "build": "tsc && vite build",>> package.json
    echo     "test": "vitest",>> package.json
    echo     "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",>> package.json
    echo     "preview": "vite preview">> package.json
)

if "%project_type%"=="node-typescript" (
    echo     "start": "node dist/index.js",>> package.json
    echo     "dev": "nodemon --exec ts-node src/index.ts",>> package.json
    echo     "build": "tsc",>> package.json
    echo     "test": "jest",>> package.json
    echo     "lint": "eslint src --ext ts --report-unused-disable-directives --max-warnings 0">> package.json
)

if "%project_type%"=="vanilla-js" (
    echo     "start": "vite",>> package.json
    echo     "build": "vite build",>> package.json
    echo     "preview": "vite preview">> package.json
)

echo   },>> package.json
echo   "dependencies": {>> package.json

REM Add dependencies based on project type
if "%project_type%"=="react-typescript" (
    echo     "react": "^18.2.0",>> package.json
    echo     "react-dom": "^18.2.0",>> package.json
    echo     "typescript": "^5.1.6">> package.json
)

if "%project_type%"=="node-typescript" (
    echo     "express": "^4.18.2",>> package.json
    echo     "typescript": "^5.1.6">> package.json
)

echo   },>> package.json
echo   "devDependencies": {>> package.json

REM Add dev dependencies based on project type
if "%project_type%"=="react-typescript" (
    echo     "@types/react": "^18.2.15",>> package.json
    echo     "@types/react-dom": "^18.2.7",>> package.json
    echo     "vite": "^4.4.5",>> package.json
    echo     "@vitejs/plugin-react": "^4.0.3",>> package.json
    echo     "eslint": "^8.45.0",>> package.json
    echo     "prettier": "^3.0.0">> package.json
)

if "%project_type%"=="node-typescript" (
    echo     "@types/express": "^4.17.17",>> package.json
    echo     "@types/node": "^20.4.5",>> package.json
    echo     "ts-node": "^10.9.1",>> package.json
    echo     "nodemon": "^3.0.1",>> package.json
    echo     "eslint": "^8.45.0",>> package.json
    echo     "prettier": "^3.0.0">> package.json
)

if "%project_type%"=="vanilla-js" (
    echo     "vite": "^4.4.5",>> package.json
    echo     "eslint": "^8.45.0",>> package.json
    echo     "prettier": "^3.0.0">> package.json
)

echo   }>> package.json
echo }>> package.json

REM Create file structure based on project type
if "%project_type%"=="react-typescript" (
    mkdir src\components
    mkdir src\hooks
    mkdir src\pages
    mkdir src\types
    mkdir src\utils
    mkdir src\lib
    mkdir src\assets
    mkdir src\styles
    
    REM Create sample component
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
    
    REM Create main app file
    echo import React from 'react';> src\App.tsx
    echo import { Button } from './components/Button';>> src\App.tsx
    echo. >> src\App.tsx
    echo function App() {>> src\App.tsx
    echo   const handleClick = () => {>> src\App.tsx
    echo     console.log('Button clicked!');>> src\App.tsx
    echo   };>> src\App.tsx
    echo. >> src\App.tsx
    echo   return (>> src\App.tsx
    echo     ^<div className="app"^>>> src\App.tsx
    echo       ^<h1^>%project_name%^</h1^>>> src\App.tsx
    echo       ^<p^>%project_description%^</p^>>> src\App.tsx
    echo       ^<Button label="Click me" onClick={handleClick} /^>>> src\App.tsx
    echo     ^</div^>>> src\App.tsx
    echo   );>> src\App.tsx
    echo }>> src\App.tsx
    echo. >> src\App.tsx
    echo export default App;>> src\App.tsx
    
    REM Create tsconfig.json
    echo {> tsconfig.json
    echo   "compilerOptions": {>> tsconfig.json
    echo     "target": "ES2020",>> tsconfig.json
    echo     "useDefineForClassFields": true,>> tsconfig.json
    echo     "lib": ["ES2020", "DOM", "DOM.Iterable"],>> tsconfig.json
    echo     "module": "ESNext",>> tsconfig.json
    echo     "skipLibCheck": true,>> tsconfig.json
    echo. >> tsconfig.json
    echo     "moduleResolution": "bundler",>> tsconfig.json
    echo     "allowImportingTsExtensions": true,>> tsconfig.json
    echo     "resolveJsonModule": true,>> tsconfig.json
    echo     "isolatedModules": true,>> tsconfig.json
    echo     "noEmit": true,>> tsconfig.json
    echo     "jsx": "react-jsx",>> tsconfig.json
    echo. >> tsconfig.json
    echo     "strict": true,>> tsconfig.json
    echo     "noUnusedLocals": true,>> tsconfig.json
    echo     "noUnusedParameters": true,>> tsconfig.json
    echo     "noFallthroughCasesInSwitch": true>> tsconfig.json
    echo   },>> tsconfig.json
    echo   "include": ["src"],>> tsconfig.json
    echo   "references": [{ "path": "./tsconfig.node.json" }]>> tsconfig.json
    echo }>> tsconfig.json
)

if "%project_type%"=="node-typescript" (
    mkdir src\controllers
    mkdir src\models
    mkdir src\routes
    mkdir src\middleware
    mkdir src\utils
    mkdir src\config
    
    REM Create main index file
    echo import express from 'express';> src\index.ts
    echo. >> src\index.ts
    echo const app = express();>> src\index.ts
    echo const port = process.env.PORT || 3000;>> src\index.ts
    echo. >> src\index.ts
    echo app.use(express.json());>> src\index.ts
    echo. >> src\index.ts
    echo app.get('/', (req, res) => {>> src\index.ts
    echo   res.send('Welcome to %project_name% API');>> src\index.ts
    echo });>> src\index.ts
    echo. >> src\index.ts
    echo app.listen(port, () => {>> src\index.ts
    echo   console.log(`Server running on port ${port}`);>> src\index.ts
    echo });>> src\index.ts
    
    REM Create tsconfig.json
    echo {> tsconfig.json
    echo   "compilerOptions": {>> tsconfig.json
    echo     "target": "es2016",>> tsconfig.json
    echo     "module": "commonjs",>> tsconfig.json
    echo     "outDir": "./dist",>> tsconfig.json
    echo     "esModuleInterop": true,>> tsconfig.json
    echo     "forceConsistentCasingInFileNames": true,>> tsconfig.json
    echo     "strict": true,>> tsconfig.json
    echo     "skipLibCheck": true>> tsconfig.json
    echo   },>> tsconfig.json
    echo   "include": ["src/**/*"]>> tsconfig.json
    echo }>> tsconfig.json
)

if "%project_type%"=="vanilla-js" (
    mkdir src\js
    mkdir src\css
    mkdir src\assets
    
    REM Create index.html
    echo ^<!DOCTYPE html^>> index.html
    echo ^<html lang="en"^>>> index.html
    echo ^<head^>>> index.html
    echo   ^<meta charset="UTF-8" /^>>> index.html
    echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>>> index.html
    echo   ^<title^>%project_name%^</title^>>> index.html
    echo   ^<link rel="stylesheet" href="/src/css/style.css" /^>>> index.html
    echo ^</head^>>> index.html
    echo ^<body^>>> index.html
    echo   ^<div id="app"^>>> index.html
    echo     ^<h1^>%project_name%^</h1^>>> index.html
    echo     ^<p^>%project_description%^</p^>>> index.html
    echo     ^<button id="mainButton" class="btn"^>Click me^</button^>>> index.html
    echo   ^</div^>>> index.html
    echo   ^<script type="module" src="/src/js/main.js"^>^</script^>>> index.html
    echo ^</body^>>> index.html
    echo ^</html^>>> index.html
    
    REM Create main.js
    echo // Main JavaScript entry point> src\js\main.js
    echo. >> src\js\main.js
    echo document.addEventListener('DOMContentLoaded', () => {>> src\js\main.js
    echo   console.log('Application started');>> src\js\main.js
    echo. >> src\js\main.js
    echo   const mainButton = document.getElementById('mainButton');>> src\js\main.js
    echo   mainButton.addEventListener('click', () => {>> src\js\main.js
    echo     alert('Button clicked!');>> src\js\main.js
    echo   });>> src\js\main.js
    echo });>> src\js\main.js
    
    REM Create CSS file
    echo /* Main stylesheet */> src\css\style.css
    echo. >> src\css\style.css
    echo body {>> src\css\style.css
    echo   font-family: Arial, sans-serif;>> src\css\style.css
    echo   margin: 0;>> src\css\style.css
    echo   padding: 20px;>> src\css\style.css
    echo   line-height: 1.6;>> src\css\style.css
    echo }>> src\css\style.css
    echo. >> src\css\style.css
    echo #app {>> src\css\style.css
    echo   max-width: 800px;>> src\css\style.css
    echo   margin: 0 auto;>> src\css\style.css
    echo   padding: 20px;>> src\css\style.css
    echo }>> src\css\style.css
    echo. >> src\css\style.css
    echo .btn {>> src\css\style.css
    echo   padding: 10px 15px;>> src\css\style.css
    echo   background-color: #4CAF50;>> src\css\style.css
    echo   color: white;>> src\css\style.css
    echo   border: none;>> src\css\style.css
    echo   border-radius: 4px;>> src\css\style.css
    echo   cursor: pointer;>> src\css\style.css
    echo }>> src\css\style.css
    echo. >> src\css\style.css
    echo .btn:hover {>> src\css\style.css
    echo   background-color: #45a049;>> src\css\style.css
    echo }>> src\css\style.css
)

REM Add GitHub Actions CI setup if requested
if "%include_ci%"=="true" (
    mkdir .github
    mkdir .github\workflows
    
    if "%project_type%"=="react-typescript" (
        echo name: CI> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo on:>> .github\workflows\ci.yml
        echo   push:>> .github\workflows\ci.yml
        echo     branches: [ main ]>> .github\workflows\ci.yml
        echo   pull_request:>> .github\workflows\ci.yml
        echo     branches: [ main ]>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo jobs:>> .github\workflows\ci.yml
        echo   build:>> .github\workflows\ci.yml
        echo     runs-on: ubuntu-latest>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     steps:>> .github\workflows\ci.yml
        echo     - uses: actions/checkout@v3>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Setup Node.js>> .github\workflows\ci.yml
        echo       uses: actions/setup-node@v3>> .github\workflows\ci.yml
        echo       with:>> .github\workflows\ci.yml
        echo         node-version: '18'>> .github\workflows\ci.yml
        echo         cache: 'npm'>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Install dependencies>> .github\workflows\ci.yml
        echo       run: npm ci>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Lint>> .github\workflows\ci.yml
        echo       run: npm run lint>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Build>> .github\workflows\ci.yml
        echo       run: npm run build>> .github\workflows\ci.yml
    )
    
    if "%project_type%"=="node-typescript" (
        echo name: CI> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo on:>> .github\workflows\ci.yml
        echo   push:>> .github\workflows\ci.yml
        echo     branches: [ main ]>> .github\workflows\ci.yml
        echo   pull_request:>> .github\workflows\ci.yml
        echo     branches: [ main ]>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo jobs:>> .github\workflows\ci.yml
        echo   build:>> .github\workflows\ci.yml
        echo     runs-on: ubuntu-latest>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     steps:>> .github\workflows\ci.yml
        echo     - uses: actions/checkout@v3>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Setup Node.js>> .github\workflows\ci.yml
        echo       uses: actions/setup-node@v3>> .github\workflows\ci.yml
        echo       with:>> .github\workflows\ci.yml
        echo         node-version: '18'>> .github\workflows\ci.yml
        echo         cache: 'npm'>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Install dependencies>> .github\workflows\ci.yml
        echo       run: npm ci>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Lint>> .github\workflows\ci.yml
        echo       run: npm run lint>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Build>> .github\workflows\ci.yml
        echo       run: npm run build>> .github\workflows\ci.yml
    )
    
    if "%project_type%"=="vanilla-js" (
        echo name: CI> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo on:>> .github\workflows\ci.yml
        echo   push:>> .github\workflows\ci.yml
        echo     branches: [ main ]>> .github\workflows\ci.yml
        echo   pull_request:>> .github\workflows\ci.yml
        echo     branches: [ main ]>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo jobs:>> .github\workflows\ci.yml
        echo   build:>> .github\workflows\ci.yml
        echo     runs-on: ubuntu-latest>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     steps:>> .github\workflows\ci.yml
        echo     - uses: actions/checkout@v3>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Setup Node.js>> .github\workflows\ci.yml
        echo       uses: actions/setup-node@v3>> .github\workflows\ci.yml
        echo       with:>> .github\workflows\ci.yml
        echo         node-version: '18'>> .github\workflows\ci.yml
        echo         cache: 'npm'>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Install dependencies>> .github\workflows\ci.yml
        echo       run: npm ci>> .github\workflows\ci.yml
        echo. >> .github\workflows\ci.yml
        echo     - name: Build>> .github\workflows\ci.yml
        echo       run: npm run build>> .github\workflows\ci.yml
    )
)

echo.
echo ===================================================
echo Project %project_name% has been created successfully!
echo ===================================================
echo.
echo Project structure:
echo - README.md: Project overview and getting started guide
echo - package.json: Project configuration and dependencies
echo - src/: Source code directory
echo - docs/: Project documentation

if "%include_ci%"=="true" (
    echo - .github/workflows/: CI/CD configuration
)

REM Display next steps
echo.
echo Next steps:
echo 1. Navigate to your project: cd %project_name%
echo 2. Open the project in your IDE: code .
echo 3. Review the AI guidance document in docs/ai_guidance.md
echo 4. Install dependencies with: npm install
echo 5. Start development with: npm start
echo.
echo Thanks for using Advanced Project Generator Wizard!

pause 