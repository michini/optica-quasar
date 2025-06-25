<template>
  <q-card class="oftalmologo-card" flat bordered>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="col-8">
          <div class="text-h6 text-weight-bold">
            {{ oftalmologo.nombre }} {{ oftalmologo.apellidos }}
          </div>
          <div class="text-caption text-grey-6">
            {{ oftalmologo.especialidad }}
          </div>
        </div>
        <div class="col-4 text-right">
          <q-chip
            :color="oftalmologo.estado === 'activo' ? 'positive' : 'negative'"
            text-color="white"
            :label="oftalmologo.estado"
            size="sm"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-sm">
      <div class="row q-gutter-sm">
        <div class="col-12">
          <div class="info-item">
            <q-icon name="badge" class="text-grey-6 q-mr-sm" />
            <span class="text-weight-medium">DNI:</span>
            <span class="q-ml-xs">{{ oftalmologo.dni }}</span>
          </div>
        </div>

        <div class="col-12">
          <div class="info-item">
            <q-icon name="medical_services" class="text-grey-6 q-mr-sm" />
            <span class="text-weight-medium">CMP:</span>
            <span class="q-ml-xs">{{ oftalmologo.cmp }}</span>
          </div>
        </div>

        <div v-if="oftalmologo.rne" class="col-12">
          <div class="info-item">
            <q-icon name="card_membership" class="text-grey-6 q-mr-sm" />
            <span class="text-weight-medium">RNE:</span>
            <span class="q-ml-xs">{{ oftalmologo.rne }}</span>
          </div>
        </div>

        <div class="col-12">
          <div class="info-item">
            <q-icon name="phone" class="text-grey-6 q-mr-sm" />
            <span class="text-weight-medium">Teléfono:</span>
            <span class="q-ml-xs">{{ oftalmologo.telefono }}</span>
          </div>
        </div>

        <div class="col-12">
          <div class="info-item">
            <q-icon name="email" class="text-grey-6 q-mr-sm" />
            <span class="text-weight-medium">Email:</span>
            <span class="q-ml-xs text-primary">{{ oftalmologo.email }}</span>
          </div>
        </div>

        <div class="col-12">
          <div class="info-item">
            <q-icon name="location_on" class="text-grey-6 q-mr-sm" />
            <span class="text-weight-medium">Dirección:</span>
            <span class="q-ml-xs">{{ oftalmologo.direccion }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="q-pt-none">
      <q-btn flat round color="primary" icon="edit" @click="$emit('edit')">
        <q-tooltip>Editar</q-tooltip>
      </q-btn>
      <q-btn flat round color="negative" icon="delete" @click="$emit('delete')">
        <q-tooltip>Eliminar</q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
// Props
defineProps({
  oftalmologo: {
    type: Object,
    required: true,
  },
})

// Emits
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.oftalmologo-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.oftalmologo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 14px;
}

.info-item .q-icon {
  font-size: 16px;
}
</style>
