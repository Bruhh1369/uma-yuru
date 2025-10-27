import { PropsWithChildren } from "react";
import './buttons.css';

type ButtonType = "button" | "label";
type ColorType = "green" | "white";

interface BaseProps {
    className?: string;
    onClick?: () => void;
    htmlFor?: string;
    color?: ColorType;
    as?: ButtonType;
    [x: string]: unknown;
}

const ButtonBase = ({
    className = "",
    children,
    onClick,
    htmlFor,
    color = "green",
    as = "button",
    ...rest
}: PropsWithChildren<BaseProps>) => {
    const classes = `${className} ${color}-button`.trim();
    if (as === "label") {
        return (
            <label className={classes} onClick={onClick} htmlFor={htmlFor} {...rest}>
                {children}
            </label>
        );
    }
    return (
        <button className={classes} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

// Shortcut exports for common buttons
export const GreenButton = (props: PropsWithChildren<Omit<BaseProps, "color" | "as">>) =>
    <ButtonBase {...props} color="green" as="button" />;

export const LabelGreenButton = (props: PropsWithChildren<Omit<BaseProps, "color" | "as">>) =>
    <ButtonBase {...props} color="green" as="label" />;

export const LabelWhiteButton = (props: PropsWithChildren<Omit<BaseProps, "color" | "as">>) =>
    <ButtonBase {...props} color="white" as="label" />;