import { useCallback, useEffect } from "react";
import { usePublicClient } from "wagmi";
import { Form } from "antd";
import { walletModel } from "@entities/wallet";
import { TAddress, isEvmAddress } from "@shared/lib/web3";
import { TNativeValue, TTransactionParams } from "@shared/lib/tx";
import { TAbiFunction, TContract } from "@entities/contract";
import { useInitialTransactionParams } from "./useInitialTransactionParams";

export const useTransactionParamsForm = (
  contract: TContract,
  abiItem: TAbiFunction,
  args: string[]
) => {
  const publicClient = usePublicClient();
  const { address } = walletModel.useCurrentWallet();

  const [form] = Form.useForm<TTransactionParams>();

  const initialValues = useInitialTransactionParams(contract, abiItem, args);

  const updateNonce = useCallback(
    (address: TAddress) => {
      publicClient
        .getTransactionCount({ address })
        .then((value) => form.setFieldValue("nonce", value));
    },
    [form, publicClient]
  );

  const updateGasLimit = useCallback(
    (address: TAddress, value?: TNativeValue) => {
      publicClient
        .estimateGas({
          account: address,
          to: initialValues.to,
          data: initialValues.data,
          value: BigInt(value || 0),
        })
        .then((value) => form.setFieldValue("gas", value.toString()))
        .catch(() => form.setFieldValue("gas", "0"));
    },
    [form, initialValues.data, initialValues.to, publicClient]
  );

  const onValuesChange = useCallback(
    (changed: Partial<TTransactionParams>) => {
      if (changed.from && isEvmAddress(changed.from)) {
        updateNonce(changed.from);
        updateGasLimit(changed.from);
      }

      if (changed.value) {
        updateGasLimit(form.getFieldValue("from"), changed.value);
      }
    },
    [form, updateGasLimit, updateNonce]
  );

  useEffect(() => {
    if (address) {
      form.setFieldValue("from", address);
      onValuesChange({ from: address });
    }
  }, [address, form, onValuesChange, updateNonce]);

  return {
    form,
    onValuesChange,
    initialValues,
    payable: abiItem.stateMutability == "payable",
  };
};
