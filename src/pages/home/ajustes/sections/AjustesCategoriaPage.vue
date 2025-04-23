<template>
  <q-tab-panel name="product">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-card-actions>
              <q-btn
                label="Nuevo"
                color="primary"
                @click="[(prompt = true), cleanForm(), (titulo = 'Nueva ' + section)]"
              />
            </q-card-actions>
            <div class="q-pa-md">
              <q-table
                :grid="$q.screen.xs"
                flat
                bordered
                title="Listado"
                :rows="rows"
                :columns="columns"
                row-key="name"
                :filter="filter"
              >
                <template v-slot:top-right>
                  <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body-cell-opciones="scope">
                  <q-td :props="scope">
                    <q-btn
                      color="primary"
                      icon="edit"
                      @click="[
                        ((prompt = true),
                        (titulo = 'Actualizar ' + section),
                        (categoria.nombre = scope.row.nombre),
                        (categoria.tipoProducto = scope.row.tipo_producto.nombre),
                        (categoria.tipoProductoId = scope.row.tipo_producto.id),
                        (categoria.id = scope.row.id)),
                        ,
                      ]"
                      flat
                    />
                    <q-btn
                      color="negative"
                      icon="delete"
                      @click="deleteCategoria(scope.row.id)"
                      flat
                    />
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-tab-panel>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ titulo }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-md column">
        <q-input
          outlined
          :dense="dense"
          label="Categoria"
          v-model="categoria.nombre"
          autofocus
          @keyup.enter="prompt = false"
        />
        <q-select
          filled
          outlined
          v-model="categoria.tipoProducto"
          :options="options"
          @filter="filterFn"
          label="Tipo producto"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn
          v-if="titulo == 'Nueva ' + section"
          flat
          label="Añadir"
          v-close-popup
          @click="addCategoria()"
        />
        <q-btn
          v-if="titulo == 'Actualizar ' + section"
          flat
          label="Actualizar"
          v-close-popup
          @click="editCategoria(categoria)"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useCategoriaStore } from 'src/stores/useCategoriaStore'
import { useTipoProductoStore } from 'src/stores/useTipoProductoStore'
import { Notify, Dialog } from 'quasar'

const tipoProductosStore = useTipoProductoStore()

const options = ref([])

const filterFn = function (val, update) {
  setTimeout(() => {
    update(() => {
      options.value = tipoProductosStore.tipoProductos.map((item) => {
        return {
          label: item.nombre,
          value: item.id,
        }
      })
    })
  }, 1)
}

const prompt = ref(false)
const CategoriaStore = useCategoriaStore()
const allCategorias = CategoriaStore.getAll()
const rows = ref([])
const categoria = ref({
  nombre: '',
  tipoProducto: '',
  tipoProductoId: '',
})
const titulo = ref('')

const cleanForm = () => {
  categoria.value.nombre = null
  categoria.value.tipoProducto = null
  categoria.value.tipoProductoId = null
}

const columns = [
  { name: 'id', align: 'center', label: 'Id', field: 'id', sortable: true },
  {
    name: 'desc',
    required: true,
    label: 'Categoria',
    align: 'left',
    field: 'nombre',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'tipo_producto',
    label: 'Tipo producto',
    field: (val) => {
      return val.tipo_producto ? val.tipo_producto.nombre : ''
    },
    align: 'left',
  },
  { name: 'created_at', label: 'Fecha creada', field: 'created_at', align: 'center' },
  { name: 'updated_at', label: 'Fecha actualizada', field: 'updated_at', align: 'center' },
  { name: 'opciones', label: 'Opciones', field: 'updated_at', align: 'center' },
]

allCategorias
  .then(function (res) {
    rows.value = res
  })
  .catch(function (err) {
    console.log(err)
  })

const addCategoria = () => {
  CategoriaStore.create({
    nombre: categoria.value.nombre,
    tipo_producto_id: categoria.value.tipoProducto.value,
  })
    .then(function (res) {
      console.log(res)
      rows.value.push(res.categoria)
      cleanForm()
      Notify.create({
        message: res.message,
        icon: 'check_circle',
        type: 'positive',
        color: 'green',
        position: 'top',
        timeout: 2000,
      })
    })
    .catch(function (err) {
      Notify.create({
        message: err.message,
        icon: 'error',
        type: 'negative',
        color: 'red',
        position: 'top',
        timeout: 2000,
      })
    })
}

const editCategoria = (row) => {
  console.log(row)
  CategoriaStore.update(
    {
      id: row.id,
      nombre: row.nombre,
      tipo_producto_id: row.tipoProducto.value ? row.tipoProducto.value : row.tipoProductoId,
    },
    row.id,
  )
    .then(function (res) {
      rows.value = rows.value.map((item) => {
        if (item.id === row.id) {
          item.nombre = row.nombre
          item.tipo_producto = res.tipo_producto
          item.updated_at = res.tipo_producto.updated_at
        }
        return item
      })

      Notify.create({
        message: res.message,
        icon: 'check_circle',
        type: 'positive',
        color: 'green',
        position: 'top',
        timeout: 2000,
      })
    })
    .catch(function (err) {
      Notify.create({
        message: err.message,
        icon: 'error',
        type: 'negative',
        color: 'red',
        position: 'top',
        timeout: 2000,
      })
    })
}

const deleteCategoria = (row) => {
  console.log(row)
  Dialog.create({
    title: 'Eliminar categoria',
    message: '¿Está seguro de eliminar esta categoria?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      CategoriaStore.delete(row)
        .then(function (res) {
          rows.value = rows.value.filter((item) => item.id !== row)
          Notify.create({
            message: res.message,
            icon: 'check_circle',
            type: 'positive',
            color: 'green',
            position: 'top',
            timeout: 2000,
          })
        })
        .catch(function (err) {
          Notify.create({
            message: err.message,
            icon: 'error',
            type: 'negative',
            color: 'red',
            position: 'top',
            timeout: 2000,
          })
        })
    })
    .onCancel(() => {
      console.log('Cancel')
    })
    .onDismiss(() => {
      console.log("I'm triggered on both OK and Cancel")
    })
}

export default {
  setup() {
    return {
      section: 'categoria',
      filter: ref(''),
      columns,
      rows,
      addCategoria,
      editCategoria,
      deleteCategoria,
      prompt,
      dense: ref(false),
      categoria,
      titulo,
      model: ref(null),
      filterFn,
      cleanForm,
      options,
    }
  },
}
</script>
