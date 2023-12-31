/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, ContractTransaction, EventFilter, Signer } from "ethers";
import { Listener, Provider } from "ethers/providers";
import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TypedEventDescription, TypedFunctionDescription } from ".";

interface OwnableInterface extends Interface {
  functions: {
    owner: TypedFunctionDescription<{ encode([]: []): string }>;

    renounceOwnership: TypedFunctionDescription<{ encode([]: []): string }>;

    transferOwnership: TypedFunctionDescription<{
      encode([newOwner]: [string]): string;
    }>;
  };

  events: {
    OwnershipTransferred: TypedEventDescription<{
      encodeTopics([previousOwner, newOwner]: [
        string | null,
        string | null
      ]): string[];
    }>;
  };
}

export class Ownable extends Contract {
  connect(signerOrProvider: Signer | Provider | string): Ownable;
  attach(addressOrName: string): Ownable;
  deployed(): Promise<Ownable>;

  on(event: EventFilter | string, listener: Listener): Ownable;
  once(event: EventFilter | string, listener: Listener): Ownable;
  addListener(eventName: EventFilter | string, listener: Listener): Ownable;
  removeAllListeners(eventName: EventFilter | string): Ownable;
  removeListener(eventName: any, listener: Listener): Ownable;

  interface: OwnableInterface;

  functions: {
    owner(overrides?: UnsignedTransaction): Promise<string>;

    "owner()"(overrides?: UnsignedTransaction): Promise<string>;

    renounceOwnership(
      overrides?: UnsignedTransaction
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: UnsignedTransaction
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: UnsignedTransaction
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: UnsignedTransaction
    ): Promise<ContractTransaction>;
  };

  owner(overrides?: UnsignedTransaction): Promise<string>;

  "owner()"(overrides?: UnsignedTransaction): Promise<string>;

  renounceOwnership(
    overrides?: UnsignedTransaction
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: UnsignedTransaction
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: UnsignedTransaction
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: UnsignedTransaction
  ): Promise<ContractTransaction>;

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimate: {
    owner(overrides?: UnsignedTransaction): Promise<BigNumber>;

    "owner()"(overrides?: UnsignedTransaction): Promise<BigNumber>;

    renounceOwnership(overrides?: UnsignedTransaction): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: UnsignedTransaction): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: UnsignedTransaction
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: UnsignedTransaction
    ): Promise<BigNumber>;
  };
}
