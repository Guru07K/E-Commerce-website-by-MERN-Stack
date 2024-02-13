const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const productModel = require('./Schema/ProductSchema');
const UserModel = require('./Schema/UserSchema');
const dotenv = require('dotenv');
const connectDatabase = require('./config/databaseConnection');
const { userInfo } = require('os');


dotenv.config({path:path.join(__dirname,"config/dotenv.env")})

app.use(express.json());
app.use(cors())


// Database Connection with mongoDB 
connectDatabase();


// API Creation ------------->

app.get('/', (req, res)=>{
    res.send(`Express App is running`)
})



 
// >>>>>>>>>>>>>>>>>>>> Multer Upload image
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}` )
    }
})

const upload = multer({storage:storage})

// // Creating Uploade Endpoint for images...
app.use("/images",express.static('./upload/images'));
app.post("/upload",upload.single('product'),(req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})
//<<<<<<<<<<<<<<<<<<< Multer Upload image END



//>>>>>>>>>>>>>>>>>>>>  Add product Api  
app.post('/addproduct', async(req, res)=>{
    //  Find the last product in the database
    const lastProduct = await productModel.findOne().sort({ id: -1 });

    // Calculate the new ID
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const product = await productModel.create({id:newId, ...req.body});
    console.log(product);
    await product.save();
    console.log("Saved...");
    res.json({
        success:true,
        name:req.body.name,
        product
    })
})
//<<<<<<<<<<<<<<<<<<< Add product Api End



//>>>>>>>>>>>>>>>>>>>> Delete Product
app.post('/removeproduct', async(req, res)=>{
    // await productModel.findOneAndDelete({id:req.body.id});
    // res.json({
    //     success:true,
    //     name:req.body.name
    // })
    try {
        const productId = req.body.id; // No need to convert to ObjectId if it's a Number
        const existProduct = await productModel.findOneAndDelete({ id: productId }); //Delted product and store into existproduct variable
        if (!existProduct) {
            throw new Error("Product not found by this Id. Ensure the id is correct.");
        }   
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
      }
    res.json({
        success:true,
        message : "Item Removed successfully."
    })
})
//<<<<<<<<<<<<<<<<<<< Delete Product Api End



//>>>>>>>>>>>>>>>>>>>> Getting all Product
app.get('/allproducts', async(req, res)=>{
    let products = await productModel.find({});
    // console.log("All product fetched");
    res.send(products)   
})
//<<<<<<<<<<<<<<<<<<< Getting all Product Api End


//>>>>>>>>>>>>>>>>>>>> Register user
app.post('/signup', async(req, res)=>{
    let check = await UserModel.findOne({email:req.body.email});
    if(check){
      return res.status(400).json({success:false,errors:"Existing user found by this email"})
    }

    let cartData ={};
    for (let i = 0; i < 300+1; i++) {
        cartData[i] = 0;
    }

    const {name, email, password} = req.body ;
    const user = await UserModel.create({name, email, password ,cartData});

    await user.save();

    const data = {
        user: {
            id:user.id
        }
    }

    const token =jwt.sign(data,process.env.TOKEN_SECRET_KEY)
    res.json({success:true,token})
})
//<<<<<<<<<<<<<<<<<<<  Register user Api End


//>>>>>>>>>>>>>>>>>>>> Login user
app.post('/login', async(req,res)=>{
    let user = await UserModel.findOne({email:req.body.email}) 

    if(user){
        const passCompare = req.body.password === user.password ;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
        const token = jwt.sign(data,process.env.TOKEN_SECRET_KEY)
        res.send({success:true,token})   
        }else{
            res.json({
                success:false,
                errors:"wrong passwrod"
            })
        }
    }else{
        res.json({
            success:false,
            errors:"wrong email id"
        })
    }
})

app.get('/newcollections',async(req,res)=>{
    let products = await productModel.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection)
})

app.get(('/popularinwomen'),async(req,res)=>{
    let products = await productModel.find({category:"women"})
    let popular_in_women = products.slice(0,4)
    console.log("women fetched");
    res.send(popular_in_women)
})

// middleware
const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"Login to add to cart"})
    }else{
        try {
            const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
            req.user = data.user;
            next()
        } catch (error) {
            res.status(401).send({errors:"token not valid"})
        }
    }
}

app.post('/addtocart',fetchUser,async(req,res)=>{
    // console.log("Added",req.body.itemId);
    let userData = await UserModel.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await UserModel.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
})

app.post('/removefromcart',fetchUser,async(req,res)=>{
    // console.log("removed"+ "Id = "+ req.body.itemId);
    let userData = await UserModel.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1 ;
        await UserModel.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
        res.send("Removed")

})

// get card 
app.post('/getcart',fetchUser,async(req, res)=>{
     console.log("get Cart");
     let userData = await UserModel.findOne({_id:req.user.id});
     res.json(userData.cartData);
})


app.listen(process.env.PORT, (error)=>{
    if(!error){
        console.log(`Server listeninig to the port ${process.env.PORT}`);
    }else{
        console.log("Error: "+error);
    }
})