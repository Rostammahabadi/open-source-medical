# AI Guidance Document for {{PROJECT_NAME}}

## Project Context

- **Project Name**: {{PROJECT_NAME}}
- **Project Description**: {{PROJECT_DESCRIPTION}}
- **Author**: {{AUTHOR_NAME}}
- **Project Type**: {{PROJECT_TYPE}}
- **Created Date**: {{CREATED_DATE}}

{{#if CUSTOM_QUESTIONS}}
### Project-Specific Information
- **Target Audience**: {{TARGET_AUDIENCE}}
- **Success Criteria**: {{SUCCESS_CRITERIA}}
- **Technical Constraints**: {{TECHNICAL_CONSTRAINTS}}
- **Timeline**: {{TIMELINE}}
{{/if}}

## Development Standards

This project follows strict development standards to ensure code quality, maintainability, and performance:

### TypeScript Standards
- Use strict type checking
- Define explicit interfaces for all data structures
- Avoid using `any` type
- Use type guards for runtime type checking

### Component Standards
- Keep components small and focused (< 300 lines)
- Use functional components with hooks
- Implement proper prop validation
- Follow the component structure template

### Performance Considerations
- Memoize expensive calculations with useMemo
- Use useCallback for event handlers passed as props
- Implement virtualization for long lists
- Lazy load components and routes when appropriate

### State Management
- Keep state as local as possible
- Use context API for shared state
- Consider using state management libraries for complex state

## Code Organization

The project follows this structure:

```
{{PROJECT_STRUCTURE}}
```

### Key Directories and Their Purpose

{{#if IS_REACT}}
- **components/**: UI components organized by domain
  - **common/**: Reusable components used across features
  - **features/**: Feature-specific components
  - **layout/**: Layout components (headers, footers, etc.)
- **hooks/**: Custom React hooks
- **pages/**: Route components
- **types/**: TypeScript definitions
- **utils/**: Helper functions
- **lib/**: Third-party integrations
- **context/**: React context providers
- **services/**: API and service functions
{{/if}}

{{#if IS_NODE}}
- **controllers/**: Request handlers
- **models/**: Data models
- **routes/**: API route definitions
- **middleware/**: Express middleware
- **utils/**: Helper functions
- **config/**: Configuration files
- **services/**: Business logic
- **validation/**: Input validation schemas
{{/if}}

## Common Tasks

### Creating New Components

1. Identify the component's purpose and responsibility
2. Place it in the appropriate directory based on its use
3. Follow the component template structure
4. Define a clear interface for props
5. Implement the component with proper hooks and event handlers
6. Add tests for the component

Example component structure:

```tsx
// Imports
import React from 'react';

// Component interface
interface Props {
  // Props definition
}

// Component definition
export const ComponentName: React.FC<Props> = (props) => {
  // Implementation
};
```

### API Integration

1. Create service functions in the services directory
2. Use proper error handling and loading states
3. Consider using React Query for data fetching
4. Implement proper TypeScript interfaces for API responses

Example service function:

```tsx
import axios from 'axios';
import { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
```

### State Management

For local component state:
```tsx
const [count, setCount] = useState(0);
```

For shared state:
```tsx
// In a context file
export const UserContext = createContext<UserContextType | undefined>(undefined);

// In a provider component
export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// In a consumer component
const { user } = useContext(UserContext);
```

## Troubleshooting

### Common Issues

1. **Type Errors**
   - Ensure all props have proper interfaces
   - Check for null/undefined values
   - Use optional chaining and nullish coalescing

2. **Rendering Issues**
   - Check for missing keys in lists
   - Verify conditional rendering logic
   - Inspect component props

3. **Performance Issues**
   - Look for unnecessary re-renders
   - Check dependency arrays in useEffect/useMemo/useCallback
   - Consider memoization for expensive calculations

### Debugging Strategies

1. Use React DevTools to inspect component hierarchy and props
2. Add console.logs for state and props at key points
3. Use breakpoints in the browser devtools
4. Check for errors in the console

## AI Prompting Examples

When working with AI assistants like Cursor, use these prompting patterns:

### For Component Creation
"Create a UserProfile component that displays user information including name, email, and profile picture. It should accept a user object prop and have a callback for when the edit button is clicked."

### For Bug Fixing
"I'm getting this error in my UserList component: 'Cannot read property 'map' of undefined'. Here's my component code: [code]. How can I fix this?"

### For Code Refactoring
"Refactor this UserForm component to use React Hook Form instead of managing form state manually. The form should validate email and password fields."

### For Testing
"Write unit tests for this AuthContext provider that tests the login, logout, and registration functionality." 