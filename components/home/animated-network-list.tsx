"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PostParams = {
    id: string;
    protocol?: string;
    tag: string;
    title: string;
    date: string;
};

export function AnimatedNetworkList({ posts }: { posts: PostParams[] }) {
    return (
        <div className="flex flex-col gap-3">
            {posts.map((post, i) => {
                const protocol = post.protocol || "1";
                const isProtocol0 = protocol === "0";
                const isProtocol1 = protocol === "1";
                const isProtocol2 = protocol === "2";
                const isProtocol3 = protocol === "3";

                return (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    >
                        <Link
                            href={`/notes/${post.id}`}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-3 px-4 rounded-md hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border",
                                    !isProtocol0 && !isProtocol1 && !isProtocol2 && !isProtocol3 && "border-primary/20 bg-primary/10 text-primary",
                                    isProtocol0 && "border-violet-500/20 bg-violet-500/10 text-violet-500",
                                    isProtocol1 && "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
                                    isProtocol2 && "border-orange-500/20 bg-orange-500/10 text-orange-500",
                                    isProtocol3 && "border-sky-500/20 bg-sky-500/10 text-sky-500"
                                )}>
                                    [{post.tag}]
                                </span>

                                <span className="font-heading text-zinc-300 group-hover:text-white transition-colors truncate max-w-[200px] md:max-w-md">
                                    {post.title}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mt-2 md:mt-0 opacity-50 md:opacity-100">
                                {/* Live Animated Dotted Line */}
                                <motion.span
                                    className="font-mono text-xs text-zinc-600 hidden md:inline-block tracking-[0.2em]"
                                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                >
                                    ....................
                                </motion.span>
                                <span className="font-mono text-xs text-zinc-500 w-24 text-right">
                                    {post.date}
                                </span>

                                {/* Live Animated Arrow */}
                                <motion.div
                                    animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                                >
                                    <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-primary transition-colors hidden md:block" />
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}

            {/* EMPTY STATE */}
            {posts.length === 0 && (
                <div className="py-8 text-center text-zinc-600 font-mono text-sm">
                    NO_RECENT_ACTIVITY_DETECTED
                </div>
            )}
        </div>
    );
}
