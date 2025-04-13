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
            <h3 class="text-h5">Misión</h3>
            <div v-for="(item, index) in misionItems" :key="'mision-' + index">
              <p class="text-body1">
                <span class="text-weight-bold">{{ item.title }}</span>
                <span v-if="item.link">
                  con un <a :href="item.link" class="text-primary">{{ item.linkText }}</a
                  >.</span
                >
              </p>
              <p v-if="item.secondRow" class="text-body1">
                <span>{{ item.secondRow }}</span>
                <span v-if="item.secondLink">
                  con un
                  <a :href="item.secondLink" class="text-primary">{{ item.secondLinkText }}</a
                  >.</span
                >
              </p>
              <p v-if="item.hasIcon" class="flex items-center q-mb-sm">
                <q-icon name="info" size="xs" class="q-mr-xs" /><span>inline with text.</span>
              </p>
            </div>
          </div>

          <!-- Visión -->
          <div class="col-12 col-md-6">
            <h3 class="text-h5">Visión</h3>
            <div v-for="(item, index) in visionItems" :key="'vision-' + index">
              <p class="text-body1">
                <span class="text-weight-bold">{{ item.title }}</span>
                <span v-if="item.link">
                  con un <a :href="item.link" class="text-primary">{{ item.linkText }}</a
                  >.</span
                >
              </p>
              <p v-if="item.secondRow" class="text-body1">
                <span>{{ item.secondRow }}</span>
                <span v-if="item.secondLink">
                  con un
                  <a :href="item.secondLink" class="text-primary">{{ item.secondLinkText }}</a
                  >.</span
                >
              </p>
              <p v-if="item.hasIcon" class="flex items-center q-mb-sm">
                <q-icon name="info" size="xs" class="q-mr-xs" /><span>inline with text.</span>
              </p>
            </div>
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
    const doctors = [{ title: 'Oftalmóloga' }, { title: 'Oftalmóloga' }, { title: 'Oftalmóloga' }]

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
