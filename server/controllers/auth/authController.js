const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, termsAccepted } = req.body;

  try {
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      termsAccepted,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        role: "user",
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error for registration",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("loginuser in loginuser authcontroller", email, password);

  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bycrypt.compare(password, checkuser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: checkuser._id, role: checkuser.role,email: checkuser.email,name: checkuser.name },
      'client_secret_key',
      { expiresIn: "1h" },
    );


  res.cookie("token", token, {

    
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  }).status(200).json({
    success: true,
    message: "Login successful",
    user: {
      role: checkuser.role,
      id: checkuser._id,
      name: checkuser.name,
      email: checkuser.email,
    },
  });

  
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error for login",
    });
  }
};



const logoutUser=async(req,res)=>{
  try {
    res.clearCookie("token",).status(200).json({
      success: true,
      message: "Logout successful",
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error for logout",
    });
  }
};


const authMiddleware=async(req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    return res.status(401).json({
      success:false,
      message:"No token provided"
    })
  }

  try{
    const decoded=jwt.verify(token,'client_secret_key');
    req.user=decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


module.exports = { registerUser, loginUser, logoutUser,authMiddleware };
