import { useCallback, useState } from "react";
import Button from "../button";
import { Props } from "./types";

const ButtonGroup = (props: Props) => {
    const {buttons, onClick} = props
    const [selectedButton, setSelectedButton] = useState(buttons?.[0]?.value)
    const handleButtonClick = useCallback((value: string) => {
        setSelectedButton(value)
        onClick(value)
    }, [])

    return <div>
        {buttons.map(button => (
            <Button
                key={`${button.value}-buttongp`}
                value={button.value}
                onClick={handleButtonClick}
                selected={selectedButton === button.value}
            >
                {button.label}
            </Button>
        ))}
    </div>
}

export default ButtonGroup