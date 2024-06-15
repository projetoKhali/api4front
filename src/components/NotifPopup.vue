<script lang="ts">
import { ref, computed } from 'vue';

export default {
    props: {
        title: {
            type: String,
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: Number
        }
    },
    setup(props) {
        const isPopupOpen = ref(true);

        const closePopup = () => {
            isPopupOpen.value = false;
        };

        const popupStyle = computed(() => {
            switch (props.type) {
                case 1:
                    return { backgroundColor: '#90EE90' }
                case 2:
                    return { backgroundColor: '#FF6347' }
                case 3:
                    return { backgroundColor: '#FFD700' }
                default:
                    return { backgroundColor: '#fff' }
            }
        });

        return {
            isPopupOpen,
            closePopup,
            popupStyle
        };
    }
}

</script>

<template>
    <div class="notif-popup" v-show="isPopupOpen" :style="popupStyle">
        <div class="notif-popup__content">
            <div>
                <h2 class="notif-popup__title"> {{ title }}</h2>
            </div>
            <div class="notif-popup__body">
                <p> {{ message }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.notif-popup {
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

.notif-popup__close {
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

.notif-popup__content {
    padding: 10px;
}

.notif-popup__body {
    margin-bottom: 10px;
}
</style>