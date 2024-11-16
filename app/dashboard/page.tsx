"use client"
import AnalyseMail from "@/actions/analyse_mail"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProtectedRoute from "@/components/auth/protected-route-wrapper"
import { FloatingLabelTextarea } from "@/components/floating-label-textarea"
import useCurrentUser from "@/hooks/useCurrentUser"
import logout from "@/actions/logout"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LoadingButton } from "@/components/ui/loading-button"
import { FloatingLabelInput } from "@/components/floating-label-input"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Textarea } from "@/components/ui/textarea"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"


export default function DashboardPage() {
        const [isPending, startTransition] = useTransition()
        const [analysis, setAnalysis] = useState(null)

        async function onSubmit(data: FormData) {
                startTransition(async () => {
                        try {
                                const result = await AnalyseMail(data)
                                setAnalysis(JSON.parse(result))
                                toast.success("Analysis complete!")

                                console.log(analysis)

                        }
                        catch (error) {
                                toast.error("An unknown error occured. Please try again later.")
                        }


                })
        }

        const pathname = usePathname()
        const { user, loading } = useCurrentUser()
        return (
                <>

                        <div className="content ml-5 pr-[5%] mt-5">
                                <div className="flex justify-start md:flex-row xs:flex-col">
                                        <div className="flex flex-col gap-3 mt-3 xs:w-full md:w-1/2">
                                                <h3 className="text-xl font-bold">Mail Analyzer</h3>
                                                <p className="xs:w-full md:w-1/2 text-muted-foreground">For the fastest and most convenient experience, try our <span className="cursor-pointer text-primary hover:underline">browser extension!</span> It lets you analyze emails directly from your inbox with just one click—no need to copy and paste details into the dashboard.</p>
                                                <form action={onSubmit}>
                                                        <div className="inputs xs:flex-col md:flex-col flex xs:w-full  gap-3">
                                                                <FloatingLabelInput name="from" label="From" className="xs:w-full md:w-1/2 " required type="email" />
                                                                <FloatingLabelInput name="subject" label="Subject" className="xs:w-full md:w-1/2 " required />
                                                                <FloatingLabelInput label="User Email" className="hidden" hidden name="userEmail" value={user?.email} />
                                                                <FloatingLabelTextarea name="emailBody" label="Email Body" rows={10} className="xs:w-full md:w-1/2" required />
                                                        </div>
                                                        <LoadingButton loading={isPending} type="submit" className="mt-5 xs:w-full md:w-1/2 font-bold">Analyze</LoadingButton>
                                                </form>
                                        </div>

                                        {analysis && (
                                                <div className="chart mt-5 font-black text-xl xs:w-full md:w-1/2">
                                                        <h3>Analysis Results</h3>
                                                        <p className="text-base text-muted-foreground">The email is <span className="text-primary">{analysis?.score}%</span> likely to be a phishing email.</p>

                                                        <div className="w-full px-3">
                                                                <h4 className="text-lg mt-5">Suspicious Points</h4>
                                                                <ul className="text-base list-disc list-outside text-muted-foreground">
                                                                        {analysis?.points.map((point) => (
                                                                                <li className="py-2">{point}</li>
                                                                        ))}
                                                                </ul>

                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </div>
                        <Button className="mx-5 mt-5" variant={"destructive"} onClick={() => logout()}>Sign Out</Button>

                </>
        )
}

