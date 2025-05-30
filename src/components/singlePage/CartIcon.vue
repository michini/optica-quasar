<template>
  <q-btn flat round icon="shopping_cart" @click="cartStore.toggleCart" class="cart-icon-btn">
    <q-badge
      v-if="cartStore.itemCount > 0"
      color="negative"
      floating
      rounded
      :label="cartStore.itemCount > 99 ? '99+' : cartStore.itemCount"
      class="cart-badge"
    />

    <q-tooltip>
      {{
        cartStore.itemCount === 0
          ? 'Carrito vacío'
          : `${cartStore.itemCount} producto${cartStore.itemCount !== 1 ? 's' : ''} en el carrito`
      }}
    </q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'
import { useCartStore } from 'src/stores/useCartStore'

export default defineComponent({
  name: 'CartIcon',
  setup() {
    const cartStore = useCartStore()

    return {
      cartStore,
    }
  },
})
</script>

<style lang="scss" scoped>
.cart-icon-btn {
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.cart-badge {
  animation: bounce 0.5s ease;
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
