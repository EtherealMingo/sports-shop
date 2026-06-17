import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const columns: ProColumns<any>[] = [
    { title: '姓名', dataIndex: 'name', width: 120 },
    { title: '手机号', dataIndex: 'phone', width: 140 },
    { title: '技能', dataIndex: 'skillType', width: 150 },
    { title: '日均量', dataIndex: 'dailyAvg', width: 100 },
    { title: '损耗率', dataIndex: 'avgWastageRate', width: 100, render: (_: any, r: any) => `${r.avgWastageRate}%` },
    { title: '评分', dataIndex: 'avgRating', width: 80 },
    { title: '状态', dataIndex: 'status', width: 80, render: (_: any, r: any) => <Tag color={r.status === 1 ? 'green' : 'red'}>{r.status === 1 ? '在职' : '离职'}</Tag> },
    {
      title: '操作', valueType: 'option', width: 150,
      render: (_: any, record: any) => [
        <Button key="edit" type="link" size="small" icon={<EditOutlined />} onClick={() => { setEditing(record); form.setFieldsValue(record); setModalVisible(true); }}>编辑</Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable headerTitle="技师管理" actionRef={actionRef} rowKey="id" search={{ labelWidth: 80 }}
        toolBarRender={() => [<Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalVisible(true); }}>新增技师</Button>]}
        request={async (params) => ({ data: [{ id: 1, name: '张师傅', phone: '138-0000-5555', skillType: '羽毛球,网球', dailyAvg: 15, avgWastageRate: 5.5, avgRating: 4.8, status: 1 }], success: true, total: 1 })}
        columns={columns} pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
      <Modal title={editing ? '编辑技师' : '新增技师'} open={modalVisible} onCancel={() => setModalVisible(false)} onOk={() => { message.success(editing ? '更新成功' : '添加成功'); setModalVisible(false); actionRef.current?.reload(); }} width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="技能类型" name="skillType"><Input placeholder="如：羽毛球,网球" /></Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
