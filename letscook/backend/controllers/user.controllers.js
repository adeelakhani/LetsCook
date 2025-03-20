import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseNoAuth = createClient(supabaseUrl, supabaseAnonKey);


export const getClient = async (token) => {
    const supabaseWithAuth = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      );
      return supabaseWithAuth;
  };

export const userProfile = async (req, res) => {
const userId = req.params.id;
  const { data, error } = await supabaseNoAuth.from("viewableprofiles").select("*").eq("id", userId);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const userPrivate = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const userId = req.params.id;

  const { data: user, error: authError } = await supabaseNoAuth.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    if (user.user.id !== userId) {
      return res.status(403).json({ error: "Access denied: You can only access your own profile" });
    }
    const supabaseAuth = await getClient(token); 
    const { data, error } = await supabaseAuth
      .from("profiles")
      .select("*")
      .eq("id", userId)

    if (error || !data) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(data);
};
