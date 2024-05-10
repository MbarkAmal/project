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