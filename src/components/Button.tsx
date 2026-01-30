import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";

const classes = cva(
    "border h-12 rounded-full px-6 font-medium relative overflow-hidden transition-colors duration-500 group",
    {
        variants: {
            variant: {
                primary: "bg-lime-400 text-neutral-950 border-lime-400 dark:bg-lime-400 dark:text-neutral-950",
                secondary:
                    "border-1 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background",
            },
            size: {
                sm: "h-10",
            },
        },
    }
);

export default function Button(
    props: {
        variant: "primary" | "secondary";
        size?: "sm";
    } & ButtonHTMLAttributes<HTMLButtonElement>
) {
    const { variant, className, size, ...otherprops } = props;
    const hasFlex = className?.includes('flex');
    return (
        <button
            className={classes({
                variant,
                size,
                className,
            })}
            {...otherprops}
        >
            {variant === "secondary" && (
                <span className="absolute inset-0 bg-foreground transform translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
            )}
            <span className={`relative z-10 ${hasFlex ? 'flex items-center' : ''}`}>{props.children}</span>
        </button>
    );
}
