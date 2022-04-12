import React from 'react';
import './HomePage.css'
import {useNavigate} from 'react-router-dom'
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
const ItemCard = ({ img, type, price ,id,color}) => {
  const navigate = useNavigate();
  const goToProduct=(id)=>{
     navigate(`/ItemPreview/${id}`)
  }
  

  return (
    
    <>
    <div className="ItemCard">
    <div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <img src={img} alt="Avatar" className='Itemcard_image'  />

      <div style={{fontWeight:'bold'}}>{type}</div>
      <div style={{marginBottom:'10px'}}>{color}</div>

   
      <div style={{fontWeight:'bold'}}>Rs.{price} </div>
    </div>
    <div className="flip-card-back"  >
      <ArrowCircleRightTwoToneIcon onClick={()=>goToProduct(id)}  style={{fontSize:'50px', cursor:'pointer',border:'none'}} />
    
    </div>
  </div>
</div>
    

    </div>




    </>
  );
};

export default ItemCard;
