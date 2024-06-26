import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'
import { update_product } from '../../redux/action/ProductAction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    color:"blue",
    marginTop: theme.spacing(10),
  },
}));

function UpdateProduct({ open, handleClose, handleAddProduct,productToUpdate }) {
  const dispatch=useDispatch()
  const classes = useStyles();
  const [id, setId] = useState(0);
  const [image_url,setImageUrl]=useState('')
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [price_promo, setprice_promo] = useState(0);
  const [Product_material, setProduct_material] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [category,setcategory]=useState("")
  useEffect(() => {
    if (productToUpdate) {
      setProductName(productToUpdate.product_name || '');
      setDescription(productToUpdate.description || '');
      setPrice(productToUpdate.price || 0);
      setQuantity(productToUpdate.quantity_in_stock || 0);
      setprice_promo(productToUpdate.price_promo || 0);
      setProduct_material(productToUpdate.Product_material || '');
      setcategory(productToUpdate.category || '');
      setId(productToUpdate.id || 0);
      setImageUrl(productToUpdate.image_url||'')
    }
  }, [productToUpdate]);
  const handleSubmit = async(event) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("file", productImage);
    formData.append("upload_preset", "HarmonyStore");
    if(productImage.name){
   await axios.post("https://api.cloudinary.com/v1_1/dij3lejgg/upload", formData)
    .then((res)=>{
      dispatch(update_product(id,{product_name:productName,
        description:description,
        price:price,
        quantity_in_stock:quantity,
        price_promo:price_promo,
        Product_material:Product_material,
        image_url:res.data.secure_url,
        category:category}))
    })
  
    handleClose();
}else{
    dispatch(update_product(id,{product_name:productName,
        description:description,
        price:price,
        quantity_in_stock:quantity,
        price_promo:price_promo,
        Product_material:Product_material,
        image_url:image_url,
        category:category}),handleClose())
}
  };

  return (
    <>
   <Modal open={open} onClose={handleClose}>
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Update Product
        </Typography>
      
          <TextField
            className={classes.input}
            required
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Origin Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Promo price"
            type="number"
            value={price_promo}
            onChange={(e) => setprice_promo(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            label="Product_material"
            value={Product_material}
            onChange={(e) => setProduct_material(e.target.value)}
          />
          <TextField
          type='file'
            className={classes.input}
            required
            // label="Product Image"
            // value={productImage}
            onChange={(e) => setProductImage(e.target.files[0])}
          />
         
            <TextField
            className={classes.input}
            required
            label="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
          <Button
          onClick={()=>handleSubmit()}
            className={classes.button}
            variant="contained"
            color="white"
            backgroundColor="blue"
            type="submit"
          >
            Update
          </Button>
      
      </div>
    </Modal>
    </>
  );
}

export default UpdateProduct;
