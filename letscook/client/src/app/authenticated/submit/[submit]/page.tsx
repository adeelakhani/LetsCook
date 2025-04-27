"use server"

import SubmitSub from "@/components/ui/submitSub"
import AuthNav from "@/components/ui/authNav"

export default async function Submit() {
    return (
        <div>
            <AuthNav highlight="Challenges" />
            <SubmitSub/>
        </div>
    )
}