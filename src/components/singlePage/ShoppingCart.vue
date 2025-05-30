<template>
  <q-drawer
    v-model="cartStore.isCartOpen"
    side="right"
    overlay
    elevated
    :width="400"
    :breakpoint="700"
  >
    <div class="cart-container column full-height">
      <!-- Header del carrito -->
      <div class="cart-header q-pa-md bg-red-7 text-white">
        <div class="row items-center">
          <div class="col">
            <div class="text-h6">Carrito de Compras</div>
            <div class="text-caption">
              {{ cartStore.itemCount }} producto{{ cartStore.itemCount !== 1 ? 's' : '' }}
            </div>
          </div>
          <div class="col-auto">
            <q-btn flat round icon="close" color="white" @click="cartStore.closeCart" />
          </div>
        </div>
      </div>

      <!-- Contenido del carrito -->
      <div class="cart-content col">
        <!-- Carrito vacío -->
        <div v-if="cartStore.items.length === 0" class="empty-cart column flex-center q-pa-lg">
          <q-icon name="shopping_cart" size="4rem" color="grey-5" />
          <div class="text-h6 text-grey-6 q-mt-md">Tu carrito está vacío</div>
          <div class="text-body2 text-grey-5 q-mt-sm text-center">
            Agrega algunos productos increíbles a tu carrito
          </div>
          <q-btn
            color="primary"
            label="Seguir comprando"
            unelevated
            class="q-mt-md"
            @click="cartStore.closeCart"
          />
        </div>

        <!-- Items del carrito -->
        <div v-else class="cart-items q-pa-md">
          <q-list separator>
            <q-item v-for="item in cartStore.items" :key="item.cartId" class="cart-item q-pa-md">
              <q-item-section avatar>
                <q-img
                  :src="item.image"
                  width="60px"
                  height="60px"
                  fit="contain"
                  class="rounded-borders"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-medium">{{ item.name }}</q-item-label>
                <q-item-label caption v-if="item.selectedColor">
                  Color:
                  <span
                    class="color-indicator"
                    :style="`background-color: ${item.selectedColor}`"
                  ></span>
                </q-item-label>

                <div class="row items-center q-mt-sm">
                  <div class="col-auto">
                    <div class="quantity-controls row items-center">
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="remove"
                        @click="decreaseQuantity(item)"
                        :disable="item.quantity <= 1"
                      />
                      <span class="q-mx-sm">{{ item.quantity }}</span>
                      <q-btn flat round size="sm" icon="add" @click="increaseQuantity(item)" />
                    </div>
                  </div>

                  <q-space />

                  <div class="col-auto">
                    <div class="text-weight-bold">
                      S/. {{ formatPrice(item.price * item.quantity) }}
                    </div>
                    <div
                      v-if="item.originalPrice && item.originalPrice > item.price"
                      class="text-caption text-grey-6 text-strike"
                    >
                      S/. {{ formatPrice(item.originalPrice * item.quantity) }}
                    </div>
                  </div>
                </div>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  size="sm"
                  @click="removeItem(item)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!-- Footer del carrito -->
      <div v-if="cartStore.items.length > 0" class="">
        <!-- Resumen de precios -->
        <div class="price-summary q-pa-md">
          <div class="row justify-between items-center q-mb-sm">
            <div>Subtotal:</div>
            <div>S/. {{ formatPrice(cartStore.totalPrice) }}</div>
          </div>

          <div v-if="cartStore.totalSavings > 0" class="row justify-between items-center q-mb-sm">
            <div class="text-positive">Ahorras:</div>
            <div class="text-positive text-weight-bold">
              S/. {{ formatPrice(cartStore.totalSavings) }}
            </div>
          </div>

          <q-separator class="q-my-md" />

          <div class="row justify-between items-center q-mb-md">
            <div class="text-h6">Total:</div>
            <div class="text-h6 text-weight-bold">S/. {{ formatPrice(cartStore.totalPrice) }}</div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="cart-actions q-pa-md">
          <q-btn
            color="red-7"
            label="Proceder al Checkout"
            unelevated
            class="full-width q-mb-sm"
            size="lg"
            @click="proceedToCheckout"
          />

          <q-btn flat label="Seguir comprando" class="full-width" @click="cartStore.closeCart" />
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { defineComponent } from 'vue'
import { useCartStore } from 'stores/useCartStore'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ShoppingCart',
  setup() {
    const cartStore = useCartStore()
    const $q = useQuasar()
    const router = useRouter()

    const formatPrice = (price) => {
      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const increaseQuantity = (item) => {
      cartStore.updateQuantity(item.cartId, item.quantity + 1)
    }

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.cartId, item.quantity - 1)
      }
    }

    const removeItem = (item) => {
      $q.dialog({
        title: 'Confirmar',
        message: `¿Estás seguro de que quieres eliminar "${item.name}" del carrito?`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        cartStore.removeFromCart(item.cartId)
        $q.notify({
          type: 'info',
          message: 'Producto eliminado del carrito',
          position: 'top',
        })
      })
    }

    const proceedToCheckout = () => {
      cartStore.closeCart()
      router.push('/checkout')
    }

    return {
      cartStore,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      proceedToCheckout,
    }
  },
})
</script>

<style lang="scss" scoped>
.cart-container {
  height: 100vh;
}

.cart-header {
  flex-shrink: 0;
}

.cart-content {
  overflow-y: auto;
}

.cart-footer {
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
}

.empty-cart {
  height: 100%;
}

.cart-item {
  border-radius: 8px;
  margin-bottom: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.quantity-controls {
  border-radius: 20px;
  padding: 2px;
}

.color-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-left: 4px;
}

.price-summary {
  border-radius: 8px 8px 0 0;
}

.cart-actions {
}
</style>
