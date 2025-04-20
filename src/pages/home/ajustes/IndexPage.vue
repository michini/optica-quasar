<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card>
        <q-tabs v-model="tab" class="bg-blue-7 text-white" align="justify" narrow-indicator>
          <q-tab name="barcode" label="Codigos de barra" />
          <q-tab name="product" label="Tipo de producto" exact replace />
          <q-tab name="brand" label="Marcas" />
          <q-tab name="category" label="Categoria" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="text-dark text-center">
          <q-tab-panel name="barcode">
            <div class="text-h6">codigos de barr</div>
            solicitar: <br />
            cantida, precio, color,material,
          </q-tab-panel>

          <q-tab-panel name="product"
            ><ajustes-tipo-producto-page></ajustes-tipo-producto-page
          ></q-tab-panel>

          <q-tab-panel name="brand" class="">
            <div class="row">
              <div
                class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-xs-12"
              >
                <q-card class="">
                  <q-card-section>
                    <div class="text-h6">Nueva marca</div>
                    <q-input filled v-model="productType" label="Tipo de producto" />
                  </q-card-section>

                  <q-card-actions>
                    <q-btn label="Guardar" color="primary" />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="category" class="bg-lime-1 text-dark">
            <div class="text-h6">Categorias</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AjustesTipoProductoPage from 'src/pages/home/ajustes/sections/AjustesTipoProductoPage.vue'

export default {
  components: {
    AjustesTipoProductoPage,
  },
  setup() {
    return {
      tab: ref('product'),
      filter: ref(''),
    }
  },
}
</script>
