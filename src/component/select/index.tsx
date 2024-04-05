import { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>
export const Select: React.FC<SelectProps> = ({ ...props }) => {

    return (
        <select
            className=' 
            w-full 
            p-4
            bg-transparent
            outline-none
            border
            border-solid
            border-neutral-800
            rounded-lg '
            {...props}>
            {props.children}
        </select>
    )
}