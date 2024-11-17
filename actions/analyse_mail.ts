"use server"
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { createClient } from '@/utils/supabase/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

const safetySettings = [
        {
                name: 'phishing',
                description: 'Detect phishing emails',
                enabled: true
        }
]

const schema = {
        description: 'Info about mail',
        type: SchemaType.OBJECT,
        properties: {
                score: {
                        type: SchemaType.NUMBER,
                        description: 'Chances of the email being a phishing email (100 being guaranteed phishing, 0 meaning guaranteed legitimate), do not being very pessimistic, there is a chance that the email is legitimate, If the email is not phishing, the score should be 0, all emails from innov8rs are legitimate',
                },
                points: {
                        type: SchemaType.ARRAY,
                        description: 'Points that make the email suspicious, be extremely verbose, citing specific parts of the email, there should be a maximum of 5 points',
                        items: {
                                type: SchemaType.STRING,
                        }
                }
        },
}

const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema,
        }
})

export default async function AnalyseMail(data: FormData) {
        const fromEmail = data.get("from")
        const subject = data.get("subject")
        const emailBody = data.get("emailBody")

        const userEmail = data.get("userEmail")

        // if fromEmail ends with @microsoft.com, @google.com, @reddit.com or @innov8rs.co, then it is a legitimate email
        if (fromEmail?.endsWith("@microsoft.com") || fromEmail?.endsWith("@google.com") || fromEmail?.endsWith("@reddit.com") || fromEmail?.endsWith("@innov9rs.co")) {
                return JSON.stringify({
                        score: 0,
                        points: []
                })
        }

        console.table({
                fromEmail,
                subject,
                emailBody
        })

        const prompt = `From: ${fromEmail}\nSubject: ${subject}\nBody: ${emailBody}`

        const result = await model.generateContent(prompt)
        const rawResult = await result.response.text()

        console.table(rawResult)

        const supabase = await createClient()
        const { error } = await supabase.from('mails').insert(
                {
                        from: fromEmail,
                        subject: subject,
                        body: emailBody?.slice(0, 100),
                        score: JSON.parse(rawResult).score,
                        email: userEmail
                }
        )

        if (error) console.error(error)


        return rawResult

}
