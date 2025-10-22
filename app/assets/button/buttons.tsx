import { PropsWithChildren } from "react"
import './buttons.css'

interface ButtonProps {
    className?: string; 
    onClick?: () => void
}

export const GreenButton = ({ className, children, onClick }: PropsWithChildren<ButtonProps>) => {
    return (
        <button className={`${className} green-button`} onClick={onClick}>
            {children}
        </button>
    )
}