<template>
    <div id="product-card">
        <div id="product-info">
            <div class="product-image">
                <img :src="image" id="img"/>
            </div>
            <div class="product">
                <h3>{{ title }} </h3>
                <p>{{ product.category }} </p>
                <p>{{ product.supplier }} </p>
                <a id="btn-4-green" @click="addThis()">ADD</a>
                <a id="btn-4" @click="deleteThis()">DELETE</a>        
            </div>
        </div>
        <div id="price-table">
            <div id="price">
                <div id="val">
                    <h3>Price</h3>
                    <div id="info-box">
                        <span>{{product.price}}$</span>
                    </div>
                </div>
            </div>
            <div id="quantity">
                <div id="val">
                    <h3>Quantity</h3>
                        <div id="info-box">
                            <span>{{ product.quantity }}</span>
                        </div>
                    </div>
                </div>
            <div id="total">
                <div id="val">
                    <h3>Total</h3>
                    <div id="info-box">
                        <span>{{total}}$</span> 
                    </div>
                </div>
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
        deleteThis(){
            this.$store.dispatch('deleteProductInCart', this.product)
        },
        addThis(){
            this.$store.dispatch('addToCart', this.product)
        }
    },
    computed:{
        title() {
            return this.product.brand + ' ' + this.product.name  
        },
        image(){
            return this.product.variants[this.selectedVariant].variantImage
        },
        total(){
            return this.product.price*this.product.quantity
        }
    }
}
</script>

<style>
    /* product-Card */
    #product-card{
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height:250px;
        box-shadow: 0px 2px 5px #aaaaaa;
        width:95%;
    }
    #product-info{
        display:flex;
        justify-content: wrap;
        flex-basis: 60%;
        height: 250px;
    }
    .product{
        width: 60%;
    }
    .product-image{
        width: 60%;
        height: 250px;
        float: left;
    }
    #img{
        border: 1px solid #d8d8d8;
        width: 70%;
        height:230px;
        float: left;
        margin: 10px;
        box-shadow: 0px .5px 1px #d8d8d8;
    }
    /* Price-Table */
    #price-table{
        display: table;
        width: 50%;
        height: 250px;
    }
    #price{
        display: table-cell;
        height:250px;
    }
    #quantity{
        display: table-cell;
        height: 250px;
    }
    #total{
        display: table-cell;
        height: 250px;
    }
    #val{
        box-shadow: 1.5px 1px 5px #d8d8d8;
        display: flex;
        height: 250px;
        flex-direction: column;
        align-content: center;
        align-items: center;
    }
    #info-box{
        font-family: fantasy;
        font-size:20px;
        padding: 35px;
        /* border-radius: 100%; */
        align-content: center;
    }
    /* button delete */
    #product-table a{
    position: relative;
    text-align: center;
    font-size: 1.2em;
    line-height: 40px;
    box-sizing: border-box;
    display: inline-block;
    width: 150px;
    height: 40px;
    cursor: pointer;
    transition: .6s ease-out;
    z-index: 0;
    margin-right: 10px;
    }

    #btn-4{
    color: red;
    }

    #btn-4:before{
    position: absolute;
    z-index: -1;
    top: 0;
    overflow-y: hidden;
    line-height: 30px;
    display: block;
    height: 40px;
    width: 20px;
    background-color: red;
    content:"";
    color: red;
    transform: skew(-15deg);
    transition: 280ms ease-in-out;
    }

    #btn-4:hover{
    color: #fff;
    text-shadow: -1px -1px 1px #000;
    }

    #btn-4:hover:before{
    width: 150px;
    }
    /* button green */
    #btn-4-green{
    color: green;
    }

   #btn-4-green:before{
    position: absolute;
    z-index: -1;
    top: 0;
    overflow-y: hidden;
    line-height: 30px;
    display: block;
    height: 40px;
    width: 20px;
    background-color: green;
    content:"";
    color: green;
    transform: skew(-15deg);
    transition: 280ms ease-in-out;
    }

    #btn-4-green:hover{
    color: #fff;
    text-shadow: -1px -1px 1px #000;
    }

    #btn-4-green:hover:before{
    width: 150px;
    }
</style>
