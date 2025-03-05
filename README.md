# 🚀 Project Setup Wizard

A comprehensive system for quickly bootstrapping new software development projects with the right structure, documentation, and best practices.

<div align="center">

![Project Setup Wizard](https://img.shields.io/badge/Project-Setup_Wizard-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

## 📋 Overview

This Project Setup Wizard provides a simple, interactive way to create new software projects with proper structure and documentation. It's designed to:

1. ⏱️ Save time setting up new projects
2. 🏗️ Enforce consistent project structure
3. 📝 Generate helpful documentation templates
4. 🤖 Provide AI-friendly guidance documents
5. 🧩 Support different project types (React, Node.js, etc.)

## 🚦 Getting Started

1. Clone or download this repository
2. Double-click on `start_project_wizard.bat` to launch the wizard
3. Follow the interactive prompts to set up your project
4. Open the generated project in your favorite IDE

<details>
<summary><b>📸 Screenshot of the Wizard in Action</b></summary>
<br>
<i>The Project Setup Wizard provides an interactive command-line interface to guide you through project creation.</i>
</details>

## ✨ Features

### 🔄 Multiple Project Types
- **React TypeScript** - Modern frontend applications
- **Node.js TypeScript** - Backend services and APIs
- **Vanilla JavaScript** - Simple web projects

### 📚 Comprehensive Documentation
- **README.md** - Project overview and getting started guide
- **Project plan** - Goals, timeline, and resources
- **Requirements document** - Functional and non-functional requirements
- **Architecture document** - System design and components
- **AI guidance document** - AI-friendly project context (advanced version)

### 👨‍💻 Developer-Friendly Structure
- Organized file structure based on best practices
- Starter components and files
- Proper TypeScript configuration
- Package.json with dependencies and scripts

### 🔌 Optional Features
- Testing setup
- Linting configuration
- CI/CD setup (GitHub Actions)
- Custom project questions

## 🛠️ Available Generators

### Basic Project Setup (`project_setup.bat`)
A simpler project generator that creates:
- Basic project structure
- Simple README.md
- Documentation templates
- Standard package.json

### Advanced Project Generator (`project_generator.bat`)
A more comprehensive generator that includes:
- Everything from the basic generator
- AI guidance document with detailed project information
- More extensive file structure
- Sample code files
- Proper TypeScript/framework configuration
- Optional CI/CD setup
- Custom project questions

## 📁 Files Included

| File | Description |
|------|-------------|
| `start_project_wizard.bat` | Main launcher script |
| `project_setup.bat` | Basic project generator |
| `project_generator.bat` | Advanced project generator |
| `template_config.json` | Configuration for project templates |

## 🔍 Example Usage

1. Run `start_project_wizard.bat`
2. Choose generator type (Basic or Advanced)
3. Enter project name (e.g., "my-react-app")
4. Provide project description
5. Enter author name
6. Select project type (React TypeScript, Node.js, etc.)
7. Choose optional features (testing, linting, etc.)
8. For advanced generator, answer any custom questions

After completion, you'll have a fully structured project ready for development.

## 🏗️ Generated Project Structure

For a React TypeScript project, the following structure is created:

```
my-react-app/
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   │   └── Button.tsx
│   ├── hooks/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── lib/
│   ├── assets/
│   └── styles/
└── docs/
    ├── project_plan.md
    ├── requirements.md
    ├── architecture.md
    └── ai_guidance.md (advanced version only)
```

## 🏁 Next Steps After Generation

1. Navigate to your project folder: `cd your-project-name`
2. Open in your IDE: `code .`
3. Install dependencies: `npm install`
4. Start development: `npm start`
5. Review the generated documentation and customize as needed
6. Use the AI guidance document when working with AI assistants

## 🔮 Potential Enhancements

The following features could be added to make this system even more powerful:

<details>
<summary><b>Version Control Integration</b></summary>

- Git repository initialization
- Initial commit setup
- .gitignore templates for different project types
- GitHub/GitLab repository creation via API (with credentials)
</details>

<details>
<summary><b>Environment Configuration</b></summary>

- .env file templates with documentation
- Development/production environment setup
- Configuration examples for different environments
</details>

<details>
<summary><b>Expanded AI Guidance</b></summary>

- AI prompt examples for specific development tasks
- Documentation on how to effectively use AI with the specific project structure
- Sample problem-solution pairs for AI assistance
</details>

<details>
<summary><b>Component & Design System Integration</b></summary>

- Templates for popular UI libraries (Material UI, Chakra UI, Tailwind CSS)
- Theme configuration
- Sample styled components
</details>

<details>
<summary><b>API Development Templates</b></summary>

- API documentation templates (Swagger/OpenAPI)
- Example endpoint implementations
- API testing setup
</details>

<details>
<summary><b>Advanced Testing Setup</b></summary>

- Test examples for each project type (unit, integration, e2e)
- Testing utility functions
- Mock data generation
</details>

<details>
<summary><b>DevOps and Deployment</b></summary>

- Docker setup (Dockerfile, docker-compose.yml)
- Deployment scripts for various platforms (Vercel, Netlify, AWS)
- Infrastructure-as-code templates
</details>

<details>
<summary><b>Database Integration</b></summary>

- Database connection templates
- ORM setup (Prisma, TypeORM, Sequelize)
- Migration examples
- Data seeding scripts
</details>

<details>
<summary><b>Authentication Boilerplate</b></summary>

- Basic authentication flows
- JWT implementation
- Social login setup
</details>

<details>
<summary><b>State Management Templates</b></summary>

- Redux/Context API setup
- State management patterns
- Store configuration
</details>

## 🤖 How to Use with AI Assistance

1. After generating your project, open the folder in an AI-enabled editor (such as Cursor)
2. Ask the AI to review the AI guidance document in docs/ai_guidance.md
3. When developing new features, reference this document to ensure AI guidance aligns with project structure
4. Use prompts like:
   - "Create a new component following the project's React TypeScript guidelines"
   - "Help me implement a feature based on the project requirements document"
   - "Review this code against the project's architecture guidelines"

## ⚙️ Customization

You can modify the templates and configuration in `template_config.json` to:
- Add new project types
- Change default dependencies
- Update file structure
- Modify documentation templates

## 📜 License

Feel free to use, modify, and distribute this project setup system as needed.

## 👥 Contributing

Contributions are welcome! Feel free to enhance the system with additional features, project types, or improvements.
