<template>
  <section id="servicios" class="q-py-lg">
    <div class="text-center q-mb-lg">
      <h2 class="text-h3">Servicios y productos</h2>
    </div>

    <div class="row justify-center q-px-md">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered>
          <div class="row">
            <!-- Panel de navegación de servicios -->
            <div class="col-12 col-sm-4 col-md-3">
              <q-list padding>
                <q-item
                  v-for="(tab, index) in tabs"
                  :key="index"
                  clickable
                  :active="selectedTab === index"
                  @click="selectedTab = index"
                  active-class="text-pink-5"
                >
                  <q-item-section>{{ tab.label }}</q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Contenido de servicios -->
            <div class="col-12 col-sm-8 col-md-9 q-pa-md">
              <div v-for="(tab, index) in tabs" :key="index" v-show="selectedTab === index">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-7">
                    <p class="text-body1 text-justify" v-for="n in 1" :key="n">
                      {{ tab.content }}
                    </p>
                  </div>
                  <div class="col-12 col-md-5">
                    <q-card flat class="q-pa-sm">
                      <q-video :src="tab.videoLink" :ratio="16 / 9" />
                      <div class="row q-mt-sm">
                        <q-btn icon="play_arrow" flat round />
                        <q-slider v-model="videoPosition" :min="0" :max="100" class="col q-mx-sm" />
                        <q-btn icon="volume_up" flat round />
                        <q-btn icon="fullscreen" flat round />
                      </div>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ServicesSection',
  setup() {
    const selectedTab = ref(0)
    const videoPosition = ref(0)

    const tabs = [
      {
        label: 'Medida de vista',
        videoLink: 'https://www.youtube.com/embed/BpVqEO1z3ao?si=TqPAS-1gZ9lOYRrR&amp;controls=0',
        content:
          'La medida de vista es un procedimiento esencial para evaluar la salud visual y determinar la graduación adecuada de los lentes o gafas. Este servicio incluye una serie de pruebas realizadas por un profesional de la salud visual, como optometristas u oftalmólogos, para identificar problemas de refracción, como miopía, hipermetropía, astigmatismo o presbicia. Además, la medida de vista permite detectar posibles enfermedades o condiciones oculares, como glaucoma, cataratas o degeneración macular, asegurando un diagnóstico temprano y un tratamiento oportuno. Este proceso es fundamental para garantizar una visión clara.',
      },
      {
        label: 'Monturas',
        videoLink: 'https://www.youtube.com/embed/v7otJLEqHjs?si=X0JygPd4A6FL5LR1&amp;controls=0',
        content:
          'Las monturas son un elemento esencial en el diseño y funcionalidad de las gafas, ya que no solo sostienen los lentes, sino que también reflejan el estilo y la personalidad del usuario. Disponibles en una amplia variedad de materiales, como metal, acetato, titanio y plástico, las monturas ofrecen opciones para todos los gustos y necesidades. Además de su estética, las monturas están diseñadas para proporcionar comodidad y durabilidad, adaptándose a diferentes formas de rostro y estilos de vida. Desde diseños clásicos y elegantes hasta opciones modernas y vanguardistas, las monturas permiten a los usuarios expresar su individualidad.',
      },
      {
        label: 'Lentes de contacto',
        videoLink: 'https://www.youtube.com/embed/K-mVj3DHkmU?si=34wFEZMDkrwarBOs&amp;controls=0',
        content:
          'Los lentes de contacto son una alternativa versátil y cómoda a las gafas tradicionales, ofreciendo una solución estética y funcional para corregir problemas de visión como miopía, hipermetropía, astigmatismo y presbicia. Estos pequeños discos ópticos, fabricados con materiales avanzados como hidrogel o silicona-hidrogel, se colocan directamente sobre la superficie del ojo, proporcionando una visión clara y sin las limitaciones de las monturas. Los lentes de contacto son ideales para personas activas, deportistas o quienes buscan una apariencia más natural. Además, están disponibles en una variedad de opciones.',
      },
      {
        label: 'Lentes de lectura',
        videoLink: 'https://www.youtube.com/embed/AIk-NqFSE0o?si=ShnbS7xN5v_aEXTR&amp;controls=0',
        content:
          'Los lentes de lectura son una herramienta indispensable para quienes necesitan ayuda para enfocar objetos cercanos, como libros, dispositivos electrónicos o documentos. Diseñados específicamente para corregir la presbicia, estos lentes ofrecen una solución práctica y efectiva para mejorar la calidad de vida de las personas que experimentan dificultades visuales relacionadas con la edad. Disponibles en una variedad de estilos y graduaciones, los lentes de lectura combinan funcionalidad y estética, permitiendo a los usuarios disfrutar de una visión clara y cómoda mientras realizan actividades cotidianas.',
      },
      {
        label: 'Lentes de sol',
        videoLink: 'https://www.youtube.com/embed/B-3TIYFQAEs?si=c2Pj_u_egM-EpKI3&amp;controls=0',
        content:
          'Los lentes de sol son mucho más que un accesorio de moda; son una herramienta esencial para proteger los ojos de los dañinos rayos ultravioleta (UV) del sol. Diseñados para bloquear tanto los rayos UVA como los UVB, los lentes de sol ayudan a prevenir problemas oculares como cataratas, degeneración macular y daño en la córnea. Además de su función protectora, los lentes de sol están disponibles en una amplia variedad de estilos, colores y materiales, permitiendo a los usuarios expresar su personalidad y complementar su apariencia. Desde diseños clásicos y atemporales hasta opciones modernas y vanguardistas.',
      },
    ]

    return {
      selectedTab,
      videoPosition,
      tabs,
    }
  },
})
</script>
