import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({ ...props }) => {

    return (
        <input {...props}
            className='
        w-full 
        p-4
        bg-transparent
        outline-none
        border
        border-solid
        border-neutral-800
        rounded-lg'/>
    )
}

