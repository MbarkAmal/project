const User = require ('../models/User') ;

const fs = require('fs');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


exports.logindash = async (req, res) => {
    try {
      const { username, password  } = req.body;
  
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
  
      // Check if user is admin
      if (!user.isAdmin) {
        return res.status(403).json({ error: "Access forbidden. Admin credentials required." });
      }
  
      // Decrypt stored password
      const bytes  = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      // Compare decrypted password with input password
      if (originalPassword !== password) {
        return res.status(401).json({ error: "Wrong credentials" });
      }
  
      // Generate JWT token
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
  
      // Send user object and token
      const { password: _, ...userData } = user._doc;
      res.status(200).json({ user: userData, accessToken });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //get photo admin 
  exports.userPhoto = async (req , res) =>{
    try {
        const user = await User.findById(req.params.id).select("photo_user");

        if (!user) {
            return res.status(404).send({success : false , message: "user not found"});
        }

        if (user.photo_user && user.photo_user.data) {
            res.set("Content-Type", user.photo_user.contentType);
            return res.status(200).send(user.photo_user.data);
        } else {
            return res.status(404).send({ success: false, message: "Photo not found for this user" });
        }
    }catch(error){
        console.error("Error while getting user photo:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }

};

// update admin detail 

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.fields;
    const photo_user = req.files.photo_user;

    const updateData = {
      username,
      email,
      password,
      role,
    };

    if (photo_user) {
      updateData.photo_user = {
        data: fs.readFileSync(photo_user.path),
        contentType: photo_user.type
      };
    }

    // Check if the role is being updated to "admin"
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If role is being updated, update isAdmin accordingly
    if (role && existingUser.role !== role.toLowerCase()) {
      updateData.isAdmin = role.toLowerCase() === "admin";
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

 /* exports.createphoto = async (req, res) => {
    try {
        if (!req.files || !req.files.photo_user) {
            return res.status(400).json({ message: 'Photo is required' });
        }

        const photoData = req.files.photo_user;

        // Create a new Photo instance and set its data and content type
        const newPhoto = new User({
            data: fs.readFileSync(photoData.path),
            contentType: photoData.type
        });

        // Save the new photo to the database
        await newPhoto.save();

        res.status(201).json(newPhoto); // Return the newly created photo
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

  */