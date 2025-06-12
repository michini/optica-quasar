<template>
  <q-dialog
    v-model="isVisible"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="column">
      <!-- Header del Modal -->
      <q-card-section class="bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="row items-center">
            <q-icon name="inventory_2" size="md" class="q-mr-sm" />
            <div>
              <div class="text-h6">Detalles del Producto</div>
              <div class="text-subtitle2" v-if="selectedProduct">
                {{ selectedProduct.codigo }} - {{ selectedProduct.descripcion }}
              </div>
            </div>
          </div>

          <div class="row q-gutter-sm">
            <q-btn icon="refresh" flat round @click="loadProductDetails" :loading="loading">
              <q-tooltip>Actualizar</q-tooltip>
            </q-btn>

            <!-- <q-btn icon="close" flat round v-close-popup>
              <q-tooltip>Cerrar</q-tooltip>
            </q-btn> -->
            <q-btn label="Cerrar" icon="close" color="red" v-close-popup />
          </div>
        </div>
      </q-card-section>

      <!-- Contenido Principal -->
      <q-card-section class="col q-pa-none">
        <div class="row full-height">
          <!-- Panel Izquierdo - Información Principal -->
          <div class="col-12 col-md-4 col-sm-12 q-pa-md">
            <q-card v-if="selectedProduct" flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md text-center">Información Principal</div>

                <!-- Imagen del Producto -->
                <div class="text-center q-mb-md">
                  <q-avatar size="150px" square class="shadow-2">
                    <q-img
                      :src="getImageUrl(selectedProduct.imagen)"
                      :alt="selectedProduct.descripcion"
                      fit="cover"
                      spinner-color="primary"
                      spinner-size="82px"
                    >
                      <template v-slot:error>
                        <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                          <q-icon name="broken_image" size="60px" />
                        </div>
                      </template>
                    </q-img>
                  </q-avatar>
                </div>

                <!-- Información del Producto -->
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="qr_code" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Código</q-item-label>
                      <q-item-label caption>{{ selectedProduct.codigo }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="attach_money" color="green" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Precio</q-item-label>
                      <q-item-label caption class="text-h6 text-green">
                        ${{ selectedProduct.precio.toFixed(2) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section avatar>
                      <div
                        class="color-preview"
                        :style="{ backgroundColor: getColorHex(selectedProduct.color) }"
                      ></div>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Color</q-item-label>
                      <q-item-label caption>{{ selectedProduct.color }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="texture" color="brown" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Material</q-item-label>
                      <q-item-label caption>{{ selectedProduct.material }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="people" color="purple" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Género</q-item-label>
                      <q-item-label caption>{{ selectedProduct.genero }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section avatar>
                      <q-chip
                        :color="getEstadoColor(selectedProduct.estado)"
                        text-color="white"
                        icon="circle"
                        size="sm"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Estado</q-item-label>
                      <q-item-label caption>{{ selectedProduct.estado }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Stock</q-item-label>
                      <q-item-label caption>{{ selectedProduct.stock }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <!-- Descripción -->
                <q-separator class="q-my-md" />
                <div class="text-subtitle2 q-mb-xs">Descripción:</div>
                <q-card flat bordered class="q-pa-sm">
                  <div class="text-body2">
                    {{ selectedProduct.descripcion || 'Sin descripción disponible' }}
                  </div>
                </q-card>

                <!-- Fechas -->
                <q-separator class="q-my-md" />
                <div class="text-caption text-grey-7">
                  <div>Creado: {{ formatDate(selectedProduct.created_at) }}</div>
                  <div>Actualizado: {{ formatDate(selectedProduct.updated_at) }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Panel Derecho - Tabla de Variantes/Detalles -->
          <div class="col-12 col-md-8 col-sm-12 q-pa-md">
            <q-card flat bordered class="full-height">
              <q-card-section>
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-h6">Variantes del Producto ({{ productDetails.length }})</div>

                  <!-- Búsqueda -->
                  <div class="col-12 col-sm-6 col-md-4">
                    <q-input
                      v-model="searchQuery"
                      label="Buscar variantes"
                      placeholder="Código, color, material..."
                      outlined
                      dense
                      clearable
                    >
                      <template v-slot:prepend>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <!-- Tabla de Variantes -->
                <q-table
                  :rows="filteredDetails"
                  :columns="detailColumns"
                  row-key="id"
                  :loading="loading"
                  :rows-per-page-options="[10, 25, 50]"
                  flat
                  bordered
                  dense
                  class="product-details-table"
                  :no-data-label="loading ? 'Cargando datos...' : 'No se encontraron variantes'"
                >
                  <!-- Slot para imagen -->
                  <template v-slot:body-cell-imagen="props">
                    <q-td :props="props">
                      <q-avatar size="40px" square>
                        <q-img
                          :src="getImageUrl(props.row.imagen)"
                          :alt="props.row.descripcion"
                          fit="cover"
                        >
                          <template v-slot:error>
                            <div class="absolute-full flex flex-center bg-grey-3">
                              <q-icon name="broken_image" size="20px" />
                            </div>
                          </template>
                        </q-img>
                      </q-avatar>
                    </q-td>
                  </template>

                  <!-- Slot para código -->
                  <template v-slot:body-cell-codigo="props">
                    <q-td :props="props">
                      <div class="text-weight-medium">{{ props.row.codigo }}</div>
                    </q-td>
                  </template>

                  <!-- Slot para color -->
                  <template v-slot:body-cell-color="props">
                    <q-td :props="props">
                      <div class="row items-center q-gutter-xs">
                        <div
                          class="color-indicator-small"
                          :style="{ backgroundColor: getColorHex(props.row.color) }"
                        ></div>
                        <span>{{ props.row.color }}</span>
                      </div>
                    </q-td>
                  </template>

                  <!-- Slot para precio -->
                  <template v-slot:body-cell-precio="props">
                    <q-td :props="props">
                      <div class="text-weight-bold">${{ props.row.precio.toFixed(2) }}</div>
                    </q-td>
                  </template>

                  <!-- Slot para estado -->
                  <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                      <q-chip
                        :color="getEstadoColor(props.row.estado)"
                        text-color="white"
                        size="sm"
                      >
                        {{ props.row.estado }}
                      </q-chip>
                    </q-td>
                  </template>

                  <!-- Slot para fechas -->
                  <template v-slot:body-cell-created_at="props">
                    <q-td :props="props">
                      <div class="text-caption">
                        {{ formatDate(props.row.created_at) }}
                      </div>
                    </q-td>
                  </template>

                  <template v-slot:body-cell-updated_at="props">
                    <q-td :props="props">
                      <div class="text-caption">
                        {{ formatDate(props.row.updated_at) }}
                      </div>
                    </q-td>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <!-- Footer del Modal -->
      <!-- <q-card-section class="">
        <div class="row justify-end q-gutter-sm">
          <q-btn label="Editar Producto" icon="edit" color="warning" @click="editProduct" />

          <q-btn
            label="Duplicar Producto"
            icon="content_copy"
            color="info"
            @click="duplicateProduct"
          />

          <q-btn label="Cerrar" icon="close" color="red" v-close-popup />
        </div>
      </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useQuasar, date } from 'quasar'
import { useProductoStore } from 'src/stores/useProductoStore'

const productosStore = useProductoStore()

export default {
  name: 'ProductDetailModal',

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: null,
    },
  },

  emits: ['update:modelValue', 'edit-product', 'duplicate-product'],

  setup(props, { emit }) {
    const $q = useQuasar()

    // Estados reactivos
    const loading = ref(false)
    const productDetails = ref([])
    const searchQuery = ref('')
    const selectedProduct = ref(null)

    // Computed para controlar la visibilidad del modal
    const isVisible = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })

    // Columnas para la tabla de detalles
    const detailColumns = [
      {
        name: 'imagen',
        label: 'Imagen',
        align: 'center',
        field: 'imagen',
        sortable: false,
      },
      {
        name: 'codigo',
        label: 'Código',
        align: 'left',
        field: 'codigo',
        sortable: true,
      },
      {
        name: 'color',
        label: 'Color',
        align: 'left',
        field: 'color',
        sortable: true,
      },
      {
        name: 'precio',
        label: 'Precio',
        align: 'right',
        field: 'precio',
        sortable: true,
      },
      {
        name: 'material',
        label: 'Material',
        align: 'left',
        field: 'material',
        sortable: true,
      },
      {
        name: 'estado',
        label: 'Estado',
        align: 'center',
        field: 'estado',
        sortable: true,
      },
      {
        name: 'genero',
        label: 'Género',
        align: 'left',
        field: 'genero',
        sortable: true,
      },
      {
        name: 'created_at',
        label: 'Creado',
        align: 'left',
        field: 'created_at',
        sortable: true,
      },
      {
        name: 'updated_at',
        label: 'Actualizado',
        align: 'left',
        field: 'updated_at',
        sortable: true,
      },
    ]

    // Computed para filtrar los detalles según la búsqueda
    const filteredDetails = computed(() => {
      if (!searchQuery.value) {
        return productDetails.value
      }

      const query = searchQuery.value.toLowerCase()
      return productDetails.value.filter(
        (item) =>
          item.codigo.toLowerCase().includes(query) ||
          item.color.toLowerCase().includes(query) ||
          item.material.toLowerCase().includes(query) ||
          item.estado.toLowerCase().includes(query) ||
          item.genero.toLowerCase().includes(query) ||
          item.descripcion.toLowerCase().includes(query),
      )
    })

    // Método para cargar los detalles del producto desde el API
    const loadProductDetails = async () => {
      if (!selectedProduct.value) return

      loading.value = true

      productosStore.getProductoByCodigo(selectedProduct.value.codigo).then(function (res) {
        productDetails.value = Array.isArray(res) ? res : [res]
        $q.notify({
          type: 'positive',
          message: `${productDetails.value.length} variante(s) cargada(s)`,
          position: 'bottom-left',
        })
      })

      try {
        // Aquí puedes cambiar la URL del endpoint según tu API
        // const response = await fetch(`/api/productos/${selectedProduct.value.id}/detalles`)
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`)
        // }
        // const data = await response.json()
        // productDetails.value = Array.isArray(data) ? data : [data]
      } catch (error) {
        console.error('Error al cargar detalles del producto:', error)

        // Datos de ejemplo para desarrollo
        productDetails.value = [
          {
            id: 39,
            codigo: '025712150001',
            color: 'negro',
            precio: 45,
            material: 'silicona',
            estado: 'Reservado',
            genero: 'Hombre',
            descripcion: 'Variante en color negro',
            imagen: '/storage/images/DNI.jpeg',
            tipo_producto_id: 2,
            marca_id: 57,
            categoria_id: 12,
            pre_carga_id: 15,
            adicional_id: null,
            created_at: '2025-05-22T08:39:19.000000Z',
            updated_at: '2025-05-22T08:39:19.000000Z',
          },
          {
            id: 40,
            codigo: '025712150002',
            color: 'azul',
            precio: 47,
            material: 'silicona',
            estado: 'Disponible',
            genero: 'Hombre',
            descripcion: 'Variante en color azul',
            imagen: '/storage/images/product2.jpeg',
            tipo_producto_id: 2,
            marca_id: 57,
            categoria_id: 12,
            pre_carga_id: 15,
            adicional_id: null,
            created_at: '2025-05-22T09:15:30.000000Z',
            updated_at: '2025-05-22T09:15:30.000000Z',
          },
        ]

        $q.notify({
          type: 'warning',
          message: 'Error al conectar con el servidor. Mostrando datos de ejemplo.',
          position: 'top-right',
        })
      } finally {
        loading.value = false
      }
    }

    // Métodos utilitarios
    const getImageUrl = (imagePath) => {
      if (!imagePath) return '/api/placeholder/150/150'

      // Si la imagen ya es una URL completa, usarla tal como está
      if (imagePath.startsWith('http')) return imagePath

      // Si es una ruta relativa, construir la URL completa
      const baseUrl = process.env.API_URL || window.location.origin
      return `${baseUrl}${imagePath}`
    }

    const getColorHex = (colorName) => {
      const colorMap = {
        azul: '#2196f3',
        rojo: '#f44336',
        negro: '#424242',
        blanco: '#fafafa',
        rosa: '#e91e63',
        verde: '#4caf50',
        amarillo: '#ffeb3b',
        morado: '#9c27b0',
        naranja: '#ff9800',
        gris: '#9e9e9e',
      }
      return colorMap[colorName?.toLowerCase()] || '#9e9e9e'
    }

    const getEstadoColor = (estado) => {
      const colorMap = {
        Disponible: 'positive',
        Reservado: 'warning',
        Agotado: 'negative',
        'En proceso': 'info',
        Descontinuado: 'grey',
      }
      return colorMap[estado] || 'grey'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'

      try {
        return date.formatDate(dateString, 'DD/MM/YYYY HH:mm')
      } catch (error) {
        console.error('Error al formatear la fecha:', error)
        return dateString
      }
    }

    // Métodos de acción
    // const editProduct = () => {
    //   emit('edit-product', selectedProduct.value)
    //   $q.notify({
    //     type: 'info',
    //     message: `Editando producto: ${selectedProduct.value.descripcion}`,
    //     position: 'top-right',
    //   })
    // }

    // const duplicateProduct = () => {
    //   emit('duplicate-product', selectedProduct.value)
    //   $q.notify({
    //     type: 'info',
    //     message: `Duplicando producto: ${selectedProduct.value.descripcion}`,
    //     position: 'top-right',
    //   })
    // }

    // Watchers
    watch(
      () => props.product,
      (newProduct) => {
        if (newProduct) {
          selectedProduct.value = newProduct
          //loadProductDetails()
        }
      },
      { immediate: true },
    )

    watch(isVisible, (visible) => {
      if (visible && props.product) {
        selectedProduct.value = props.product
        loadProductDetails()
      } else if (!visible) {
        // Limpiar datos cuando se cierre el modal
        searchQuery.value = ''
        productDetails.value = []
      }
    })

    return {
      // Estados
      loading,
      productDetails,
      searchQuery,
      selectedProduct,
      isVisible,

      // Configuración
      detailColumns,

      // Computed
      filteredDetails,

      // Métodos
      loadProductDetails,
      getImageUrl,
      getColorHex,
      getEstadoColor,
      formatDate,
      // editProduct,
      // duplicateProduct,
    }
  },
}
</script>

<style lang="scss" scoped>
.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
}

.color-indicator-small {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  display: inline-block;
}

.product-details-table {
  .q-table thead tr th {
    font-weight: 600;
  }

  .q-table tbody td {
    padding: 8px 12px;
  }
}

.q-dialog__inner {
  padding: 16px;
}

@media (max-width: 768px) {
  .q-dialog__inner {
    padding: 8px;
  }
}
</style>
