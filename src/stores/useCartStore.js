import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Estado
  const items = ref([])
  const isCartOpen = ref(false)

  // Getters computados
  const itemCount = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0),
  )

  const totalOriginalPrice = computed(() =>
    items.value.reduce(
      (total, item) => total + (item.originalPrice || item.price) * item.quantity,
      0,
    ),
  )

  const totalSavings = computed(() => totalOriginalPrice.value - totalPrice.value)

  // Acciones
  const addToCart = (product, selectedColor = null, prescription = null) => {
    const itemId = `${product.id}-${selectedColor || 'default'}`
    const existingItem = items.value.find((item) => item.cartId === itemId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        cartId: itemId,
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        selectedColor: selectedColor,
        prescription: prescription,
        quantity: 1,
        available: product.available,
      })
    }
  }

  const removeFromCart = (cartId) => {
    const index = items.value.findIndex((item) => item.cartId === cartId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId)
      return
    }

    const item = items.value.find((item) => item.cartId === cartId)
    if (item) {
      item.quantity = newQuantity
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  return {
    // Estado
    items,
    isCartOpen,

    // Getters
    itemCount,
    totalPrice,
    totalOriginalPrice,
    totalSavings,

    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  }
})
