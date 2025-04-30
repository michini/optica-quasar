<template>
  <section id="nosotros" class="q-py-lg">
    <div class="text-center q-mb-lg">
      <h2 class="text-h3">Nuestros profesionales</h2>
    </div>

    <!-- Equipo de oftalmólogos -->
    <div class="row justify-center q-mb-xl q-px-md">
      <div
        class="col-12 col-sm-4 col-md-3 text-center q-pa-md"
        v-for="(doctor, index) in doctors"
        :key="index"
      >
        <q-card flat bordered class="doctor-card">
          <q-img :src="doctor.img" height="400px" width="">
            <div class="text-h5 absolute-bottom text-right">{{ doctor.title }}</div>
          </q-img>
        </q-card>
      </div>
    </div>

    <!-- Misión y Visión -->
    <div class="row justify-center q-px-md bg-white" >
      <div class="col-xs-12 col-md-10 col-lg-8">
        <div class="row q-col-gutter-xl">
          <!-- Misión -->
          <div class="col-12 col-md-6">
            <h3 class="text-h3 flex flex-center text-black" >Misión</h3>
            <p class="text-body1 text-black">
              Nuestra misión es proporcionar servicios de salud visual de alta calidad, utilizando
              tecnología de vanguardia y un equipo de profesionales altamente capacitados,
              comprometidos con el bienestar y la satisfacción de nuestros pacientes. Nos esforzamos
              por mejorar la calidad de vida de las personas a través de soluciones ópticas
              personalizadas y accesibles. Además, buscamos fomentar la educación y la prevención en
              el cuidado de la salud visual, promoviendo hábitos saludables y el
              bienestar general.
            </p>
          </div>

          <!-- Visión -->
          <div class="col-12 col-md-6">
            <h3 class="text-h3 flex flex-center text-black">Visión</h3>
            <p class="text-body1 text-black">
              Nuestra visión es ser líderes en el cuidado de la salud visual, reconocidos por
              nuestra excelencia en servicios, innovación tecnológica y compromiso con la comunidad.
              Aspiramos a establecer estándares de calidad y atención que inspiren confianza y
              satisfacción en nuestros pacientes, mientras promovemos un entorno inclusivo y
              sostenible. Nos esforzamos por ser un referente en la industria óptica, contribuyendo
              al desarrollo integral de las personas y al bienestar de la sociedad a través de
              soluciones visuales avanzadas y accesibles.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutSection',
  setup() {
    const doctors = [
      {
        title: 'Dra. Alinda Yépez',
        img: 'https://www.oftalmologiaespecializada.pe/images/oftalmologos/01.jpg',
      },
      {
        title: 'Dr. Hugo Jiménez',
        img: 'https://www.oftalmologiaespecializada.pe/images/oftalmologos/05.jpg',
      },
      {
        title: 'Dra. Rosana Marcano',
        img: 'https://www.oftalmologiaespecializada.pe/images/oftalmologos/03.jpg',
      },
    ]

    return {
      doctors,
    }
  },
})
</script>

<style scoped>
.doctor-card {
  height: 100%;
}

.doctor-placeholder {
  width: 120px;
  height: 120px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><line x1="10" y1="10" x2="110" y2="110" stroke="black" stroke-width="2"/><line x1="10" y1="110" x2="110" y2="10" stroke="black" stroke-width="2"/></svg>');
  background-size: contain;
}
</style>
