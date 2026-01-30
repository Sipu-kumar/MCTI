"use client";
import Tag from "@/components/Tag";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `You're managing tokens across multiple blockchains, but traditional wallets keep you isolated in separate ecosystems with no way to express yourself.`;
const words = text.split(" ");

export default function Introduction() {
    const scrollTarget = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollTarget,
        offset: ["start end", "end end"],
    });

    const [currentWord, setCurrentWord] = useState(0);
    const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

    useEffect(() => {
        const unsubscribe = wordIndex.on("change", (latest) => {
            setCurrentWord(latest);
        });
        return unsubscribe;
    }, [wordIndex]);

    return (
        <section className="py-28 lg:py-40">
            <div className="container">
                <div className="sticky top-20 md:top-28 lg:top-31">
                    <div className="flex justify-center">
                        <Tag>Introducing Dexify</Tag>
                    </div>

                    <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
                        <span>Your creative process deserves better.</span>{" "}
                        <span>
                            {words.map((word, i) => (
                                <span
                                    key={i}
                                    className={twMerge(
                                        "transition duration-500 text-white/15",
                                        i < currentWord && "text-white"
                                    )}
                                >
                                    {`${word} `}
                                </span>
                            ))}
                        </span>
                        <span className="text-lime-400 block">
                            That&apos;s why we built Dexify.
                        </span>
                    </div>
                </div>

                <div className="h-[150vh]" ref={scrollTarget}></div>
            </div>
        </section>
    );
}
