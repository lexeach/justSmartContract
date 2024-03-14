import { Button, Form, Input } from "antd";
import { ChainSelect, chainModel } from "@entities/chain";
import { TContractWithoutId } from "../model/types";

type TProps = {
  onSubmit: (_values: TContractWithoutId) => void;
  buttonText: string;
  value?: TContractWithoutId;
};

// @ts-ignore
const CustomChainInput = ({
  value,
  onChange,
}: {
  value?: any;
  onChange?: any;
}) =>
  value && onChange ? <ChainSelect value={value} onChange={onChange} /> : null;

export const ContractForm = ({ buttonText, value, onSubmit }: TProps) => {
  const { chain } = chainModel.useCurrentChain();

  const initialValue = value || { chain, abi: [] };

  const textFormValues = {
    ...initialValue,
    abi: JSON.stringify(initialValue.abi, null, 2),
  };

  const submitHandler = (formValues: any) => {
    onSubmit({
      ...formValues,
      abi: JSON.parse(formValues.abi),
    });
  };

  return (
    <Form
      preserve={false}
      initialValues={textFormValues}
      layout="vertical"
      name="add-contract"
      onFinish={submitHandler}
    >
      <Form.Item label="Chain" name="chain">
        <CustomChainInput />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Contract name missing" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Contract address missing" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ABI"
        name="abi"
        rules={[{ required: true, message: "Contract ABI missing" }]}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};
