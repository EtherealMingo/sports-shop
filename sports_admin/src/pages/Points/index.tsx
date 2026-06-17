import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { GiftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import {
  addPoints,
  redeemPoints,
  getPointsRecords,
} from '@/services/admin';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();
  const [adjustForm] = Form.useForm();
  const [adjustModalVisible, setAdjustModalVisible] = useState(false);
  const [redeemForm] = Form.useForm();
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);

  const columns: ProColumns<API.PointsRecord>[] = [
    {
      title: '会员ID',
      dataIndex: 'memberId',
      width: 200,
    },
    {
      title: '会员姓名',
      dataIndex: 'memberName',
      width: 120,
    },
    {
      title: '会员手机',
      dataIndex: 'memberPhone',
      width: 120,
    },
    {
      title: '积分数量',
      dataIndex: 'points',
      width: 100,
      render: (_, record) => {
        const isEarn = record.type === 'earn';
        return (
          <span style={{ color: isEarn ? '#52c41a' : '#ff4d4f', fontWeight: 'bold' }}>
            {isEarn ? '+' : '-'}{record.points}
          </span>
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (_, record) => {
        const typeMap: Record<string, { text: string; color: string }> = {
          earn: { text: '获得', color: 'success' },
          deduct: { text: '扣除', color: 'error' },
        };
        const type = typeMap[record.type] || { text: '未知', color: 'default' };
        return <Tag color={type.color}>{type.text}</Tag>;
      },
    },
    {
      title: '原因',
      dataIndex: 'reason',
      width: 200,
      ellipsis: true,
    },
    {
      title: '记录时间',
      dataIndex: 'createTime',
      width: 180,
      render: (_, record) => record.createTime ? new Date(record.createTime).toLocaleString('zh-CN') : '-',
      sorter: true,
    },
  ];

  const handleAdjustPoints = () => {
    adjustForm.resetFields();
    setAdjustModalVisible(true);
  };

  const handleAdjustSubmit = async () => {
    const values = await adjustForm.validateFields();
    await addPoints(values);
    message.success('积分调整成功');
    setAdjustModalVisible(false);
    actionRef.current?.reload();
  };

  const handleRedeemPoints = () => {
    redeemForm.resetFields();
    setRedeemModalVisible(true);
  };

  const handleRedeemSubmit = async () => {
    const values = await redeemForm.validateFields();
    await redeemPoints(values);
    message.success('积分核销成功');
    setRedeemModalVisible(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<API.PointsRecord>
        headerTitle="积分明细"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button
            key="adjust"
            type="primary"
            icon={<GiftOutlined />}
            onClick={handleAdjustPoints}
          >
            调整积分
          </Button>,
          <Button
            key="redeem"
            icon={<MinusOutlined />}
            onClick={handleRedeemPoints}
          >
            积分核销
          </Button>,
        ]}
        request={async (params) => {
          const res = await getPointsRecords({
            current: params.current,
            pageSize: params.pageSize,
            memberId: params.memberId,
            type: params.type,
          });
          return {
            data: res.data || [],
            success: true,
            total: res.total || 0,
          };
        }}
        columns={columns}
        scroll={{ x: 1100 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />

      <Modal
        title="调整积分"
        open={adjustModalVisible}
        onOk={handleAdjustSubmit}
        onCancel={() => setAdjustModalVisible(false)}
        width={500}
      >
        <Form form={adjustForm} layout="vertical">
          <Form.Item
            label="会员ID/手机号"
            name="memberId"
            rules={[{ required: true, message: '请输入会员ID或手机号' }]}
          >
            <Input placeholder="请输入会员ID或手机号" />
          </Form.Item>
          <Form.Item
            label="操作类型"
            name="type"
            rules={[{ required: true, message: '请选择操作类型' }]}
          >
            <Select placeholder="请选择操作类型">
              <Select.Option value="add">补赠积分</Select.Option>
              <Select.Option value="deduct">扣除积分</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="积分数量"
            name="points"
            rules={[{ required: true, message: '请输入积分数量' }]}
          >
            <InputNumber
              min={1}
              max={99999}
              placeholder="请输入积分数量"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="调整原因"
            name="reason"
            rules={[{ required: true, message: '请输入调整原因' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="请输入调整原因"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="积分核销"
        open={redeemModalVisible}
        onOk={handleRedeemSubmit}
        onCancel={() => setRedeemModalVisible(false)}
        width={500}
      >
        <Form form={redeemForm} layout="vertical">
          <Form.Item
            label="会员ID/手机号"
            name="memberId"
            rules={[{ required: true, message: '请输入会员ID或手机号' }]}
          >
            <Input placeholder="请输入会员ID或手机号" />
          </Form.Item>
          <Form.Item
            label="消费金额(元)"
            name="amount"
            rules={[{ required: true, message: '请输入消费金额' }]}
          >
            <InputNumber
              min={0.01}
              precision={2}
              placeholder="请输入消费金额"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="消费类型"
            name="consumeType"
            rules={[{ required: true, message: '请选择消费类型' }]}
          >
            <Select placeholder="请选择消费类型">
              <Select.Option value="service">服务消费</Select.Option>
              <Select.Option value="product">商品消费</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="使用积分"
            name="usePoints"
            extra="10积分可抵扣1元,不使用请留空"
          >
            <InputNumber
              min={0}
              placeholder="请输入使用积分"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
