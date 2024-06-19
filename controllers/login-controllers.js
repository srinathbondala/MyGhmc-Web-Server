
const jwt= require('jsonwebtoken');


const userlogin=async(req,res,next)=>{
    const{plotNo,contactNo}=req.body;
    console.log(plotNo,contactNo);
    let existingUser;
    try{
        existingProfile= await Profile.findOne({plot_no:plotno});
        console.log(1);
    } catch (err){
        return new Error(err);
        console.log(2);
    }
    if(!existingProfile)
    {
        console.log(3);
        return res.status(400).json({message:"User not found, Signup Please"}); 
    }
    const isPasswordCorrect= bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    {
        console.log(4);
        return res.status(400).json({message:'Invalid Email/Password'});
    }

    const token = jwt.sign({id: existingUser.id},process.env.JWT_SECRET_KEY,{
        expiresIn:"35s"
    });
    console.log("Generated Token\n", token);

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }
    res.cookie(String(existingUser._id),token,{
        path:"/",
        expires: new Date(Date.now() + (1000*30)),
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({message:"Succusefully loggen in",user:existingUser,token});
}


const adminlogin=async(req,res,next)=>{
    const{email,password}=req.body;
    console.log(email,password);
    let existingUser;
    try{
        existingUser= await User.findOne({email:email});
        console.log(1);
    } catch (err){
        return new Error(err);
        console.log(2);
    }
    if(!existingUser)
    {
        console.log(3);
        return res.status(400).json({message:"User not found, Signup Please"}); 
    }
    const isPasswordCorrect= bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    {
        console.log(4);
        return res.status(400).json({message:'Invalid Email/Password'});
    }

    const token = jwt.sign({id: existingUser.id},process.env.JWT_SECRET_KEY,{
        expiresIn:"35s"
    });
    console.log("Generated Token\n", token);

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }
    res.cookie(String(existingUser._id),token,{
        path:"/",
        expires: new Date(Date.now() + (1000*30)),
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({message:"Succusefully loggen in",user:existingUser,token});
}


const driverlogin=async(req,res,next)=>{
    const{email,password}=req.body;
    console.log(email,password);
    let existingUser;
    try{
        existingUser= await User.findOne({email:email});
        console.log(1);
    } catch (err){
        return new Error(err);
        console.log(2);
    }
    if(!existingUser)
    {
        console.log(3);
        return res.status(400).json({message:"User not found, Signup Please"}); 
    }
    const isPasswordCorrect= bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    {
        console.log(4);
        return res.status(400).json({message:'Invalid Email/Password'});
    }

    const token = jwt.sign({id: existingUser.id},process.env.JWT_SECRET_KEY,{
        expiresIn:"35s"
    });
    console.log("Generated Token\n", token);

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }
    res.cookie(String(existingUser._id),token,{
        path:"/",
        expires: new Date(Date.now() + (1000*30)),
        httpOnly: true,
        sameSite: "lax"
    });
    return res.status(200).json({message:"Succusefully loggen in",user:existingUser,token});
}
// const verifyToken=(req,res,next)=>{
//     const cookies = req.headers.cookie;
//     const token =cookies.split("=")[1];
// //     // const token = req.cookies[existingUser._id];
// //     // console.log(cookies);
// //     // const headers = req.headers['authorization'];
// //     // const token = headers.split(" ")[1];
//     if(!token)
//     {
//         res.status(404).json({message:"Token not found"})
//     }
//     jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>
//     {
//         if(err)
//         {
//             return res.status(400).json({message:"Invalid Token"})
//         }
//         console.log(user.id,user);
//         req.id=user.id;
//     })
//     next();
// };
// const verifyToken = (existingUser, req, res, next) => {
//     const cookies = req.headers.cookie;
//     const token =cookies.split("=")[1];
  
//     if (!token) {
//       return res.status(404).json({ message: "Token not found" });
//     }
  
//     jwt.verify(String(token), JWT_SECRET_KEY, (err,user) => {
//       if (err) {
//         return res.status(400).json({ message: "Invalid Token" });
//       }
  
//       req.id = user.id;
//       next();
//     });
//  };
  

// const getUser = async(req,res,next)=>{
//     const userId = req.id;
//     let user;
//     try{
//         user= await User.findById(userId,"-password");
//     } catch (err){
//         return new Error(err);
//     }
//     if(!user)
//     {
//         return res.status(404).json({message:"user not found"});
//     }

//     return res.status(200).json({user})
// };


const verifyToken = ( req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];

  if (!token) {
    return res.status(404).json({ message: "Token not found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    req.id = decodedToken.id;
    next();
  });
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return next(err); // Call next(err) to pass the error to the next error-handling middleware
  }
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.status(200).json({ user });
};
// const refreshToken=(req,res,next)=>
// {
//     const cookies=req.headers.cookie;
//     const prevToken=cookies.split("=")[1];
    
//     if(!prevToken)
//     {
//         return res.status(400).json({message:"Couldn't find token"})
//     }
//     jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
//         if(err){
//             console.log(err);
//             return res.status(403).json({message: 'Authentication failed'})
//         }
//         res.clearCookie(`${user.id}`);
//         req.cookies[`${user.id}`]=""; 

//         const token=jwt.sign({id:user.id},JWT_SECRET_KEY,{
//             expiresIn:"35s"
//         })
//         console.log("Regenerated Token\n",token);

//         res.cookie(String(existingUser._id),token,{
//             path:"/",
//             expires: new Date(Date.now() + (1000*30)),
//             httpOnly: true,
//             sameSite: "lax"
//         });
//         req.id=user.id
//         next();
//     })
// }


// exports.refreshToken=refreshToken;
// exports.getUser=getUser;
// exports.verifyToken=verifyToken;
// exports.login=login;
// exports.signup=signup;



const refreshToken = (req, res, next) => {
 
  const cookies=req.headers.cookie;
  const prevToken=cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed' });
    }

    res.clearCookie("token");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s"
    });

    console.log("Regenerated Token\n", token);

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + (1000 * 30)),
      httpOnly: true,
      sameSite: "lax"
    });

    req.id = user.id;
    next();
  });
};

exports.driverlogin=driverlogin;
exports.adminlogin= adminlogin;
exports.userlogin= userlogin;
exports.refreshToken = refreshToken;
exports.getUser = getUser;
exports.verifyToken = verifyToken;

