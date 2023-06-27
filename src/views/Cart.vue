<template>
    <div class="cart">
        <!-- Header -->
        <div id="header">
            <h1>Shopping Cart</h1>
        </div>
        <div id="product-list">
            <!-- Product-Card (Price, Quantity, Total) -->
            <ProductCard v-for="product in cartHost(perPage, page)" :key="product.id" :product="product" />
            <!-- Here we use version 1 of pagination because the common 
            usercase is that there will not be a great amount of 
            products in cart and the vue-js pagination is not responsive -->
            <div class="paginationWrap">
                <template v-if="page != 1">
                    <a @click="previousPage">Prev Page</a>
                    <template v-if="hasNextPage"> | </template>
                </template>
                <a @click="nextPage" v-if="hasNextPage">Next Page</a>
            </div>
        </div>
        <!-- Buttons -->
        <div id="button-container">
            <a id="check-out" @click="updateCart">Update Cart</a>
            <a id="check-out" >Check Out</a>
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import ProductService from "@/services/ProductService.js";
import { mapState, mapGetters } from 'vuex'
import Paginate from 'vuejs-paginate'

export default {
    components: {
        ProductCard,
        Paginate
    },
    data(){
        return{
            perPage: 3,
            page: 1
        }
    },
    methods:{
        nextPage(){
            this.page++
        },
        previousPage(){
            this.page--
        }, 
        updateCart(){
            this.$store.dispatch('fetchCartProducts');
        }
    },
    created(){
        this.$store.dispatch('fetchCartProducts');
    },
    computed:{
        hasNextPage() {
            return this.cartTotal > this.page * this.perPage
        },
        ...mapState(['cart', 'cartTotal']),
        ...mapGetters({
            cartHost: 'getCartProductsByPage'
        })
    }
}
</script>

<style>
.cart{
    background-color: white;
}

#header{
    /* FF3.6-15 */
    background: -moz-linear-gradient(left, rgb(30,87,153) 0%, rgb(32,124,202) 42%, rgb(32,124,202) 42%, rgb(41,137,216) 67%, rgb(125,185,232) 100%); 
    /* Chrome10-25,Safari5.1-6 */
    background: -webkit-linear-gradient(left, rgb(30,87,153) 0%,rgb(32,124,202) 42%,rgb(32,124,202) 42%,rgb(41,137,216) 67%,rgb(125,185,232) 100%); 
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    background: linear-gradient(to right, rgb(30,87,153) 0%,rgb(32,124,202) 42%,rgb(32,124,202) 42%,rgb(41,137,216) 67%,rgb(125,185,232) 100%); 
    padding: 50px;
    text-align: left;
    color: white;
}
/* Product-List */
#product-list{
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
/* Buttons */
#button-container{
    display: flex;
    width: 90%;
    flex-direction: row-reverse;
}
a{
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
#check-out{
    color: blue;
}

#check-out:before{
    position: absolute;
    z-index: -1;
    top: 0;
    overflow-y: hidden;
    line-height: 30px;
    display: block;
    height: 40px;
    width: 20px;
    background-color: blue;
    content:"";
    color: blue;
    transform: skew(-15deg);
    transition: 280ms ease-in-out;
}

#check-out:hover{
    color: #fff;
    text-shadow: -1px -1px 1px #000;
}

#check-out:hover:before{
    width: 150px;
}
</style>
