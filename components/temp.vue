<template>
  <div class="snap-y-container">
    <div class="snap-y">
      <section class="snap-item">
        <h2>Section 1</h2>
        <p>This is the first section. Scroll to the next one to see the snap effect.</p>
      </section>
      <section class="snap-item">
        <h2>Section 2</h2>
        <p>This is the second section. Keep scrolling!</p>
      </section>
      <section class="snap-item">
        <h2>Section 3</h2>
        <p>This is the third section. Almost there!</p>
      </section>
      <section class="snap-item">
        <h2>Section 4</h2>
        <p>This is the fourth section. You're doing great!</p>
      </section>
      <section class="snap-item">
        <h2>Section 5</h2>
        <p>This is the last section. Enjoy the view!</p>
      </section>
    </div>
  </div>
</template>

<script setup>
// This component doesn't need any specific logic for the basic scroll snap behavior.
// You can add additional functionality here if needed in the future.
</script>

<style scoped>
.snap-y-container {
  height: 100vh; /* Make the container the full height of the viewport */
  overflow: hidden; /* Hide overflow to keep content inside */
}

.snap-y {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory; /* Enable vertical snap scrolling */
  height: 100%; /* Full height to allow scrolling */
}

.snap-item {
  height: 100lvh; /* Make each section take up the full height of the viewport */
  scroll-snap-align: start; /* Snap to the start of each section */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #ccc; /* Optional border between sections */
  background-color: #f1f1f1;
  text-align: center;
  box-sizing: border-box;
}

h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: #333;
}
</style>
