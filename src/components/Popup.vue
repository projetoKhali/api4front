<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button
        v-if="togglePopup"
        class="popup-close"
        @click="() => togglePopup()"
      >
        Close popup
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    togglePopup: {
      type: Function,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background: #fff;
    padding: 32px;
  }
}
</style>
