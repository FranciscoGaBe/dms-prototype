<template>
  <div class="fixed top-0 left-0 right-0 pointer-events-none flex justify-center">
    <p
      class="absolute bg-black bg-opacity-70 text-white px-2 py-1 rounded transition-all duration-300 ease-in-out"
      :class="[show ? 'top-2' : '-top-10']"
    >{{ message }}</p>
  </div>
</template>

<script>

  export default {
    name: "DMSAlert",
    data: () => ({
      show: false,
      message: ""
    }),
    mounted: function () {
      this.$setAlert(this);
    },
    methods: {
      alert: function (message) {
        this.message =
          typeof message === "string"
          ? message :
          ("message" in message) ?
          message.message :
          "";
        this.show = true;
        setTimeout(() => {
          this.show = false;
          setTimeout(() => { this.message = "" }, 300)
        }, 3000)
      }
    }
  }
</script>