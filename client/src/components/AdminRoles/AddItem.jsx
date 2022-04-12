
import { Button, CircularProgress, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import React, { useEffect, useState } from 'react';
import { addItems, getItems } from '../../service/Api';
import './AddItem.css'
import AdminItemcard from './AdminItemcard';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import { useDispatch, useSelector } from 'react-redux';
import { cartQuantChange } from '../../actions/ActionIndex';

const AddItem = () => {
    const [open, setOpen] = React.useState(false);
    const [waitforres, setwaitforres] = useState('');
    const [waitforrespro, setwaitforrespro] = useState('none');
    const myStatecartQuantity = useSelector((state) => state.CartQuantitystatechange);
    const dispatch = useDispatch();
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>

            You have already added this item in store.
            <Button color="secondary" size="small" onClick={handleClose}>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"

                ><LocalMallIcon />


                </IconButton>
                <CloseIcon fontSize="small" />
            </Button>



        </React.Fragment>
    );
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({
        type: "",
        price: "",
        fabric: "",
        stock: "",
        color: ""
    });
    const waitfunc = () => {
        setwaitforres('')
        setwaitforrespro('none')
    }
    const changecartquant = () => {
        dispatch(cartQuantChange());
    }
    const postDetails = (e) => {

        e.preventDefault();
        setwaitforres('none')
        setwaitforrespro('')
        const data = new FormData();
        data.append('Image', images);
        data.append('type', product.type);
        data.append('price', product.price);
        data.append('fabric', product.fabric);
        data.append('stock', product.stock);
        data.append('color', product.color);
        addItems(data, handleClick, waitfunc, changecartquant);

    }
    let Name, value
    const handlechange = (e) => {
        Name = e.target.name;
        value = e.target.value;
        setProduct({ ...product, [Name]: value })

    }
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

            if (count >= Itemdata.length - 1) {
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
    }, [Itemdata.length, count, myStatecartQuantity.data]);

    return (
        <>

            <div className='AddItem_main_div'>
                <Snackbar style={{ zIndex: '9999' }} open={open} autoHideDuration={5000} onClose={handleClose} action={action} />
                <form onSubmit={postDetails}>
                    <div className='Form_item_div'>


                        <div> <input name="type" type="text" value={product.type} placeholder='type' onChange={handlechange} ></input></div>
                        <div> <input name="price" type="text" value={product.price} placeholder='price' onChange={handlechange} ></input></div>
                        <div> <input name="fabric" type="text" value={product.fabric} placeholder='fabric' onChange={handlechange} ></input></div>
                        <div> <input name="stock" type="text" value={product.stock} placeholder='In stock' onChange={handlechange} ></input></div>
                        <div> <input name="color" type="text" value={product.color} placeholder='color' onChange={handlechange} ></input></div>
                        <div> <input name="Image" type="file" onChange={(e) => setImages(e.target.files[0])}></input></div>
                        <div> <button type='submit' style={{ display: `${waitforres}` }}>submit</button></div>
                        <div><CircularProgress color="inherit" style={{ display: `${waitforrespro}` }} /></div>
                    </div>

                </form>

                <div className='Main_Div_Home'>
                    <div className='Items_Div_Home'>
                        {Itemdata.length === 0 && "No items are added yet"}
                        {Itemdata && Itemdata.map((data, index) =>
                            <>

                                {index <= count &&
                                    <div className='ItemCard_div'>
                                        <AdminItemcard type={data.type} img={data.images} id={data._id}
                                            fabric={data.fabric} price={data.price} quantity={data.quantity} color={data.color} changecartquant={changecartquant} />

                                    </div>
                                }


                            </>
                        )}


                    </div>
                    <div style={{ display: `${divvisibility}` }}><ArrowCircleDown style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(count + 10)} /></div>


                    <div style={{ display: `${divvisibility2}` }}><ArrowCircleUp style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(4)} /></div>
                </div>
            </div>



        </>
    )
};

export default AddItem;
