import React, { useEffect, useState } from 'react';

import { getItems } from '../../service/Api';
import './HomePage.css'
import ItemCard from './ItemCard';
import { Carousel } from 'react-bootstrap';
import shirt1 from '../../JSPICS/shirt1.jpg'

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Categories from './Categories';


const HomePage = () => {
    const [Itemdata, setItemdata] = useState([]);
    const [count, setcount] = useState(4);
    const [divvisibility, setdivvisibility] = useState('');
    const [divvisibility2, setdivvisibility2] = useState('none');


    useEffect(() => {

        const allItems = async () => {

            const data = await getItems();
            setItemdata(data);
        }
        const countData = () => {

            if (count >= Itemdata.length-1) {
                setdivvisibility('none')
            }
            else {
                setdivvisibility('')
            }
            if (count > 5) {
                setdivvisibility2('')

            } else {
                setdivvisibility2('none')
            }

        }

        allItems();

        countData();

    }, [Itemdata.length,count]);
    // window.onscroll = function () { scrollFunction() };
    // function scrollFunction() {

    //     if(window.scrollY>window.innerHeight-00){
    //         setcount(count+2);
    //     }
    //     if(window.scrollY<window.innerHeight-500){
    //         setcount(0);
    //     }
    // }
    return (
        <>

            <Carousel className="carousel" >


                <Carousel.Item interval={1000} className='Home_carousel'>
                    <div className='carousel_item_div'  >
                        <div className='carousel_image' style={{
                            backgroundImage: `url(${shirt1})`,
                            backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'
                        }}></div>
                        <div className='carousel_heading_home'>
                            <span style={{ fontWeight: 'bolder', fontSize: 'larger' }}>50% Off</span>
                            on men's lower</div>


                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000} className='Home_carousel'>
                    <div className='carousel_item_div'  >
                        <div className='carousel_image' style={{
                            backgroundImage: `url(${shirt1})`,
                            backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'
                        }}></div>
                        <div className='carousel_heading_home'>
                            <span style={{ fontWeight: 'bolder', fontSize: 'larger' }}>50% Off</span>
                            on men's lower</div>


                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000} className='Home_carousel'>
                    <div className='carousel_item_div'  >
                        <div className='carousel_image' style={{
                            backgroundImage: `url(${shirt1})`,
                            backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'
                        }}></div>
                        <div className='carousel_heading_home'>
                            <span style={{ fontWeight: 'bolder', fontSize: 'larger' }}>50% Off</span>
                            on men's lower</div>


                    </div>
                </Carousel.Item>




            </Carousel>
            <div className='heading_home'><div>Our All Best Deals</div></div>
            <Categories />
            <div className='Main_Div_Home'>
                <div className='Items_Div_Home'>
                    {Itemdata.length === 0 && "No items are added yet"}
                    {Itemdata && Itemdata.length > 0 && Itemdata.map((data, index) =>
                        <>

                            {index <= count &&
                                <div className='ItemCard_div'>
                                    <ItemCard type={data.type} img={data.images} id={data._id}
                                        color={data.color} fabric={data.fabric} price={data.price} quantity={data.quantity} />

                                </div>
                            }


                        </>
                    )}


                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: `${divvisibility}` }}><ArrowCircleDownIcon style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(count + 10)} /></div>


                    <div style={{ display: `${divvisibility2}` }}><ArrowCircleUpIcon style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(4)} /></div>
                </div>
            </div>


        </>)
};

export default HomePage;
