<script setup lang="ts">
import { ref } from 'vue';
import NotifPopup from '../components/NotifPopup.vue';

const showPopup = ref(false);
const popupData = {
    title: 'Parceiro criado!',
    message: 'O parceiro foi criado com sucesso.',
    type: 1
};

const openNotifPopup = () => {
    showPopup.value = true;
    setTimeout(() => {
        showPopup.value = false;
    }, 3000);
}

</script>

<template>
    <button @click="openNotifPopup">Mostrar notificação</button>
    <NotifPopup v-show="showPopup" :title="popupData.title" :message="popupData.message" :type="popupData.type" />
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #464646;
}

.pop {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}
</style>