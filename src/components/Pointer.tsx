import { twMerge } from "tailwind-merge";

export default function Pointer(props: {
    name: string;
    color?: "red" | "blue";
    className?: string;
}) {
    const { name, color, className } = props;
    return (
        <div className={twMerge("relative", className)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-mouse-pointer text-foreground size-5"
            >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                <path d="M13 13l6 6" />
            </svg>
            <div className="absolute top-full left-full">
                <div
                    className={twMerge(
                        "inline-flex rounded-full font-bold text-sm bg-blue-500 px-4 py-2 rounded-tl-none",
                        color === "red" && "bg-red-500"
                    )}
                >
                    {name}
                </div>
            </div>
        </div>
    );
}
