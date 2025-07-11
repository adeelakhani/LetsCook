"use server"

import SubmissionsTable from "@/components/ui/submissionsTable"
import AuthNav from "@/components/ui/authNav"
import { createClientForServer } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";
import axios from 'axios';

// const submissionz = [
//     { user: "Adeel Akhani", recipe: "sandwich", submission_time: new Date() },
//     { user: "Xerxes Radon", recipe: "spinach", submission_time: new Date() },
//     { user: "Haris Khawja", recipe: "Hakka Chow Mein", submission_time: new Date() },
//     { user: "Sir Williams", recipe: "Clam Chowder", submission_time: new Date() },
//     { user: "ishowspeed", recipe: "Chicken Nuggets", submission_time: new Date() },
//     { user: "Abdullah Ali Liaqat", recipe: "Butter Chicken", submission_time: new Date() },
//     { user: "Kanye West", recipe: "Crispy Fried Chicken", submission_time: new Date() },
//     { user: "Gordon Ramsay", recipe: "Beef Wellington", submission_time: new Date() },
//     { user: "Jamie Oliver", recipe: "Pasta Carbonara", submission_time: new Date() },
//     { user: "Bobby Flay", recipe: "Grilled Steak", submission_time: new Date() },
//     { user: "Nigella Lawson", recipe: "Chocolate Cake", submission_time: new Date() },
//     { user: "Guy Fieri", recipe: "Mac & Cheese Burger", submission_time: new Date() },
//     { user: "Anthony Bourdain", recipe: "Pho Bo", submission_time: new Date() },
//     { user: "David Chang", recipe: "Ramen", submission_time: new Date() },
//     { user: "Martha Stewart", recipe: "Apple Pie", submission_time: new Date() },
//     { user: "Snoop Dogg", recipe: "Gin and Juice Chicken", submission_time: new Date() },
//     { user: "Dwayne 'The Rock' Johnson", recipe: "Cheat Meal Pancakes", submission_time: new Date() },
//     { user: "Remy the Rat", recipe: "Ratatouille", submission_time: new Date() },
//     { user: "Tasty Chef", recipe: "Garlic Butter Shrimp", submission_time: new Date() },
//     { user: "Selena Gomez", recipe: "Taco Night Special", submission_time: new Date() },
//     { user: "Elon Musk", recipe: "SpaceX Martian Protein Bar", submission_time: new Date() },
//     { user: "MrBeast", recipe: "Beast Burger", submission_time: new Date() },
//     { user: "Kevin Hart", recipe: "Spicy Wings", submission_time: new Date() },
//     { user: "Cristiano Ronaldo", recipe: "Portuguese Bacalhau", submission_time: new Date() },
//     { user: "Lionel Messi", recipe: "Argentinian Asado", submission_time: new Date() },
//     { user: "Taylor Swift", recipe: "Pumpkin Spice Latte", submission_time: new Date() },
//     { user: "Lebron James", recipe: "Superfood Smoothie", submission_time: new Date() },
//     { user: "Mark Zuckerberg", recipe: "Metaverse BBQ Ribs", submission_time: new Date() },
//     { user: "Jeff Bezos", recipe: "Amazonian Steak", submission_time: new Date() },
//     { user: "Adeel Akhani", recipe: "sandwich", submission_time: new Date() },
//     { user: "Xerxes Radon", recipe: "spinach", submission_time: new Date() },
//     { user: "Haris Khawja", recipe: "Hakka Chow Mein", submission_time: new Date() },
//     { user: "Sir Williams", recipe: "Clam Chowder", submission_time: new Date() },
//     { user: "ishowspeed", recipe: "Chicken Nuggets", submission_time: new Date() },
//     { user: "Abdullah Ali Liaqat", recipe: "Butter Chicken", submission_time: new Date() },
//     { user: "Kanye West", recipe: "Crispy Fried Chicken", submission_time: new Date() },
//     { user: "Gordon Ramsay", recipe: "Beef Wellington", submission_time: new Date() },
//     { user: "Jamie Oliver", recipe: "Pasta Carbonara", submission_time: new Date() },
//     { user: "Bobby Flay", recipe: "Grilled Steak", submission_time: new Date() },
//     { user: "Nigella Lawson", recipe: "Chocolate Cake", submission_time: new Date() },
//     { user: "Guy Fieri", recipe: "Mac & Cheese Burger", submission_time: new Date() },
//     { user: "Anthony Bourdain", recipe: "Pho Bo", submission_time: new Date() },
//     { user: "David Chang", recipe: "Ramen", submission_time: new Date() },
//     { user: "Martha Stewart", recipe: "Apple Pie", submission_time: new Date() },
//     { user: "Snoop Dogg", recipe: "Gin and Juice Chicken", submission_time: new Date() },
//     { user: "Dwayne 'The Rock' Johnson", recipe: "Cheat Meal Pancakes", submission_time: new Date() },
//     { user: "Remy the Rat", recipe: "Ratatouille", submission_time: new Date() },
//     { user: "Tasty Chef", recipe: "Garlic Butter Shrimp", submission_time: new Date() },
//     { user: "Selena Gomez", recipe: "Taco Night Special", submission_time: new Date() },
//     { user: "Elon Musk", recipe: "SpaceX Martian Protein Bar", submission_time: new Date() },
//     { user: "MrBeast", recipe: "Beast Burger", submission_time: new Date() },
//     { user: "Kevin Hart", recipe: "Spicy Wings", submission_time: new Date() },
//     { user: "Cristiano Ronaldo", recipe: "Portuguese Bacalhau", submission_time: new Date() },
//     { user: "Lionel Messi", recipe: "Argentinian Asado", submission_time: new Date() },
//     { user: "Taylor Swift", recipe: "Pumpkin Spice Latte", submission_time: new Date() },
//     { user: "Lebron James", recipe: "Superfood Smoothie", submission_time: new Date() },
//     { user: "Mark Zuckerberg", recipe: "Metaverse BBQ Ribs", submission_time: new Date() },
//     { user: "Jeff Bezos", recipe: "Amazonian Steak", submission_time: new Date() },
//     { user: "Adeel Akhani", recipe: "sandwich", submission_time: new Date() },
//     { user: "Xerxes Radon", recipe: "spinach", submission_time: new Date() },
//     { user: "Haris Khawja", recipe: "Hakka Chow Mein", submission_time: new Date() },
//     { user: "Sir Williams", recipe: "Clam Chowder", submission_time: new Date() },
//     { user: "ishowspeed", recipe: "Chicken Nuggets", submission_time: new Date() },
//     { user: "Abdullah Ali Liaqat", recipe: "Butter Chicken", submission_time: new Date() },
//     { user: "Kanye West", recipe: "Crispy Fried Chicken", submission_time: new Date() },
//     { user: "Gordon Ramsay", recipe: "Beef Wellington", submission_time: new Date() },
//     { user: "Jamie Oliver", recipe: "Pasta Carbonara", submission_time: new Date() },
//     { user: "Bobby Flay", recipe: "Grilled Steak", submission_time: new Date() },
//     { user: "Nigella Lawson", recipe: "Chocolate Cake", submission_time: new Date() },
//     { user: "Guy Fieri", recipe: "Mac & Cheese Burger", submission_time: new Date() },
//     { user: "Anthony Bourdain", recipe: "Pho Bo", submission_time: new Date() },
//     { user: "David Chang", recipe: "Ramen", submission_time: new Date() },
//     { user: "Martha Stewart", recipe: "Apple Pie", submission_time: new Date() },
//     { user: "Snoop Dogg", recipe: "Gin and Juice Chicken", submission_time: new Date() },
//     { user: "Dwayne 'The Rock' Johnson", recipe: "Cheat Meal Pancakes", submission_time: new Date() },
//     { user: "Remy the Rat", recipe: "Ratatouille", submission_time: new Date() },
//     { user: "Tasty Chef", recipe: "Garlic Butter Shrimp", submission_time: new Date() },
//     { user: "Selena Gomez", recipe: "Taco Night Special", submission_time: new Date() },
//     { user: "Elon Musk", recipe: "SpaceX Martian Protein Bar", submission_time: new Date() },
//     { user: "MrBeast", recipe: "Beast Burger", submission_time: new Date() },
//     { user: "Kevin Hart", recipe: "Spicy Wings", submission_time: new Date() },
//     { user: "Cristiano Ronaldo", recipe: "Portuguese Bacalhau", submission_time: new Date() },
//     { user: "Lionel Messi", recipe: "Argentinian Asado", submission_time: new Date() },
//     { user: "Taylor Swift", recipe: "Pumpkin Spice Latte", submission_time: new Date() },
//     { user: "Lebron James", recipe: "Superfood Smoothie", submission_time: new Date() },
//     { user: "Mark Zuckerberg", recipe: "Metaverse BBQ Ribs", submission_time: new Date() },
//     { user: "Jeff Bezos", recipe: "Amazonian Steak", submission_time: new Date() },
//     { user: "Adeel Akhani", recipe: "sandwich", submission_time: new Date() },
//     { user: "Xerxes Radon", recipe: "spinach", submission_time: new Date() },
//     { user: "Haris Khawja", recipe: "Hakka Chow Mein", submission_time: new Date() },
//     { user: "Sir Williams", recipe: "Clam Chowder", submission_time: new Date() },
//     { user: "ishowspeed", recipe: "Chicken Nuggets", submission_time: new Date() },
//     { user: "Abdullah Ali Liaqat", recipe: "Butter Chicken", submission_time: new Date() },
//     { user: "Kanye West", recipe: "Crispy Fried Chicken", submission_time: new Date() },
//     { user: "Gordon Ramsay", recipe: "Beef Wellington", submission_time: new Date() },
//     { user: "Jamie Oliver", recipe: "Pasta Carbonara", submission_time: new Date() },
//     { user: "Bobby Flay", recipe: "Grilled Steak", submission_time: new Date() },
//     { user: "Nigella Lawson", recipe: "Chocolate Cake", submission_time: new Date() },
//     { user: "Guy Fieri", recipe: "Mac & Cheese Burger", submission_time: new Date() },
//     { user: "Anthony Bourdain", recipe: "Pho Bo", submission_time: new Date() },
//     { user: "David Chang", recipe: "Ramen", submission_time: new Date() },
//     { user: "Martha Stewart", recipe: "Apple Pie", submission_time: new Date() },
//     { user: "Snoop Dogg", recipe: "Gin and Juice Chicken", submission_time: new Date() },
//     { user: "Dwayne 'The Rock' Johnson", recipe: "Cheat Meal Pancakes", submission_time: new Date() },
//     { user: "Remy the Rat", recipe: "Ratatouille", submission_time: new Date() },
//     { user: "Tasty Chef", recipe: "Garlic Butter Shrimp", submission_time: new Date() },
//     { user: "Selena Gomez", recipe: "Taco Night Special", submission_time: new Date() },
//     { user: "Elon Musk", recipe: "SpaceX Martian Protein Bar", submission_time: new Date() },
//     { user: "MrBeast", recipe: "Beast Burger", submission_time: new Date() },
//     { user: "Kevin Hart", recipe: "Spicy Wings", submission_time: new Date() },
//     { user: "Cristiano Ronaldo", recipe: "Portuguese Bacalhau", submission_time: new Date() },
//     { user: "Lionel Messi", recipe: "Argentinian Asado", submission_time: new Date() },
//     { user: "Taylor Swift", recipe: "Pumpkin Spice Latte", submission_time: new Date() },
//     { user: "Lebron James", recipe: "Superfood Smoothie", submission_time: new Date() },
//     { user: "Mark Zuckerberg", recipe: "Metaverse BBQ Ribs", submission_time: new Date() },
//     { user: "Jeff Bezos", recipe: "Amazonian Steak", submission_time: new Date() }
// ]

export default async function Submissions() {
    const supabase = await createClientForServer();
      const { data, error } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
    
      if (error || !data?.user) {
        redirect("/login");
      }
      if (!session) {
        redirect("/login");
      }
      const token = session.access_token;
      const this_user_id = data.user.id;

      const submissions_ = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions/${this_user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
        if(submissions_.status !== 200) {
            console.log("Error fetching submissions");
            redirect("/login");
        }
        // console.log(submissions_.data);
    return (
        <div>
            <AuthNav highlight="Submissions" />
            <SubmissionsTable submissions={submissions_.data} description="Click on any submission to view details"/>
        </div>
    )
}