<template>
  <div class="flex flex-center" style="height: 100vh">
    <q-card class="register-card q-pa-lg">
      <q-card-section class="text-center">
        <h4 class="text-weight-bold q-my-none">Crear Cuenta</h4>
        <p class="text-grey-7">Completa los campos para registrarte</p>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="register" class="q-gutter-md">
          <q-input
            v-model="name"
            type="text"
            label="Nombre completo"
            :rules="[(val) => !!val || 'El nombre es requerido']"
            outlined
          />

          <q-input
            v-model="email"
            type="email"
            label="Correo electrónico"
            :rules="[(val) => !!val || 'El correo es requerido', isValidEmail]"
            outlined
          />

          <q-input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            :rules="[
              (val) => !!val || 'La contraseña es requerida',
              (val) => val.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
            ]"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-input
            v-model="password_confirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            label="Confirmar contraseña"
            :rules="[
              (val) => !!val || 'La confirmación es requerida',
              (val) => val === password || 'Las contraseñas no coinciden',
            ]"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="showPasswordConfirmation ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
              />
            </template>
          </q-input>

          <div class="q-mt-md">
            <q-checkbox v-model="acceptTerms" label="Acepto los términos y condiciones" />
          </div>

          <q-btn
            type="submit"
            color="primary"
            label="Registrarme"
            class="full-width"
            :loading="authStore.loading"
            :disable="!acceptTerms"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pa-none">
        <p>
          ¿Ya tienes una cuenta?
          <router-link :to="$router.resolve({ name: 'auth.login' }).path" class="text-primary"
            >Iniciar sesión</router-link
          >
        </p>
      </q-card-section>

      <q-dialog v-model="errorDialog">
        <q-card>
          <q-card-section class="bg-negative text-white">
            <div class="text-h6">Error</div>
          </q-card-section>
          <q-card-section>
            <div v-if="typeof authStore.error === 'string'">{{ authStore.error }}</div>
            <div v-else-if="authStore.error">
              <div v-for="(errors, field) in authStore.error" :key="field">
                <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const authStore = useAuthStore()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const acceptTerms = ref(false)
    const showPassword = ref(false)
    const showPasswordConfirmation = ref(false)
    const errorDialog = ref(false)

    const isValidEmail = (val) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(val) || 'El correo electrónico no es válido'
    }

    watch(
      () => authStore.error,
      (newValue) => {
        if (newValue) {
          errorDialog.value = true
        }
      },
    )

    const register = async () => {
      if (!acceptTerms.value) {
        return
      }

      try {
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        })
      } catch (error) {
        // Error ya está manejado en el store
        console.log(error)
      }
    }

    return {
      authStore,
      name,
      email,
      password,
      password_confirmation,
      acceptTerms,
      showPassword,
      showPasswordConfirmation,
      errorDialog,
      isValidEmail,
      register,
    }
  },
})
</script>

<style scoped>
.register-card {
  width: 100%;
  max-width: 400px;
}
</style>
