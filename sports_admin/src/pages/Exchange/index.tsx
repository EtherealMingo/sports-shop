import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Image,
  Tabs,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, GiftOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import {
  getExchangeItems,
  addExchangeItem,
  updateExchangeItem,
  deleteExchangeItem,
  getExchangeRecords,
  redeemExchangeRecord,
} from '@/services/admin';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const [activeTab, setActiveTab] = useState('items');
  const actionRef = useRef<ActionType>();
  const [itemForm] = Form.useForm();
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<API.ExchangeItem | null>(null);

  const itemColumns: ProColumns<API.ExchangeItem>[] = [
    {
      title: '商品图片',
      dataIndex: 'image',
      width: 100,
      render: (_, record) => (
        <Image src={record.image} width={60} height={60} style={{ objectFit: 'cover' }} />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '商品描述',
      dataIndex: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: '所需积分',
      dataIndex: 'points',
      width: 100,
      sorter: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width: 80,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (_, record) => {
        const typeMap: Record<string, { text: string; color: string }> = {
          product: { text: '商品', color: 'blue' },
          service: { text: '服务', color: 'green' },
        };
        const type = typeMap[record.type] || { text: '未知', color: 'default' };
        return <Tag color={type.color}>{type.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          active: { text: '启用', color: 'success' },
          inactive: { text: '停用', color: 'default' },
        };
        const status = statusMap[record.status] || { text: '未知', color: 'default' };
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEditItem(record)}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          type="link"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteItem(record)}
        >
          删除
        </Button>,
      ],
    },
  ];

  const recordColumns: ProColumns<API.ExchangeRecord>[] = [
    {
      title: '兑换码',
      dataIndex: 'code',
      width: 150,
      copyable: true,
    },
    {
      title: '会员信息',
      dataIndex: 'memberId',
      width: 150,
      render: (_, record) => (
        <div>
          <div>{record.memberName}</div>
          <div style={{ color: '#999', fontSize: 12 }}>{record.memberPhone}</div>
        </div>
      ),
    },
    {
      title: '兑换商品',
      dataIndex: 'itemName',
      width: 150,
    },
    {
      title: '消耗积分',
      dataIndex: 'points',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          pending: { text: '待核销', color: 'warning' },
          redeemed: { text: '已核销', color: 'success' },
          cancelled: { text: '已取消', color: 'default' },
        };
        const status = statusMap[record.status] || { text: '未知', color: 'default' };
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '兑换时间',
      dataIndex: 'createTime',
      width: 180,
      render: (_, record) => record.createTime ? new Date(record.createTime).toLocaleString('zh-CN') : '-',
    },
    {
      title: '核销时间',
      dataIndex: 'redeemTime',
      width: 180,
      render: (_, record) => record.redeemTime ? new Date(record.redeemTime).toLocaleString('zh-CN') : '-',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, record) =>
        record.status === 'pending' && (
          <Button
            key="redeem"
            type="link"
            size="small"
            onClick={() => handleRedeemRecord(record)}
          >
            核销
          </Button>
        ),
    },
  ];

  const handleAddItem = () => {
    itemForm.resetFields();
    setEditingItem(null);
    setItemModalVisible(true);
  };

  const handleEditItem = (record: API.ExchangeItem) => {
    setEditingItem(record);
    itemForm.setFieldsValue(record);
    setItemModalVisible(true);
  };

  const handleItemSubmit = async () => {
    const values = await itemForm.validateFields();
    if (editingItem) {
      await updateExchangeItem(editingItem.id, values);
      message.success('更新成功');
    } else {
      await addExchangeItem(values);
      message.success('添加成功');
    }
    setItemModalVisible(false);
    actionRef.current?.reload();
  };

  const handleDeleteItem = (record: API.ExchangeItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除商品"${record.name}"吗?`,
      onOk: async () => {
        await deleteExchangeItem(record.id);
        message.success('删除成功');
        actionRef.current?.reload();
      },
    });
  };

  const handleRedeemRecord = async (record: API.ExchangeRecord) => {
    Modal.confirm({
      title: '确认核销',
      content: `确定要核销兑换码"${record.code}"吗?`,
      onOk: async () => {
        await redeemExchangeRecord({ recordId: record.id });
        message.success('核销成功');
        actionRef.current?.reload();
      },
    });
  };

  const uploadProps = {
    name: 'file',
    listType: 'picture-card' as const,
    maxCount: 1,
    beforeUpload: () => false,
  };

  return (
    <PageContainer>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="兑换商品" key="items">
          <ProTable<API.ExchangeItem>
            headerTitle="兑换商品列表"
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={() => [
              <Button key="add" type="primary" icon={<PlusOutlined />} onClick={handleAddItem}>
                添加商品
              </Button>,
            ]}
            request={async () => {
              const res = await getExchangeItems();
              return {
                data: res.data || [],
                success: true,
                total: res.data?.length || 0,
              };
            }}
            columns={itemColumns}
            search={false}
            scroll={{ x: 1000 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="兑换记录" key="records">
          <ProTable<API.ExchangeRecord>
            headerTitle="兑换记录列表"
            actionRef={actionRef}
            rowKey="id"
            search={{
              labelWidth: 80,
            }}
            request={async (params) => {
              const res = await getExchangeRecords({
                current: params.current,
                pageSize: params.pageSize,
                status: params.status,
              });
              return {
                data: res.data || [],
                success: true,
                total: res.total || 0,
              };
            }}
            columns={recordColumns}
            scroll={{ x: 1200 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
            }}
          />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={editingItem ? '编辑商品' : '添加商品'}
        open={itemModalVisible}
        onOk={handleItemSubmit}
        onCancel={() => setItemModalVisible(false)}
        width={600}
      >
        <Form form={itemForm} layout="vertical">
          <Form.Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="description"
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入商品描述" />
          </Form.Item>
          <Form.Item
            label="所需积分"
            name="points"
            rules={[{ required: true, message: '请输入所需积分' }]}
          >
            <InputNumber min={1} placeholder="请输入所需积分" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="库存数量"
            name="stock"
            rules={[{ required: true, message: '请输入库存数量' }]}
          >
            <InputNumber min={0} placeholder="请输入库存数量" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="商品类型"
            name="type"
            rules={[{ required: true, message: '请选择商品类型' }]}
          >
            <Select placeholder="请选择商品类型">
              <Select.Option value="product">商品</Select.Option>
              <Select.Option value="service">服务</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">停用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="商品图片"
            name="image"
            rules={[{ required: true, message: '请上传商品图片' }]}
          >
            <Upload {...uploadProps}>
              <Button icon={<PlusOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
