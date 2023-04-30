import { useState } from 'react'
import productOne from '../images/product1.gif'
import productTwo from '../images/product2.gif'
import ReactJson from 'react-json-view'
import WrapperBox from '../components/WrapperBox'
import { Container, Button, Typography, Box, Grid } from '@mui/material'
const RootComponent = (props) => {
  const [products, setProducts] = useState([
    { id: 'p1', title: 'Product 1', price: 1999 },
    { id: 'p2', title: 'Product 2', price: 999 }
  ])
  const [cart, setCart] = useState({
    products: [
      { id: 'p1', title: 'Product 1', price: 0, qty: 0 },
      { id: 'p2', title: 'Product 2', price: 0, qty: 0 }
    ],
    totalPrice: 0
  })
  // Event handler function for adding a product to the cart:
  const addProductToCart = (newProduct) => {
    const newProductList = cart.products.map((cartProduct) => {
      if (cartProduct.id === newProduct.id) { // find the product that matches the id of the new product
        cartProduct.qty += 1 // increment the product quantity
        cartProduct.price += newProduct.price // update the product price
      }
      return cartProduct
    })
    const newTotalPrice = cart.totalPrice + newProduct.price // add the new product price to the total cart price
    setCart({ products: newProductList, totalPrice: newTotalPrice }) // update the cart state with the new product and price
  }
  // Event handler function for removing a product from the cart:
  const removeProductFromCart = (removedProduct) => {
    let newTotalPrice = cart.totalPrice
    const newProductList = cart.products.map((cartProduct) => {
      if (cartProduct.id === removedProduct.id && cartProduct.qty > 0) { // find the product that matches the id of the removed product and if the quantity is greater than zero
        cartProduct.qty -= 1 // decrement the product quantity
        cartProduct.price -= removedProduct.price // subtract the removed product price from the product price
        newTotalPrice -= removedProduct.price // subtract the removed product price from the total cart price
      }
      return cartProduct
    })
    setCart({ products: newProductList, totalPrice: newTotalPrice }) // update the cart state with the new product and price
  }
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        RootComponent {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Box sx={{ textAlign: 'start' }}>
        <ReactJson
          name='state'
          src={{ products, cart }}
          collapsed
          theme='monokai'
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </Box>
      <Grid container spacing={2} p='1rem'>
        <Grid item sm={6}>
          <ProductPage
            products={products}
            addProduct={addProductToCart}
            removeProduct={removeProductFromCart}
          />
        </Grid>
        <Grid item sm={6}>
          <CartPage cart={cart} />
        </Grid>
      </Grid>
    </WrapperBox>
  )
}
const ProductPage = (props) => {
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        Product Page {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Grid container spacing={2} p='1rem'>
        <Grid item md={6}>
          <ProductOne
            product={props.products[0]}
            addProduct={props.addProduct}
            removeProduct={props.removeProduct}
          />
        </Grid>
        <Grid item md={6}>
          <ProductTwo
            product={props.products[1]}
            addProduct={props.addProduct}
            removeProduct={props.removeProduct}
          />
        </Grid>
      </Grid>
    </WrapperBox>
  )
}
const CartPage = (props) => {
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        Cart Page {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Grid container spacing={2} p='1rem'>
        <Grid item md={6}>
          <CartProductOne product={props.cart.products[0]} />
        </Grid>
        <Grid item md={6}>
          <CartProductTwo product={props.cart.products[1]} />
        </Grid>
        <Grid item md={12}>
          <Typography p='0.5rem' variant='h5'>
            Total Price: 💵 {props.cart.totalPrice}
          </Typography>
        </Grid>
      </Grid>
    </WrapperBox>
  )
}
const ProductOne = (props) => {
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        {props.product.title} {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Grid container justifyContent='center'>
        <Grid item xs={8}>
          <img src={productOne} alt='Product One' width='100%' />
          <Typography p='0.5rem' variant='h6' sx={{ color: 'success.main' }}>
            💵 {props.product.price}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant='success'
              size='sm'
              style={{ width: '5rem' }}
              onClick={() => props.addProduct(props.product)}
            >
              Add
            </Button>
            <Button
              variant='error'
              size='sm'
              style={{ width: '5rem' }}
              onClick={() => props.removeProduct(props.product)}
            >
              Remove
            </Button>
          </div>
        </Grid>
      </Grid>
    </WrapperBox>
  )
}
const ProductTwo = (props) => {
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        {props.product.title} {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Grid container justifyContent='center'>
        <Grid item xs={8}>
          <img src={productTwo} alt='Product Two' width='100%' />
          <Typography p='0.5rem' variant='h5' sx={{ color: 'success.main' }}>
            💵 {props.product.price}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant='success'
              size='sm'
              style={{ width: '5rem' }}
              onClick={() => props.addProduct(props.product)}
            >
              Add
            </Button>
            <Button
              variant='error'
              size='sm'
              style={{ width: '5rem' }}
              onClick={() => props.removeProduct(props.product)}
            >
              Remove
            </Button>
          </div>
        </Grid>
      </Grid>
    </WrapperBox>
  )
}
const CartProductOne = (props) => {
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        CartProduct 1 {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Box>
        <Typography p='0.5rem' variant='h6'>
          Quantity: {props.product.qty}
        </Typography>
        <Typography p='0.5rem' variant='h6'>
          Price: 💵 {props.product.price}
        </Typography>
      </Box>
    </WrapperBox>
  )
}
const CartProductTwo = (props) => {
  return (
    <WrapperBox>
      <Typography
        p='0.5rem'
        variant='h5'
        sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
      >
        CartProduct 2 {'({'}
        <Box component='span' sx={{ color: 'warning.main' }}>
          {Object.keys(props).join(', ')}
        </Box>
        {'})'}
      </Typography>
      <Box>
        <Typography p='0.5rem' variant='h6'>
          Quantity: {props.product.qty}
        </Typography>
        <Typography p='0.5rem' variant='h6'>
          Price: 💵 {props.product.price}
        </Typography>
      </Box>
    </WrapperBox>
  )
}
const PropDrillingFinal = () => {
  return (
    <Container>
      <br />
      <Typography p='0.5rem' variant='h6'>
        How to add products to the cart?
      </Typography>
      <br />
      <RootComponent />
    </Container>
  )
}
export default PropDrillingFinal
