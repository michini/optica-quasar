<template>
  <section id="contacto" class="q-pt-auto q-pb-xl">
    <div class="text-center q-mb-lg">
      <h2 class="text-h3">Contacto</h2>
    </div>

    <div class="row justify-center q-px-md">
      <div class="col-xs-12 col-md-10 col-lg-8">
        <div class="row q-col-gutter-md">
          <!-- Mapa -->
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <!-- Mapa placeholder (en producción se usaría un componente de mapa real) -->

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4841.468366103601!2d-75.21358262402022!3d-12.069368742323888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964fa49201d5%3A0xe39e558c8899c379!2sOpticas%20Pa&#39;ti!5e1!3m2!1ses!2spe!4v1745381407107!5m2!1ses!2spe"
                  style="border: 0; width: 100%; height: 200px"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
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
                  <div>Jr. Arequipa 521, Huancayo 12001 - Huancayo</div>
                </div>
              </div>
            </div>

            <!-- Teléfono -->
            <div class="contact-info q-mb-md">
              <div class="row items-center">
                <div class="col-2">
                  <!-- <q-icon name="phone" size="md" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 500" fill="white">
                    <path
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    />
                  </svg>
                </div>
                <div class="col-10">
                  <div class="text-subtitle1 text-weight-bold">Teléfono</div>
                  <div>
                    <a href="https://wa.me/998547145" style="color: white" target="_blank"
                      >998547145</a
                    >
                  </div>
                  <div>064-748456</div>
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
                  <div>opticas.pati@gmail.com</div>
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
