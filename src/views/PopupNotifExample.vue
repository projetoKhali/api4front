<script lang="ts">
import { ref } from 'vue';
import NotifPopup from '../components/NotifPopup.vue';

export default {
    components: {
        NotifPopup
    }
}

</script>

<template>
    <div className="pop">
        <NotifPopup :title="'Notificação'" :message="'Essa é uma notificação de teste'" :duration="3000"/>
    </div>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #464646;
}

.pop{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}
</style>