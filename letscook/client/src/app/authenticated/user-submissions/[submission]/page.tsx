"use server"

import AuthNav from "@/components/ui/authNav"
import UserSubmitSub from "@/components/ui/userSubmitSub"

export default async function Submit() {
    return (
        <div>
            <AuthNav highlight="Submissions" />
            <UserSubmitSub />
        </div>
    )
}