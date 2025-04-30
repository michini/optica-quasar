<template>
    <q-card flat bordered class="stats-card">
      <q-card-section class="q-pa-md">
        <div class="row items-center justify-evenly q-col-gutter-md">
          <div 
            v-for="(stat, index) in stats" 
            :key="index" 
            class="col-12 col-sm-6 col-md-3"
          >
            <q-intersection
              once
              transition="scale"
            >
              <div class="stat-item text-center q-py-md">
                <div class="text-h3 text-weight-bold text-dark">{{ stat.value }}</div>
                <q-separator class="q-my-sm separator" />
                <div class="text-subtitle1 text-red-7 q-mt-sm">{{ stat.label }}</div>
              </div>
            </q-intersection>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'EnhancedStatsHighlights',
    data() {
      return {
        stats: [
          {
            value: '+ 10 000',
            label: 'LENTES VENDIDOS'
          },
          {
            value: '180 días',
            label: 'DE GARANTÍA'
          },
          {
            value: '14 días',
            label: 'PARA DEVOLUCIONES'
          },
          {
            value: '6 años',
            label: 'AYUDANDO A VER MEJOR'
          }
        ]
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .stats-card {
    background-color: #f8f9ff;
    border-radius: 8px;
    overflow: hidden;
    border: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  }
  
  .stat-item {
    position: relative;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      
      .separator {
        width: 50px;
      }
    }
    
    .text-h3 {
      color: #212121;
      font-size: 2.5rem;
      line-height: 1.2;
    }
    
    .text-subtitle1 {
      color: #e53935;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    
    .separator {
      width: 30px;
      height: 3px;
      background-color: #e53935;
      margin: 12px auto;
      transition: width 0.3s ease;
    }
  }
  
  @media (max-width: 599px) {
    .stat-item {
      padding: 12px 0;
      
      .text-h3 {
        font-size: 2rem;
      }
      
      .text-subtitle1 {
        font-size: 0.9rem;
      }
    }
  }
  </style>