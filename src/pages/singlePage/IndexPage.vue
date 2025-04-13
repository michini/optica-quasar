<template>
  <q-page>
    <!-- Banner principal con el logo de óptica -->
    <div class="banner q-py-xl flex flex-center">
      <div class="banner-graphic q-mx-auto"></div>
    </div>

    <!-- Sección de Servicios -->
    <ServicesSection />

    <!-- Sección Nosotros -->
    <AboutSection />

    <!-- Sección de Contacto -->
    <ContactSection />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ServicesSection from 'components/singlePage/ServicesSection.vue'
import AboutSection from 'components/singlePage/AboutSection.vue'
import ContactSection from 'components/singlePage/ContactSection.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ServicesSection,
    AboutSection,
    ContactSection,
  },
})
</script>

<style scoped>
.banner {
  min-height: 250px;
  background-color: white;
}

.banner-graphic {
  width: 400px;
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-graphic:before,
.banner-graphic:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.banner-graphic:before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300"><path d="M120,150 L200,50 L400,50 L480,150 L400,250 L200,250 Z" fill="none" stroke="black" stroke-width="3"/></svg>');
}
</style>
