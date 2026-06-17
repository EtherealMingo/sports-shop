// @ai-generated - 全部由 AI 輔助生成
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, InputNumber, Select, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getUsageList, addUsage, getWireList } from '@/services/wire';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [wireOptions, setWireOptions] = useState<{ label: string; value: number }[]>([]);

  const loadOptions = async () => {
    const res = await getWireList({ pageSize: 100 });
    setWireOptions((res.data?.data || []).map(w => ({ label: `${w.brand} ${w.model}`, value: w.id! })));
  };

  const columns: ProColumns<API.Usage>[] = [
    { title: '线材', dataIndex: 'wireName', width: 160 },
    { title: '消耗日期', dataIndex: 'usageDate', width: 120 },
    { title: '消耗数量(条)', dataIndex: 'quantity', width: 120 },
    { title: '用途类型', dataIndex: 'usageType', width: 100,
      render: (_, record) => record.usageType === 'service' ? '服务消耗' : record.usageType || '-',
    },
    { title: '关联订单', dataIndex: 'relatedOrder', width: 150 },
    { title: '操作人', dataIndex: 'operator', width: 100 },
    { title: '备注', dataIndex: 'remark', width: 200, ellipsis: true },
  ];

  const handleAdd = async () => { form.resetFields(); await loadOptions(); setModalVisible(true); };
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const submitData = {
      ...values,
      usageDate: values.usageDate ? dayjs(values.usageDate).format('YYYY-MM-DD') : '',
    };
    await addUsage(submitData);
    message.success('添加成功');
    setModalVisible(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<API.Usage>
        headerTitle="消耗记录"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增消耗</Button>,
        ]}
        request={async (params) => {
          const res = await getUsageList({ current: params.current, pageSize: params.pageSize, wireId: params.wireId });
          return { data: res.data?.data || [], success: true, total: res.data?.total || 0 };
        }}
        columns={columns}
        scroll={{ x: 1100 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
      <Modal title="新增消耗记录" open={modalVisible}
        onOk={handleSubmit} onCancel={() => setModalVisible(false)} width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="线材" name="wireId" rules={[{ required: true, message: '请选择线材' }]}>
            <Select placeholder="请选择线材" showSearch optionFilterProp="label" options={wireOptions} />
          </Form.Item>
          <Form.Item label="消耗日期" name="usageDate" rules={[{ required: true, message: '请选择消耗日期' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="消耗数量(条)" name="quantity" rules={[{ required: true, message: '请输入数量' }]}>
            <InputNumber min={1} placeholder="请输入消耗数量" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="关联订单号" name="relatedOrder">
            <Input placeholder="请输入关联订单号" />
          </Form.Item>
          <Form.Item label="操作人" name="operator">
            <Input placeholder="请输入操作人" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={2} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
