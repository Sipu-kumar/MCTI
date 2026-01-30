import { twMerge } from "tailwind-merge";

export default function FeatureCard(props: {
    title: string;
    description: string;
    children?: React.ReactNode;
    className? :string;
}) {
    const { title, description, children, className } = props;
    return (
        <div className={twMerge(
            "relative p-6 rounded-3xl",
            "bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02]",
            "backdrop-blur-2xl",
            "border border-white/20",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
            "hover:bg-gradient-to-br hover:from-white/[0.12] hover:via-white/[0.06] hover:to-white/[0.03]",
            "hover:border-white/30 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.45)]",
            "hover:scale-[1.02] hover:-translate-y-1",
            "transition-all duration-500 ease-out",
            "glass-glow z-10",
            className
        )}>
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-lime-400/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="aspect-video relative z-10">{children}</div>
            <div className="relative z-10">
                <h3 className="text-3xl font-medium mt-6 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">{title}</h3>
                <p className="text-white/70 mt-2 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

