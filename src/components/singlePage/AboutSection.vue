<template>
  <section id="nosotros" class="q-py-xl">
    <div class="text-center q-mb-lg">
      <h2 class="text-h3">Nosotros</h2>
    </div>

    <!-- Equipo de oftalmólogos -->
    <div class="row justify-center q-mb-xl q-px-md">
      <div
        class="col-12 col-sm-4 col-md-3 text-center q-pa-md"
        v-for="(doctor, index) in doctors"
        :key="index"
      >
        <q-card flat bordered class="doctor-card q-pa-md">
          <div class="doctor-placeholder q-mx-auto q-mb-md"></div>
          <div class="text-subtitle1">{{ doctor.title }}</div>
        </q-card>
      </div>
    </div>

    <!-- Misión y Visión -->
    <div class="row justify-center q-px-md">
      <div class="col-xs-12 col-md-10 col-lg-8">
        <div class="row q-col-gutter-xl">
          <!-- Misión -->
          <div class="col-12 col-md-6">
            <h3 class="text-h3 flex flex-center">Misión</h3>
            <p class="text-body1 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur consectetur
              ipsam? Voluptates maiores cumque, animi libero exercitationem quisquam blanditiis,
              officia odit, ea labore reiciendis provident numquam ratione esse ab! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Omnis aspernatur consectetur ipsam?
              Voluptates maiores cumque, animi libero exercitationem quisquam blanditiis, officia
              odit, ea labore reiciendis provident numquam ratione esse ab!
            </p>
          </div>

          <!-- Visión -->
          <div class="col-12 col-md-6">
            <h3 class="text-h3 flex flex-center">Visión</h3>
            <p class="text-body1 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur consectetur
              ipsam? Voluptates maiores cumque, animi libero exercitationem quisquam blanditiis,
              officia odit, ea labore reiciendis provident numquam ratione esse ab! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Omnis aspernatur consectetur ipsam?
              Voluptates maiores cumque, animi libero exercitationem quisquam blanditiis, officia
              odit, ea labore reiciendis provident numquam ratione esse ab!
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
      { title: 'Oftalmóloga 1' },
      { title: 'Oftalmóloga 2' },
      { title: 'Oftalmóloga 3' },
    ]

    const misionItems = [
      {
        title: 'A paragraph of text',
        link: '#',
        linkText: 'unassigned link',
      },
      {
        secondRow: 'A second row of text',
        secondLink: '#',
        secondLinkText: 'web link',
      },
      { hasIcon: true },
      {
        title: 'A paragraph of text',
        link: '#',
        linkText: 'unassigned link',
      },
      {
        secondRow: 'A second row of text',
        secondLink: '#',
        secondLinkText: 'web link',
      },
      { hasIcon: true },
    ]

    const visionItems = [
      {
        title: 'A paragraph of text',
        link: '#',
        linkText: 'unassigned link',
      },
      {
        secondRow: 'A second row of text',
        secondLink: '#',
        secondLinkText: 'web link',
      },
      { hasIcon: true },
      {
        title: 'A paragraph of text',
        link: '#',
        linkText: 'unassigned link',
      },
      {
        secondRow: 'A second row of text',
        secondLink: '#',
        secondLinkText: 'web link',
      },
      { hasIcon: true },
    ]

    return {
      doctors,
      misionItems,
      visionItems,
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
