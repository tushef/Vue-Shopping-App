<template>
    <div>
        <div class="product">
          
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p> Price: {{ product.price }} $ </p>
            <!-- <p>Shipping: {{ shipping }}</p> -->
            <p>Category: {{ product.category }}</p>
            <p>Supplier: {{ product.supplier }}</p>
            <ul>
              <li v-for="detail in product.details" :key="detail">{{ detail }}</li>
            </ul>
  
            <div class="color-box"
                 v-for="(variant, index) in product.variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
            </div> 
  
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>
  
         </div> 
      
      </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    },
    data(){
        return{
            selectedVariant: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.product)
        },
        updateProduct(index) {  
            this.selectedVariant = index
        }
    },
    computed:{
        inStock(){
            if(this.product.variants[this.selectedVariant].variantQuantity > 0){
                return true;
            }
            return false;
        },
        title() {
            return this.product.brand + ' ' + this.product.name  
        },
          image(){
            return this.product.variants[this.selectedVariant].variantImage
        }
    }
}
</script>

<style scoped>
.product {
    background-color: rgb(255, 255, 255);
    display:flex;
    flex-flow: wrap;
    padding: 1rem;
    margin: 0 auto;
    width: 80%;
    height:500px;
    justify-content: center;
    box-shadow: .5px 1px 1.5px #d8d8d8;
    border-bottom:2px solid black;
    text-align: left;
  }

  img {
    border: 1px solid #d8d8d8;
    width: 70%;
    max-height: 420px;
    margin: 40px;
    box-shadow: 0px .5px 1px #d8d8d8;
  }
  
  .product-image {
    width: 80%;
  }
  
  .product-image,
  .product-info {
    margin-top: 10px;
    width: 50%;
  }
  
  .color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
  }
  
  /* .cart {
    margin-right: 25px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 5px 10px;
  } */
  
  button {
    margin-top: 30px;
    border: none;
    background-color: #1E95EA;
    color: white;
    height: 40px;
    width: 100px;
    font-size: 14px;
  } 
  
  .disabledButton {
    background-color: #d8d8d8;
  }
</style>
