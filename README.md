# LetsCook

## Overview

LetsCook is a full-stack web application designed for cooking enthusiasts to share recipes, participate in cooking challenges, and compete on a community leaderboard. Users can publish their own recipes, attempt recipes shared by others, submit their creations for review, and earn points to climb the ranks. The platform aims to foster a vibrant community around the joy of cooking and friendly competition.

## Features

*   **User Authentication:** Secure sign-in with Google, managed by Supabase.
*   **Recipe Creation & Sharing:** Users can create and publish detailed recipes, including dish name, difficulty, description, and multiple images.
*   **Cooking Challenges:** Browse and participate in challenges posted by other users.
*   **Recipe Submissions:** Submit attempts for existing challenges, complete with descriptions and images of the resulting dish.
*   **Submission Review:** Recipe creators can review, approve, or reject submissions made for their challenges.
*   **Points & Leaderboard:** Earn points by creating recipes and having submissions approved. A global leaderboard ranks users based on their accumulated points.
*   **User Profiles:**
    *   Public profiles display username, points, total meals cooked, recipes created, rank, and profile image.
    *   Authenticated users can view their private profile with detailed stats, their created recipes, and past submissions.
*   **Image Management:** Seamless image uploads for recipes and submissions using Supabase Storage.
*   **Interactive UI:** Modern and responsive user interface built with Next.js, Tailwind CSS, and Shadcn/ui components, enhanced with animations.

## Tech Stack

### Backend

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database & Auth:** Supabase (PostgreSQL, Google OAuth 2.0 for Auth, Storage)
*   **Language:** JavaScript (ES Modules)
*   **Environment Variables:** `dotenv`
*   **API:** RESTful API for user, post, and submission management.

### Frontend

*   **Framework:** Next.js (v15.x) with Turbopack
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, CSS Modules
*   **UI Components:** Shadcn/ui, custom React components
*   **State Management & API Calls:** React Context/Hooks, Axios
*   **Animations:** Framer Motion
*   **Charting:** Recharts
*   **Client-side Supabase:** Supabase JS Client for auth and storage interactions.
