<template>
  <div v-if="shipmentData" id="shipmentData">
    <h2>Shipment Data</h2>
    <table>
      <tr>
        <th>Line Number</th>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr v-for="(value, name, index) in shipmentData" :key="name" :item="value" :index="index">
        <td>{{ (index += 1) }}</td>
        <td>{{ name }}</td>
        <td>{{ value }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShipmentData',
  props: ['shipmentData'],
});
</script>
