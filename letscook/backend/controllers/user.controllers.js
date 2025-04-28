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

export const createpost = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const userId = req.params.id;
    const postID = req.params.postId;

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
    const { data: userData, error: userDataError } = await supabaseAuth
      .from("profiles")
      .select("*")
      .eq("id", userId);
    const { dishName, difficulty, description } = req.body;
    const { data: postData, error: postError } = await supabaseAuth
      .from("posts")
      .insert({
        id: postID,
        user_id: userId,
        dish_name: dishName,
        difficulty: difficulty,
        description: description,
        username: userData[0].username,
        profile_url: userData[0].image_url,
      })
      .select()
      .single();

    if (postError || !postData) {
      console.error("Post creation error:", postError);
      return res.status(500).json({ error: "Post creation failed" });
    }
    // NEED TO SEE HOW TO GET IMAGES FROM BUCKETS
    // REFERENCE TEST ENDPOINT
    const { data, error } = await supabaseNoAuth.storage
      .from("postimages")
      .list(`posts/${userId}/${postID}`);

    if (error) {
      console.error("Failed to list images:", error);
      return res.status(500).json({ error: "Could not list images" });
    }

    const imageUrls = data.map((file) => {
      const { data: urlData } = supabaseNoAuth.storage
        .from("postimages")
        .getPublicUrl(`posts/${userId}/${postID}/${file.name}`);
      return urlData.publicUrl;
    });

    const {data: imageData, error: imageError} = await supabaseAuth
      .from("post_images")
      .insert(
        imageUrls.map((url) => ({
            post_id: postID,
            image_url: url,
          }))
      );

    res.status(201).send("Post created successfully");
  } catch (e) {
    console.error("Unexpected error:", e);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const getAllRecipes = async (req, res) => {
  console.log("getAllRecipes");
  const token = req.headers["authorization"]?.split(" ")[1];
  const supabaseAuth = await getClient(token);
  res.json({ message: "All recipes" });
  // TO DO:
  // CALL THE SUPABASE FUNCTION TO GET ALL RECIPES
  // KEEP TRACK OF THE USER ID SO WE KNOW WHO IS SUBMITTING TO WHAT POST ID
};
export const test = async (req, res) => {
  const userId = req.params.id;
  const postId = req.params.postId;

  const { data, error } = await supabaseNoAuth.storage
    .from("postimages")
    .list(`posts/${userId}/${postId}`);
    
  console.log(data);
  if (error) {
    console.error("Failed to list images:", error);
    return res.status(500).json({ error: "Could not list images" });
  }
  const imageUrls = data.map(file => {
    const { data: urlData } = supabaseNoAuth.storage
      .from("postimages")
      .getPublicUrl(`posts/${userId}/${postId}/${file.name}`);
    return urlData.publicUrl;
  });

  res.status(200).json({ imageUrls });
};
