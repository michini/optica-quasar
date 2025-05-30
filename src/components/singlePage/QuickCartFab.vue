<template>
  <!-- Botón flotante del carrito -->
  <q-page-sticky v-if="cartStore.itemCount > 0" position="bottom-right" :offset="[18, 18]">
    <q-fab color="primary" icon="shopping_cart" direction="up" class="quick-cart-fab">
      <q-fab-action
        color="white"
        text-color="primary"
        @click="cartStore.openCart"
        icon="visibility"
        :label="`Ver carrito (${cartStore.itemCount})`"
      />

      <q-fab-action color="positive" @click="goToCheckout" icon="payment" label="Checkout" />

      <q-fab-action
        v-if="cartStore.itemCount > 1"
        color="negative"
        @click="confirmClearCart"
        icon="clear_all"
        label="Vaciar"
      />
    </q-fab>

    <!-- Badge con total -->
    <q-badge
      color="negative"
      floating
      rounded
      :label="cartStore.itemCount > 99 ? '99+' : cartStore.itemCount"
      class="fab-badge"
    />
  </q-page-sticky>

  <!-- Mini resumen flotante -->
  <q-dialog v-model="showMiniSummary" position="bottom" seamless>
    <q-card class="mini-summary-card" style="width: 100%; max-width: 400px">
      <q-card-section class="row items-center">
        <q-icon name="shopping_cart" color="primary" size="md" class="q-mr-md" />
        <div class="col">
          <div class="text-subtitle1">
            {{ cartStore.itemCount }} producto{{ cartStore.itemCount !== 1 ? 's' : '' }}
          </div>
          <div class="text-caption text-grey-6">
            Total: S/. {{ formatPrice(cartStore.totalPrice) }}
          </div>
        </div>
        <q-btn flat round icon="close" @click="showMiniSummary = false" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat label="Ver carrito" @click="openCart" />
        <q-btn unelevated color="primary" label="Checkout" @click="goToCheckout" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useCartStore } from 'stores/useCartStore'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'QuickCartFab',
  setup() {
    const cartStore = useCartStore()
    const $q = useQuasar()
    const router = useRouter()
    const showMiniSummary = ref(false)

    const formatPrice = (price) => {
      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const goToCheckout = () => {
      router.push('/checkout')
    }

    const openCart = () => {
      showMiniSummary.value = false
      cartStore.openCart()
    }

    const confirmClearCart = () => {
      $q.dialog({
        title: 'Vaciar carrito',
        message: '¿Estás seguro de que quieres eliminar todos los productos del carrito?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        cartStore.clearCart()
        $q.notify({
          type: 'info',
          message: 'Carrito vaciado',
          position: 'top',
        })
      })
    }

    // Mostrar mini resumen cuando se agregue un producto
    let previousCount = 0
    watch(
      () => cartStore.itemCount,
      (newCount) => {
        if (newCount > previousCount && newCount > 0) {
          showMiniSummary.value = true
          setTimeout(() => {
            showMiniSummary.value = false
          }, 3000) // Auto-ocultar después de 3 segundos
        }
        previousCount = newCount
      },
    )

    return {
      cartStore,
      showMiniSummary,
      formatPrice,
      goToCheckout,
      openCart,
      confirmClearCart,
    }
  },
})
</script>

<style lang="scss" scoped>
.quick-cart-fab {
  animation: pulse 2s infinite;
}

.fab-badge {
  animation: bounce 0.5s ease;
  z-index: 1;
}

.mini-summary-card {
  margin: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}
</style>
