"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { TrendingUp, Calendar } from "lucide-react"

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
  month: string
  meals: number
  recipes: number
}

type ChartData = {
  elements: ChartDataRow[]
}

export default function ProfileChart({ elements }: ChartData) {
  const totalMeals = elements.reduce((sum, item) => sum + item.meals, 0)
  const totalRecipes = elements.reduce((sum, item) => sum + item.recipes, 0)
  const currentYear = new Date().getFullYear()

  return (
    <Card className="bg-white shadow-lg border border-orange-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold text-orange-800 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              Activity Overview
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {currentYear} Progress
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-orange-100 rounded-lg p-3 text-center">
            <p className="text-lg md:text-2xl font-bold text-orange-600">{totalMeals}</p>
            <p className="text-xs md:text-sm text-gray-600">Total Meals</p>
          </div>
          <div className="bg-orange-100 rounded-lg p-3 text-center">
            <p className="text-lg md:text-2xl font-bold text-orange-600">{totalRecipes}</p>
            <p className="text-xs md:text-sm text-gray-600">Total Recipes</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        {elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Activity Yet</h3>
            <p className="text-gray-500 text-sm">Start cooking to see your progress!</p>
          </div>
        ) : (
          <div className="w-full">
            <ChartContainer config={chartConfig} className="w-full h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elements} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    fontSize={12}
                  />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="meals"
                    stroke="var(--color-meals)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--color-meals)" }}
                    activeDot={{ r: 6, fill: "var(--color-meals)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="recipes"
                    stroke="var(--color-recipes)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--color-recipes)" }}
                    activeDot={{ r: 6, fill: "var(--color-recipes)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
