// @ai-generated - 全部由 AI 輔助生成
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Modal, Form, Input, InputNumber, Select, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getPurchaseList, addPurchase, getWireList, getSupplierList } from '@/services/wire';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [wireOptions, setWireOptions] = useState<{ label: string; value: number }[]>([]);
  const [supplierOptions, setSupplierOptions] = useState<{ label: string; value: number }[]>([]);

  const loadOptions = async () => {
    const [wires, suppliers] = await Promise.all([
      getWireList({ pageSize: 100 }),
      getSupplierList({ pageSize: 100 }),
    ]);
    setWireOptions((wires.data?.data || []).map(w => ({ label: `${w.brand} ${w.model}`, value: w.id! })));
    setSupplierOptions((suppliers.data?.data || []).map(s => ({ label: s.name || '', value: s.id! })));
  };

  const columns: ProColumns<API.Purchase>[] = [
    { title: '批次号', dataIndex: 'batchNo', width: 160, copyable: true },
    { title: '线材', dataIndex: 'wireName', width: 160 },
    { title: '供应商', dataIndex: 'supplierName', width: 160 },
    { title: '进货日期', dataIndex: 'purchaseDate', width: 120 },
    { title: '数量(条)', dataIndex: 'quantity', width: 100 },
    { title: '单价(元)', dataIndex: 'unitPrice', width: 100,
      render: (_, record) => record.unitPrice ? `¥${record.unitPrice.toFixed(2)}` : '-',
    },
    { title: '总价(元)', dataIndex: 'totalPrice', width: 100,
      render: (_, record) => record.totalPrice ? `¥${record.totalPrice.toFixed(2)}` : '-',
    },
    {
      title: '付款方式', dataIndex: 'paymentMethod', width: 100,
      render: (_, record) => {
        const map: Record<string, { text: string; color: string }> = {
          cash: { text: '现金', color: 'green' },
          transfer: { text: '转账', color: 'blue' },
          monthly: { text: '月结', color: 'orange' },
        };
        const item = map[record.paymentMethod || ''] || { text: '-', color: 'default' };
        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    { title: '备注', dataIndex: 'remark', width: 150, ellipsis: true },
  ];

  const handleAdd = async () => {
    form.resetFields();
    await loadOptions();
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const submitData = {
      ...values,
      purchaseDate: values.purchaseDate ? dayjs(values.purchaseDate).format('YYYY-MM-DD') : '',
    };
    await addPurchase(submitData);
    message.success('添加成功');
    setModalVisible(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<API.Purchase>
        headerTitle="进货记录"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增进货</Button>,
        ]}
        request={async (params) => {
          const res = await getPurchaseList({
            current: params.current, pageSize: params.pageSize,
            wireId: params.wireId, supplierId: params.supplierId,
          });
          return { data: res.data || [], success: true, total: res.total || 0 };
        }}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
      <Modal title="新增进货" open={modalVisible}
        onOk={handleSubmit} onCancel={() => setModalVisible(false)} width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="线材" name="wireId" rules={[{ required: true, message: '请选择线材' }]}>
            <Select placeholder="请选择线材" showSearch optionFilterProp="label" options={wireOptions} />
          </Form.Item>
          <Form.Item label="供应商" name="supplierId" rules={[{ required: true, message: '请选择供应商' }]}>
            <Select placeholder="请选择供应商" showSearch optionFilterProp="label" options={supplierOptions} />
          </Form.Item>
          <Form.Item label="进货日期" name="purchaseDate" rules={[{ required: true, message: '请选择进货日期' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="数量(条)" name="quantity" rules={[{ required: true, message: '请输入数量' }]}>
            <InputNumber min={1} placeholder="请输入数量" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="单价(元)" name="unitPrice" rules={[{ required: true, message: '请输入单价' }]}>
            <InputNumber min={0.01} precision={2} placeholder="请输入单价" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="付款方式" name="paymentMethod">
            <Select placeholder="请选择付款方式">
              <Select.Option value="cash">现金</Select.Option>
              <Select.Option value="transfer">转账</Select.Option>
              <Select.Option value="monthly">月结</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={2} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
