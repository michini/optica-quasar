<template>
  <div class="product-grid q-pa-md">
    <div class="row q-col-gutter-md">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-2">
        <ProductoCardSection :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProductoCardSection from './ProductoCardSection.vue'

export default defineComponent({
  name: 'ProductGrid',
  components: {
    ProductoCardSection,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Producto 1',
          price: 99.0,
          originalPrice: 149.0,
          discount: 34,
          image: 'https://leoptica.com/cdn/shop/files/82025C4-3.jpg?v=1729706205&width=600',
          colors: ['#FFD700', '#000000'],
          available: true,
          sale: false,
        },
        {
          id: 2,
          name: 'Producto 2',
          price: 149.0,
          originalPrice: 219.0,
          discount: 32,
          image: 'https://leoptica.com/cdn/shop/files/95340C5-1.jpg?v=1732406232&width=600',
          colors: ['#000000', '#8B4513'],
          available: true,
          sale: false,
        },
        {
          id: 3,
          name: 'Producto 3',
          price: 49.0,
          originalPrice: 98.0,
          discount: 50,
          image: 'https://leoptica.com/cdn/shop/files/95340C5-2.jpg?v=1732406232&width=600',
          colors: ['#800080', '#DEB887'],
          available: true,
          sale: false,
        },
        {
          id: 4,
          name: 'Producto 4',
          price: 189.0,
          originalPrice: 349.0,
          discount: 46,
          image: 'https://leoptica.com/cdn/shop/files/95885C9-1.jpg?v=1731451866&width=600',
          colors: ['#000000', '#FFD700'],
          available: true,
          sale: false,
        },
        {
          id: 5,
          name: 'Producto 5',
          price: 129.0,
          originalPrice: 229.0,
          discount: 44,
          image: 'https://leoptica.com/cdn/shop/files/95885C9-2.jpg?v=1731448812&width=600',
          colors: ['#000000'],
          available: true,
          sale: true,
        },
        {
          id: 6,
          name: 'Producto 6',
          price: 149.0,
          originalPrice: 219.0,
          discount: 32,
          image: 'https://leoptica.com/cdn/shop/files/BT2401C5-5.jpg?v=1732317371&width=600',
          colors: ['#FFC0CB', '#8B4513'],
          available: true,
          sale: false,
        },
      ],
    }
  },
})
</script>

<style scoped>
.product-grid {
  background-color: #f9f9f9;
}
</style>
