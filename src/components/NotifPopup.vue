<script lang="ts">
import {ref} from 'vue';


export default {
    props: {
        title: {
            type: String,
        },
        message: {
            type: String,
            required: true
        },
        duration:{
            type: Number,
            default: 5000
        }
    },
    setup(props) {
        const isPopupOpen = ref(true);

        const closePopup = () => {
            isPopupOpen.value = false;
        };

        setTimeout(() => {
            closePopup();
        }, props.duration);

        return {
            isPopupOpen,
            closePopup
        };
    }
}

</script>

<template>
    <div class="notif-popup" v-show="isPopupOpen">
        <button class="notif-popup__close" @click="closePopup">
        <i class="fas fa-times"></i>
        </button>
        <div class="notif-popup__content">
        <div class="notif-popup__header">
            <h2 class="notif-popup__title"> {{ title }}</h2>
        </div>
        <div class="notif-popup__body">
            <p> {{ message }}</p>
        </div>
        </div>
    </div>
</template>

<style scoped>
/* .notif-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: none;
} */
</style>