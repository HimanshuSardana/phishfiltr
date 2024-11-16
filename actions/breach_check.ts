"use server"
export default async function CheckBreaches(data: FormData) {
        const email = data.get("email") as string;

        const res = await fetch(`https://leakcheck.io/api/public?check=${email}`);
        const result = await res.json();

        return result
}
