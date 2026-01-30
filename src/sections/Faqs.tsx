"use client";
import Tag from "@/components/Tag";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What blockchains does Dexify support?",
        answer: "Dexify currently supports Ethereum, Solana, and Tron. We're adding support for Sui, Aptos, BNB Chain, and Base soon. Manage all your tokens from one unified dashboard.",
    },
    {
        question: "How do social transactions work?",
        answer: "Social transactions let you attach custom messages and GIFs to your token transfers. These messages are stored off-chain but linked on-chain for traceability, turning simple transfers into expressive interactions.",
    },
    {
        question: "Do I need separate wallets?",
        answer: "No! Dexify includes built-in wallet functionality for Ethereum and Solana. You can view, send, and manage assets across multiple chains from a single interface without switching wallets.",
    },
    {
        question: "Is my transaction data secure?",
        answer: "Yes, absolutely. All transactions are processed securely through the blockchain networks. Dexify uses industry-standard security practices and does not store your private keys.",
    },
    {
        question: "Can I track transaction history?",
        answer: "Yes! Dexify provides comprehensive transaction history viewing with real-time balance updates. You can track all your token transfers, social messages, and media across all supported blockchains from one place.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Faqs</Tag>
                </div>
                <h2 className="text-6xl font-medium mt-6 text-center md:gap-8 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                    Questions? We&apos;ve got{" "}
                    <span className="text-lime-400">answers</span>
                </h2>

                <div className="mt-12 flex flex-col gap-6 md:gap-8 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <div
                            key={faq.question}
                            className="relative rounded-2xl p-6 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-gradient-to-br hover:from-white/[0.12] hover:via-white/[0.06] hover:to-white/[0.03] hover:border-white/30 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.45)] hover:scale-[1.01] transition-all duration-500 ease-out glass-glow"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div
                                className="flex justify-between items-center cursor-pointer relative z-10"
                                onClick={() => setSelectedIndex(faqIndex)}
                            >
                                <h3 className="font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                                    {faq.question}
                                </h3>
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
                                    className={twMerge(
                                        "feather feather-plus text-lime-400 flex-shrink-0 transition duration-300",
                                        selectedIndex === faqIndex &&
                                            "rotate-45"
                                    )}
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </div>

                            <AnimatePresence>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{ height: 0, marginTop: 0 }}
                                        animate={{
                                            height: "auto",
                                            marginTop: 24,
                                        }}
                                        exit={{ height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/70 leading-relaxed relative z-10">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
