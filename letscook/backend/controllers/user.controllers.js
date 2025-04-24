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
    const { dishName, difficulty, description } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }
    if (images.length > 10) {
      return res.status(400).json({ error: "Maximum of 10 images allowed" });
    }
    const { data: userData, error: userDataError } = await supabaseAuth
      .from("profiles")
      .select("*")
      .eq("id", userId);
    // console.log(userId, dishName, difficulty, description);
    // console.log(userData[0].username);
    // Insert post
    const { data: postData, error: postError } = await supabaseAuth
      .from("posts")
      .insert({
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
    const imageUrls = [];

    for (const file of images) {
      const fileExt = file.originalname.split(".").pop();
      const fileName = `${userId}/recipe_${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } =
        await supabaseAuth.storage
          .from("postimages")
          .upload(fileName, file.buffer, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.mimetype,
          });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return res
          .status(500)
          .json({ error: `Image upload failed: ${uploadError.message}` });
      }

      // Get public URL
      const urlData = supabaseAuth.storage
        .from("postimages")
        .getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      // Insert into post_images table
      const { data: imageRecord, error: imageError } = await supabaseAuth
        .from("post_images")
        .insert({
          post_id: postData.id,
          image_url: publicUrl,
        })
        .select()
        .single();

      if (imageError) {
        console.error("Image record creation error:", imageError);
        return res.status(500).json({ error: "Image record creation failed" });
      }

      imageUrls.push(imageRecord);
    }

    res.json({ post: postData, images: imageUrls });
  } catch (e) {
    console.error("Unexpected error:", e);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
