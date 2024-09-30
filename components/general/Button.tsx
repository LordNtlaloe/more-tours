import React from 'react';
import { ClipLoader } from "react-spinners";

// Define the props type
interface ButtonProps {
    disabled?: boolean; // Optional boolean to indicate if the button is disabled
    label: string; // Label text for the button
    className?: string; // Optional custom class name
    onClick?: () => void; // Optional click handler
}

const Button: React.FC<ButtonProps> = ({
    disabled = false,
    label,
    className,
    onClick = () => {}
}) => {
    const defaultClassName = "w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className ? className : defaultClassName}
        >
            {
                disabled
                    ? <ClipLoader size={16} />
                    : label
            }
        </button>
    );
}

export default Button;
