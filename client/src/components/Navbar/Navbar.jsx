import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import logo from '../../JSPICS/logo.gif'
import { Button, Menu, MenuItem } from '@mui/material';
import { GoogleLogout } from 'react-google-login'
import { clientId } from '../constants/data'
import {useDispatch, useSelector} from 'react-redux'
import { authUser, cartQuant } from '../../actions/ActionIndex';
import { getCartItems} from '../../service/Api';

const Navbar = () => {
  const navigate = useNavigate();
  const cartcount = useSelector((state) => state.CartQuantity)
  const myStatecartQuantity = useSelector((state)=>state.CartQuantitystatechange)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch  = useDispatch();
  const myState =useSelector((state)=>state.AddUser);
  const onSignoutSuccess = () => {
    navigate('/login')
    console.clear();
    dispatch(authUser(''));

  };

  
  useEffect(() => {
    const total = async () => {
      const data = await getCartItems(`${myState.data.googleId}`);

      if(data){
        dispatch(cartQuant(data.length))
      }else{
        dispatch(cartQuant(0));
      }
     
    }
    total(); 
 
 
  },[myStatecartQuantity.data ,cartcount.data,dispatch,myState.data]);

  return (
    <>
      <div className='Navbar_div'>

        <Link to="/"><img src={logo} alt="" className='Navbar_logo' ></img></Link>

        <div >
          <NavLink to="/" className='Navbar_Navlinks_Div'>
            Home 
          </NavLink>
        </div>
        <div >
          <NavLink to="/cart" className='Navbar_Navlinks_Div'>
            Cart ({cartcount && cartcount.data})
        
          </NavLink>
        </div>
        <div style={{ display: 
          `${myState && myState.data && myState.data.email === 'sa873463@gmail.com' ? '' : 'none'}` }} >
          <NavLink to="/AddItem" className='Navbar_Navlinks_Div'>
            AddItem
          </NavLink>
        </div>
        <div className='Navbar_Navlinks_Menu'>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountBoxIcon style={{ color: 'white' }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {myState &&  myState.data ?<><NavLink to='/profile' className="AccountLinks"><MenuItem onClick={handleClose}>{myState.data.name}</MenuItem></NavLink>
            <NavLink to='/Profile' className="AccountLinks" ><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
            <NavLink to='/login' className="AccountLinks" >
              <MenuItem onClick={handleClose}>
            
            <GoogleLogout className="brand"  
              clientId={clientId}
              buttonText="Logout"
              style={{visibility:'hidden'}}
              onLogoutSuccess={onSignoutSuccess}
            ></GoogleLogout>
            
      
            </MenuItem></NavLink></>
            : 
            <NavLink to='/login' className="AccountLinks"><MenuItem style={{height:'10vh'}} onClick={handleClose}>Log in</MenuItem></NavLink>}

            
          </Menu>
        </div>

      </div>
    </>
  )
};

export default Navbar;
