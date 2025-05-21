<template>
    <section class="enhanced-category-showcase q-py-xl">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <div 
            v-for="(category, index) in categories" 
            :key="index" 
            class="col-12 col-md-4"
          >
            <q-intersection
              once
              transition="fade"
            >
              <q-card 
                flat 
                bordered 
                class="enhanced-category-card"
                @mouseover="hoverIndex = index"
                @mouseleave="hoverIndex = -1"
              >
                <q-img
                  :src="category.image"
                  :ratio="1.2"
                  class="enhanced-category-image"
                  no-spinner
                >
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-grey-3">
                      <q-icon name="visibility" size="3rem" color="grey-7" />
                    </div>
                  </template>
                </q-img>
                
                <q-card-section class="text-center">
                  <h3 class="text-h5 text-white text-weight-regular enhanced-category-title">
                    {{ category.title }}
                  </h3>
                  
                  <q-btn
                    flat
                    rounded
                    color="red-7"
                    :to="category.link"
                    class="enhanced-category-btn q-mt-sm"
                    :class="{ 'btn-hovered': hoverIndex === index }"
                    no-caps
                  >
                    Ver monturas 
                    <q-icon 
                      name="arrow_forward" 
                      size="sm" 
                      class="q-ml-xs transition-icon"
                      :class="{ 'icon-moved': hoverIndex === index }"
                    />
                  </q-btn>
                </q-card-section>
              </q-card>
            </q-intersection>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'EnhancedCategoryShowcase',
    setup() {
      const hoverIndex = ref(-1)
      
      const categories = [
        {
          title: 'Lentes para mujeres',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/Lentes-para-mujer-movil.webp',
          link: '/monturas/mujeres'
        },
        {
          title: 'Lentes para hombre',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/Lentes-para-hombre.webp',
          link: '/monturas/hombres'
        },
        {
          title: 'Lentes para niños',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/Lentes-para-ninos.webp',
          link: '/monturas/ninos'
        }
      ]
      
      return {
        categories,
        hoverIndex
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .enhanced-category-showcase {
    background-color: #fafafa;
    padding: 3rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .enhanced-category-card {
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: none;
    height: 100%;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      
      .enhanced-category-image ::v-deep(img) {
        transform: scale(1.05);
      }
    }
  }
  
  .enhanced-category-image {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    
    ::v-deep(img) {
      transition: transform 0.6s ease;
    }
  }
  
  .enhanced-category-title {
    font-size: 1.75rem;
    color: #424242;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 40px;
      height: 2px;
      background-color: #e53935;
      transform: translateX(-50%);
    }
  }
  
  .enhanced-category-btn {
    font-weight: 500;
    position: relative;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-size: 1rem;
    
    &.btn-hovered {
      background-color: rgba(77, 77, 255, 0.1);
    }
  }
  
  .transition-icon {
    transition: transform 0.3s ease;
    
    &.icon-moved {
      transform: translateX(5px);
    }
  }
  
  @media (max-width: 599px) {
    .enhanced-category-card {
      margin-bottom: 2rem;
    }
    
    .enhanced-category-title {
      font-size: 1.5rem;
    }
  }
  </style>