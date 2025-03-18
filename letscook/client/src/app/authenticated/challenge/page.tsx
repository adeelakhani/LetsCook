"use server"
import React from "react"
import DynamicTable from "@/components/ui/dynamicTable" 

const recipes = [
    { author: "Adeel Akhani", recipe: "sandwitch", difficulty: "Easy" },
    { author: "Xerxes Radon", recipe: "spinach", difficulty: "Easy" },
    { author: "Haris Khawja", recipe: "Hakka Chow Mein", difficulty: "Medium" },
    { author: "Sir Williams", recipe: "Clam Chowder", difficulty: "Hard" },
    { author: "ishowspeed", recipe: "Chicken Nuggets", difficulty: "Easy" },
    { author: "Abdullah Ali Liaqat", recipe: "Butter Chicken", difficulty: "Easy" },
    { author: "Kanye West", recipe: "Crispy Fried Chicken", difficulty: "Medium" },
    { author: "Gordon Ramsay", recipe: "Beef Wellington", difficulty: "Hard" },
    { author: "Jamie Oliver", recipe: "Pasta Carbonara", difficulty: "Medium" },
    { author: "Bobby Flay", recipe: "Grilled Steak", difficulty: "Easy" },
    { author: "Nigella Lawson", recipe: "Chocolate Cake", difficulty: "Medium" },
    { author: "Guy Fieri", recipe: "Mac & Cheese Burger", difficulty: "Hard" },
    { author: "Anthony Bourdain", recipe: "Pho Bo", difficulty: "Hard" },
    { author: "David Chang", recipe: "Ramen", difficulty: "Medium" },
    { author: "Martha Stewart", recipe: "Apple Pie", difficulty: "Medium" },
    { author: "Snoop Dogg", recipe: "Gin and Juice Chicken", difficulty: "Medium" },
    { author: "Dwayne 'The Rock' Johnson", recipe: "Cheat Meal Pancakes", difficulty: "Easy" },
    { author: "Remy the Rat", recipe: "Ratatouille", difficulty: "Hard" },
    { author: "Tasty Chef", recipe: "Garlic Butter Shrimp", difficulty: "Easy" },
    { author: "Selena Gomez", recipe: "Taco Night Special", difficulty: "Easy" },
    { author: "Elon Musk", recipe: "SpaceX Martian Protein Bar", difficulty: "Medium" },
    { author: "MrBeast", recipe: "Beast Burger", difficulty: "Medium" },
    { author: "Kevin Hart", recipe: "Spicy Wings", difficulty: "Easy" },
    { author: "Cristiano Ronaldo", recipe: "Portuguese Bacalhau", difficulty: "Hard" },
    { author: "Lionel Messi", recipe: "Argentinian Asado", difficulty: "Medium" },
    { author: "Taylor Swift", recipe: "Pumpkin Spice Latte", difficulty: "Easy" },
    { author: "Lebron James", recipe: "Superfood Smoothie", difficulty: "Easy" },
    { author: "Mark Zuckerberg", recipe: "Metaverse BBQ Ribs", difficulty: "Medium" },
    { author: "Jeff Bezos", recipe: "Amazonian Steak", difficulty: "Hard" }
]

export default async function Challenge() {
    return (
        <div className="py-5 bg-gray-100 flex-col justify-center content-center items-center mx-auto text-black">
            <h1 className="text-3xl font-bold mb-5 justify-center content-center text-center items-center mx-auto">Find a Challenge!</h1>
            <DynamicTable elements={recipes} />
        </div>
    )
}