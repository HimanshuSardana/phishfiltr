"use client"
import { useEffect, useState } from "react"
import { FloatingLabelInput } from "@/components/floating-label-input"
import { Button } from "@/components/ui/button"
import CheckBreaches from "@/actions/breach_check"
import { toast } from "sonner"
import { useTransition } from "react"


export default function BreachCheckerPage() {
        const [startTransition, isPending] = useTransition()
        const [breached, setBreached] = useState(false)
        const [breaches, setBreaches] = useState(null)

        async function onSubmit(data: FormData) {
                const result = await CheckBreaches(data)
                console.log(result)
                if (result.success) {
                        setBreached(true)
                        setBreaches(result.sources)
                }
        }

        return (
                <>
                        <div className="flex justify-start xs:flex-col md:flex-row overflow-x-hidden -pr-2">
                                <div className="content ml-5 pr-[5%] mt-5 xs:w-full md:w-1/3">
                                        <h3 className="text-xl font-black">Breach Checker</h3>
                                        <form action={onSubmit}>
                                                <div className="flex flex-col gap-3 w-full mt-3">
                                                        <FloatingLabelInput name="email" label="Email" />
                                                        <Button className="font-bold">Check for Breaches</Button>
                                                </div>
                                        </form>
                                </div>

                                {breaches && (
                                        <div className="xs:px-5 mx-auto xs:w-full md:w-1/2 mt-5">
                                                <h3 className="font-bold text-xl">Your account appeared in {breaches.length} breaches</h3>
                                                <div className="flex flex-col flex-wrap">
                                                        {breaches.map((breach, index) => {
                                                                return (
                                                                        <div className="">
                                                                                <div className="flex gap-3">
                                                                                        <p className=" font-semibold">{breach.name}</p>
                                                                                        <p className="text-muted-foreground">Date: {breach.date ? breach.date : "Unknown"}</p>
                                                                                </div>
                                                                        </div>
                                                                )
                                                        })}
                                                </div>
                                        </div>
                                )}
                        </div>
                </>
        )
}
