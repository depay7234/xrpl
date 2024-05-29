const User = require('../Model/userModels');
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.owneremailaddress,
    pass: process.env.owneremailaddresspasscode
  }
});

// Function to generate a 4-digit OTP
function generateOTP() {
  return new Promise((resolve, reject) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
    resolve(otp.toString());
  });
}


// Function to send OTP by email
async function sendOTPByEmail(email, otp) {
  try {
    const mailOptions = {
      from: process.env.owneremailaddress,
      to: email,
      subject: `${process.env.emailSubject}`,
      text: process.env.emailmessage + " " + otp
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.createUser = async (req, res) => {
  try {
    const otp = await generateOTP();
    const otpCreatedAt = new Date(); // Current timestamp

    req.body.otp = otp;
    req.body.otpCreatedAt = otpCreatedAt;

    const user = await User.create(req.body);
    await sendOTPByEmail(req.body.email, otp);
    console.log('OTP sent to:', req.body.email);
    res.json({ data: user, status: 'success', message: `${process.env.verifyOTPMessage}` });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateFields = req.body;

    // Remove fields that should not be updated
    delete updateFields.password;
    delete updateFields.passwordConfirm;
    delete updateFields.otp;
    delete updateFields.active;

    // Update user document
    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Run validators for updated fields
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


exports.CheckEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }); // Use findOne instead of find
    console.log(user)
    if (!user) {
      res.json({ proceed: true }); // User not found
    } else {
      res.json({ proceed: false }); // User found
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error occurred
  }
};




exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found", status:"error"});
    }

    // Check if OTP matches
    if (user.otp === otp) {
      const now = new Date();
      const otpExpirationTime = 3 * 60 * 1000; // 3 minutes
      const otpAge = now - user.otpCreatedAt;

      if (otpAge > otpExpirationTime) {
        return res.status(400).json({ message: "OTP has expired",status:"error" });
      }

      // Clear OTP after successful verification
      user.otp = null;
      user.otpCreatedAt = null;
      user.active = true; // Set active to true

      // Update user document
      await User.findByIdAndUpdate(user._id, user);

      return res.json({ message: "OTP verified successfully",status:"success" });
    } else {
      res.json({ message: "Invalid OTP",status:"error" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}