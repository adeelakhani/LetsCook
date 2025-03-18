"use server"

import SubmitSub from "@/components/ui/submitSub"

const str = `Hakka Chow Mein is a stir-fried noodle dish popular in Indian-Chinese cuisine. It features wok-tossed noodles with vegetables, soy-based sauces, and sometimes protein like chicken, shrimp, or tofu. The dish is known for its bold umami flavors, slightly smoky aroma from high-heat cooking, and crispy yet chewy texture.

Ingredients: 
- 200g Hakka noodles (or thin wheat noodles)
- 2 tbsp oil (vegetable or sesame)
- 1 cup mixed vegetables (carrot, cabbage, bell peppers, beans)
- 1/2 cup protein (chicken, shrimp, tofu – optional)
- 3 cloves garlic (minced)
- 1-inch ginger (grated)
- 2 spring onions (chopped, white and green parts separated)
- 1 tbsp soy sauce
- 1 tbsp dark soy sauce (for color)
- 1 tsp vinegar (white or rice vinegar)
- 1/2 tsp chili sauce (adjust to taste)
- 1/2 tsp black pepper
- 1/2 tsp salt
- 1/2 tsp sugar (optional, balances flavors)

Recipe:
1. Boil the Noodles
   - Bring a pot of water to a rolling boil.  
   - Add Hakka noodles and cook according to package instructions (usually 3-4 minutes).  
   - Drain and rinse under cold water to prevent sticking. Toss with a little oil and set aside.

2. Prepare the Stir-Fry Base
   - Heat oil in a large wok or pan over high heat.  
   - Add minced garlic, grated ginger, and white parts of spring onions. Stir-fry for 30 seconds until fragrant.

3. Cook the Vegetables & Protein
   - Add chopped vegetables and stir-fry for 2-3 minutes on high heat until slightly tender but still crisp.  
   - If using protein, add it now and cook until done (chicken should turn golden, shrimp should be pink, tofu should be lightly browned).

4. Add Noodles & Sauces
   - Add the cooked noodles to the wok.  
   - Pour in soy sauce, dark soy sauce, vinegar, chili sauce, salt, sugar, and black pepper.  
   - Toss everything well using tongs or chopsticks to coat the noodles evenly. Stir-fry for another 2 minutes.

5. Final Touch & Serve
   - Sprinkle the green parts of spring onions on top.  
   - Give one last toss and remove from heat.  
   - Serve hot with extra chili sauce or vinegar on the side.`;


const submissionData = {
    author: "Haris Khawja",
    recipe: "Hakka Chow Mein",
    difficulty: "Hard",
    creation_date: new Date(2025, 2, 18),
    description: str
}

export default async function Submit() {
    return (
        <SubmitSub elements={submissionData}/>
    )
}