const verifyToken = require("../middlewares/authJWT.js");

const Post = require("../models/post");
let express = require("express"),
  router = express.Router(),
  { signup, signin } = require('../controllers/auth.controller.js')

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

})

router.post('/post', async (req, res) => {
  console.log('in post>>>>>>>>...');
  var name = req.body.name;

  var newPost = {
    name: name,
  };
  //Save to database
  const p = await Post.create(newPost);
  console.log("🚀 ~ file: user.js:25 ~ router.post ~ p:", p)
})

router.get('/post', async (req, res) => {
  console.log('in get post>>>>>>>>...', req.body.id);

  const p = await User.findById(req.body.id)
  console.log("🚀 ~ file: user.js:32 ~ router.get ~ p:", p)

})

router.get("/hiddencontent", verifyToken, function (req, res) {
  console.log("inside hiddencontent");
  // console.log("Req==>>",req.user.);
  // if(!user){
  //     res.status(403).send({
  //         message:"Invalid JWT token"
  //     })
  // }
  // if(req.user=="admin"){
  //     res.status(200).send({
  //         message:"Congratulations! but there is no hidden content"
  //     })
  // } else {
  //     res.status(403)
  //       .send({
  //         message: "Unauthorised access"
  //       });
  //   }
  // console.log('Req>>>', req);
  // console.log('Res>>>', res);
  res.send({
    message: "Suceess!",
    userData: res.user
  });
  // res.send({
  //   User: res.user,
  //   massage: "Suceess!"
  // })

  // const userData = User.findById(req.body.userId)
  // if(userData) {
  //     console.log("🚀 ~ file: user.js:35 ~ router.get ~ userData:", userData.schema)
  // } else {
  //     console.log('False>>>>>>>');
  // }

})

module.exports = router;