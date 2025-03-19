import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";


dotenv.config();
const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const thisUser = async (req, res) => {
    res.send({ message: "Hello I am Adeel" });
};

export const users = async (req, res) => {
    const { data, error } = await supabase
       .from("profiles")
       .select("*");
   if (error) return res.status(400).json({ error: error.message });
   res.json(data);
};