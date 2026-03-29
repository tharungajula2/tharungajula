"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    align?: "center" | "left";
}

export function SectionContainer({ children, className, id, align = "center" }: SectionContainerProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "w-full py-24 md:py-40 px-6 md:px-12 flex flex-col",
                align === "center" ? "items-center text-center" : "items-start text-left",
                // Mobile-first alignment: centered on desktop, but specific on mobile if requested
                className
            )}
        >
            <div className={cn(
                "container mx-auto max-w-5xl w-full",
                align === "center" ? "text-center md:text-center" : "text-left md:text-left"
            )}>

                {children}
            </div>
        </motion.section>
    );
}


