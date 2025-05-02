<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card>
        <q-tabs v-model="tab" class="bg-blue-7 text-white" align="justify" narrow-indicator>
          <q-tab name="preload" label="Pre carga de productos" />
          <q-tab name="product" label="Tipo de producto" exact replace />
          <q-tab name="brand" label="Marcas" />
          <q-tab name="category" label="Categoria" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="text-center">
          <q-tab-panel name="preload">
            <ajustes-pre-carga-page></ajustes-pre-carga-page>
          </q-tab-panel>

          <q-tab-panel name="product"
            ><ajustes-tipo-producto-page></ajustes-tipo-producto-page
          ></q-tab-panel>

          <q-tab-panel name="brand">
            <ajustes-marca-page></ajustes-marca-page>
          </q-tab-panel>

          <q-tab-panel name="category">
            <ajustes-categoria-page></ajustes-categoria-page>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AjustesTipoProductoPage from 'src/pages/home/ajustes/sections/AjustesTipoProductoPage.vue'
import AjustesMarcaPage from 'src/pages/home/ajustes/sections/AjustesMarcaPage.vue'
import AjustesCategoriaPage from 'src/pages/home/ajustes/sections/AjustesCategoriaPage.vue'
import AjustesPreCargaPage from './sections/AjustesPreCargaPage.vue'

export default {
  components: {
    AjustesTipoProductoPage,
    AjustesMarcaPage,
    AjustesCategoriaPage,
    AjustesPreCargaPage,
  },
  setup() {
    return {
      tab: ref('preload'),
      filter: ref(''),
    }
  },
}
</script>
