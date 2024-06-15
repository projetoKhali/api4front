<script setup lang="ts">
import { ref, watch } from 'vue';
import NotificationPopup from '../components/NotificationPopup.vue';

const showPopup = ref(false);
const notification = {
  title: 'Parceiro criado!',
  message: 'O parceiro foi criado com sucesso.',
  type: 1,
};

const openNotificationPopup = () => {
  showPopup.value = true;
};

watch(showPopup, newValue => {
  if (newValue) {
    setTimeout(() => {
      showPopup.value = false;
    }, 3000);
  }
});
</script>

<template>
  <button @click="openNotificationPopup">Mostrar notificationicação</button>
  <transition name="fade">
    <NotificationPopup
      v-if="showPopup"
      :title="notification.title"
      :message="notification.message"
      :type="notification.type"
    />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

/* .fade-leave-active in <2.1.8 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
