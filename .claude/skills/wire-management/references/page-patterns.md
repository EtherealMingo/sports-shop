# 线材管理系统 — 前端页面模式参考

## 1. 列表页（以线材列表为例）

```tsx
// pages/Wire/index.tsx
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getWireList, addWire, updateWire, deleteWire } from '@/services/wire';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<API.Wire | null>(null);

  const columns: ProColumns<API.Wire>[] = [
    { title: '品牌', dataIndex: 'brand', width: 120 },
    { title: '型号', dataIndex: 'model', width: 120 },
    { title: '规格', dataIndex: 'spec', width: 100 },
    { title: '颜色', dataIndex: 'color', width: 80 },
    {
      title: '类型', dataIndex: 'type', width: 100,
      render: (_, record) => (
        <Tag color={record.type === 'badminton' ? 'blue' : 'green'}>
          {record.type === 'badminton' ? '羽毛球' : '网球'}
        </Tag>
      ),
    },
    { title: '最低库存', dataIndex: 'minStock', width: 100 },
    {
      title: '实时库存', dataIndex: 'currentStock', width: 100,
      render: (_, record) => (
        <span style={{ color: (record.currentStock || 0) <= (record.minStock || 0) ? '#ff4d4f' : '#52c41a' }}>
          {record.currentStock ?? '-'}
        </span>
      ),
    },
    {
      title: '加权均价', dataIndex: 'avgCost', width: 100,
      render: (_, record) => record.avgCost ? `¥${record.avgCost.toFixed(2)}` : '-',
    },
    {
      title: '操作', valueType: 'option', width: 180,
      render: (_, record) => [
        <Button key="edit" type="link" size="small" icon={<EditOutlined />}
          onClick={() => handleEdit(record)}>编辑</Button>,
        <Button key="delete" type="link" size="small" danger icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}>删除</Button>,
      ],
    },
  ];

  const handleAdd = () => { form.resetFields(); setEditing(null); setModalVisible(true); };
  const handleEdit = (record: API.Wire) => { setEditing(record); form.setFieldsValue(record); setModalVisible(true); };
  const handleDelete = (record: API.Wire) => {
    Modal.confirm({
      title: '确认删除', content: `确定要删除"${record.brand} ${record.model}"吗?`,
      onOk: async () => { await deleteWire(record.id!); message.success('删除成功'); actionRef.current?.reload(); },
    });
  };
  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editing) { await updateWire(editing.id!, values); message.success('更新成功'); }
    else { await addWire(values); message.success('添加成功'); }
    setModalVisible(false); actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<API.Wire>
        headerTitle="线材列表"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增线材</Button>,
        ]}
        request={async (params) => {
          const res = await getWireList({ current: params.current, pageSize: params.pageSize,
            keyword: params.keyword, type: params.type });
          return { data: res.data?.data || [], success: true, total: res.data?.total || 0 };
        }}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
      <Modal title={editing ? '编辑线材' : '新增线材'} open={modalVisible}
        onOk={handleSubmit} onCancel={() => setModalVisible(false)} width={500}>
        <Form form={form} layout="vertical">
          <Form.Item label="品牌" name="brand" rules={[{ required: true, message: '请输入品牌' }]}>
            <Input placeholder="请输入品牌" />
          </Form.Item>
          <Form.Item label="型号" name="model" rules={[{ required: true, message: '请输入型号' }]}>
            <Input placeholder="请输入型号" />
          </Form.Item>
          <Form.Item label="规格" name="spec">
            <Input placeholder="如 0.65mm" />
          </Form.Item>
          <Form.Item label="颜色" name="color">
            <Input placeholder="请输入颜色" />
          </Form.Item>
          <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
            <Select placeholder="请选择类型">
              <Select.Option value="badminton">羽毛球</Select.Option>
              <Select.Option value="tennis">网球</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="最低库存预警" name="minStock">
            <InputNumber min={0} placeholder="库存低于此值时预警" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
```

## 2. 库存页（Inventory）

使用 `ProTable` + `StatisticCard` 展示低库存预警摘要：

```tsx
import { PageContainer, ProTable, StatisticCard } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { AlertOutlined } from '@ant-design/icons';

const { Statistic } = StatisticCard;

// 顶部统计
<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
  <Col span={6}>
    <StatisticCard statistic={{
      title: '线材种类', value: inventorySummary.totalTypes,
      icon: <AppstoreOutlined style={{ color: '#1890ff' }} />,
    }} />
  </Col>
  <Col span={6}>
    <StatisticCard statistic={{
      title: '库存总量', value: inventorySummary.totalStock,
      icon: <BuildOutlined style={{ color: '#52c41a' }} />,
    }} />
  </Col>
  <Col span={6}>
    <StatisticCard statistic={{
      title: '库存总值', value: `¥${inventorySummary.totalValue?.toFixed(2)}`,
      icon: <DollarOutlined style={{ color: '#faad14' }} />,
    }} />
  </Col>
  <Col span={6}>
    <StatisticCard statistic={{
      title: '低库存预警', value: inventorySummary.lowStockCount,
      icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
    }} />
  </Col>
</Row>
```

## 3. 报表页（Report）

使用 `@ant-design/plots` 或 `@ant-design/pro-components` 的图表组件：

```tsx
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Row, Col, DatePicker, Select } from 'antd';
import { BarChart, LineChart } from '@ant-design/plots';

// 日消耗趋势图
const DailyChart = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'qty',
    seriesField: 'wireName',
    smooth: true,
  };
  return <BarChart {...config} />;
};
```

## 4. 消耗/报废录入页

简单表单页，适合使用 `ProForm`：

```tsx
import { PageContainer } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormDatePicker, ProFormInputNumber, ProFormText } from '@ant-design/pro-components';

export default () => {
  const [form] = ProForm.useForm();

  return (
    <PageContainer>
      <ProForm form={form} layout="vertical" onFinish={async (values) => { await addUsage(values); }}>
        <ProFormSelect name="wireId" label="选择线材" rules={[{ required: true }]}
          request={async () => { /* 调用 getWireList */ }} />
        <ProFormDatePicker name="usageDate" label="消耗日期" rules={[{ required: true }]} />
        <ProFormInputNumber name="quantity" label="消耗数量(条)" rules={[{ required: true }]} />
        <ProFormText name="relatedOrder" label="关联订单号" />
        <ProFormText name="operator" label="操作人" />
      </ProForm>
    </PageContainer>
  );
};
```
