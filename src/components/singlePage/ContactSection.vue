<template>
  <section id="contacto" class="q-py-xl">
    <div class="text-center q-mb-lg">
      <h2 class="text-h3">Contacto</h2>
    </div>

    <div class="row justify-center q-px-md">
      <div class="col-xs-12 col-md-10 col-lg-8">
        <div class="row q-col-gutter-md">
          <!-- Mapa -->
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section class="map-container">
                <!-- Mapa placeholder (en producción se usaría un componente de mapa real) -->
                <div class="map-placeholder"></div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Información de contacto -->
          <div class="col-12 col-md-6">
            <!-- Ubicación -->
            <div class="contact-info q-mb-md">
              <div class="row items-center">
                <div class="col-2">
                  <q-icon name="location_on" size="md" />
                </div>
                <div class="col-10">
                  <div class="text-subtitle1 text-weight-bold">Ubicanos</div>
                  <div>Jiron xxx/78 - Huancayo</div>
                </div>
              </div>
            </div>

            <!-- Teléfono -->
            <div class="contact-info q-mb-md">
              <div class="row items-center">
                <div class="col-2">
                  <q-icon name="phone" size="md" />
                </div>
                <div class="col-10">
                  <div class="text-subtitle1 text-weight-bold">Teléfono</div>
                  <div>999999999</div>
                  <div>776453234</div>
                </div>
              </div>
            </div>

            <!-- Correo -->
            <div class="contact-info">
              <div class="row items-center">
                <div class="col-2">
                  <q-icon name="email" size="md" />
                </div>
                <div class="col-10">
                  <div class="text-subtitle1 text-weight-bold">Correo</div>
                  <div>aaa@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactSection',
})
</script>

<style scoped>
.map-container {
  height: 250px;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect x="0" y="0" width="200" height="200" fill="rgb(200, 230, 200)"/><path d="M0,0 L200,0 L200,200 L0,200 Z" stroke="yellow" stroke-width="4" fill="none"/></svg>');
  background-size: cover;
}

.contact-info {
  padding: 10px;
  border-radius: 4px;
}
</style>
