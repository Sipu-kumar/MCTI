import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Tag(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherprops } = props;
    return (
        <div
            className={twMerge(
                "inline-flex border border-lime-400 gap-2 text-lime-400 px-4 py-2 rounded-full uppercase items-center",
                className
            )}
            {...otherprops}
        >
            <span>&#10038;</span>
            <span className="text-sm">{children}</span>
        </div>
    );
}
