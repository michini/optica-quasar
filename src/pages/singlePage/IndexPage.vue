<template>
  <!-- Banner principal con el logo de óptica -->
  <div class="">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      infinite
      height="500px"
    >
      <q-carousel-slide
        name="first"
        img-src="https://leoptica.com/cdn/shop/files/baner-leoptica-hombre-mujer-1.jpg?v=1730334294&width=2000"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Lúcete a tu estilo</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="2"
        img-src="https://leoptica.com/cdn/shop/files/baner-leoptica-mujer-mama-1.jpg?v=1714324798&width=2000"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Atención profesional</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="3"
        img-src="https://leoptica.com/cdn/shop/files/banner-clip-solar.jpg?v=1733182568&width=2000"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Monturas de calidad</div>
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
  <!-- Sección de Productos -->
  <ProductoGridSection />

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
import ProductoGridSection from 'src/components/singlePage/ProductoGridSection.vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ServicesSection,
    AboutSection,
    ContactSection,
    ProductoGridSection,
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
