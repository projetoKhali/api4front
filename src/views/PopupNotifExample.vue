<script setup lang="ts">
import { ref, watch } from 'vue';
import NotifPopup from '../components/NotifPopup.vue';

const showPopup = ref(false);
const notif = {
    title: 'Parceiro criado!',
    message: 'O parceiro foi criado com sucesso.',
    type: 1
};

const openNotifPopup = () => {
    showPopup.value = true;
}

watch(showPopup, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            showPopup.value = false;
        }, 3000);
    }
});

</script>

<template>
    <button @click="openNotifPopup">Mostrar notificação</button>
    <transition name="fade">
        <NotifPopup v-if="showPopup" :title="notif.title" :message="notif.message" :type="notif.type" />
    </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>