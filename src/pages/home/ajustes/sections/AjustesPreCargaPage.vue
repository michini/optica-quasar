<template>
  <q-tab-panel name="preload">
    <div class="text-h6">codigos de barr</div>
    solicitar: <br />
    cantida, precio, color,material,
    <div class="row">
      <div class="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-card-actions>
              <q-btn label="Nuevo" color="primary" @click="[alert('Nuevo')]" />
            </q-card-actions>
            <div class="q-pa-md"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-tab-panel>
</template>

<script setup>
//
</script>
