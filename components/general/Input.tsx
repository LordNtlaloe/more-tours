import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// Define the props type
interface InputProps {
    type: string; // Type of the input (e.g., 'text', 'number', etc.)
    placeholder: string; // Placeholder text for the input
    register: UseFormRegisterReturn<any>; // Updated to UseFormRegisterReturn
    className?: string; // Optional custom class name
    id?: string; // Optional id for the input
    step?: string | number; // Optional step for number inputs
}

const Input: React.FC<InputProps> = ({
    type,
    placeholder,
    register,
    className,
    id = undefined,
    step = undefined
}) => {
    const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2";

    return (
        <div>
            <input
                type={type}
                className={className ? className : defaultClassName}
                placeholder={placeholder}
                step={step}
                id={id}
                {...register} // Spread the register object
            />
        </div>
    );
}

export default Input;
