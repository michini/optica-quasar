<template>
  <div class="row bg-grey-3 q-pa-md">
    <div class="col-12 col-md-4 q-px-md q-py-md">
      <p class="text-body1">
        <span class="text-weight-bold">A paragraph of text</span> with
        <a href="#" class="text-primary">an unassigned link</a>.
      </p>
      <p>
        A second row of text with a
        <a href="#" class="text-primary">web link</a>.
      </p>
      <p class="flex items-center">
        <q-icon name="info" size="xs" class="q-mr-xs" />
        <span>inline with text.</span>
      </p>
    </div>

    <div class="col-12 col-md-4 q-px-md q-py-md">
      <div class="text-center">
        <q-list dense>
          <q-item clickable to="/">
            <q-item-section>Inicio</q-item-section>
          </q-item>
          <q-item clickable to="/servicio">
            <q-item-section>Servicio</q-item-section>
          </q-item>
          <q-item clickable to="/nosotros">
            <q-item-section>Nosotros</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="col-12 col-md-4 q-px-md q-py-md">
      <div class="row justify-center">
        <q-btn
          flat
          round
          color="primary"
          icon="fab fa-facebook-f"
          type="a"
          href="#"
          label="Opticas"
          stack
        />
        <q-btn
          flat
          round
          color="primary"
          icon="fab fa-instagram"
          type="a"
          href="#"
          label="Opticas"
          stack
        />
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn flat round color="grey" icon="email" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterSection',
})
</script>
