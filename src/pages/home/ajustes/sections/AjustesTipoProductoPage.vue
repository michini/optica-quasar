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
                @click="[
                  ((prompt = true), (tipoProducto.nombre = null)),
                  (titulo = 'Nuevo producto'),
                ]"
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
                        (titulo = 'Actualizar producto'),
                        (tipoProducto.nombre = scope.row.nombre),
                        (tipoProducto.id = scope.row.id)),
                        ,
                      ]"
                      flat
                    />
                    <q-btn
                      color="negative"
                      icon="delete"
                      @click="deleteProductType(scope.row.id)"
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
          label="Tipo de producto"
          v-model="tipoProducto.nombre"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn
          v-if="titulo == 'Nuevo producto'"
          flat
          label="Añadir"
          v-close-popup
          @click="addProductType()"
        />
        <q-btn
          v-if="titulo == 'Actualizar producto'"
          flat
          label="Actualizar"
          v-close-popup
          @click="editProductType(tipoProducto)"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useTipoProductoStore } from 'src/stores/useTipoProductoStore'
import { Notify, Dialog } from 'quasar'

const prompt = ref(false)
const AjustesStore = useTipoProductoStore()
const allproducts = AjustesStore.getAll()
const rows = ref([])
const tipoProducto = ref({
  nombre: '',
})
const titulo = ref('')

const columns = [
  { name: 'calories', align: 'center', label: 'Id', field: 'id', sortable: true },
  {
    name: 'desc',
    required: true,
    label: 'Producto',
    align: 'left',
    field: 'nombre',
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'created_at', label: 'Fecha creada', field: 'created_at', align: 'center' },
  { name: 'updated_at', label: 'Fecha actualizada', field: 'updated_at', align: 'center' },
  { name: 'opciones', label: 'Opciones', field: 'updated_at', align: 'center' },
]

allproducts
  .then(function (res) {
    rows.value = res
  })
  .catch(function (err) {
    console.log(err)
  })

const addProductType = () => {
  AjustesStore.create({ nombre: tipoProducto.value.nombre })
    .then(function (res) {
      rows.value.push(res.tipo_producto)
      tipoProducto.value.nombre = ''
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
        message: err.response.data.message,
        icon: 'error',
        type: 'negative',
        color: 'red',
        position: 'top',
        timeout: 2000,
      })
    })
}

const editProductType = (row) => {
  console.log(row)
  AjustesStore.update(row, row.id)
    .then(function (res) {
      rows.value = rows.value.map((item) => {
        if (item.id === row.id) {
          item.nombre = row.nombre
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
        message: err.response.data.message,
        icon: 'error',
        type: 'negative',
        color: 'red',
        position: 'top',
        timeout: 2000,
      })
    })
}

const deleteProductType = (row) => {
  console.log(row)
  Dialog.create({
    title: 'Eliminar producto',
    message: '¿Está seguro de eliminar este producto?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      AjustesStore.delete(row)
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
            message: err.response.data.message,
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
      tab: ref('product'),
      filter: ref(''),
      columns,
      rows,
      addProductType,
      editProductType,
      deleteProductType,
      prompt,
      dense: ref(false),
      tipoProducto,
      titulo,
    }
  },
}
</script>
