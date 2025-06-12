<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <q-toolbar class="bg-primary text-white q-mb-md rounded-borders">
      <q-toolbar-title>
        <q-icon name="inventory" class="q-mr-sm" />
        Gestión de Productos
      </q-toolbar-title>

      <q-space />

      <q-btn color="positive" label="Nuevo" icon="add" @click="createProduct" class="q-mr-sm" />

      <q-btn
        color="white"
        text-color="primary"
        label="Exportar"
        icon="download"
        @click="exportProducts"
        class="q-mr-sm"
      />

      <q-btn color="white" text-color="primary" icon="settings" round @click="openSettings" />
    </q-toolbar>

    <!-- Filtros -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-gutter-md items-end">
          <!-- Búsqueda -->
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.search"
              label="Buscar productos"
              placeholder="Código, descripción..."
              outlined
              dense
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <!-- Filtro Categoría -->
          <div class="col-12 col-md-2">
            <q-select
              v-model="filters.categoria"
              :options="categoriaOptions"
              label="Categoría"
              outlined
              dense
              clearable
              emit-value
              map-options
            />
          </div>

          <!-- Filtro Marca -->
          <div class="col-12 col-md-2">
            <q-select
              v-model="filters.marca"
              :options="marcaOptions"
              label="Marca"
              outlined
              dense
              clearable
              emit-value
              map-options
            />
          </div>

          <!-- Rango de Precio -->
          <div class="col-12 col-md-2">
            <div class="text-caption q-mb-xs">
              Precio: S/{{ filters.precioRange.min }} - S/{{ filters.precioRange.max }}
            </div>
            <q-range
              v-model="filters.precioRange"
              :min="0"
              :max="500"
              :step="5"
              label
              color="primary"
            />
          </div>
        </div>

        <!-- Segunda fila de filtros -->
        <div class="row q-gutter-md items-center q-mt-md">
          <q-btn
            label="Más filtros"
            icon="filter_list"
            flat
            color="primary"
            @click="showAdvancedFilters = !showAdvancedFilters"
          />

          <q-btn label="Limpiar" icon="clear" flat color="negative" @click="clearFilters" />

          <q-space />

          <div class="text-caption">{{ filteredProducts.length }} productos encontrados</div>
        </div>

        <!-- Filtros Avanzados -->
        <q-slide-transition>
          <div v-show="showAdvancedFilters" class="q-mt-md">
            <q-separator class="q-mb-md" />
            <div class="row q-gutter-md">
              <div class="col-12 col-md-2">
                <q-select
                  v-model="filters.genero"
                  :options="generoOptions"
                  label="Género"
                  outlined
                  dense
                  clearable
                  emit-value
                  map-options
                />
              </div>

              <div class="col-12 col-md-2">
                <q-select
                  v-model="filters.material"
                  :options="materialOptions"
                  label="Material"
                  outlined
                  dense
                  clearable
                  emit-value
                  map-options
                />
              </div>

              <div class="col-12 col-md-2">
                <q-select
                  v-model="filters.color"
                  :options="colorOptions"
                  label="Color"
                  outlined
                  dense
                  clearable
                  emit-value
                  map-options
                />
              </div>
            </div>
          </div>
        </q-slide-transition>
      </q-card-section>
    </q-card>

    <!-- Tabla de Productos -->
    <q-table
      :rows="paginatedProducts"
      :columns="columns"
      row-key="codigo"
      :loading="loading"
      :rows-per-page-options="[5, 10, 25, 50, 100]"
      binary-state-sort
      flat
      bordered
      class="product-table"
    >
      <!-- Slot para imagen -->
      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <q-avatar size="50px" square>
            <q-img :src="API_URL + props.row.imagen" :alt="props.row.descripcion" fit="cover" />
          </q-avatar>
        </q-td>
      </template>

      <!-- Slot para código -->
      <template v-slot:body-cell-codigo="props">
        <q-td :props="props">
          <div class="text-weight-medium">{{ props.row.codigo }}</div>
        </q-td>
      </template>

      <!-- Slot para producto -->
      <template v-slot:body-cell-producto="props">
        <q-td :props="props">
          <div>
            <div class="text-weight-bold">{{ props.row.tipo_producto }}</div>
          </div>
        </q-td>
      </template>

      <!-- Slot para color -->
      <template v-slot:body-cell-color="props">
        <q-td :props="props">
          <div class="row items-center q-gutter-xs">
            <div
              class="color-indicator"
              :style="{ backgroundColor: getColorHex(props.row.color) }"
            ></div>
            <span>{{ props.row.color }}</span>
          </div>
        </q-td>
      </template>

      <!-- Slot para precio -->
      <template v-slot:body-cell-precio="props">
        <q-td :props="props">
          <div class="text-weight-bold text-h6">S/{{ props.row.precio.toFixed(2) }}</div>
        </q-td>
      </template>

      <!-- Slot para stock -->
      <template v-slot:body-cell-stock="props">
        <q-td :props="props">
          <div :class="getStockClass(props.row.stock)">
            {{ props.row.stock }}
          </div>
        </q-td>
      </template>

      <!-- Slot para acciones -->
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <div class="q-gutter-xs">
            <q-btn
              icon="visibility"
              size="sm"
              flat
              round
              color="primary"
              @click="viewProduct(props.row)"
            >
              <q-tooltip>Ver detalles</q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
  <!-- Modal de Detalles del Producto -->
  <div class="row">
    <div class="col-md-4 col-sm-12 col-xs-12 q-pa-md">
      <ProductDetailModal v-model="showProductModal" :product="selectedProductForModal" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useProductoStore } from 'src/stores/useProductoStore'
