// const jwt = require("jsonwebtoken");
// let User = require("../models/user");
// // let user = require("../models/user")


// const verifyToken = async (req, res, next) => {
//   // console.log("req.headers.authorization",req.headers.authorization);
//   console.log("Inside veryfy ");


//   // console.log("req.headers.authorization",req.headers.authorization.split(' ')[1]);
//   if (req.headers && req.headers.authorization) {//&& req.headers.authorization.split(' ')[0]==='JWT'
//     // const token = req.headers.authorization.split(" ")[1];
//     // await jwt.verify(token,process.env.API_SECRET,function(err,decode){//.split(' ')[1]
//     //     if(err) req.user =undefined;
//     //     console.log("DEcode",decode);
//     //     try{
//     //         const userData = User.findById(decode.id);
//     //         console.log("🚀 ~ file: authJWT.js:14 ~ awaitjwt.verify ~ userData:", userData)

//     //         req.user = userData;
//     //         // console.log("userData");
//     //             next();
//     //     }catch(err){
//     //         console.log("Error",err);
//     //         res.status(500)
//     //         .send({
//     //           message: err
//     //         });
//     //     }

//     // })
//     console.log("Inside veryfy 1");

//     try {
//       const token = req.headers.authorization.split(" ")[0];
//       console.log("🚀 ~ file: authJWT.js:37 ~ verifyToken ~ token:", token)

//       // jwt.verify(token, process.env.API_SECRET, async (err, decoded) => {
//       //   let id = decoded.id
//       //   console.log("Decoded==>>", decoded);
//       //   if (err) {
//       //     req.user = undefined;

//       //   } else {
//       //     try {
//       //       // user = User
//       //       // let userData = await User.findById(id);
//       //       // let userData = await User.find();//{ id: id }
//       //       console.log("userdata==>>", userData);
//       //       res.user = userData.user;
//       //     } catch (err) {
//       //       console.log("Error:", err);
//       //       return res.status(500).send({
//       //         message: err.message || "Failed to retrieve user data",

//       //       });
//       //     }
//       //   }
//       //   next();
//       // });
//       const jwtToken = jwt.verify(token, process.env.API_SECRET);
//       const id = jwtToken.id
//       console.log("🚀 ~ file: authJWT.js:64 ~ verifyToken ~ id:", id)
//       try {
//         // user = User
//         let userData = await User.findById(id);
//         // let userData = await User.find();//{ id: id }
//         console.log("userdata==>>", userData);
//         req.user = userData;

//         // return res
//       } catch (err) {
//         console.log("Error:", err);
//         return res.status(500).send({
//           message: err.message || "Failed to retrieve user data",

//         });
//       }
//       // console.log("🚀 ~ file: authJWT.js:63 ~ verifyToken ~ jwtToken:", jwtToken)

//     } catch (error) {
//       console.log("Error:", error);
//       return res.status(500).send({
//         message: error.message || "Failed to verify token",
//       });
//     }
//   } else {
//     req.user = undefined;
//     next();
//   }
//   next();

// }

// module.exports = verifyToken;

// // const jwt = require("jsonwebtoken");
// // const User = require("../models/user");

// // const verifyToken = async (req, res, next) => {
// //     console.log("inside veryfytoken===>>>",req.headers);
// //   if (req.headers && req.headers.authorization) {
// //     try {
// //       const token = req.headers.authorization.split(" ")[1];

// //       jwt.verify(token, process.env.API_SECRET, async (err, decoded) => {
// //         console.log("Decoded==>>",decoded);
// //         if (err) {
// //           req.user = undefined;

// //         } else {
// //           try {
// //             const userData = await User.findById(decoded.id);
// //             res.user = userData.user;
// //           } catch (err) {
// //             console.log("Error:", err);
// //             return res.status(500).send({
// //               message: err.message || "Failed to retrieve user data",
// //             });
// //           }
// //         }
// //         next();
// //       });
// //     } catch (error) {
// //       console.log("Error:", error);
// //       return res.status(500).send({
// //         message: error.message || "Failed to verify token",
// //       });
// //     }
// //   } else {
// //     req.user = undefined;
// //     next();
// //   }
// // };

// // module.exports = verifyToken;



const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  console.log("Inside verify");

  if (req.headers && req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[0];
      console.log("Token:", token);
      try {
        const jwtToken = jwt.verify(token, process.env.API_SECRET);
        const id = jwtToken.id;
        console.log("ID:", id);
        let userData = await User.findById(id);
        console.log("User data:", userData);
        res.user = userData;
      } catch (err) {
        console.log("Error:", err);
        return res.status(500).send({
          message: err.message || "Failed to retrieve user data",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).send({
        message: error.message || "Failed to verify token",
      });
    }
  } else {
    res.user = undefined;
  }

  next();
};

module.exports = verifyToken;
