import React from 'react';

// Define the type for the data items
interface Option {
    value: string; // Value for the option
    text?: string; // Optional text to display
    city?: string; // Optional city name to display
}

// Define the props type for the Select component
interface SelectProps {
    data: Option[]; // Array of options
    register: any; // Type for register can be refined based on your use case
    className?: string; // Optional custom class name
}

const Select: React.FC<SelectProps> = ({
    data,
    register,
    className,
}) => {
    const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2";

    return (
        <select
            className={className ? className : defaultClassName}
            {...register}
        >
            {data?.map((element) => (
                <option key={element.value} value={element.value}>
                    {element.text ? element.text : element.city}
                </option>
            ))}
        </select>
    );
}

export default Select;
