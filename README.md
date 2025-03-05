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
│   ├── components/  # UI components organized by domain
│   │   └── Button.tsx
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Route components
│   ├── types/       # TypeScript definitions
│   ├── utils/       # Helper functions
│   ├── lib/         # Third-party integrations
│   ├── assets/      # Images, fonts, and other static files
│   └── styles/      # Global styles and themes
└── docs/
    ├── project_plan.md
    ├── requirements.md
    ├── architecture.md
    └── ai_guidance.md (advanced version only)
```

## 🧩 React TypeScript Development Guidelines

### Core Principles

1. **Component-Based Architecture**
   - Build small, focused components (< 300 lines)
   - Use composition over inheritance
   - One main component per file

2. **Type Safety**
   - Define explicit interfaces for all props
   - Use TypeScript features to ensure type safety
   - Avoid using `any` type

3. **Performance First**
   - Memoize expensive calculations and callbacks
   - Implement virtualization for long lists
   - Use React.memo for pure components

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Component files | PascalCase | `Button.tsx` |
| Utility files | camelCase | `formatDate.ts` |
| CSS modules | kebab-case | `button-styles.module.css` |
| Component names | PascalCase | `UserProfile` |
| Functions | camelCase | `calculateTotal` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITEMS` |

### Component Template

```tsx
// Imports
import React from 'react';
import type { ButtonProps } from './types';

// Component interface
interface Props {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Component definition
export const Button: React.FC<Props> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  // 1. Hooks
  const [isHovered, setIsHovered] = useState(false);
  
  // 2. Event handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // 3. Return JSX
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  );
};
```

### Best Practices

- **State Management**
  - Keep state as local as possible
  - Use React Query for server state
  - Use Context API sparingly

- **Accessibility**
  - Use semantic HTML elements
  - Add proper ARIA attributes
  - Ensure keyboard navigation works
  - Maintain sufficient color contrast

- **Testing**
  - Write tests for critical user interactions
  - Test component props and state changes
  - Place tests next to components (`Component.test.tsx`)

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

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
