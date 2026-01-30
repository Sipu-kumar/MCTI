"use client";
import Button from "@/components/Button";
import designExample1Image from "../assets/images/metamask.png";
import designExample2Image from "../assets/images/tokens.png";
import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import cursorYouImage from "../assets/images/cursor-you.svg";
import TokenPopup from "@/components/TokenPopup";
import { indexTokens, Token } from "@/lib/tokenIndexer";

export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();
    const { hasLoaded } = useLoading();
    
    // Token indexing state
    const [address, setAddress] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [ethTokens, setEthTokens] = useState<Token[]>([]);
    const [solTokens, setSolTokens] = useState<Token[]>([]);
    const [tronTokens, setTronTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (hasLoaded) {
            // Start Hero animations after loading completes
            leftDesignAnimate([
                [
                    leftDesignScope.current,
                    { opacity: [0, 1] },
                    { duration: 1, delay: 0.2 },
                ],
                [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.8 }],
            ]);

            // Animate right design image
            rightDesignAnimate([
                [
                    rightDesignScope.current,
                    { opacity: [0, 1] },
                    { duration: 1, delay: 0.4 },
                ],
                [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.8 }],
            ]);

            // Animate left pointer
            leftPointerAnimate([
                [
                    leftPointerScope.current,
                    { opacity: [0, 1] },
                    { duration: 0.6, delay: 1.2 },
                ],
                [
                    leftPointerScope.current,
                    { scale: [0.8, 1] },
                    { duration: 0.4 },
                ],
                [
                    leftPointerScope.current,
                    { x: 0, y: [0, 16, 0] },
                    { duration: 0.5, ease: "easeInOut" },
                ],
            ]);

            // Animate right pointer
            rightPointerAnimate([
                [
                    rightPointerScope.current,
                    { opacity: [0, 1] },
                    { duration: 0.6, delay: 1.4 },
                ],
                [
                    rightPointerScope.current,
                    { scale: [0.8, 1] },
                    { duration: 0.4 },
                ],
                [
                    rightPointerScope.current,
                    { x: 0, y: [0, 16, 0] },
                    { duration: 0.5, ease: "easeInOut" },
                ],
            ]);
        }
    }, [
        hasLoaded,
        leftDesignAnimate,
        leftDesignScope,
        leftPointerAnimate,
        leftPointerScope,
        rightDesignAnimate,
        rightDesignScope,
        rightPointerAnimate,
        rightPointerScope,
    ]);
    return (
        <section
            id="home"
            className="py-24 overflow-x-clip"
            style={{
                cursor: `url(${cursorYouImage.src}) 32 32, auto`,
            }}
        >
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 100, x: -100 }}
                    drag
                    dragSnapToOrigin
                    dragTransition={{
                        bounceStiffness: 200,
                        bounceDamping: 30,
                        power: 0.3,
                        timeConstant: 200,
                    }}
                    className="absolute -left-72 -top-5 hidden lg:block"
                >
                    <Image
                        src={designExample1Image}
                        alt="Design 1 image"
                        draggable="false"
                    />
                </motion.div>
                <motion.div
                    ref={leftPointerScope}
                    initial={{ opacity: 0, scale: 0.8 }}
                    className="absolute left-36 bottom-0 hidden lg:block"
                >
                    <Pointer name="Metamask" />
                </motion.div>
                <motion.div
                    ref={rightDesignScope}
                    initial={{ opacity: 0, y: 100, x: 100 }}
                    drag
                    dragSnapToOrigin
                    dragTransition={{
                        bounceStiffness: 200,
                        bounceDamping: 30,
                        power: 0.3,
                        timeConstant: 200,
                    }}
                    className="absolute -right-24 -top-16 hidden lg:block"
                >
                    <Image
                        src={designExample2Image}
                        alt="Design 2 image"
                        width={320}
                        height={220}
                        style={{
                            width: "320px",
                            height: "300px",
                            objectFit: "contain",
                        }}
                        draggable="false"
                    />
                </motion.div>
                <div className="flex justify-center">
                    <div className="inline-flex py-4 px-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl text-white-950 font-semibold rounded-tl-none rounded-br-none">
                        ✨ $7.5M seed round raised
                    </div>
                </div>

                <motion.div
                    ref={rightPointerScope}
                    initial={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-1 bottom-40 hidden lg:block rotate-12"
                >
                    <Pointer name="Bitcoin" color="red" />
                </motion.div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6">
                    Unified Blockchain Experience
                </h1>
                <p className="text-center text-xl text-muted-foreground mt-8 max-w-2xl mx-auto">
                    Track tokens, manage wallets, and send transactions with custom messages and GIFs across Ethereum, Solana, and Tron. Turn every transaction into a story.
                </p>
                <form 
                    className="flex flex-col sm:flex-row border border-white/15 rounded-full p-2 mt-8 max-w-lg mx-auto gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        
                        const addressToUse = address.trim();
                        
                        // If no address entered, prompt user
                        if (!addressToUse) {
                            alert("Please enter a wallet address to explore tokens.");
                            return;
                        }
                        
                        setLoading(true);
                        setIsPopupOpen(true);
                        
                        try {
                            const result = await indexTokens(addressToUse);
                            setEthTokens(result.ethTokens);
                            setSolTokens(result.solTokens);
                            setTronTokens(result.tronTokens);
                        } catch (error) {
                            console.error("Error indexing tokens:", error);
                            alert("Failed to index tokens. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter wallet address to explore"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-transparent px-4 flex-1 min-w-0 outline-none text-white placeholder:text-white/50"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full sm:w-auto"
                        size="sm"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Explore"}
                    </Button>
                </form>
                
                {/* Token Popup */}
                <TokenPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    address={address}
                    ethTokens={ethTokens}
                    solTokens={solTokens}
                    tronTokens={tronTokens}
                    loading={loading}
                />
            </div>
        </section>
    );
}