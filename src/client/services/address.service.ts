import { http } from '@/client/http';

export interface Address {
  id: string;
  city: string;
  country: string;
  name: string;
  phone_number: string;
  postal_code: string;
  state: string;
  street: string;
}

export async function fetchAddresses(): Promise<Address[]> {
  const { data: addresses } = await http.get<Address[]>('/addresses');

  const reOrderedAddresses = addresses.sort((currentAddress: Address, nextAddress: Address) =>
    currentAddress.country < nextAddress.country ? -1 : 1,
  );

  return reOrderedAddresses;
}

export async function getAddressById(addressId: string): Promise<Address> {
  const { data: address } = await http.get(`/addresses/${addressId}`);

  return address;
}

export async function createAddress(addressData: Address): Promise<Address> {
  const { data: address } = await http.post(`/addresses`, addressData);

  return address;
}
