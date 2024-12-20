"use client"
import { useEffect, useState, useTransition } from "react"
import useCurrentUser from "@/hooks/useCurrentUser"
import { createClient } from "@/utils/supabase/client"
import { Heading3, Loader2 } from "lucide-react"
import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
} from "@/components/ui/table"

export default function SecurityPage() {
        const { user, loading } = useCurrentUser()
        const userEmail = user?.email
        const [mails, setMails] = useState([])

        useEffect(() => {
                async function fetchMails() {
                        const supabase = await createClient()
                        const { data, error } = await supabase.from('mails').select('*')
                        console.log("Ran fetchMails")
                        setMails(data)
                        console.log(data)
                        if (error) console.error(error)
                }

                fetchMails()
        }, [])

        return (
                <div className="content ml-5 pr-[5%] mt-5">
                        {mails && (
                                <>
                                        {/*
                                        {mails.map((mail, index) => (
                                                <p>{mail?.from}</p>
                                        ))}
                                        */}

                                        <Table className="border border-1">
                                                <TableHeader>
                                                        <TableRow className="border border-1">
                                                                <TableHead>From</TableHead>
                                                                <TableHead>Subject</TableHead>
                                                                <TableHead>Body</TableHead>
                                                                <TableHead>Score</TableHead>
                                                                <TableHead>Verdict</TableHead>
                                                        </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                        {mails.map((mail, index) => (
                                                                <TableRow key={index}>
                                                                        <TableCell>{mail?.from}</TableCell>
                                                                        <TableCell>{mail?.subject}</TableCell>
                                                                        <TableCell>{mail?.body}...</TableCell>
                                                                        <TableCell>{mail?.score}%</TableCell>
                                                                        <TableCell><p className={mail?.score > 50 ? "text-red-500" : "text-green-500"}>{mail?.score > 50 ? "Phishing" : "Legitimate"}</p></TableCell>
                                                                </TableRow>
                                                        ))}
                                                </TableBody>

                                        </Table>
                                </>
                        )}
                        {mails.length == 0 && (
                                <div className='w-full h-full flex mt-5 justify-center items-center'><Loader2 size="30" className='animate-spin text-muted-foreground' /></div>
                        )}

                </div>
        )
}
