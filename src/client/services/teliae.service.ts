import { Tradeline } from '@/interfaces/tradeline.interface';
import { http } from '@/client/http';
import { Address } from '@/client/services/address.service';

interface TeliaeRequest {
  teliaeEnv: string;
  sender: Address;
  receiver: Address;
  tradeline: Tradeline;
  declaredValue?: string;
  contractNumber?: string;
  invoicedCountry?: string;
  incoterm?: string;
}

export async function createTeliaeLabel(request: TeliaeRequest): Promise<Record<string, any>> {
  const { tradeline, ...data } = request;

  const response = await http.post('/create-label', {
    teliae_env: data.teliaeEnv,
    sender: data.sender,
    receiver: data.receiver,
    trade_line: {
      carrier_code: tradeline.carrierCode,
      service_name: tradeline.serviceName,
      shipment_type: tradeline.shipmentType,
    },
    declared_value: data.declaredValue,
    contract_number: data.contractNumber,
    invoiced_country: data.invoicedCountry,
    incoterm: data.incoterm,
  });

  return response.data;
}

export async function runRawQuery(
  teliaeQuery: string,
  teliaeEnv: string,
): Promise<Record<string, any>> {
  const response = await http.post('/run-raw-query', {
    query: teliaeQuery,
    teliae_env: teliaeEnv,
  });

  const { shipment_data: shipmentData, ...teliaeOutput } = response.data;

  return {
    shipmentData,
    teliaeOutput,
  };
}
