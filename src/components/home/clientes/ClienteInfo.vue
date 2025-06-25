<template>
  <q-card-section>
    <div class="row q-col-gutter-md">
      <!-- Información Personal -->
      <div class="col-12">
        <div class="text-h6 q-mb-sm">
          <q-icon name="person" class="q-mr-sm" />
          Información Personal
        </div>
        <q-separator class="q-mb-md" />
      </div>

      <div class="col-12 col-md-6">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Nombre completo</q-item-label>
              <q-item-label>{{ cliente.nombre }} {{ cliente.apellidos }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>DNI</q-item-label>
              <q-item-label>{{ cliente.dni || 'No especificado' }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Edad</q-item-label>
              <q-item-label>{{ cliente.edad || 'No especificada' }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Fecha de nacimiento</q-item-label>
              <q-item-label>{{ formatDate(cliente.fecha_nacimiento) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Género</q-item-label>
              <q-item-label>{{ cliente.genero || 'No especificado' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="col-12 col-md-6">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Email</q-item-label>
              <q-item-label>
                <a v-if="cliente.email" :href="`mailto:${cliente.email}`">
                  {{ cliente.email }}
                </a>
                <span v-else>No especificado</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Teléfono</q-item-label>
              <q-item-label>
                <a v-if="cliente.telefono" :href="`tel:${cliente.telefono}`">
                  {{ cliente.telefono }}
                </a>
                <span v-else>No especificado</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Ocupación</q-item-label>
              <q-item-label>{{ cliente.ocupacion || 'No especificada' }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Estado</q-item-label>
              <q-item-label>
                <q-badge
                  :color="cliente.estado === 'activo' ? 'green' : 'red'"
                  :label="cliente.estado"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Información de Ubicación -->
      <div class="col-12 q-mt-md">
        <div class="text-h6 q-mb-sm">
          <q-icon name="place" class="q-mr-sm" />
          Ubicación
        </div>
        <q-separator class="q-mb-md" />
      </div>

      <div class="col-12 col-md-6">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Dirección</q-item-label>
              <q-item-label>{{ cliente.direccion || 'No especificada' }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Ciudad</q-item-label>
              <q-item-label>{{ cliente.ciudad || 'No especificada' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="col-12 col-md-6">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>País</q-item-label>
              <q-item-label>{{ cliente.pais || 'No especificado' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Notas adicionales -->
      <div class="col-12 q-mt-md" v-if="cliente.notas">
        <div class="text-h6 q-mb-sm">
          <q-icon name="note" class="q-mr-sm" />
          Notas
        </div>
        <q-separator class="q-mb-md" />
        <q-card flat bordered>
          <q-card-section>
            {{ cliente.notas }}
          </q-card-section>
        </q-card>
      </div>

      <!-- Información del sistema -->
      <div class="col-12 q-mt-md">
        <div class="text-h6 q-mb-sm">
          <q-icon name="info" class="q-mr-sm" />
          Información del Sistema
        </div>
        <q-separator class="q-mb-md" />
      </div>

      <div class="col-12">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label overline>Fecha de registro</q-item-label>
              <q-item-label>{{ formatDate(cliente.created_at) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="cliente.updated_at">
            <q-item-section>
              <q-item-label overline>Última actualización</q-item-label>
              <q-item-label>{{ formatDate(cliente.updated_at) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Botones de acción -->
      <div class="col-12 q-mt-lg">
        <q-separator class="q-mb-md" />
        <div class="row q-gutter-sm">
          <q-btn
            color="primary"
            icon="edit"
            label="Editar Cliente"
            @click="$emit('edit-cliente')"
          />
          <q-btn
            color="negative"
            icon="delete"
            label="Eliminar Cliente"
            @click="$emit('delete-cliente')"
            outline
          />
        </div>
      </div>
    </div>
  </q-card-section>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'ClienteInfo',
  props: {
    cliente: {
      type: Object,
      required: true,
    },
  },
  emits: ['edit-cliente', 'delete-cliente'],
  setup() {
    const formatDate = (dateString) => {
      if (!dateString) return 'No especificada'
      try {
        return date.formatDate(dateString, 'DD/MM/YYYY HH:mm')
      } catch (error) {
        return 'Fecha inválida' + error
      }
    }

    return {
      formatDate,
    }
  },
}
</script>

<style scoped>
.q-item-label a {
  color: inherit;
  text-decoration: none;
}

.q-item-label a:hover {
  text-decoration: underline;
}
</style>
