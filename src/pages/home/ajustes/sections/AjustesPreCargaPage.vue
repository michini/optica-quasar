<template>
  <q-tab-panel name="product">
    <div class="row">
      <div class="col-lg-12 offset-lg-0 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-card-actions>
              <q-btn
                label="Nuevo"
                color="primary"
                @click="[(prompt = true), cleanForm(), (titulo = 'Nueva ' + section)]"
              />
            </q-card-actions>
            <div class="q-pa-xs">
              <div class="row">
                <div class="col-lg-3" v-for="card in cards" :key="card" style="padding: 2px">
                  <q-card class="text-left" flat bordered>
                    <q-card-section>
                      <q-card-section class="q-pt-xs q-pb-xs col-5">
                        <div class="text-h5 q-mt-sm q-mb-xs">
                          {{ card.tipo_producto.nombre }}
                          <q-badge
                            v-if="card.genero"
                            :color="
                              card.genero === 'Hombre'
                                ? 'primary'
                                : card.genero === 'Mujer'
                                  ? 'pink'
                                  : 'green'
                            "
                            >{{ card.genero }}</q-badge
                          >
                        </div>
                        <div class="text-caption">
                          <div class="row q-ml-xs">
                            <div class="col-6">
                              <p class="q-mb-none">
                                <b>Marca: </b
                                ><span class="text-color-card">{{ card.marca.nombre }}</span>
                              </p>
                              <p class="q-mb-none">
                                <b>Categoria: </b
                                ><span class="text-color-card">{{ card.categoria.nombre }}</span>
                              </p>
                              <p class="q-mb-none">
                                <b>Precio: </b
                                ><span class="text-color-card">{{ card.precio }}</span>
                              </p>
                            </div>
                            <div class="col-6">
                              <p class="q-mb-none">
                                <b>Cantidad: </b
                                ><span class="text-color-card">{{ card.cantidad }}</span>
                              </p>
                              <p class="q-mb-none">
                                <b>Color: </b><span class="text-color-card">{{ card.color }}</span>
                              </p>
                              <p class="q-mb-none">
                                <b>Material: </b
                                ><span class="text-color-card">{{ card.material }}</span>
                              </p>
                            </div>
                          </div>
                          <div class="row q-ml-xs">
                            <div class="col-12">
                              <p class="q-ma-none">
                                <b>Fecha creación: </b
                                ><span class="text-color-card">{{ card.created_at }}</span>
                              </p>
                              <p class="q-ma-none">
                                <b>Fecha actualizacion: </b
                                ><span class="text-color-card">{{ card.updated_at }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </q-card-section>

                      <q-card-section class="col-5">
                        <q-img
                          class="rounded-borders"
                          :src="hostname + card.imagen"
                          style="max-height: 150px"
                        >
                          <div class="text-subtitle2 text-right">
                            {{ card.id }}
                          </div>
                          <div class="absolute-bottom text-left" style="font-size: 11px">
                            {{ card.descripcion }}
                          </div>
                        </q-img>
                      </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                      <q-btn
                        flat
                        round
                        icon="edit"
                        @click="
                          ((prompt = true),
                          (titulo = 'Actualizar ' + section),
                          (preCarga.tipo_producto = card.tipo_producto.nombre),
                          (preCarga.marca = card.marca.nombre),
                          (preCarga.categoria = card.categoria.nombre),
                          (preCarga.cantidad = card.cantidad),
                          (preCarga.precio = card.precio),
                          (preCarga.color = card.color),
                          (preCarga.material = card.material),
                          (preCarga.descripcion = card.descripcion),
                          (preCarga.imagen = card.imagen),
                          (preCarga.genero = card.genero),
                          (preCarga.id = card.id),
                          (preCarga.tipoProductoId = card.tipo_producto.id),
                          (preCarga.marcaId = card.marca.id),
                          (preCarga.categoriaId = card.categoria.id))
                        "
                      />
                      <q-btn
                        color="negative"
                        icon="delete"
                        @click="deletePreCarga(card.id)"
                        flat
                        round
                      />
                      <!-- <q-btn flat color="primary"> Reserve </q-btn> -->
                      <q-btn
                        flat
                        v-if="!card.barcode"
                        round
                        icon="add"
                        color="positive"
                        @click="addProducts(card.id)"
                      >
                        <!-- <q-badge color="red" rounded floating /> -->
                      </q-btn>
                      <q-btn
                        flat
                        round
                        v-if="card.barcode"
                        icon="add"
                        color="positive"
                        @click="((promptAdicional = true), (adicional.pre_carga_id = card.id))"
                      >
                        <q-badge color="red" floating transparent rounded>
                          {{ card.adicionales.length }}
                        </q-badge>
                      </q-btn>
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-tab-panel>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 50%">
      <q-card-section>
        <div class="text-h6">{{ titulo }}</div>
      </q-card-section>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-select
              filled
              outlined
              v-model="preCarga.tipo_producto"
              :options="optionsTipoProducto"
              @filter="filterFnTipoProducto"
              @update:model-value="selectTipoProducto"
              label="Tipo producto"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-select
              filled
              outlined
              v-model="preCarga.marca"
              :options="optionsMarca"
              label="Marca"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-select
              filled
              outlined
              v-model="preCarga.categoria"
              :options="optionsCategoria"
              label="Categoria"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-input filled outlined v-model="preCarga.cantidad" type="number" label="Cantidad" />
          </q-card-section>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-input filled outlined v-model="preCarga.precio" type="number" label="Precio" />
          </q-card-section>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-input filled outlined v-model="preCarga.color" label="Color" />
          </q-card-section>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-input filled outlined v-model="preCarga.material" label="Material" />
          </q-card-section>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-input
              filled
              outlined
              v-model="preCarga.descripcion"
              type="textarea"
              label="Descripción"
            />
          </q-card-section>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-uploader
              ref="uploader"
              :url="hostname + '/api/pre-carga/upload'"
              accept="image/*"
              :headers="headers"
              @uploaded="onUploaded"
              field-name="imagen"
              auto-upload
              style="max-width: 100%"
            >
              <template v-slot:list v-if="titulo == 'Actualizar ' + section">
                <q-list separator>
                  <img :src="hostname + preCarga.imagen" style="max-height: 150px" />
                </q-list>
              </template>
            </q-uploader>
          </q-card-section>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card-section class="q-pt-none q-gutter-y-md column">
            <q-select
              filled
              outlined
              v-model="preCarga.genero"
              :options="['Hombre', 'Mujer', 'Niños']"
              label="Genero"
            >
            </q-select>
          </q-card-section>
        </div>
      </div>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn
          v-if="titulo == 'Nueva ' + section"
          flat
          label="Añadir"
          v-close-popup
          @click="addPrecarga()"
        />
        <q-btn
          v-if="titulo == 'Actualizar ' + section"
          flat
          label="Actualizar"
          v-close-popup
          @click="editPreCarga(preCarga)"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="promptAdicional" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Agregar nueva cantidad</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-md column">
        <q-input
          outlined
          :dense="dense"
          v-model="adicional.cantidad"
          label="Cantidad"
          type="number"
          autofocus
          @keyup.enter="promptAdicional = false"
        />
        <div>
          <q-checkbox v-model="adicional.barcode" label="Generar productos" />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Cancelar"
          v-close-popup
          @click="((adicional.barcode = false), (adicional.cantidad = null))"
        />
        <q-btn
          flat
          label="Añadir"
          :disabled="!adicional.barcode"
          v-close-popup
          @click="addAdicional()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { usePreCargaStore } from 'src/stores/usePreCargaStore'
import { useTipoProductoStore } from 'src/stores/useTipoProductoStore'
import { useCategoriaStore } from 'src/stores/useCategoriaStore'
import { useMarcaStore } from 'src/stores/useMarcaStore'
import { useAdicionalStore } from 'src/stores/useAdicionalStore'
import { useProductoStore } from 'src/stores/useProductoStore'
import { Notify, Dialog } from 'quasar'

const hostname = ref(process.env.API_URL)
const prompt = ref(false)
const promptAdicional = ref(false)
const PreCargaStore = usePreCargaStore()
const getAllPrecarga = PreCargaStore.getAll()
const cards = ref({})
const preCarga = ref({
  id: '',
  cantidad: '',
  color: '',
  material: '',
  precio: '',
  descripcion: '',
  marca: '',
  tipo_producto: '',
  categoria: '',
  barcode: '',
  imagen: '',
  tipoProductoId: '',
  marcaId: '',
  categoriaId: '',
  genero: '',
  adicionales: [],
})
const titulo = ref('')
const optionsTipoProducto = ref([])
const optionsMarca = ref([])
const optionsCategoria = ref([])

const tipoProductosStore = useTipoProductoStore()
const categoriasStore = useCategoriaStore()
const marcasStore = useMarcaStore()
const adicionalStore = useAdicionalStore()
const productoStore = useProductoStore()
const adicional = ref({
  cantidad: '',
  pre_carga_id: '',
  barcode: false,
  total: 0,
})

const cleanForm = () => {
  preCarga.value = {
    id: '',
    cantidad: '',
    color: '',
    material: '',
    precio: '',
    descripcion: '',
    marca: '',
    tipo_producto: '',
    categoria: '',
    barcode: '',
    imagen: '',
    tipoProductoId: '',
    marcaId: '',
    categoriaId: '',
    adicionales: [],
    genero: '',
  }
}

const filterFnTipoProducto = function (val, update) {
  setTimeout(() => {
    update(() => {
      preCarga.value.marca = ''
      preCarga.value.categoria = ''
      optionsTipoProducto.value = tipoProductosStore.tipoProductos.map((item) => {
        return {
          label: item.nombre,
          value: item.id,
        }
      })
    })
  }, 1)
}

const selectTipoProducto = (newVal) => {
  marcasStore
    .getByProductoId({ tipoProductoId: newVal.value })
    .then((res) => {
      optionsMarca.value = res.map((item) => {
        return {
          label: item.nombre,
          value: item.id,
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  // categoriasStore
  categoriasStore
    .getByProductoId({ tipoProductoId: newVal.value })
    .then((res) => {
      optionsCategoria.value = res.map((item) => {
        return {
          label: item.nombre,
          value: item.id,
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getAllPrecarga
  .then(function (res) {
    cards.value = res
  })
  .catch(function (err) {
    console.log(err)
  })

const addPrecarga = () => {
  PreCargaStore.create({
    cantidad: preCarga.value.cantidad,
    color: preCarga.value.color,
    material: preCarga.value.material,
    precio: preCarga.value.precio,
    descripcion: preCarga.value.descripcion,
    marca_id: preCarga.value.marca.value,
    tipo_producto_id: preCarga.value.tipo_producto.value,
    categoria_id: preCarga.value.categoria.value,
    barcode: preCarga.value.barcode,
    imagen: preCarga.value.imagen,
    genero: preCarga.value.genero,
  })
    .then(function (res) {
      cards.value.unshift(res.preCarga)
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

const onUploaded = (info) => {
  console.log('Imagen subida correctamente:', info)
  let resp = String(info.files[0].xhr.response)
  let cleared = resp.replace(/\\\\"/g, '"').replace(/\\\\/g, '/')
  preCarga.value.imagen = JSON.parse(cleared).url
}

const editPreCarga = (row) => {
  PreCargaStore.update(
    {
      id: row.id,
      cantidad: row.cantidad,
      color: row.color,
      material: row.material,
      precio: row.precio,
      descripcion: row.descripcion,
      //barcode: '',
      genero: row.genero,
      imagen: row.imagen,
      tipo_producto_id: row.tipo_producto.value ? row.tipo_producto.value : row.tipoProductoId,
      marca_id: row.marca.value ? row.marca.value : row.marcaId,
      categoria_id: row.categoria.value ? row.categoria.value : row.categoriaId,
    },
    row.id,
  )
    .then(function (res) {
      cards.value = cards.value.map((item) => {
        if (item.id === row.id) {
          item.cantidad = row.cantidad
          item.color = row.color
          item.material = row.material
          item.precio = row.precio
          item.descripcion = row.descripcion
          item.imagen = res.preCarga.imagen
          item.categoria = res.categoria
          item.marca = res.marca
          item.genero = res.preCarga.genero
          item.tipo_producto = res.tipo_producto
          item.updated_at = res.preCarga.updated_at
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
      console.log(err)
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

const deletePreCarga = (row) => {
  Dialog.create({
    title: 'Eliminar producto',
    message: '¿Está seguro de eliminar este producto?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    PreCargaStore.delete(row)
      .then(function (res) {
        cards.value = cards.value.filter((item) => item.id !== row)
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
        console.log(err)
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
}

const addAdicional = () => {
  adicionalStore
    .create({ cantidad: adicional.value.cantidad, pre_carga_id: adicional.value.pre_carga_id })
    .then(function (res) {
      Notify.create({
        message: res.message,
        icon: 'check_circle',
        type: 'positive',
        color: 'green',
        position: 'top',
        timeout: 2000,
      })
      productoStore
        .insertByPreCarga({
          preCargaId: adicional.value.pre_carga_id,
          adicionalId: res.adicional.id,
        })
        .then(function (res2) {
          Notify.create({
            message: res2.message,
            icon: 'check_circle',
            type: 'positive',
            color: 'green',
            position: 'top',
            timeout: 2000,
          })
        })
        .catch(function (err2) {
          Notify.create({
            message: err2.message,
            icon: 'error',
            type: 'negative',
            color: 'red',
            position: 'top',
            timeout: 2000,
          })
        })
      adicional.value.cantidad = ''
      adicional.value.pre_carga_id = ''
      adicional.value.total = res.adicional_total
      adicional.value.barcode = false
      preCarga.value.adicionales.push(res.adicional)

      // Buscar la precarga correspondiente y agregar el adicional
      const card = cards.value.find((item) => item.id === res.adicional.pre_carga_id)
      if (card) {
        card.adicionales.push(res.adicional)
      }
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

const addProducts = (preCargaId) => {
  productoStore
    .insertByPreCarga({
      preCargaId: preCargaId,
      adicionalId: null,
    })
    .then(function (res) {
      Notify.create({
        message: res.message,
        icon: 'check_circle',
        type: 'positive',
        color: 'green',
        position: 'top',
        timeout: 2000,
      })

      cards.value = cards.value.map((item) => {
        if (item.id === preCargaId) {
          item.barcode = res.preCarga.barcode
        }
        return item
      })
    })
    .catch(function (err) {
      console.log(err)
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

export default {
  setup() {
    return {
      section: 'Pre carga',
      filter: ref(''),
      cards,
      addPrecarga,
      editPreCarga,
      deletePreCarga,
      prompt,
      dense: ref(false),
      preCarga,
      titulo,
      optionsTipoProducto,
      optionsMarca,
      optionsCategoria,
      cleanForm,
      selectTipoProducto,
      filterFnTipoProducto,
      onUploaded,
      headers: [
        {
          name: 'Authorization',
          value: `Bearer ${localStorage.getItem('token')}`,
        },
      ],
      hostname,
      addAdicional,
      promptAdicional,
      adicional,
      addProducts,
    }
  },
}
</script>

<style>
.text-color-card {
  color: rgb(160, 160, 160);
}
</style>
