<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="column full-height">
      <q-toolbar class="bg-primary text-white">
        <q-avatar>
          <q-icon name="people" />
        </q-avatar>
        <q-toolbar-title>
          {{ isEdit ? 'Editar Cliente' : 'Nuevo Cliente' }}
        </q-toolbar-title>
        <q-btn flat round dense icon="close" @click="onClose" />
      </q-toolbar>

      <!-- <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ isEdit ? 'Editar Cliente' : 'Nuevo Cliente' }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="onClose" />
      </q-card-section> -->

      <q-card-section class="col scroll">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row q-col-gutter-md q-pa-md">
            <!-- Información Personal -->
            <div class="col-12">
              <div class="text-h6 q-mb-sm">
                <q-icon name="person" class="q-mr-sm" />
                Información Personal
              </div>
              <q-separator class="q-mb-md" />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.nombre"
                filled
                label="Nombre *"
                hint="Ingrese el nombre del cliente"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'El nombre es requerido']"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.apellidos"
                filled
                label="Apellidos *"
                hint="Ingrese los apellidos del cliente"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Los apellidos son requeridos']"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.dni"
                filled
                label="DNI *"
                hint="Documento de identidad"
                mask="########"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'El DNI es requerido',
                  (val) => (val && val.length === 8) || 'El DNI debe tener 8 dígitos',
                ]"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.edad"
                filled
                label="Edad"
                hint="Edad en años"
                type="number"
                min="0"
                max="150"
              />
            </div>

            <div class="col-12 col-md-4">
              <q-input
                v-model="form.fecha_nacimiento"
                filled
                label="Fecha de nacimiento"
                hint="DD/MM/AAAA"
                mask="##/##/####"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="form.fecha_nacimiento"
                        mask="DD/MM/YYYY"
                        @update:model-value="calculateAge"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-6">
              <q-select
                v-model="form.genero"
                filled
                label="Género"
                :options="generoOptions"
                hint="Seleccione el género"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.ocupacion"
                filled
                label="Ocupación"
                hint="Profesión u ocupación"
              />
            </div>

            <!-- Información de Contacto -->
            <div class="col-12 q-mt-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="contact_phone" class="q-mr-sm" />
                Información de Contacto
              </div>
              <q-separator class="q-mb-md" />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.email"
                filled
                label="Email"
                hint="Correo electrónico"
                type="email"
                lazy-rules
                :rules="[(val) => !val || /.+@.+\..+/.test(val) || 'Email inválido']"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.telefono"
                filled
                label="Teléfono"
                hint="Número de teléfono"
                mask="### ### ###"
              />
            </div>

            <!-- Información de Ubicación -->
            <div class="col-12 q-mt-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="place" class="q-mr-sm" />
                Ubicación
              </div>
              <q-separator class="q-mb-md" />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.direccion"
                filled
                label="Dirección"
                hint="Dirección completa"
                type="textarea"
                rows="2"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.ciudad" filled label="Ciudad" hint="Ciudad de residencia" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.pais" filled label="País" hint="País de residencia" />
            </div>

            <!-- Estado y Notas -->
            <div class="col-12 q-mt-lg">
              <div class="text-h6 q-mb-sm">
                <q-icon name="settings" class="q-mr-sm" />
                Configuración
              </div>
              <q-separator class="q-mb-md" />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                v-model="form.estado"
                filled
                label="Estado *"
                :options="estadoOptions"
                hint="Estado del cliente"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'El estado es requerido']"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.notas"
                filled
                label="Notas adicionales"
                hint="Información adicional sobre el cliente"
                type="textarea"
                rows="3"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="primary" @click="onClose" />
        <q-btn
          :label="isEdit ? 'Actualizar' : 'Crear'"
          type="submit"
          color="primary"
          :loading="loading"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch } from 'vue'
import { useClienteStore } from 'src/stores/useClienteStore'
import { useQuasar, date } from 'quasar'

export default {
  name: 'ClienteForm',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    cliente: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'cliente-saved', 'close'],
  setup(props, { emit }) {
    const $q = useQuasar()
    const clienteStore = useClienteStore()

    const loading = ref(false)

    const generoOptions = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir']

    const estadoOptions = ['activo', 'inactivo']

    const defaultForm = {
      nombre: '',
      apellidos: '',
      dni: '',
      edad: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      ocupacion: '',
      pais: 'Perú',
      estado: 'activo',
      fecha_nacimiento: '',
      genero: '',
      notas: '',
    }

    const form = ref({ ...defaultForm })

    // Resetear formulario cuando se abre/cierra el modal
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          if (props.isEdit && props.cliente) {
            // Cargar datos del cliente para edición
            form.value = {
              ...defaultForm,
              ...props.cliente,
              fecha_nacimiento: props.cliente.fecha_nacimiento
                ? date.formatDate(props.cliente.fecha_nacimiento, 'DD/MM/YYYY')
                : '',
            }
          } else {
            // Formulario para nuevo cliente
            form.value = { ...defaultForm }
          }
        }
      },
    )

    const calculateAge = (fechaNacimiento) => {
      if (!fechaNacimiento) return
      try {
        const birth = date.extractDate(fechaNacimiento, 'DD/MM/YYYY')
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--
        }

        form.value.edad = age.toString()
      } catch (error) {
        console.error('Error calculando edad:', error)
      }
    }

    const formatDateForAPI = (dateString) => {
      if (!dateString) return null
      try {
        const parsedDate = date.extractDate(dateString, 'DD/MM/YYYY')
        return date.formatDate(parsedDate, 'YYYY-MM-DD')
      } catch (error) {
        return error.message
      }
    }

    const onSubmit = async () => {
      loading.value = true

      try {
        const dataToSend = {
          ...form.value,
          fecha_nacimiento: formatDateForAPI(form.value.fecha_nacimiento),
          edad: form.value.edad ? parseInt(form.value.edad) : null,
        }

        if (props.isEdit) {
          await clienteStore.update(dataToSend, props.cliente.id)
        } else {
          await clienteStore.create(dataToSend)
        }

        emit('cliente-saved')
        emit('close')
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: `Error al ${props.isEdit ? 'actualizar' : 'crear'} cliente: ${error.message}`,
          position: 'top-right',
        })
      } finally {
        loading.value = false
      }
    }

    const onReset = () => {
      form.value = { ...defaultForm }
    }

    const onClose = () => {
      emit('close')
    }

    return {
      form,
      loading,
      generoOptions,
      estadoOptions,
      calculateAge,
      onSubmit,
      onReset,
      onClose,
    }
  },
}
</script>

<style scoped>
.q-card {
  min-width: 90vw;
}

@media (min-width: 1024px) {
  .q-card {
    min-width: 800px;
    max-width: 1000px;
  }
}
</style>
