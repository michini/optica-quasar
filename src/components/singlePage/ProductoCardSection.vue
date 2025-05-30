<template>
  <div class="product-card-container">
    <q-card class="product-card" flat bordered>
      <!-- Etiqueta de descuento -->
      <div class="discount-badge" v-if="product.discount">{{ product.discount }}% OFF</div>

      <!-- Etiqueta de oferta especial -->
      <div class="sale-badge" v-if="product.sale">Sale</div>

      <!-- Imagen del producto -->
      <q-img :src="product.image" :ratio="1" class="product-image" fit="contain" />

      <!-- Información del producto -->
      <q-card-section class="product-info q-pt-md q-pb-none">
        <div class="product-title">{{ product.name }}</div>

        <!-- Selector de colores -->
        <div class="color-options q-mt-xs" v-if="product.colors && product.colors.length > 0">
          <q-btn
            v-for="(color, index) in product.colors"
            :key="index"
            round
            unelevated
            size="sm"
            :style="`background-color: ${color}; border: 2px solid ${selectedColor === color ? '#1976d2' : '#ddd'};`"
            class="color-option q-mr-xs"
            @click="selectColor(color)"
          />
        </div>

        <!-- Precios -->
        <div class="pricing q-mt-sm">
          <div class="current-price">S/. {{ formatPrice(product.price) }}</div>
          <div class="original-price q-ml-sm" v-if="product.originalPrice">
            S/. {{ formatPrice(product.originalPrice) }}
          </div>
        </div>

        <!-- Disponibilidad -->
        <div class="availability q-mt-xs">
          <q-icon name="circle" size="xs" color="green" class="q-mr-xs" />
          <span class="text-green">Disponible</span>
        </div>
      </q-card-section>

      <!-- Botones de compra -->
      <q-card-actions class="q-px-md q-pb-md">
        <div class="row q-gutter-xs full-width">
          <q-btn
            unelevated
            color="pink-10"
            class="col buy-button"
            label="Comprar"
            @click="buyNow"
          />
          <q-btn
            flat
            round
            color="grey-7"
            icon="shopping_cart"
            class="add-to-cart-btn"
            @click="addToCart"
            :loading="addingToCart"
          >
            <q-tooltip>Agregar al carrito</q-tooltip>
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useCartStore } from 'src/stores/useCartStore'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        price: 0,
        originalPrice: 0,
        discount: 0,
        sale: false,
        image: '',
        colors: [],
        available: true,
      }),
    },
  },
  setup(props) {
    const cartStore = useCartStore()
    const $q = useQuasar()
    const addingToCart = ref(false)
    const selectedColor = ref(null)

    // Seleccionar el primer color por defecto si existe
    onMounted(() => {
      if (props.product.colors && props.product.colors.length > 0) {
        selectedColor.value = props.product.colors[0]
      }
    })

    const formatPrice = (price) => {
      if (!price) return '0.00'
      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const addToCart = async () => {
      if (!props.product.available) {
        $q.notify({
          type: 'negative',
          message: 'Producto no disponible',
          position: 'top',
        })
        return
      }

      addingToCart.value = true

      try {
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simular carga

        cartStore.addToCart(props.product, selectedColor.value)

        $q.notify({
          type: 'positive',
          message: `${props.product.name} agregado al carrito`,
          actions: [
            {
              label: 'Ver carrito',
              color: 'white',
              handler: () => cartStore.openCart(),
            },
          ],
          position: 'top',
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error al agregar producto' + error,
          position: 'top',
        })
      } finally {
        addingToCart.value = false
      }
    }

    const buyNow = () => {
      addToCart()
      setTimeout(() => {
        cartStore.openCart()
      }, 600)
    }

    const selectColor = (color) => {
      selectedColor.value = color
    }

    return {
      formatPrice,
      addToCart,
      buyNow,
      selectColor,
      selectedColor,
      addingToCart,
    }
  },
})
</script>

<style lang="scss" scoped>
.product-card-container {
  padding: 4px;
}

.product-card {
  position: relative;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);

    .buy-button {
      background-color: #c10841 !important;
    }
  }
}

.discount-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #e91e63;
  color: white;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 1;
}

.sale-badge {
  position: absolute;
  bottom: 40%;
  right: 8px;
  background-color: #2196f3;
  color: white;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 1;
}

.product-image {
  padding: 16px;
}

.product-info {
  .product-title {
    font-weight: 500;
    font-size: 0.95rem;
    color: #1976d2;
    min-height: 42px;
  }

  .color-option {
    width: 20px;
    height: 20px;
    min-height: unset;
    margin-top: 4px;
  }

  .pricing {
    display: flex;
    align-items: center;

    .current-price {
      font-weight: 700;
      font-size: 1.1rem;
      color: #e91e63;
    }

    .original-price {
      color: #9e9e9e;
      font-size: 0.9rem;
      text-decoration: line-through;
    }
  }

  .availability {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
  }
}

.buy-button {
  transition: background-color 0.3s ease;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.add-to-cart-btn {
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }
}
</style>
