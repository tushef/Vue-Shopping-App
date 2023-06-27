
<template>
    <div>
        <div class="filter-bar">
            <div class="search-field">
                <form action="" class="Search">
                    <input class="Search-box" type="search" id="Search-box" autocomplete="off">
                    <label class="Search-label" for="Search-box"><i class="fa fa-search"></i></label>
                </form>
            </div>
            <div class="btn-container categories">
                <a id="btn-4" @click="selectedCategory=null">Home</a>
                <a v-for="(category, index) in categories" 
                :key="category"
                @click="selectedCategory=index"
                 id="btn-4">{{category}}
                </a>
            </div>
        </div>
        <Product v-for="product in productHost(perPage, page)" :key="product.id" :product="product" @add-to-cart="updateCartArray"></Product>
        <!-- Pagination Version 1
            <template v-if="page != 1">
            <a @click="previousPage">Prev Page</a>
            <template v-if="hasNextPage"> 
                |
            </template>
        </template>
        <a @click="nextPage" v-if="hasNextPage">Next Page</a> -->
        <div class="paginateWrap">
            <Paginate
                v-model="page"
                :page-count="pageCount"
                :page-range="perPage"
                :click-handler="updatePage"
                :container-class="'pagination'"
                :page-class="'page-item'">
            </Paginate>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-console */
import Product from "@/components/Product.vue"
import ProductService from "@/services/ProductService.js"
import { mapState, mapGetters } from 'vuex'
import Paginate from 'vuejs-paginate'


export default {
    components:{
        Product,
        Paginate
    },
    data(){
        return{
            selectedCategory: null, 
            perPage: 3,
            page: 1
        }
    },
    watch:{
        selectedCategory: function(value){
            if(this.selectedCategory!=null){
                this.getProductsByCategory(this.categories[value]);
            }else{
                this.$store.dispatch('fetchProducts');
            }
        }
    },
    methods:{
        nextPage(){
            this.page++
        },
        previousPage(){
            this.page--
        },
        getProductsByCategory(value){
            this.page=1
            this.$store.dispatch('fetchProductsByCategory', value)
        },
        updateCartArray: function(e){
            this.$store.dispatch('addToCart', e)
        },
        updatePage(pageNum){
            this.page=pageNum;
        }
    },
    created(){
        this.$store.dispatch('fetchCartProducts');
        this.$store.dispatch('fetchProducts');
        this.$store.dispatch('fetchCategories');
    },
    computed:{
        pageCount(){
            return Math.floor(this.productsTotal/this.perPage)+1
        },
        hasNextPage() {
            return this.productsTotal > this.page * this.perPage
        },
        ...mapState(['products', 'productsTotal', 'categories']),
        ...mapGetters({
            productHost: 'getProductsByPage'
        })
    }
}

</script>

<style scoped>
    .filter-bar{
        background-color: rgb(255, 255, 255);
        display:flex;
        flex-flow: nowrap;
        padding: 1rem;
        margin: 0 auto;
        width: 80%;
        box-shadow: .5px 1px 1.5px #d8d8d8;
    }

    .categories{
        flex-basis: 70%;
        text-align: right;
    }

    .filter-bar a{
    position: relative;
    text-align: center;
    font-size: 1.2em;
    line-height: 40px;
    box-sizing: border-box;
    display: inline-block;
    width: 120px;
    height: 40px;
    cursor: pointer;
    transition: .6s ease-out;
    z-index: 0;
    margin-right: 10px;
    }

    #btn-4{
    color: blue;
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
    background-color: blue;
    content:"";
    color: blue;
    transform: skew(-15deg);
    transition: 280ms ease-in-out;
    }

    #btn-4:hover{
    color: #fff;
    text-shadow: -1px -1px 1px #000;
    }

    #btn-4:hover:before{
    width: 120px;
    }


    .Search {
    position: relative;
    display: flex;
    font-weight: 300;
    font-size: 40px;
    color: #555;
    width: 500px;
    }

    .Search-box {
    padding: 8px 20px;
    margin-right: 50px;
    height: 40px;
    width: 100%;
    border: 0;
    box-shadow: 0 3px 12px -1px rgba(0, 0, 0, .3);
    transition: all .15s ease-in-out;
    }

    .Search-label {
    position: absolute;
    top: 14px;
    right: 30px;
    font-size: 40px;
    transition: all .15s ease-in-out;
    }
    .paginateWrap{
        display: flex;
        text-align: center;
        justify-content: center;
    }
    .pagination{
        display: flex;
        flex-direction: row;
        list-style-type: none;
        text-align: center;
        justify-content: center;
        background-color: white;
    }
</style>
