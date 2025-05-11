import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const serviceRole = process.env.SERVICE_ROLE_KEY
const supabaseAdmin = createClient(supabaseUrl, serviceRole);
const supabaseNoAuth = createClient(supabaseUrl, supabaseAnonKey);

export const getClient = async (token) => {
  const supabaseWithAuth = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
  return supabaseWithAuth;
};

export const userProfile = async (req, res) => {
  const username = req.params.username;
  const { data, error } = await supabaseNoAuth
    .from("viewableprofiles")
    .select("*")
    .eq("username", username);
  if (error) return res.status(400).json({ error: error.message });
  const { data: rank, error: rankError } = await supabaseNoAuth.rpc(
    "get_user_rank",
    { user_id: data[0].id }
  );
  const userData = {
    username: username,
    points: data[0].points,
    meals_cooked: data[0].meals_cooked,
    created_recipes: data[0].created_recipes,
    rank: rank[0].rank,
    image_url: data[0].image_url,
  };
  res.json(userData);
};

export const userPrivate = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const userId = req.params.id;

  const { data: user, error: authError } = await supabaseNoAuth.auth.getUser(
    token
  );
  if (authError || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  if (user.user.id !== userId) {
    return res
      .status(403)
      .json({ error: "Access denied: You can only access your own profile" });
  }
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth
    .from("profiles")
    .select("*")
    .eq("id", userId);

  if (error || !data) {
    return res.status(404).json({ error: "Profile not found" });
  }
  res.json(data);
};

export const getStats = async (req, res) => {
  const userId = req.params.id;
  const { data, error } = await supabaseNoAuth
    .from("viewableprofiles")
    .select("*")
    .eq("id", userId);
  if (error) return res.status(400).json({ error: error.message });

  const { data: rank, error: rankError } = await supabaseNoAuth.rpc(
    "get_user_rank",
    { user_id: userId }
  );

  const userStats = {
    points: data[0].points,
    meals_cooked: data[0].meals_cooked,
    created_recipes: data[0].created_recipes,
    rank: rank[0].rank,
  };
  res.json(userStats);
};



export const userCreations = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const userId = req.params.id;
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth
    .from("posts")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
}

export const userSubmissions = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const userId = req.params.id;
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth
    .from("submissions")
    .select("*")
    .eq("submitted_by_id", userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};


export const getUsersByRank = async (req, res) => {
  const { data, error } = await supabaseNoAuth
    .from("viewableprofiles")
    .select("*");

  if (error) return res.status(400).json({ error: error.message });

  const sorted = [...data].sort((a, b) => b.points - a.points);

  const ranked = sorted.map((user, index) => ({
    username: user.username,
    points: user.points,
    meals_cooked: user.meals_cooked,
    created_recipes: user.created_recipes,
    rank: index + 1,
    image_url: user.image_url,
  }));

  res.json(ranked);

};