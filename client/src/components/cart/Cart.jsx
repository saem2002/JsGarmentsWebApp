import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAllCartItems, DeleteCartItems, getCartItems, payNow, SetStockOfProduct, totalamount } from '../../service/Api';
import './Cart.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



import CloseIcon from '@mui/icons-material/Close';
import Cartcount from './Cartcount';
import { Alert, Button, Skeleton } from '@mui/material';
import { cartQuantChange } from '../../actions/ActionIndex';

const Cart = () => {

  const myState = useSelector((state) => state.AddUser);
  const cartcount = useSelector((state) => state.CartQuantity)
  const [count, setcount] = useState(-1)
  const [count1, setcount1] = useState(-1)
  const myStatecartQuantity = useSelector((state)=>state.CartQuantitystatechange)
  const dispatch = useDispatch();
  const [cartItems, setcartItems] = useState("")
  const totalitems = (data) => {
    var element = 0;
    for (let index = 0; index < data.length; index++) {
      element += data[index].Quantity * data[index].price;

    }
    return element;
  }

  const changecartquant=()=>{
    dispatch(cartQuantChange());
}
  useEffect(() => {
    const allItems = async () => {
      const data = await getCartItems(`${myState.data.googleId}`);
      setcartItems(data);
      setcount(data.length);
    }
    const total = async () => {
      const data = await totalamount(`${myState.data.googleId}`);
      const ans = totalitems(data)
      setcount1(ans);
      
    }

    allItems();
    total();

  },[myStatecartQuantity.data,myState.data]);
  const [open, setopen] = useState(false);
  const [message, setmessage] = useState("");
  const opendescription=(desc)=>{
    setmessage(desc);
    setopen(true);
  }

  return (
    <>
      {open===true && 
      <Alert severity="success">{message}</Alert>
      }
      {count === -1 &&
        <Skeleton
          animation="wave"
          sx={{ bgcolor: 'grey.500' }}
          variant="rectangular"
          width={'100%'}
          height={'100vh'}
        />
      }

      {count === 0 && <>Add something in cart</>}
      {count !== -1 && count !== 0 &&
        <>
          <div className='heading_cart'><div>My cart</div></div>
          <div className='Main_cart_div'>

            <div className='left_div'>

              {cartItems &&
                cartItems.map((sub) => {
                  return (

                    <div className='Data_Cart'  >

                      <div className='cart_main_div'>
                        <div className='Mid_div_cart'>
                          <div style={{ width: '30%', height: '100%' }}>
                            <img src={sub.images} alt="LOADING" className='Cart_image' ></img>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '0 10%', width: '50%' }}>
                            <div style={{ fontSize: 'calc(1vw + 1vh )', fontWeight: 'bold', textTransform: 'capitalize' }}> {sub.type} </div>
                            <div style={{ fontSize: 'calc(1vw + 1vh )', fontWeight: 'bold', textTransform: 'capitalize' }}> {sub.color} </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(1vw + 1vh )', fontWeight: 'bold' }}>{sub.price}RS

                              <div><CloseIcon /></div>
                              <Cartcount sub={sub} />

                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div onClick={() => DeleteCartItems(myState.data.googleId, sub._id,changecartquant)}
                              style={{ fontSize: 'calc(1vw + 1vh )', cursor: 'pointer', textAlign: 'center', fontWeight: 'bolder' }}>
                              <DeleteOutlineIcon /> </div>

                            <div
                              style={{ fontSize: 'calc(1vw + 1vh )', textAlign: 'center', cursor: 'pointer', fontWeight: 'bolder' }}> {sub.Quantity * sub.price}RS </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  )
                })
              }
            </div>
            {count > 0 && <>
              <div className='rightDiv'>
                <div className='rightsubtotal'>
                  <p style={{ fontWeight: 'bolder' }} > Cash on delivelry available</p>
                  <p > Total amount : {count1}Rs</p>
                  <p>Total items : {cartcount.data} </p>
                  <p style={{ cursor: 'pointer' }}
                    onClick={() => DeleteAllCartItems(myState.data.googleId)}>Clear All cart</p>
                 
                  <Button  
                  variant="contained" color="success"
                  onClick={() =>{ payNow(count1, () => SetStockOfProduct(myState.data.googleId,changecartquant,opendescription), myState.data.googleId)}}>
                    Proceed payment</Button>

                </div>    </div></>}


          </div ></>}

    </>
  )
};

export default Cart;
