<template>
  <q-card-section>
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h6">
          <q-icon name="shopping_cart" class="q-mr-sm" />
          Historial de Pedidos
        </div>
      </div>
      <div class="col-auto">
        <q-btn
          color="primary"
          icon="add"
          label="Nuevo Pedido"
          size="sm"
          @click="showNewPedidoDialog = true"
        />
      </div>
    </div>

    <q-separator class="q-mb-md" />

    <div v-if="pedidos.length === 0" class="text-center q-pa-lg">
      <q-icon name="shopping_cart_off" size="3rem" color="grey-4" />
      <div class="text-subtitle1 text-grey-6 q-mt-md">No hay pedidos registrados</div>
      <div class="text-caption text-grey-5">
        Los pedidos aparecerán aquí una vez que se registren
      </div>
    </div>

    <div v-else class="pedidos-list">
      <q-card v-for="pedido in pedidos" :key="pedido.id" class="q-mb-md" flat bordered>
        <q-card-section>
          <div class="row items-center">
            <div class="col">
              <div class="text-subtitle1 text-weight-medium">Pedido #{{ pedido.numero }}</div>
              <div class="text-caption text-grey-6">
                {{ formatDate(pedido.fecha) }}
              </div>
            </div>
            <div class="col-auto">
              <q-badge :color="getEstadoColor(pedido.estado)" :label="pedido.estado" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Productos</q-item-label>
                    <q-item-label>{{ pedido.productos.length }} artículo(s)</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Total</q-item-label>
                    <q-item-label class="text-weight-medium">
                      ${{ pedido.total.toFixed(2) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-12 col-sm-6">
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label overline>Forma de pago</q-item-label>
                    <q-item-label>{{ pedido.forma_pago }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="pedido.observaciones">
                  <q-item-section>
                    <q-item-label overline>Observaciones</q-item-label>
                    <q-item-label>{{ pedido.observaciones }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <!-- Lista de productos -->
          <q-expansion-item icon="visibility" label="Ver productos" class="q-mt-sm">
            <q-card flat>
              <q-card-section class="q-pt-none">
                <q-list separator>
                  <q-item v-for="producto in pedido.productos" :key="producto.id" dense>
                    <q-item-section>
                      <q-item-label>{{ producto.nombre }}</q-item-label>
                      <q-item-label caption>
                        Cantidad: {{ producto.cantidad }} | Precio unitario: ${{
                          producto.precio_unitario
                        }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-weight-medium">
                        ${{ (producto.cantidad * producto.precio_unitario).toFixed(2) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" icon="edit" label="Editar" size="sm" />
          <q-btn flat color="info" icon="print" label="Imprimir" size="sm" />
          <q-btn flat color="negative" icon="delete" label="Eliminar" size="sm" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- Estadísticas rápidas -->
    <q-card flat bordered class="q-mt-lg" v-if="pedidos.length > 0">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md">Resumen</div>
        <div class="row q-col-gutter-md text-center">
          <div class="col-4">
            <div class="text-h6 text-primary">{{ pedidos.length }}</div>
            <div class="text-caption text-grey-6">Total Pedidos</div>
          </div>
          <div class="col-4">
            <div class="text-h6 text-green">{{ pedidosCompletados }}</div>
            <div class="text-caption text-grey-6">Completados</div>
          </div>
          <div class="col-4">
            <div class="text-h6 text-orange">${{ totalVentas.toFixed(2) }}</div>
            <div class="text-caption text-grey-6">Total Ventas</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Dialog para nuevo pedido (placeholder) -->
    <q-dialog v-model="showNewPedidoDialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Nuevo Pedido</div>
          <div class="text-caption text-grey-6 q-mt-sm">
            Esta funcionalidad estará disponible próximamente
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card-section>
</template>

<script>
import { ref, computed } from 'vue'
import { date } from 'quasar'

export default {
  name: 'ClientePedidos',
  props: {
    cliente: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showNewPedidoDialog = ref(false)

    // Data dummy para pedidos
    const pedidos = ref([
      {
        id: 1,
        numero: '2025001',
        fecha: '2025-06-15T10:30:00Z',
        estado: 'Completado',
        total: 150.5,
        forma_pago: 'Tarjeta de crédito',
        observaciones: 'Entrega urgente',
        productos: [
          {
            id: 1,
            nombre: 'Lentes graduados',
            cantidad: 1,
            precio_unitario: 120.0,
          },
          {
            id: 2,
            nombre: 'Estuche protector',
            cantidad: 1,
            precio_unitario: 30.5,
          },
        ],
      },
      {
        id: 2,
        numero: '2025002',
        fecha: '2025-06-10T14:15:00Z',
        estado: 'En proceso',
        total: 85.0,
        forma_pago: 'Efectivo',
        observaciones: null,
        productos: [
          {
            id: 3,
            nombre: 'Lentes de sol',
            cantidad: 1,
            precio_unitario: 85.0,
          },
        ],
      },
      {
        id: 3,
        numero: '2025003',
        fecha: '2025-05-28T09:45:00Z',
        estado: 'Pendiente',
        total: 200.0,
        forma_pago: 'Transferencia',
        observaciones: 'Cliente requiere medidas especiales',
        productos: [
          {
            id: 4,
            nombre: 'Lentes progresivos',
            cantidad: 1,
            precio_unitario: 180.0,
          },
          {
            id: 5,
            nombre: 'Ajuste personalizado',
            cantidad: 1,
            precio_unitario: 20.0,
          },
        ],
      },
    ])

    const pedidosCompletados = computed(() => {
      return pedidos.value.filter((p) => p.estado === 'Completado').length
    })

    const totalVentas = computed(() => {
      return pedidos.value
        .filter((p) => p.estado === 'Completado')
        .reduce((sum, p) => sum + p.total, 0)
    })

    const formatDate = (dateString) => {
      if (!dateString) return 'Sin fecha'
      try {
        return date.formatDate(dateString, 'DD/MM/YYYY HH:mm')
      } catch (error) {
        return 'Fecha inválida' + error
      }
    }

    const getEstadoColor = (estado) => {
      const colors = {
        Completado: 'green',
        'En proceso': 'orange',
        Pendiente: 'red',
        Cancelado: 'grey',
      }
      return colors[estado] || 'grey'
    }

    return {
      showNewPedidoDialog,
      pedidos,
      pedidosCompletados,
      totalVentas,
      formatDate,
      getEstadoColor,
    }
  },
}
</script>

<style scoped>
.pedidos-list {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
