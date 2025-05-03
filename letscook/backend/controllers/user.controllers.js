import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const router = express.Router();
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

    const { data: imageData, error: imageError } = await supabaseAuth
      .from("post_images")
      .insert(
        imageUrls.map((url) => ({
          post_id: postID,
          image_url: url,
        }))
      );
    const { count, error: countError } = await supabaseAuth
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    if (!countError) {
      const { data: updating, error: updateError } = await supabaseAuth
        .from("viewableprofiles")
        .update({ created_recipes: count })
        .eq("id", userId);

      if (updateError) {
        console.error("Update error:", updateError);
      }
    } else {
      console.error("Count error:", countError);
    }

    res.status(201).send("Post created successfully");
  } catch (e) {
    console.error("Unexpected error:", e);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const getAllRecipes = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth.from("posts").select("*");
  if (error || !data) {
    return res.status(404).json({ error: "Profile not found" });
  }
  res.json(data);
};

export const getPostInfo = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const postId = req.params.postId;
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth
    .from("posts")
    .select("*")
    .eq("id", postId);
  if (error) return res.status(400).json({ error: error.message });
  const { data: imageData, error: errorData } = await supabaseAuth
    .from("post_images")
    .select("*")
    .eq("post_id", postId);
  if (errorData) return res.status(400).json({ error: error.message });
  const newObj = {
    ...data[0],
    images: imageData.map((image) => image.image_url),
  };
  res.status(200).json({ newObj });
};

export const submitRecipe = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const { description, difficulty, dish_name } = req.body;
  const submitters_user_id = req.params.id;
  const submissionId = req.params.submissionId;
  const postUserId = req.params.postUserId;
  const postId = req.params.postId;
  const { data: user, error: authError } = await supabaseNoAuth.auth.getUser(
    token
  );
  if (authError || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  if (user.user.id !== submitters_user_id) {
    return res
      .status(403)
      .json({ error: "Access denied: You can only access your own profile" });
  }
  const supabaseAuth = await getClient(token);

  const { data: userData, error: userDataError } = await supabaseAuth
    .from("profiles")
    .select("*")
    .eq("id", submitters_user_id);
  const { data: submissionData, error: submissionError } = await supabaseAuth
    .from("submissions")
    .insert({
      id: submissionId,
      submitted_by_id: submitters_user_id,
      submitted_by_username: userData[0].username,
      submitted_to_id: postUserId,
      dish_name: dish_name ? dish_name : "unknown",
      post_id: postId,
      description: description,
      difficulty: difficulty,
      submitted_by_profile_url: userData[0].image_url,
    })
    .select()
    .single();

  if (submissionError || !submissionData) {
    console.error("Post creation error:", submissionError);
    return res.status(500).json({ error: "Post creation failed" });
  }

  //herere
  const { data, error } = await supabaseNoAuth.storage
    .from("postimages")
    .list(`submissions/${submitters_user_id}/${postId}/${submissionId}`);

  if (error) {
    console.error("Failed to list images:", error);
    return res.status(500).json({ error: "Could not list images" });
  }

  const imageUrls = data.map((file) => {
    const { data: urlData } = supabaseNoAuth.storage
      .from("postimages")
      .getPublicUrl(
        `submissions/${submitters_user_id}/${postId}/${submissionId}/${file.name}`
      );
    return urlData.publicUrl;
  });
  const { data: imageData, error: imageError } = await supabaseAuth
    .from("submission_images")
    .insert(
      imageUrls.map((url) => ({
        submission_id: submissionId,
        image_url: url,
      }))
    );

  const { count, error: countError } = await supabaseAuth
    .from("submissions")
    .select("*", { count: "exact", head: true })
    .eq("submitted_by_id", submitters_user_id);
  if (!countError) {
    const { data: updating, error: updateError } = await supabaseAuth
      .from("viewableprofiles")
      .update({ meals_cooked: count })
      .eq("id", submitters_user_id);

    if (updateError) {
      console.error("Update error:", updateError);
    }
  } else {
    console.error("Count error:", countError);
  }
  res.status(200).send("Post created successfully");
};
export const submissions = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const id = req.params.id;
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth
    .from("submissions")
    .select("*")
    .eq("submitted_to_id", id)
    .eq("checked", false);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

