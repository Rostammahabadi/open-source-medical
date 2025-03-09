# Cursor AI Assistant Guide for {{PROJECT_NAME}}

## Project Structure

This project follows a structured organization to maintain code clarity and separation of concerns:

```
{{PROJECT_STRUCTURE}}
```

## Coding Standards

This project adheres to the following coding standards:

- **TypeScript**: Strict type checking is enabled
- **Component Structure**: Components are organized by feature and responsibility
- **Naming Conventions**: 
  - PascalCase for components and interfaces
  - camelCase for functions and variables
  - UPPER_SNAKE_CASE for constants
- **File Organization**: One component per file, related utilities grouped together
- **Code Formatting**: Prettier and ESLint are configured for consistent style

## Component Creation Guidelines

When creating new components, follow this template:

```tsx
// Imports
import React from 'react';
import type { ComponentProps } from './types';

// Component interface
interface Props {
  // Define props here with explicit types
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Component definition
export const ComponentName: React.FC<Props> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  // 1. Hooks
  const [state, setState] = useState(initialState);
  
  // 2. Derived state and effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 3. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 4. Return JSX
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

## Testing Approach

Tests should be placed alongside the components they test. Use the following testing pattern:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    render(<ComponentName label="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ComponentName label="Test" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Common Development Tasks

### Adding a New Feature

1. Create necessary components in `src/components/features/[FeatureName]`
2. Add any required hooks in `src/hooks`
3. Create types in `src/types`
4. Add API services in `src/services` if needed
5. Update pages to include the new feature

### Styling Components

This project uses {{STYLING_APPROACH}} for styling. To style a component:

```tsx
// Example with Tailwind CSS
<div className="flex items-center justify-between p-4 bg-white rounded shadow">
  {children}
</div>

// Example with CSS Modules
import styles from './ComponentName.module.css';

<div className={styles.container}>
  {children}
</div>
```

### State Management

For local state, use React hooks. For global state, use {{STATE_MANAGEMENT_APPROACH}}.

## Recommended Extensions for Cursor

- ESLint
- Prettier
- Error Lens
- Import Cost
- GitLens
- Path Intellisense
- Tailwind CSS IntelliSense (if using Tailwind)

## Troubleshooting Tips

### Common Issues and Solutions

1. **Type Errors**
   - Check that all props have explicit interfaces
   - Ensure proper typing for function parameters and return values
   - Use type guards for conditional logic

2. **Component Rendering Issues**
   - Verify that all required props are provided
   - Check for conditional rendering logic errors
   - Ensure keys are provided for list items

3. **State Management Problems**
   - Confirm that state updates are using the correct setter functions
   - Check dependency arrays in useEffect hooks
   - Verify that context providers wrap the necessary components

### Asking Cursor AI for Help

When asking Cursor AI for assistance, provide context about:

1. The specific file or component you're working with
2. The problem you're trying to solve
3. Any error messages you're seeing
4. What you've already tried

Example prompt: "I'm working on the UserProfile component and getting a type error with the user prop. The error says 'Property address is missing in type User'. Here's my current code..."

## AI Prompting Examples

Here are effective prompts to use with Cursor AI for common tasks:

### Creating a New Component

"Create a new component called ProductCard that displays a product image, title, price, and has an 'Add to Cart' button. It should accept a product object with these properties and an onAddToCart callback."

### Refactoring Code

"Refactor this UserList component to use React Query for data fetching and add proper error handling and loading states."

### Adding Tests

"Write comprehensive tests for the CheckoutForm component, including validation logic, form submission, and error states."

### Debugging

"Help me debug this infinite re-rendering issue in the Dashboard component. Here's the component code..." 