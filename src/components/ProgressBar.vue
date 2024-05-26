<template>
  <div id="scrollable-progressbar">
    <div
      v-for="(trackData, trackName) in tracks"
      :key="trackName"
      class="track-wrapper"
    >
      <div class="labeltrack">{{ trackName }}</div>

      <div
        v-for="(progress, expertiseName) in trackData"
        :key="expertiseName"
        class="wrapper"
      >
        <div class="container">
          <div class="toplabel">{{ expertiseName }}</div>
          <div class="bar-wrapper">
            <div class="shell">
              <div class="bar" :style="{ width: progress + '%' }">
                <span>{{ progress.toFixed(2) }}%</span>
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
#scrollable-progressbar {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: bottom;
  font-family: sans-serif;
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.track-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.labeltrack {
  padding-top: 20px;
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333333;
  font-weight: bold;
}

.toplabel {
  padding-left: 40px;
  font-size: 80%;
  color: #504e4e;
  font-weight: semi-bold;
  vertical-align: middle;
  text-align: left;
  width: 30%;
  max-width: 120px;
  font-weight: bold;
}

.bar-wrapper {
  flex-grow: 1;
  padding-right: 10px;
  width: 100%;
  padding: 40px;
}

.shell {
  height: 30px;
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 13px;
  padding: 3px;
}

.bar {
  background: #a3c7ac;
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.bar span {
  float: right;
  padding: 4px 5px;
  color: #fff;
  font-size: 0.7em;
  font-weight: bold;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 20px;
}

* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
