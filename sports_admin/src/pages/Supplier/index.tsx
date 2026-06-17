// @ai-generated - 全部由 AI 輔助生成
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getSupplierList, addSupplier, updateSupplier } from '@/services/wire';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<API.Supplier | null>(null);

  const columns: ProColumns<API.Supplier>[] = [
    { title: '供应商名称', dataIndex: 'name', width: 200 },
    { title: '联络人', dataIndex: 'contact', width: 120 },
    { title: '电话', dataIndex: 'phone', width: 140 },
    { title: '支付方式', dataIndex: 'paymentMethod', width: 120,
      render: (_, record) => {
        const map: Record<string, string> = { cash: '现金', transfer: '转账', monthly: '月结' };
        return map[record.paymentMethod || ''] || record.paymentMethod || '-';
      },
    },
    { title: '备注', dataIndex: 'remark', width: 200, ellipsis: true },
    {
      title: '操作', valueType: 'option', width: 150, fixed: 'right',
      render: (_, record) => [
        <Button key="edit" type="link" size="small" icon={<EditOutlined />}
          onClick={() => handleEdit(record)}>编辑</Button>,
      ],
    },
  ];

  const handleAdd = () => { form.resetFields(); setEditing(null); setModalVisible(true); };
  const handleEdit = (record: API.Supplier) => { setEditing(record); form.setFieldsValue(record); setModalVisible(true); };
  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editing) { await updateSupplier(editing.id!, values); message.success('更新成功'); }
    else { await addSupplier(values); message.success('添加成功'); }
    setModalVisible(false); actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<API.Supplier>
        headerTitle="供应商列表"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增供应商</Button>,
        ]}
        request={async (params) => {
          const res = await getSupplierList({ current: params.current, pageSize: params.pageSize, keyword: params.keyword });
          return { data: res.data || [], success: true, total: res.total || 0 };
        }}
        columns={columns}
        scroll={{ x: 1000 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
      <Modal title={editing ? '编辑供应商' : '新增供应商'} open={modalVisible}
        onOk={handleSubmit} onCancel={() => setModalVisible(false)} width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="供应商名称" name="name" rules={[{ required: true, message: '请输入供应商名称' }]}>
            <Input placeholder="请输入供应商名称" />
          </Form.Item>
          <Form.Item label="联络人" name="contact">
            <Input placeholder="请输入联络人" />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item label="支付方式" name="paymentMethod">
            <Select placeholder="请选择支付方式">
              <Select.Option value="cash">现金</Select.Option>
              <Select.Option value="transfer">转账</Select.Option>
              <Select.Option value="monthly">月结</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
