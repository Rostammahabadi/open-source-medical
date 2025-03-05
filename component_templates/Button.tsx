import React, { useState } from 'react';

/**
 * Button component props
 */
interface ButtonProps {
  /**
   * Button label text
   */
  label: string;
  
  /**
   * Function called when button is clicked
   */
  onClick: () => void;
  
  /**
   * Visual style variant of the button
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Optional additional CSS class names
   */
  className?: string;
  
  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactNode;
  
  /**
   * Size of the button
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button 
 *   label="Submit" 
 *   onClick={handleSubmit} 
 *   variant="primary" 
 * />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  icon,
  size = 'medium'
}) => {
  // State for hover effect
  const [isHovered, setIsHovered] = useState(false);
  
  // Event handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Compute base classes based on variant and size
  const baseClasses = `
    inline-flex items-center justify-center
    rounded font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
  };
  
  // Size-specific classes
  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button; 