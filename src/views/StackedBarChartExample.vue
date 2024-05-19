<template>
  <div
    class="list"
  >
    <li
      class="list-item"
      v-for="item in data"
      :key="item.name"
    >
      <div class="bar" :style="getBarStyle(item, 0)" ></div>
      <div class="bar" :style="getBarStyle(item, 1)" ></div>
    </li>
  </div>
</template>

<script lang="ts">
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getBarStyle = (
  item: {
    name: string;
    uv: number;
    pv: number;
  },
  index: number,
) => {
  const totalSample = 15000
  const totalDados = item.uv + item.pv;

  let barHeight = 0;

  const dadosVsSampleFactor = totalDados / totalSample;

  if (index === 0) {
    barHeight = (item.uv / totalDados) * 100;
  } else if (index === 1) {
    barHeight = (item.pv / totalDados) * 100;
  } else {
    barHeight = (item.amt / totalDados) * 100;
  }

  return {
    height: `${barHeight * dadosVsSampleFactor}%`,
    backgroundColor: index === 0 ? 'blue' : index === 1 ? 'red' : 'green',
  };
};

export default {
  setup() {
    return {
      getBarStyle,
      data,
    };
  },
};
</script>

<style>
.list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  width: 100%;
}

.list-item {
  width: 32px;
  height: 50vh;
  background: palegoldenrod;
  margin: 0 10px;
}

.bar {
  width: 100%;
  height: 100%;
}
</style>
