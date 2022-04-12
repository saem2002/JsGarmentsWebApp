import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
  type:{
    type:String,
    required:true,
  },
  price:{
    type:String,
    required:true
  },
  fabric:{
    type:String,
    required:true
  },
  stock:{
    type:String,
    required:true
  },
  color:{
    type:String,
    required:true
  },
  images: {
    type: String,
    required: true,
  },


},{timestamps:true})

ItemsSchema.methods.decreasestockquantity=async function(stock){
  try{
      this.stock = this.stock-stock;
      if(this.stock<0){
        return -1;
      }
      await this.save();
      return this.stock;

  }catch(error){
      console.log(error);
  }

}
const Item = mongoose.model('Item', ItemsSchema);

export default Item;