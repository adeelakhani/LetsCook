"use client"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartConfig = {
    meals: {
      label: "Meals Cooked",
      color: "#ea580c",
    },
    recipes: {
      label: "Recipes Created",
      color: "#7f1d1d",
    },
  } satisfies ChartConfig

type ChartDataRow = {
    month: string,
    meals: number,
    recipes: number
}

type ChartData = {
    elements: ChartDataRow[]
}

export default function ProfileChart({ elements } : ChartData) {
    return (
        <CardContainer className="inter-var">
                <ChartContainer config={chartConfig} className="min-w-[50em]">
                <LineChart accessibilityLayer data={elements} className="border border-orange-700 rounded-xl bg-gray-50 p-5 pl-0">
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis/>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} className="text-lg" />
                    <Line             
                        type="monotone" 
                        dataKey="meals" 
                        stroke="var(--color-meals)" 
                        strokeWidth={4} 
                        dot={{ r: 4 }}  
                    />
                    <Line             
                        type="monotone" 
                        dataKey="recipes" 
                        stroke="var(--color-recipes)" 
                        strokeWidth={4} 
                        dot={{ r: 4 }}  
                    />
                </LineChart>
            </ChartContainer>
        </CardContainer>    
    )
}