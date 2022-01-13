<template>
  <ul>
    <li>Teliae response status is OK: <span :class="statusOk ? 'yes' : 'no'" /></li>
    <li>
      Shipping charge is not null:
      <span :class="shippingChargeNotNull ? 'yes' : 'no'" />
    </li>
    <li>
      Pickup date is not null:
      <span :class="pickupDateNotNull ? 'yes' : 'no'" />
    </li>
    <li>
      Pickup time range start is not null:
      <span :class="pickupTimeRangeStartNotNull ? 'yes' : 'no'" />
    </li>
    <li>
      Pickup time range end is not null:
      <span :class="pickupTimeRangeEndNotNull ? 'yes' : 'no'" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    teliaeOutput: Object,
  },
  computed: {
    statusOk(): boolean {
      try {
        if (!this.teliaeOutput) {
          return false;
        }
        return this.teliaeOutput.response_body.shipment[0].status === 'OK';
      } catch (e) {
        return false;
      }
    },
    shippingChargeNotNull(): boolean {
      try {
        if (!this.teliaeOutput) return false;
        return !!this.teliaeOutput.response_body.shipment[0].shipping_charge;
      } catch (e) {
        return false;
      }
    },
    pickupDateNotNull(): boolean {
      try {
        if (!this.teliaeOutput) return false;
        return !!this.teliaeOutput.response_body.shipment[0].Pickup_date;
      } catch (e) {
        return false;
      }
    },
    pickupTimeRangeStartNotNull(): boolean {
      try {
        if (!this.teliaeOutput) return false;
        return !!this.teliaeOutput.response_body.shipment[0].Pickup_range_start_hour;
      } catch (e) {
        return false;
      }
    },
    pickupTimeRangeEndNotNull(): boolean {
      try {
        if (!this.teliaeOutput) return false;
        return !!this.teliaeOutput.response_body.shipment[0].Pickup_end_range_hour;
      } catch (e) {
        return false;
      }
    },
  },
});
</script>

<style>
.yes {
  color: darkgreen;
}

.yes::before {
  content: 'YES';
}

.no {
  font-weight: bold;
  color: darkred;
}

.no::before {
  content: 'NO';
}
</style>
