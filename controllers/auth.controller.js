let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let User = require("../models/user");

exports.signup = async (req, res) => {
  console.log("User module==>>>", User);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  console.log("User===>>>", user);
  try {
    const userData = await user.save().then((result) => {
      console.log("Result", result);
    }).catch((err) => {
      console.log("Error", err);
    });
    res.send({
      message: "Data stored successsfully",
      userData: userData
    });
    console.log("Users Data", userData);

  } catch (err) {
    console.log("Error", err);
  }

};

exports.signin = async (req, res) => {
  console.log("Req==>>", req.body);
  try {
    const user = await User.findOne({
      email: req.body.email
    })
    console.log("🚀 ~ file: auth.controller.js:34 ~ user:", user)
    if (!user.password) {
      return res.status(404)
        .send({
          message: "User Not found."
        });
    }
    console.log("User Pass", user.password);
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    console.log("🚀 ~ file: auth.controller.js:43 ~ passwordIsValid:", passwordIsValid)

    if (!passwordIsValid) {
      return res.status(401)
        .send({
          accessToken: null,
          message: "Invalid Password!"
        });
    }
    let token = jwt.sign({
      id: user.id
    }, process.env.API_SECRET, {
      expiresIn: 86400
    })
    console.log("🚀 ~ file: auth.controller.js:56 ~ token:", token)

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login successfull",
      accessToken: token,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500)
      .send({
        message: err
      });
  }
  // User.findOne({
  //     email:req.body.email
  // }).exec((err,user)=>{
  //     if (err) {
  //         res.status(500)
  //           .send({
  //             message: err
  //           });
  //         return;
  //       }
  //       if (!user) {
  //         return res.status(404)
  //           .send({
  //             message: "User Not found."
  //           });
  //       }

  //       let passwordIsValid = bcrypt.compareSync(req.body.password,user.password)

  //       if(!passwordIsValid){
  //         return res.status(401)
  //       .send({
  //         accessToken: null,
  //         message: "Invalid Password!"
  //       });
  //       }
  //       let token = jwt.sign({
  //         id:user.id
  //       },process.env.API_SECRET,{
  //         expiresIn:86400
  //       })

  //       res.status(200).send({
  //         user:{
  //             id:user._id,
  //             email:user.email,
  //             fullName:user.fullName,
  //         },
  //         message:"Login successfull",
  //         accessToken:token,
  //       });
  // })
}