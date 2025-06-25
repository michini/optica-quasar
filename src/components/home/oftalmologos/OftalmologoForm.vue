<template>
  <q-dialog
    v-model="dialogModel"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="oftalmologo-form-card">
      <q-toolbar class="bg-primary text-white">
        <q-avatar>
          <q-icon name="visibility" />
        </q-avatar>
        <q-toolbar-title>
          {{ isEdit ? 'Editar Oftalmólogo' : 'Nuevo Oftalmólogo' }}
        </q-toolbar-title>
        <q-btn flat round dense icon="close" @click="closeModal" />
      </q-toolbar>

      <q-card-section class="scroll">
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <div class="row q-gutter-md q-pa-md">
            <!-- Información Personal -->
            <div class="col-12">
              <div class="text-h6 text-weight-bold q-mb-md">
                <q-icon name="person" class="q-mr-sm" />
                Información Personal
              </div>
            </div>

            <div class="col-12 col-md-6 col-xs-11">
              <q-input
                v-model="form.nombre"
                label="Nombre *"
                outlined
                :rules="[(val) => !!val || 'El nombre es requerido']"
                maxlength="255"
                counter
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.apellidos"
                label="Apellidos *"
                outlined
                :rules="[(val) => !!val || 'Los apellidos son requeridos']"
                maxlength="255"
                counter
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.dni"
                label="DNI *"
                outlined
                mask="########"
                :rules="[
                  (val) => !!val || 'El DNI es requerido',
                  (val) => val.length === 8 || 'El DNI debe tener 8 dígitos',
                ]"
                maxlength="8"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.telefono"
                label="Teléfono *"
                outlined
                mask="#########"
                :rules="[
                  (val) => !!val || 'El teléfono es requerido',
                  (val) => val.length === 9 || 'El teléfono debe tener 9 dígitos',
                ]"
                maxlength="9"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-select
                v-model="form.estado"
                :options="estadoOptions"
                label="Estado *"
                outlined
                emit-value
                map-options
                :rules="[(val) => !!val || 'El estado es requerido']"
              />
            </div>

            <!-- Información Profesional -->
            <div class="col-12 q-mt-lg">
              <div class="text-h6 text-weight-bold q-mb-md">
                <q-icon name="medical_services" class="q-mr-sm" />
                Información Profesional
              </div>
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.cmp"
                label="CMP *"
                outlined
                :rules="[(val) => !!val || 'El CMP es requerido']"
                maxlength="255"
                counter
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.rne"
                label="RNE"
                outlined
                maxlength="255"
                counter
                hint="Opcional"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.especialidad"
                label="Especialidad *"
                outlined
                type="textarea"
                rows="3"
                :rules="[(val) => !!val || 'La especialidad es requerida']"
                maxlength="1000"
                counter
              />
            </div>

            <!-- Información de Contacto -->
            <div class="col-12 q-mt-lg">
              <div class="text-h6 text-weight-bold q-mb-md">
                <q-icon name="contact_mail" class="q-mr-sm" />
                Información de Contacto
              </div>
            </div>

            <div class="col-12">
              <q-input
                v-model="form.email"
                label="Email *"
                outlined
                type="email"
                :rules="[
                  (val) => !!val || 'El email es requerido',
                  (val) => isValidEmail(val) || 'Ingrese un email válido',
                ]"
                maxlength="255"
                counter
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.direccion"
                label="Dirección *"
                outlined
                type="textarea"
                rows="2"
                :rules="[(val) => !!val || 'La dirección es requerida']"
                maxlength="500"
                counter
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-7" @click="closeModal" class="q-mr-sm" />
        <q-btn
          label="Guardar"
          color="primary"
          @click="handleSubmit"
          :loading="loading"
          :disable="!isFormValid"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  oftalmologo: {
    type: Object,
    default: null,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['update:show', 'save'])

// Estados reactivos
const loading = ref(false)
const form = ref({
  nombre: '',
  apellidos: '',
  dni: '',
  cmp: '',
  rne: '',
  telefono: '',
  email: '',
  direccion: '',
  estado: 'activo',
  especialidad: '',
})

// Opciones
const estadoOptions = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]

// Computed
const dialogModel = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value),
})

const isFormValid = computed(() => {
  return (
    form.value.nombre &&
    form.value.apellidos &&
    form.value.dni &&
    form.value.dni.length === 8 &&
    form.value.cmp &&
    form.value.telefono &&
    form.value.telefono.length === 9 &&
    form.value.email &&
    isValidEmail(form.value.email) &&
    form.value.direccion &&
    form.value.estado &&
    form.value.especialidad
  )
})

// Métodos
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const resetForm = () => {
  form.value = {
    nombre: '',
    apellidos: '',
    dni: '',
    cmp: '',
    rne: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: 'activo',
    especialidad: '',
  }
}

const loadOftalmologoData = () => {
  if (props.oftalmologo && props.isEdit) {
    form.value = {
      nombre: props.oftalmologo.nombre || '',
      apellidos: props.oftalmologo.apellidos || '',
      dni: props.oftalmologo.dni || '',
      cmp: props.oftalmologo.cmp || '',
      rne: props.oftalmologo.rne || '',
      telefono: props.oftalmologo.telefono || '',
      email: props.oftalmologo.email || '',
      direccion: props.oftalmologo.direccion || '',
      estado: props.oftalmologo.estado || 'activo',
      especialidad: props.oftalmologo.especialidad || '',
    }
  } else {
    resetForm()
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true
  try {
    await nextTick()
    emit('save', { ...form.value })
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emit('update:show', false)
  setTimeout(() => {
    resetForm()
  }, 300)
}

// Watchers
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      loadOftalmologoData()
    }
  },
)

watch(
  () => props.oftalmologo,
  () => {
    if (props.show) {
      loadOftalmologoData()
    }
  },
)
</script>

<style scoped>
.oftalmologo-form-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .oftalmologo-form-card {
    height: 100vh;
  }
}

.scroll {
  max-height: calc(100vh - 150px);
}
</style>
