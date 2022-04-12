import express from 'express';

import { addUser, getUsers } from '../controller/userController.js';

import cloudinary from 'cloudinary';
import { addItems, getItemPreview, getItems,DeleteProduct } from '../controller/ItemController.js';
import { addtocart, DeleteAllCartItems, DeleteCartItems, getCartItems,decreaseCartQuantity,
     totalamount ,SetStockOfProduct} from '../controller/CartController.js';

cloudinary.config({
    cloud_name:'saemarora',
    api_key:'811255976848432',
    api_secret:'CoB1cMxfKj59FjfqiBPeGqll0q4'
})


const route = express.Router();


route.post('/add', addUser);

route.get('/users', getUsers);
route.post('/Items', addItems);
route.get('/getallItems', getItems);
route.get('/DeleteProduct/:id', DeleteProduct);
route.get('/getItemPreview/:id', getItemPreview);
route.post('/addtocart/:id', addtocart);
route.get('/totalamount/:id', totalamount);
route.post('/decreaseCartQuantity/:id', decreaseCartQuantity);
route.get('/getCartItems/:id', getCartItems);
route.get('/DeleteCartItems/:id/:subid', DeleteCartItems);
route.get('/DeleteAllCartItems/:id', DeleteAllCartItems);
route.get('/setstock/:id', SetStockOfProduct);






export default route;