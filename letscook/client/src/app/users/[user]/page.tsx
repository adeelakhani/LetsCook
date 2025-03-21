"use server"
import React from "react"
import { notFound } from "next/navigation";

export default async function ProfilePage({ params } : any) {
    const { username } = params;

    if (false) {
        notFound();
    }
  
    return (
      <div>
        <h1>Profile Page of {username}</h1>
      </div>
    );
  }
  