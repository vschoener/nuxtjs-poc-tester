<template>
  <div>
    <ul v-if="formErrors.length">
      <li v-for="error in formErrors" :key="error.message" class="alert alert-danger list-unstyled">
        {{ error.message }}
      </li>
    </ul>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-12 mb-1">
            <TeliaeEnvSelector v-model="teliaeEnv" :initial-value="teliaeEnv" />
          </div>
          <div class="col-lg-6 mb-1">
            <label class="form-label" for="carrier_code">Carrier code</label>
            <input
              id="carrier_code"
              class="form-control"
              name="carrier_code"
              :value="tradeline.carrierCode" />
          </div>
          <div class="col-lg-6 mb-1">
            <label class="form-label" for="service_name">Product code</label>
            <input
              id="service_name"
              class="form-control"
              name="service_name"
              :value="tradeline.serviceName" />
          </div>
          <div class="col-lg-6 mb-1">
            Shipment type
            <div class="form-check">
              <input
                id="shipment_type_delivery"
                v-model="tradeline.shipmentType"
                class="form-check-input"
                name="shipment_type"
                type="radio"
                value="DELIVERY"
                checked />
              <label class="form-check-label" for="shipment_type_delivery"> Delivery </label>
            </div>
            <div class="form-check">
              <input
                id="shipment_type_return"
                v-model="tradeline.shipmentType"
                class="form-check-input"
                type="radio"
                value="RETURN"
                name="shipment_type" />
              <label class="form-check-label" for="shipment_type_return"> Return </label>
            </div>
          </div>
          <div class="col-lg-12 mb-1">
            <label class="form-label pe-2">Sender</label>
            <AddressSelector v-model="senderId" :addresses="addresses" />
          </div>
          <div class="col-lg-12 mb-1">
            <label class="form-label pe-2">Receiver</label>
            <AddressSelector v-model="receiverId" :addresses="addresses" />
          </div>
          <div class="col-lg-6 mb-1">
            <label class="form-label">Declared value</label>
            <input v-model="declaredValue" class="form-control" name="declaredValue" type="text" />
            <div class="form-text">If price set, insurance will be enabled</div>
          </div>
          <div class="col-lg-6 mb-1">
            <label class="form-label">Contract number</label>
            <input
              v-model="contractNumber"
              class="form-control"
              name="contractNumber"
              type="text" />
          </div>
          <div class="col-lg-6 mb-1">
            <label class="form-label">Invoice country code</label>
            <input
              v-model="invoicedCountry"
              class="form-control"
              name="invoicedCountry"
              type="text" />
            <div class="form-text">If set, <strong>DT</strong> line will be appended</div>
          </div>
          <div class="col-lg-6 mb-1">
            <label class="form-label">Incoterm</label>
            <input v-model="incoterm" class="form-control" name="incoterm" type="text" />
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
import { createTeliaeLabel } from '@/client/services/teliae.service';
import AddressSelector from '@/components/AddressSelector.vue';
import TeliaeEnvSelector from '@/components/TeliaeEnvSelector.vue';
import TeliaeResult from '@/components/TeliaeResult.vue';
import { Address, fetchAddresses } from '@/client/services/address.service';
import ShipmentData from '@/components/ShipmentData.vue';
import { Tradeline } from '@/interfaces/tradeline.interface';

interface AppDataType {
  addresses?: Address[];
  teliaeEnv: string;
  senderId: string;
  receiverId: string;
  tradeline: Tradeline;
  teliaeOutput: Record<string, unknown>;
  declaredValue: string;
  contractNumber: string;
  invoicedCountry: string;
  incoterm: string;
  shipmentData?: Record<string, unknown>;
  formErrors: { message: string }[];
}

export default Vue.extend({
  components: {
    TeliaeEnvSelector,
    TeliaeResult,
    AddressSelector,
    ShipmentData,
  },
  async asyncData() {
    const addresses = await fetchAddresses();
    return { addresses };
  },
  data(): AppDataType {
    return {
      addresses: [],
      teliaeEnv: 'VM',
      senderId: '',
      receiverId: '',
      tradeline: {
        carrierCode: 'DHLUK',
        serviceName: 'EDOM',
        shipmentType: 'DELIVERY',
      },
      teliaeOutput: { status: false },
      declaredValue: '',
      contractNumber: '',
      invoicedCountry: '',
      incoterm: '',
      shipmentData: undefined,
      formErrors: [],
    };
  },
  methods: {
    async submit() {
      const { addresses, senderId, receiverId } = this;
      this.formErrors = [];

      if (
        this.teliaeEnv === 'PROD' &&
        this.tradeline.carrierCode === 'CHRON' &&
        !confirm('You are using chronopost in production, this may involve fees are you sure?')
      ) {
        return;
      }

      const sender = addresses?.find((a) => a.id === senderId);
      const receiver = addresses?.find((a) => a.id === receiverId);
      if (!sender || !receiver) {
        this.formErrors.push({
          message: 'Verify that the addresses are selected',
        });
        return;
      }

      this.teliaeOutput = { status: 'running' };
      this.shipmentData = undefined;
      const response = await createTeliaeLabel({
        teliaeEnv: this.teliaeEnv,
        sender,
        receiver,
        tradeline: this.tradeline,
        declaredValue: this.declaredValue,
        contractNumber: this.contractNumber,
        invoicedCountry: this.invoicedCountry?.toUpperCase(),
        incoterm: this.incoterm,
      });

      const { shipment_data: shipmentData, ...rest } = response.teliae_result;
      this.teliaeOutput = rest;
      this.shipmentData = shipmentData;
    },
  },
});
</script>
