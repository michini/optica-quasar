<template>
  <q-footer class="bg-white text-black" bordered>
    <div class="q-pa-md">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-3 col-sm-6 col-xs-12 text-center">
          <q-img
            src="~assets/logo_optica.jpg"
            alt="Opticas"
            width="220px"
            class="q-mb-md"
            no-spinner
            style="border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)"
          >
          </q-img>
        </div>

        <!-- SERVICIO AL CLIENTE -->
        <div class="col-12 col-sm-6 col-md col-xs-12 text-center">
          <p class="text-h6 text-weight-bold q-mb-sm">SERVICIO AL CLIENTE</p>
          <q-list dense padding class="q-mt-sm">
            <q-item clickable v-ripple to="/consulta-boleta" class="text-grey-8">
              <q-item-section>Consulta tu boleta</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/garantias" class="text-grey-8">
              <q-item-section>Garantías</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/servicio-garantia-extendida" class="text-grey-8">
              <q-item-section>Servicio de garantía extendida</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- NOSOTROS -->
        <div class="col-12 col-sm-6 col-md col-xs-12 text-center">
          <p class="text-h6 text-weight-bold q-mb-sm">NOSOTROS</p>
          <q-list dense padding class="q-mt-sm">
            <q-item clickable v-ripple to="/acerca-de" class="text-grey-8">
              <q-item-section>Acerca de Opticas Pa'ti</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/politicas-privacidad" class="text-grey-8">
              <q-item-section>Políticas de privacidad</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/trabaja-con-nosotros" class="text-grey-8">
              <q-item-section>Trabaja con nosotros</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/permisos-rss" class="text-grey-8">
              <q-item-section>Permisos RRSS</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- CONTACTO -->
        <div class="col-12 col-sm-6 col-md col-xs-12 text-center">
          <p class="text-h6 text-weight-bold q-mb-sm">CONTACTO</p>
          <q-list dense padding class="q-mt-sm">
            <q-item clickable v-ripple to="/contactanos" class="text-grey-8">
              <q-item-section>Contáctanos</q-item-section>
            </q-item>
            <q-item class="text-grey-8">
              <q-item-section>Horario de atención</q-item-section>
            </q-item>
            <q-item class="text-grey-8">
              <q-item-section>Lunes a sábado de 10:00 a 19:00 Hrs.</q-item-section>
            </q-item>
            <q-item class="text-grey-8">
              <q-item-section>0800 14600</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- SIGUENOS EN RRSS -->
        <div class="col-12 col-sm-6 col-md col-xs-12 text-center">
          <p class="text-h6 text-weight-bold q-mb-sm">SÍGUENOS EN RRSS</p>
          <div class="row q-gutter-md justify-center">
            <q-btn
              round
              flat
              color="black"
              type="a"
              href="https://www.facebook.com/LentesPaTi0205/"
              target="_blank"
              class="social-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="25px"
                height="25px"
              >
                <path
                  d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                />
              </svg>
            </q-btn>
            <q-btn
              round
              flat
              color="black"
              type="a"
              href="https://www.instagram.com/lentespati.1/"
              target="_blank"
              class="social-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="25px"
                height="25px"
              >
                <path
                  d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"
                />
              </svg>
            </q-btn>
            <q-btn
              round
              flat
              color="black"
              type="a"
              href="https://www.tiktok.com/es/"
              target="_blank"
              class="social-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="25px"
                height="25px"
              >
                <path
                  d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                />
              </svg>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterSection',
})
</script>

<style lang="scss" scoped>
.social-btn {
  border: 1px solid $grey-5;
  &:hover {
    background-color: $grey-2;
  }
}

.econopticas-logo {
  display: flex;
  flex-direction: column;
  .text-caption {
    margin-left: 3px;
  }
}
</style>
