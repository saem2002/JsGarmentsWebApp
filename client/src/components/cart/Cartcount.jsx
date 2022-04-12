import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItemToCart, DeleteCartItems, setstockincart } from '../../service/Api';
import { decreaseCartQuantity } from '../../service/Api';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Snackbar } from '@mui/material';
import { cartQuantChange } from '../../actions/ActionIndex';
import './Cart.css'

const Cartcount = ({ sub }) => {
  const dispatch = useDispatch();
  
  const myState = useSelector((state) => state.AddUser);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const changecartquant=()=>{
    dispatch(cartQuantChange());
}
const myStatecartQuantity = useSelector((state)=>state.CartQuantitystatechange)
  useEffect(() => {
    const check = async() => {
      if (sub.Quantity === 0) {
        await DeleteCartItems(myState.data.googleId, sub._id,changecartquant)
      }
    
    }
    // const checkstocks=()=>{
    //   setstockincart(myState.data.googleId,sub.productId)
    // }
    // checkstocks();
    check();
  });
  const check = () => {
    if (sub.Quantity >= sub.stock) {
      handleClick()
      return false;

    } else {
      return true;
    }
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%', backgroundColor: 'black', color: 'white' }}>
          You have reached maximum limit
        </Alert>
      </Snackbar>

 
      <Button onClick={() => {
        decreaseCartQuantity(sub, myState.data.googleId, sub.Quantity,changecartquant)

      }} className='incdecbutton_cart '><RemoveIcon /></Button>
      <div >{sub.Quantity}</div>
      <Button onClick={() => {
        check(sub) && addItemToCart(sub, myState.data.googleId, sub.Quantity,changecartquant,changecartquant)

      }} className='incdecbutton_cart '><AddIcon /></Button>


    </>
  )
};

export default Cartcount;