import ProductDetailModal from 'src/components/home/inventario/ProductDetailModal.vue'

const API_URL = process.env.API_URL

//stores
const productosStore = useProductoStore()

// Estados reactivos
const loading = ref(false)
const showAdvancedFilters = ref(false)
const selected = ref([])

// Filtros
const filters = ref({
  search: '',
  categoria: null,
  marca: null,
  estados: ['Disponible'],
  precioRange: { min: 0, max: 500 },
  genero: null,
  material: null,
  color: null,
})

// Paginación
const pagination = ref({
  sortBy: 'codigo',
  descending: false,
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 0,
})

// Opciones para filtros
const categoriaOptions = [
  { label: 'Camisetas', value: 1 },
  { label: 'Pantalones', value: 2 },
  { label: 'Vestidos', value: 3 },
  { label: 'Deportivo', value: 4 },
  { label: 'Faldas', value: 5 },
]

const marcaOptions = [
  { label: 'Nike', value: 1 },
  { label: 'Adidas', value: 2 },
  { label: 'Zara', value: 3 },
  { label: 'H&M', value: 4 },
  { label: "Levi's", value: 5 },
]

const generoOptions = [
  { label: 'Niños', value: 'Niños' },
  { label: 'Hombre', value: 'Hombre' },
  { label: 'Mujer', value: 'Mujer' },
]

const materialOptions = [
  { label: 'Algodón', value: 'Algodón' },
  { label: 'Poliéster', value: 'Poliéster' },
  { label: 'Denim', value: 'Denim' },
  { label: 'Nylon', value: 'Nylon' },
]

const colorOptions = [
  { label: 'Azul', value: 'Azul' },
  { label: 'Rojo', value: 'Rojo' },
  { label: 'Negro', value: 'Negro' },
  { label: 'Blanco', value: 'Blanco' },
  { label: 'Rosa', value: 'Rosa' },
  { label: 'Verde', value: 'Verde' },
]

// Columnas de la tabla
const columns = [
  {
    name: 'imagen',
    required: true,
    label: 'Imagen',
    align: 'center',
    field: 'imagen',
    sortable: false,
  },
  {
    name: 'codigo',
    required: true,
    label: 'Código',
    align: 'left',
    field: 'codigo',
    sortable: true,
  },
  {
    name: 'producto',
    required: true,
    label: 'Producto',
    align: 'left',
    field: 'descripcion',
    sortable: true,
  },
  {
    name: 'categoria',
    label: 'Categoría',
    align: 'left',
    field: 'categoria_nombre',
    sortable: true,
  },
  {
    name: 'marca',
    label: 'Marca',
    align: 'left',
    field: 'marca_nombre',
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
    name: 'color',
    label: 'Color',
    align: 'left',
    field: 'color',
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
    name: 'precio',
    label: 'Precio',
    align: 'right',
    field: 'precio',
    sortable: true,
    format: (val) => `$${val.toFixed(2)}`,
  },
  // {
  //   name: 'estado',
  //   label: 'Estado',
  //   align: 'center',
  //   field: 'estado',
  //   sortable: true,
  // },
  {
    name: 'stock',
    label: 'Stock',
    align: 'right',
    field: 'stock',
    sortable: true,
  },
  {
    name: 'acciones',
    label: 'Acciones',
    align: 'center',
    field: 'acciones',
    sortable: false,
  },
]

