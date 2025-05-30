<template>
  <q-page padding>
    <div class="container">
      <div class="row q-col-gutter-lg">
        <!-- Formulario de checkout -->
        <div class="col-12 col-md-8">
          <q-card flat bordered class="q-mb-md">
            <q-card-section>
              <div class="text-h5 q-mb-md">Información de entrega</div>

              <q-form @submit="onSubmit" class="q-gutter-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="form.firstName"
                      label="Nombres *"
                      filled
                      :rules="[(val) => !!val || 'Este campo es requerido']"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="form.lastName"
                      label="Apellidos *"
                      filled
                      :rules="[(val) => !!val || 'Este campo es requerido']"
                    />
                  </div>
                </div>

                <q-input
                  v-model="form.email"
                  label="Correo electrónico *"
                  type="email"
                  filled
                  :rules="[
                    (val) => !!val || 'Este campo es requerido',
                    (val) => /.+@.+\..+/.test(val) || 'Email debe ser válido',
                  ]"
                />

                <q-input
                  v-model="form.phone"
                  label="Teléfono *"
                  filled
                  :rules="[(val) => !!val || 'Este campo es requerido']"
                />

                <q-input
                  v-model="form.address"
                  label="Dirección *"
                  filled
                  :rules="[(val) => !!val || 'Este campo es requerido']"
                />

                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="form.city"
                      label="Ciudad *"
                      filled
                      :rules="[(val) => !!val || 'Este campo es requerido']"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input v-model="form.postalCode" label="Código postal" filled />
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>

          <!-- Método de pago -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h5 q-mb-md">Método de pago</div>

              <q-option-group
                v-model="paymentMethod"
                :options="paymentOptions"
                color="primary"
                class="q-mb-md"
              />

              <div v-if="paymentMethod === 'card'" class="q-mt-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <q-input
                      v-model="form.cardNumber"
                      label="Número de tarjeta"
                      filled
                      mask="#### #### #### ####"
                      :rules="[
                        (val) => paymentMethod !== 'card' || !!val || 'Número de tarjeta requerido',
                      ]"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      v-model="form.expiryDate"
                      label="MM/AA"
                      filled
                      mask="##/##"
                      :rules="[(val) => paymentMethod !== 'card' || !!val || 'Fecha requerida']"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      v-model="form.cvv"
                      label="CVV"
                      filled
                      mask="###"
                      :rules="[(val) => paymentMethod !== 'card' || !!val || 'CVV requerido']"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Resumen del pedido -->
        <div class="col-12 col-md-4">
          <q-card flat bordered class="sticky-card">
            <q-card-section>
              <div class="text-h5 q-mb-md">Resumen del pedido</div>

              <!-- Items del carrito -->
              <q-list separator>
                <q-item v-for="item in cartStore.items" :key="item.cartId" dense>
                  <q-item-section avatar>
                    <q-img :src="item.image" width="40px" height="40px" fit="contain" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ item.name }}</q-item-label>
                    <q-item-label caption>Cantidad: {{ item.quantity }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label>S/. {{ formatPrice(item.price * item.quantity) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator class="q-my-md" />

              <!-- Resumen de precios -->
              <div class="price-summary">
                <div class="row justify-between q-mb-sm">
                  <div>Subtotal:</div>
                  <div>S/. {{ formatPrice(cartStore.totalPrice) }}</div>
                </div>

                <div class="row justify-between q-mb-sm">
                  <div>Envío:</div>
                  <div class="text-positive">Gratis</div>
                </div>

                <div v-if="cartStore.totalSavings > 0" class="row justify-between q-mb-sm">
                  <div class="text-positive">Descuento:</div>
                  <div class="text-positive">-S/. {{ formatPrice(cartStore.totalSavings) }}</div>
                </div>

                <q-separator class="q-my-md" />

                <div class="row justify-between items-center">
                  <div class="text-h6">Total:</div>
                  <div class="text-h6 text-weight-bold">S/. {{ formatPrice(finalTotal) }}</div>
                </div>
              </div>

              <!-- Código de descuento -->
              <div class="q-mt-md">
                <q-expansion-item
                  icon="local_offer"
                  label="¿Tienes un código de descuento?"
                  class="discount-section"
                >
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                      <div class="col">
                        <q-input v-model="discountCode" label="Código de descuento" filled dense />
                      </div>
                      <div class="col-auto">
                        <q-btn
                          color="primary"
                          label="Aplicar"
                          @click="applyDiscount"
                          :loading="applyingDiscount"
                        />
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
              </div>

              <!-- Botón de finalizar compra -->
              <q-btn
                color="red-7"
                label="Finalizar compra"
                class="full-width q-mt-lg"
                size="lg"
                unelevated
                @click="finishPurchase"
                :loading="processingOrder"
                :disable="cartStore.items.length === 0"
              />

              <!-- Garantías y beneficios -->
              <div class="benefits q-mt-md">
                <div class="benefit-item row items-center q-mb-xs">
                  <q-icon name="security" color="positive" size="sm" class="q-mr-sm" />
                  <span class="text-caption">Compra 100% segura</span>
                </div>
                <div class="benefit-item row items-center q-mb-xs">
                  <q-icon name="local_shipping" color="positive" size="sm" class="q-mr-sm" />
                  <span class="text-caption">Envío gratis a todo el país</span>
                </div>
                <div class="benefit-item row items-center">
                  <q-icon name="assignment_return" color="positive" size="sm" class="q-mr-sm" />
                  <span class="text-caption">14 días para devoluciones</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useCartStore } from 'stores/useCartStore'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CheckoutPage',
  setup() {
    const cartStore = useCartStore()
    const $q = useQuasar()
    const router = useRouter()

    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    })

    const paymentMethod = ref('card')
    const discountCode = ref('')
    const processingOrder = ref(false)
    const applyingDiscount = ref(false)
    const appliedDiscount = ref(0)

    const paymentOptions = [
      { label: 'Tarjeta de crédito/débito', value: 'card' },
      { label: 'Transferencia bancaria', value: 'transfer' },
      { label: 'Pago contra entrega', value: 'cod' },
    ]

    const formatPrice = (price) => {
      if (!price) return '0.00'
      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const finalTotal = computed(() => {
      const total = cartStore.totalPrice
      const discountAmount = (total * appliedDiscount.value) / 100
      return Math.max(0, total - discountAmount)
    })

    const applyDiscount = async () => {
      if (!discountCode.value.trim()) {
        $q.notify({
          type: 'warning',
          message: 'Ingresa un código de descuento',
          position: 'top',
        })
        return
      }

      applyingDiscount.value = true

      try {
        // Simular verificación del código
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Códigos de ejemplo
        const validCodes = {
          DESCUENTO10: 10,
          PRIMERA20: 20,
          ESTUDIANTE15: 15,
        }

        const discountValue = validCodes[discountCode.value.toUpperCase()]

        if (discountValue) {
          appliedDiscount.value = discountValue
          $q.notify({
            type: 'positive',
            message: `¡Código aplicado! ${discountValue}% de descuento`,
            position: 'top',
          })
        } else {
          $q.notify({
            type: 'negative',
            message: 'Código de descuento inválido',
            position: 'top',
          })
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error al aplicar el código ' + error,
          position: 'top',
        })
      } finally {
        applyingDiscount.value = false
      }
    }

    const validateForm = () => {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city']

      for (const field of requiredFields) {
        if (!form.value[field]) {
          return false
        }
      }

      // Validar email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        return false
      }

      // Validar campos de tarjeta si es necesario
      if (paymentMethod.value === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv']
        for (const field of cardFields) {
          if (!form.value[field]) {
            return false
          }
        }
      }

      return true
    }

    const finishPurchase = async () => {
      // Validar formulario
      if (!validateForm()) {
        $q.notify({
          type: 'warning',
          message: 'Por favor completa todos los campos requeridos correctamente',
          position: 'top',
        })
        return
      }

      processingOrder.value = true

      try {
        // Simular procesamiento del pedido
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mostrar modal de confirmación
        $q.dialog({
          title: '¡Pedido confirmado!',
          message: `Tu pedido por S/. ${formatPrice(finalTotal.value)} ha sido procesado exitosamente. Recibirás un email de confirmación pronto.`,
          persistent: true,
        }).onOk(() => {
          cartStore.clearCart()
          router.push('/')
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error al procesar el pedido. Inténtalo de nuevo.' + error,
          position: 'top',
        })
      } finally {
        processingOrder.value = false
      }
    }

    // Verificar si el carrito está vacío al montar el componente
    onMounted(() => {
      if (cartStore.items.length === 0) {
        $q.notify({
          type: 'info',
          message: 'Tu carrito está vacío',
          position: 'top',
        })
        router.push('/')
      }
    })

    return {
      cartStore,
      form,
      paymentMethod,
      paymentOptions,
      discountCode,
      processingOrder,
      applyingDiscount,
      appliedDiscount,
      finalTotal,
      formatPrice,
      applyDiscount,
      finishPurchase,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.sticky-card {
  position: sticky;
  top: 20px;
}

.price-summary {
  padding: 16px;
  border-radius: 8px;
}

.discount-section {
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
}

.benefits {
  background-color: #f0f7ff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e3f2fd;
}

.benefit-item {
  .text-caption {
    color: #424242;
  }
}

@media (max-width: 768px) {
  .sticky-card {
    position: static;
  }
}
</style>
