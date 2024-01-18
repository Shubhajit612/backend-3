const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequalize = require('./util/database');
const app = express();

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem')


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('select * from products').then((result)=>{
//     console.log(result[0],result[1]);
// }).catch((error)=>{
//     console.log(error);
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{ //store user from request
    User.findByPk(1)
    .then(user=>{
        // console.log(user);
        req.user = user; // it is sequalize object from db
        next();
    })
    .catch(err => console.log(err));
})

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{as:'product',through: CartItem});
Cart.belongsToMany(Cart,{as:'cart',through: CartItem});

sequalize
// .sync({force:true})
.sync()
.then(result =>{
    // console.log(result);
    return User.findByPk(1)
    
    // app.listen(3000);
})
.then(user=>{ // dummy user 
    if(!user){
        return User.create({name:"Shubhajit",email:'Test@gmail.com'});
    }
    return user;
})
.then(user=>{
    // console.log(user);
    // return user.createCart();
    app.listen(3000);
})
.then(cart=>{
    // app.listen(3000);
})

.catch(err=>{
    console.log(err);
});

