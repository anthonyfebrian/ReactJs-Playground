import React from "react";

interface MyButtonProps {
    text: string;
    disabled: boolean;

}
export default function MyButton({text, disabled = false, onClick}: MyButtonProps) {
    return(
        <button disabled={disabled} onClick={onClick}>{text}</button>
    )
}

interface MyButtonProps {
    text: string;
    disabled: boolean;
    onClick: () => void;
}