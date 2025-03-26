
export default function MyButton({text, disabled = false, onClick}: MyButtonProps) {
    return(
        <button disabled={disabled} onClick={onClick}>{text}</button>
    )
}

interface MyButtonProps {
    text: string;
    disabled?: boolean;
    onClick: () => void;
}