// Datos de ejemplo
const productos = ref([])
productosStore.getProductSummary().then(function (res) {
  productos.value.push(...res)
})
// Computed
const filteredProducts = computed(() => {
  let filtered = productos.value

  // Filtro de búsqueda
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(
      (product) =>
        product.codigo.toLowerCase().includes(search) ||
        product.descripcion.toLowerCase().includes(search) ||
        product.tipo_producto.toLowerCase().includes(search),
    )
  }

  // Filtro de categoría
  if (filters.value.categoria) {
    filtered = filtered.filter((product) => product.categoria_id === filters.value.categoria)
  }

  // Filtro de marca
  if (filters.value.marca) {
    filtered = filtered.filter((product) => product.marca_id === filters.value.marca)
  }

  // Filtro de precio
  filtered = filtered.filter(
    (product) =>
      product.precio >= filters.value.precioRange.min &&
      product.precio <= filters.value.precioRange.max,
  )

  // Filtros avanzados
  if (filters.value.genero) {
    filtered = filtered.filter((product) => product.genero === filters.value.genero)
  }

  if (filters.value.material) {
    filtered = filtered.filter((product) => product.material === filters.value.material)
  }

  if (filters.value.color) {
    filtered = filtered.filter((product) => product.color === filters.value.color)
  }

  return filtered
})

const paginatedProducts = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage
  const end = start + pagination.value.rowsPerPage
  return filteredProducts.value.slice(start, end)
})

const clearFilters = () => {
  filters.value = {
    search: '',
    categoria: null,
    marca: null,
    estados: ['Disponible'],
    precioRange: { min: 0, max: 500 },
    genero: null,
    material: null,
    color: null,
  }
}

const onRequest = (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  loading.value = true

  // Simular llamada al servidor
  setTimeout(() => {
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
    pagination.value.rowsNumber = filteredProducts.value.length

    loading.value = false
  }, 1)
}

const getProductDescription = (product) => {
  return `${product.material} | ${product.color} | ${product.genero}`
}

const getColorHex = (colorName) => {
  const colorMap = {
    Azul: '#2196f3',
    Rojo: '#f44336',
    Negro: '#424242',
    Blanco: '#fafafa',
    Rosa: '#e91e63',
    Verde: '#4caf50',
    Beige: '#d4b896',
  }
  return colorMap[colorName] || '#grey'
}

const getEstadoColor = (estado) => {
  const colorMap = {
    Disponible: 'positive',
    'Poco Stock': 'warning',
    Agotado: 'negative',
  }
  return colorMap[estado] || 'grey'
}

const getStockClass = (stock) => {
  if (stock === 0) return 'text-negative text-weight-bold'
  if (stock < 10) return 'text-warning text-weight-bold'
  return 'text-positive text-weight-bold'
}

const clearSelection = () => {
  selected.value = []
}

const productoByCodigo = ref([])

export default {
  name: 'ProductListComponent',
  components: {
    ProductDetailModal,
  },

  setup() {
    const $q = useQuasar()
    // Acciones
    const createProduct = () => {
      $q.notify({
        type: 'info',
        message: 'Abriendo formulario de nuevo producto...',
        position: 'top',
      })
    }

    // Estados para el modal de detalles
    const showProductModal = ref(false)
    const selectedProductForModal = ref(null)

    const viewProduct = (product) => {
      // productosStore.getProductoByCodigo(product.codigo).then(function (res) {
      //   productoByCodigo.value = res
      //   console.log(productoByCodigo.value)
      // })
      selectedProductForModal.value = product
      showProductModal.value = true
      // $q.notify({
      //   type: 'info',
      //   message: `Viendo detalles de: ${product.descripcion}`,
      //   position: 'top',
      // })
    }

    const exportProducts = () => {
      $q.notify({
        type: 'positive',
        message: 'Exportando productos...',
        position: 'top',
      })
    }

    const openSettings = () => {
      $q.notify({
        type: 'info',
        message: 'Abriendo configuración...',
        position: 'top',
      })
    }

    const exportSelected = () => {
      $q.notify({
        type: 'positive',
        message: `Exportando ${selected.value.length} productos seleccionados`,
        position: 'top',
      })
    }

    return {
      // Estados
      loading,
      showAdvancedFilters,
      selected,
      filters,
      pagination,
      productos,

      // Opciones
      categoriaOptions,
      marcaOptions,
      generoOptions,
      materialOptions,
      colorOptions,
      columns,

      // Computed
      filteredProducts,
      paginatedProducts,

      // Métodos
      clearFilters,
      onRequest,
      getProductDescription,
      getColorHex,
      getEstadoColor,
      getStockClass,
      createProduct,
      viewProduct,
      exportProducts,
      openSettings,
      exportSelected,
      clearSelection,

      //dialog
      productoByCodigo,
      API_URL,
      // Estados del modal
      showProductModal,
      selectedProductForModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-table {
  .q-table__top {
    padding: 12px 16px;
  }

  .q-table thead tr th {
    position: sticky;
    z-index: 1;
    background: #f5f5f5;
    font-weight: 600;
  }

  .q-table tbody td {
    padding: 8px 16px;
  }
}

.color-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  display: inline-block;
}

.q-chip {
  font-size: 11px;
  font-weight: 500;
}

.q-toolbar {
  min-height: 50px;
}

@media (max-width: 768px) {
  .product-table {
    .q-table--horizontal-separator thead th {
      position: relative;
    }
  }
}
</style>
