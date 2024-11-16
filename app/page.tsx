"use client"
import { Button } from "@/components/ui/button";
import LoginSchema from '@/schemas/LoginSchema'
import Link from "next/link";
import { ThemeToggleButton } from "@/components/theme-toggle";

export default function Home() {
        return (
                <>
                        <Navbar />
                        <Hero2 />
                </>
        );
}

export function Navbar() {
        return (
                <nav className="flex justify-between px-[10%] h-32 items-center">
                        <h3 className="nav-brand text-xl font-black">
                                Phish<span className="text-primary">Filtr</span>
                        </h3>
                        <div className="flex gap-3 items-center links">
                                <ThemeToggleButton />
                                <Button variant={"ghost"} className="font-bold text-primary hover:text-primary" asChild><Link href="/login">Get Started</Link></Button>
                        </div>
                </nav>
        )
}

export function Hero() {
        return (
                <main className="hero flex xs:flex-col md:flex-row xs:justify-center md:justify-around md:gap-0 xs:gap-5 xs:items-center md:px-0 xs:px-[10%] items-center xs:h-[calc(100vh-128px)] md:h-[calc(90vh-128px)]">
                        <div className="left flex flex-col xs:gap-7 md:gap-5 xs:w-full md:w-1/2">
                                <h3 className="font-black text-5xl">Here goes your <span className="text-primary font-black">amazing</span> headline.</h3>
                                <p className="text-muted-foreground font-bold xs:w-full md:w-2/3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis dolores autem temporibus sint soluta natus!</p>
                                <div className="button flex md:flex-row xs:flex-col gap-3">
                                        <Button className="font-bold">Primary CTA</Button>
                                        <Button variant={"ghost"} className="font-bold text-primary hover:text-primary">Secondary CTA</Button>
                                </div>
                        </div>

                        <div className="right">
                                <div className="box bg-primary/10 h-56 w-full p-5 md:block xs:hidden flex justify-center items-center text-primary font-bold">
                                        pretend this is an image :p
                                </div>
                        </div>
                </main>
        )
}

export function Hero2() {
        return (
                <main className=" w-full flex flex-col justify-center items-center h-[calc(90vh-128px)] gap-y-5">
                        <h3 className="font-bold text-5xl text-center md:px-0 xs:px-5">Phish<span className="text-primary">Filtr</span>: Your Email’s <span className="font-black text-">
                                First
                        </span> Line of Defense</h3>
                        <p className="text-muted-foreground font-bold w-2/3 text-center">Detect phishing and spam in seconds—stay safe, stay smart.</p>
                        <div className="button flex gap-3">
                                <Button className="font-bold">Get Started</Button>
                                <Button variant={"ghost"} className="font-bold text-primary hover:text-primary">Learn More</Button>
                        </div>
                </main>
        )
}
