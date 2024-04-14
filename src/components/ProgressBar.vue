<template>
  <div id="progressbar">
    <div v-for="(trackData, trackName) in tracks" :key="trackName" class="track-wrapper">
      <div class="labeltrack">{{ trackName }}</div>

      <div v-for="(progress, expertiseName) in trackData" :key="expertiseName" class="wrapper">
        <div class="container">
          <div class="toplabel">{{ expertiseName }}</div>
          <div class="bar-wrapper">
            <div class="shell">
              <div class="bar" :style="{ width: progress + '%' }">
                <span>{{ progress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tracks: Object,
  },
};
</script>

<style scoped>
#progressbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  background-color: #fff;
  width: 600px; /* Adjust the width as desired */
  height: 400px; /* Adjust the height as desired */
  box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: border-color 0.3s, transform 0.3s;
}

.track-wrapper {
  margin-bottom: 20px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.labeltrack {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
  font-weight: bold;
}

.toplabel {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
  font-weight: semi-bold;
  padding-right: 10px;
}

.bar-wrapper {
  flex-grow: 1; 
  padding-right: 10px;
}

.shell {
  height: 20px;
  width: 250px;
  border: 1px solid #aaa;
  border-radius: 13px;
  padding: 3px;
}

.bar {
  background: #94DF49; 
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.bar span {
  float: right;
  padding: 4px 5px;
  color: #fff;
  font-size: 0.7em;
}

.container {
  display: flex;
  justify-content: space-between; /* Adjust as needed */
  align-items: center;
}
</style>
