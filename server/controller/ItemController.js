import Items from "../modal/Items.js"
import cloudinary from 'cloudinary';
import cart from "../modal/Cart.js";



export const addItems = async (request, response) => {
    const file = request.files.Image;

    let alreadyexist = await Items.findOne({

        type: request.body.type,
        price: request.body.price,
        fabric: request.body.fabric,
        stock: request.body.stock,
        color: request.body.color
    })
    if (alreadyexist) {
        response.status(201).json("already added");
        return;
    }
    cloudinary.v2.uploader.upload(file.tempFilePath,  (err, result) => {



        const product = new Items({
            images: result.url,
            type: request.body.type,
            price: request.body.price,
            fabric: request.body.fabric,
            stock: request.body.stock,
            color: request.body.color
        });
         product.save();

        response.status(200).json("added");
    })

}
export const getItems = async (request, response) => {
    try {
        const items = await Items.find({});
        response.status(200).json(items);
    } catch (error) {
        response.status(500).json(error);
    }
}
export const getItemPreview = async (request, response) => {
    try {
        const data = request.params.id;
        const items = await Items.find({ _id: data });
        response.status(200).json(items);
    } catch (error) {
        response.status(500).json(error);
    }
}
export const DeleteProduct = async (request, response) => {
    try {
        const data = request.params.id;
        const deleteitem = await Items.deleteMany({ _id: data });
        await cart.findOneAndDelete({ productId: data })
        response.status(200).json(deleteitem);
    } catch (error) {
        response.status(500).json(error);
    }
}