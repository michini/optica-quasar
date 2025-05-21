<template>
    <div class="enhanced-glasses-section q-py-xl">
      <div class="container">
        <!-- Encabezados animados -->
        <q-intersection once transition="scale">
          <div class="text-center q-mb-xl">
            <h2 class="text-h3 q-mb-md main-heading text-red-7">Los lentes que buscabas están aquí</h2>
            <p class="text-h5 sub-heading">
              Consigue los tuyos con lunas de medida desde 
              <span class="price-highlight">79 soles</span>
            </p>
          </div>
        </q-intersection>
        
        <!-- Navegación de categorías - Versión Escritorio -->
        <div class="glasses-navigation row justify-center q-col-gutter-xl gt-sm">
          <div 
            v-for="(category, index) in categories"
            :key="index"
            class="category-container col-auto text-center"
            @mouseover="activeCategory = index"
            @mouseleave="activeCategory = -1"
          >
            <div class="category-image-wrapper">
              <q-img
                :src="category.image"
                :ratio="1"
                fit="contain"
                spinner-color="red-7"
                class="category-image"
                :class="{ 'image-active': activeCategory === index }"
              >
                <!-- Overlay hover effect -->
                <div class="absolute-top text-center" v-if="activeCategory === index">
                  <q-btn
                    color="white"
                    text-color="red-7"
                    label="Ver más"
                    size="sm"
                    :to="category.link"
                    class="q-mt-md view-more-btn"
                    unelevated
                  />
                </div>
              </q-img>
            </div>
            
            <div 
              class="text-subtitle1 category-name q-mt-md"
              :class="{ 'active-name': activeCategory === index }"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
        
        <!-- Carrusel para móviles -->
        <div class="lt-md">
          <q-carousel
            v-model="slide"
            animated
            swipeable
            arrows
            navigation
            infinite
            :autoplay="autoplay"
            class="mobile-carousel shadow-2 rounded-borders"
          >
            <q-carousel-slide 
              v-for="(category, index) in categories" 
              :key="index" 
              :name="index"
              class="column no-wrap flex-center"
            >
              <div class="q-pa-lg">
                <div class="text-center">
                  <q-img
                    :src="category.image"
                    :ratio="1"
                    width="100px"
                    class="q-mb-md"
                  />
                  <div class="text-h6 text-red-7">{{ category.name }}</div>
                  <q-btn 
                    color="primary" 
                    outline 
                    :to="category.link" 
                    label="Ver colección" 
                    class="q-mt-sm" 
                    no-caps
                  />
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
        
        <!-- Botón de navegación a todas las categorías -->
        <!-- <div class="text-center q-mt-xl">
          <q-btn 
            color="primary"
            label="Ver todas las categorías"
            to="/categorias" 
            unelevated 
            padding="md lg" 
            class="full-btn q-mt-md"
            no-caps
          />
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'EnhancedGlassesCarousel',
    setup() {
      const slide = ref(0)
      const autoplay = ref(3000)
      const activeCategory = ref(-1)
      
      const categories = [
        {
          name: 'Ópticos',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/filtro-opticos-optimania.webp',
          link: '/categorias/opticos'
        },
        {
          name: 'Sol',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/filtro-de%20sol-optimania.webp',
          link: '/categorias/sol'
        },
        {
          name: '2en1 (clip-on)',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/clip-on-home-icon-webp.webp',
          link: '/categorias/clipon'
        },
        {
          name: 'Progresivos',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/filtro-progresivos-optimania.webp',
          link: '/categorias/progresivos'
        },
        {
          name: 'Deportivos',
          image: 'https://prooptimania.s3.us-east-2.amazonaws.com/web/homeNew/filtro-deportivo-optimania.webp',
          link: '/categorias/deportivos'
        }
      ]
      
      return {
        slide,
        autoplay,
        categories,
        activeCategory
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .enhanced-glasses-section {
    background-color: #f9f9ff;
    padding: 3rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .main-heading {
    color: #e53935;
    font-weight: 500;
    letter-spacing: -0.5px;
  }
  
  .sub-heading {
    color: #333;
    font-weight: 400;
  }
  
  .price-highlight {
    color: #e53935;
    font-weight: 700;
  }
  
  .glasses-navigation {
    margin-bottom: 3rem;
  }
  
  .category-container {
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-7px);
    }
  }
  
  .category-image-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(77, 77, 255, 0.2);
    }
  }
  
  .category-image {
    transition: all 0.3s ease;
    
    &.image-active {
      transform: scale(1.05);
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(77, 77, 255, 0.1);
      }
    }
  }
  
  .category-name {
    color: #e53935;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    display: inline-block;
    
    &.active-name {
      transform: scale(1.05);
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #e53935;
      }
    }
  }
  
  .view-more-btn {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    
    .category-container:hover & {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .mobile-carousel {
    height: 320px;
    margin-bottom: 1.5rem;
  }
  
  .full-btn {
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    font-weight: 500;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(77, 77, 255, 0.3);
    }
  }
  
  @media (max-width: 599px) {
    .enhanced-glasses-section {
      padding: 2rem 0;
    }
    
    .main-heading {
      font-size: 2rem;
    }
    
    .sub-heading {
      font-size: 1.2rem;
    }
  }
  </style>