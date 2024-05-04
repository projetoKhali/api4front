<script setup lang="ts">
const props = defineProps({
    title: String,
    number: Number,
    iconName: String
})
</script>

<template>
    <div class="count-card">
        <div class="count-card-left">
            <h3 class="title-card">{{ title }}</h3>
            <h1 class="number-card">{{ number }}</h1>
        </div>
        <div class="icon">
            <box-icon type='solid' :name='iconName' size='md' color='white' animation='tada-hover'></box-icon>
        </div>
    </div>
</template>

<style scoped>
.count-card{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    gap: 7;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    border-radius: 9px;

  background-color: #52476C;
  transition:
    border-color 0.3s,
    transform 0.3s;
}
.count-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20%;
    padding-top: 5%;

}

.count-card:hover {
    transform: scale(1.05);
    transform: scale(1.05);
}

.title-card {
    margin: 20px 0 0 0;
    margin: 20px 0 0 0;

    font-size: 1vw;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-variation-settings: "slnt" 0;
    color: #ffffff;
}

.number-card {
    margin: 0px 0px 26px 0px;
    font-size: 2vw;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-variation-settings: "slnt" 0;
    color: #ffffff;
    
}

.icon {
    position: absolute;
    bottom: 15px;
    right: 10%;
}
</style>
