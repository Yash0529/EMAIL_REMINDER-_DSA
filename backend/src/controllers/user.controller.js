import User  from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const createUser=async (req, res) => {
  try {
    const { email, password, userName } = req.body;

   
    if (!email || !password || !userName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(14);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      email,
      password:hashedPassword,
      userName,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error while creating user",
    });
  }
}

export const updateUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      });
    }

    // 🔐 Verify password (NOT updating it)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }


    const forbiddenFields = ["_id", "password", "__v"];

    
    const updates = {};
    for (const key in req.body) {
      if (!forbiddenFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided to update"
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      {email},
      { $set: updates },
      {
        new: true,        
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};