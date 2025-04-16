<template>
  <section id="servicios" class="q-py-lg">
    <div class="text-center q-mb-lg">
      <h2 class="text-h3">Servicios</h2>
    </div>

    <div class="row justify-center q-px-md">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered>
          <div class="row">
            <!-- Panel de navegación de servicios -->
            <div class="col-12 col-sm-4 col-md-3 bg-grey-2">
              <q-list padding>
                <q-item
                  v-for="(tab, index) in tabs"
                  :key="index"
                  clickable
                  :active="selectedTab === index"
                  @click="selectedTab = index"
                  active-class="bg-grey-4"
                >
                  <q-item-section>{{ tab.label }}</q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Contenido de servicios -->
            <div class="col-12 col-sm-8 col-md-9 q-pa-md">
              <div v-for="(tab, index) in tabs" :key="index" v-show="selectedTab === index">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-7">
                    <p class="text-body1" v-for="n in 4" :key="n">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div class="col-12 col-md-5">
                    <q-card flat class="q-pa-sm">
                      <q-video src="" :ratio="16 / 9" />
                      <div class="row q-mt-sm">
                        <q-btn icon="play_arrow" flat round />
                        <q-slider v-model="videoPosition" :min="0" :max="100" class="col q-mx-sm" />
                        <q-btn icon="volume_up" flat round />
                        <q-btn icon="fullscreen" flat round />
                      </div>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ServicesSection',
  setup() {
    const selectedTab = ref(0)
    const videoPosition = ref(0)

    const tabs = [
      { label: 'Medida de vista', content: '' },
      { label: 'Monturas', content: '' },
      { label: 'Vidrios', content: '' },
      { label: 'Análisis', content: '' },
    ]

    return {
      selectedTab,
      videoPosition,
      tabs,
    }
  },
})
</script>