export const getSubmissionInfo = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const submissionId = req.params.submissionId;
  const supabaseAuth = await getClient(token);
  const { data, error } = await supabaseAuth
    .from("submissions")
    .select("*")
    .eq("id", submissionId);

  if (error) return res.status(400).json({ error: error.message });

  const { data: imageData, error: errorData } = await supabaseAuth
    .from("submission_images")
    .select("*")
    .eq("submission_id", submissionId);
  const newObj = {
    ...data[0],
    images: imageData.map((image) => image.image_url),
  };
  if (errorData) return res.status(400).json({ error: error.message });

  res.status(200).json({ newObj });
};

export const approveSubmission = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const submissionId = req.params.id;
  const difficulty = req.body.difficulty;
  const supabaseAuth = await getClient(token);

  let points = 0;
  if (difficulty === "easy") points = 2;
  else if (difficulty === "medium") points = 5;
  else if (difficulty === "hard") points = 10;

  const { error: submissionErr } = await supabaseAdmin
    .from("submissions")
    .update({ checked: true })
    .eq("id", submissionId);

  if (submissionErr) {
    return res.status(400).json({ error: submissionErr.message });
  }
  const submittedById = req.body.submitted_by_id;
  const { data: submittedByUser, error: fetchSubmitterErr } = await supabaseAuth
    .from("viewableprofiles")
    .select("points")
    .eq("id", submittedById)
    .single();

  if (fetchSubmitterErr) {
    return res.status(400).json({ error: fetchSubmitterErr.message });
  }
  const newSubmitterPoints = (submittedByUser?.points || 0) + points;

  const { error: updateSubmitterErr } = await supabaseAdmin
    .from("viewableprofiles")
    .update({ points: newSubmitterPoints })
    .eq("id", submittedById);
  if (updateSubmitterErr) {
    return res.status(400).json({ error: updateSubmitterErr.message });
  }

  const submittedToId = req.body.submitted_to_id;
  const { data: submittedToUser, error: fetchReceiverErr } = await supabaseAuth
    .from("viewableprofiles")
    .select("points")
    .eq("id", submittedToId)
    .single();

  if (fetchReceiverErr) {
    return res.status(400).json({ error: fetchReceiverErr.message });
  }

  const newReceiverPoints = (submittedToUser?.points || 0) + points;

  const { error: updateReceiverErr } = await supabaseAuth
    .from("viewableprofiles")
    .update({ points: newReceiverPoints })
    .eq("id", submittedToId);

  if (updateReceiverErr) {
    return res.status(400).json({ error: updateReceiverErr.message });
  }

  res.status(200).send("Approved");
};


export const rejectSubmission = async (req, res) => {
  const submissionId = req.params.id;

  const { error: submissionErr } = await supabaseAdmin
    .from("submissions")
    .update({ checked: true })
    .eq("id", submissionId);

  if (submissionErr) {
    return res.status(400).json({ error: submissionErr.message });
  }

  res.status(200).send("Rejected");
}

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





















export const test = async (req, res) => {
  const submitters_user_id = req.params.id;
  const submissionId = req.params.submissionId;
  const postId = req.params.postId;

  const { data, error } = await supabaseNoAuth.storage
    .from("postimages")
    .list(`submissions/${submitters_user_id}/${postId}/${submissionId}`);

  if (error) {
    console.error("Failed to list images:", error);
    return res.status(500).json({ error: "Could not list images" });
  }

  const imageUrls = data.map((file) => {
    const { data: urlData } = supabaseNoAuth.storage
      .from("postimages")
      .getPublicUrl(
        `submissions/${submitters_user_id}/${postId}/${submissionId}/${file.name}`
      );
    return urlData.publicUrl;
  });

  // const { data: imageData, error: imageError } = await supabaseAuth
  //   .from("post_images")
  //   .insert(
  //     imageUrls.map((url) => ({
  //       post_id: postID,
  //       image_url: url,
  //     }))
  //   );

  res.status(200).json({ imageUrls });
};
