<script lang="ts">
import { ref, computed } from 'vue';

export type PopupProps = {
  title?: string;
  message?: string;
  type?: number;
  time?: number;
};

export default {
  props: {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    type: {
      type: Number,
    },
  },
  setup(props) {
    const isPopupOpen = ref(true);

    const closePopup = () => {
      isPopupOpen.value = false;
    };

    const popupStyle = computed(() => {
      switch (props.type) {
        case 1:
          return { backgroundColor: '#90EE90' };
        case 2:
          return { backgroundColor: '#FF6347' };
        case 3:
          return { backgroundColor: '#FFD700' };
        default:
          return { backgroundColor: '#fff' };
      }
    });

    return {
      isPopupOpen,
      closePopup,
      popupStyle,
    };
  },
};
</script>

<template>
  <div class="notification-popup" v-show="isPopupOpen" :style="popupStyle">
    <div class="notification-popup__content">
      <div>
        <h2 class="notification-popup__title">{{ title || '' }}</h2>
      </div>
      <div class="notification-popup__body">
        <p>{{ message || '' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-popup {
  display: flex;
  padding: 10px;
  flex-direction: column;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.notification-popup__close {
  position: absolute;
  top: 5px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  width: 10px;
  height: 10px;
}

.notification-popup__content {
  padding: 10px;
}

.notification-popup__body {
  margin-bottom: 10px;
}
</style>
