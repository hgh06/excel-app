import React, { MouseEventHandler } from "react";
import './Button.css';

interface ButtonProps {
    onclick: MouseEventHandler<HTMLButtonElement> | undefined;
    title: string
}

const Button = ({ onclick, title }: ButtonProps) => {
    return (
        <div className='btn-container'>
            <button
                className='btn'
                onClick={onclick}
            >
                {title}
            </button>
        </div>
    )
}

export default Button;