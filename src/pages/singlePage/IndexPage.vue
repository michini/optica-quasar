<template>
  <!-- Banner principal con el logo de óptica -->
  <div class="">
    <q-carousel swipeable animated v-model="slide" :autoplay="autoplay" ref="carousel" infinite>
      <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Second stop</div>
          <div class="text-subtitle1">Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Third stop</div>
          <div class="text-subtitle1">Famous Bridge</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Fourth stop</div>
          <div class="text-subtitle1">Quasar Framework</div>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]" class="q-gutter-xs">
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_left"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push
            round
            dense
            color="orange"
            text-color="black"
            icon="arrow_right"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>

  <!-- Sección de Servicios -->
  <ServicesSection />

  <!-- Sección Nosotros -->
  <AboutSection />

  <!-- Sección de Contacto -->
  <ContactSection />
</template>

<script>
import { defineComponent } from 'vue'
import ServicesSection from 'components/singlePage/ServicesSection.vue'
import AboutSection from 'components/singlePage/AboutSection.vue'
import ContactSection from 'components/singlePage/ContactSection.vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ServicesSection,
    AboutSection,
    ContactSection,
  },
  setup() {
    return {
      slide: ref('first'),
      autoplay: ref(true),
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
