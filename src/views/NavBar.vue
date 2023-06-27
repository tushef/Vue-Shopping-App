<template>
        <div id="nav" class="nav">
            <router-link to="/" class="brand">Vue Shopping App</router-link>
            <nav>
                <!-- <router-link v-for="category in categories" 
                :key="category"
                :to="{ name: 'category-block', params: { title: category} }"
                > <button>{{category}} </button> </router-link> -->
                <div id="btn-2">
                    <router-link :to="{ name: 'home' }" id="a2">Shop</router-link>
                </div>
                <div id="btn-2">
                    <router-link :to="{ name: 'cart'}" >Cart</router-link>
                </div>
            </nav>
        </div>
</template>

<script>
import ShoppingBlock from "@/views/ShoppingBlock.vue";
import Cart from "@/views/Cart.vue";
export default {
    components:{
        Cart,
        ShoppingBlock
    },
    data(){
        return{
            categories:[],
            cart:[1, 2, 3, 4]
        }
    },
    methods:{

    },
    created(){
        
    }
}
</script>

<style scoped>
    .nav {
        background-color:#ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 20px;
        top: 0.1px;
        position:sticky;
        opacity: 0.8;
        box-shadow: 0px .5px 1px #d8d8d8;
    }

    .nav > .brand {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 1.5em;
        color: blue;
        text-decoration: none;
        width:auto;
    }

    .nav a{
        position: relative;
        text-align: center;
        font-size: 1.5em;
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

    nav{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #btn-2:before, #btn-2:after{
        backface-visibility: hidden;
        border: 1px solid white;
        content: " ";
        display: block;
        margin: 0 auto;
        position: relative;
        bottom: 0;
        transition: all 280ms ease-in-out;
        width: 0;
    }

    #btn-2:hover:before, #btn-2:hover:after{
        backface-visibility: hidden;
        border: 1px solid blue;
        transition: width 280ms ease-in-out;
        width: 90%;
    }
    #a2{
        transition: all 280ms ease-in-out;
    }

    #a2:before{
        position: absolute;
        opacity: 0;
    }

    #a2:hover:before{
        left: 10px;
        opacity: 1;
    }
</style>
