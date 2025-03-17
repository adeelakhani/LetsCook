"use client"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import signOutFromGoogle  from "@/utils/supabase/signOutFromGoogle"

type Person = {
    username: string, 
    email: string, 
    points: number,
    meals_cooked: number,
    created_recipes: number,
    rank: number,
    profile_pic: string,
}

type ProfileCardProps = {
    user: Person
}

export default function ProfileCard({ user } : ProfileCardProps) {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-100 relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-orange-700">
                <Image 
                    src="/LetsCook.png?v=2" 
                    width={150}
                    height={150}
                    alt="LetsCook" 
                    className="absolute inset-0 z-0 rounded-lg opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                />
                
                <CardItem
                    translateZ="50"
                    className="flex"
                >
                    <Image
                        src={user.profile_pic}
                        width={75}
                        height={75}
                        alt="GoogleIcon"
                        className="border rounded-lg self-start"
                    />

                    <div className="flex-col ml-4">
                        <CardItem
                        translateZ="50"
                        className="text-4xl font-bold text-black dark:text-white"
                        >
                            {user.username}
                        </CardItem>

                        <CardItem
                        translateZ="50"
                        className="text-xl text-black dark:text-white"
                        >
                            {user.email}
                        </CardItem>
                    </div>

                    <div className="flex-col mx-auto ml-10">
                        <Image
                            src="/ChefHat.png"
                            width={60}
                            height={20}
                            alt="Chef Hat"
                            className="opacity-30"
                        />
                        <h1 className="text-center text-red-700 font-extrabold text-2xl">#245</h1>
                    </div>

                </CardItem>
                
                <CardItem
                    translateZ="60"
                    className="text-black font-bold w-full text-m mt-2 flex"
                    >
                    <p>
                        Points: {user.points}<br/>
                        Meals Cooked: {user.meals_cooked}<br/>
                        Created Recipes: {user.created_recipes}
                    </p>
                    <Button onClick={signOutFromGoogle} variant="default" className="ml-auto mt-auto w-[8em] bg-orange-800 font-bold">Sign Out</Button>

                </CardItem>
            </CardBody>
        </CardContainer>
    )
}
