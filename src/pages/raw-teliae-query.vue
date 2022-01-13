<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col">
          <TeliaeEnvSelector v-model="teliaeEnv" :initial-value="teliaeEnv" />
          <div><textarea v-model="query" class="form-control"></textarea></div>
          <div class="form-check">
            <input
              id="flexCheckDefault"
              v-model="base64"
              class="form-check-input"
              type="checkbox" />
            <label class="form-check-label" for="flexCheckDefault"> Use base64 </label>
          </div>
          <div class="d-grid gap-2 col-6 mx-auto mt-3">
            <button class="btn btn-outline-success btn-block" @click="submit()">Submit</button>
          </div>
          <TeliaeResult :teliae-output="teliaeOutput" />
          <ShipmentData :shipment-data="shipmentData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TeliaeEnvSelector from '@/components/TeliaeEnvSelector.vue';
import TeliaeResult from '@/components/TeliaeResult.vue';
import ShipmentData from '@/components/ShipmentData.vue';
import { runRawQuery } from '@/client/services/teliae.service';

interface RunTeliaeQueryDataType {
  query: string;
  base64: boolean;
  teliaeEnv: string;
  teliaeOutput?: Record<string, unknown>;
  shipmentData?: Record<string, unknown>;
}

export default Vue.extend({
  name: 'RunTeliaeQuery',
  components: { TeliaeResult, TeliaeEnvSelector, ShipmentData },
  data(): RunTeliaeQueryDataType {
    return {
      query: '',
      base64: false,
      teliaeEnv: 'VM',
      teliaeOutput: undefined,
      shipmentData: undefined,
    };
  },
  methods: {
    async submit() {
      const { query, base64, teliaeEnv } = this;
      this.teliaeOutput = { status: 'running' };
      this.shipmentData = undefined;

      const teliaeQuery = base64 ? atob(query) : query.replace(/\\n/g, '\n');

      const { shipmentData, teliaeOutput } = await runRawQuery(teliaeQuery, teliaeEnv);

      this.teliaeOutput = teliaeOutput;
      this.shipmentData = shipmentData;
    },
  },
});
</script>
