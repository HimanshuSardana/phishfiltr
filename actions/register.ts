'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { createClient } from "@/utils/supabase/server"
import RegistrationSchema from "@/schemas/RegistrationSchema"

export default async function register(data: FormData) {
        // Parse and validate data
        const validatedData = RegistrationSchema.safeParse(Object.fromEntries(data))

        if (!validatedData.success) {
                console.error("Invalid credentials")
                return { success: false, message: "Invalid credentials" }
        }

        // Destructure validated data
        const { email, name, password } = validatedData.data
        const supabase = await createClient()

        const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
        if (error) {
                console.error(error.message)
                return { success: false, message: error.message }
        }

        // Successful login: revalidate and redirect
        return { success: true, message: "Registration successful" }
        revalidatePath("/")
        redirect("/dashboard")
}

