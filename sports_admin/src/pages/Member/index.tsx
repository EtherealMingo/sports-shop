import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Space, Modal, Form, Input, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getMemberList, getMemberDetail, updateMember } from '@/services/admin';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const columns: ProColumns<API.Member>[] = [
    {
      title: '会员ID',
      dataIndex: 'memberId',
      width: 200,
      copyable: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 120,
    },
    {
      title: '会员等级',
      dataIndex: 'level',
      width: 100,
      render: (_, record) => {
        const levelMap: Record<string, { text: string; color: string }> = {
          '1': { text: '普通会员', color: 'default' },
          '2': { text: '白银会员', color: 'blue' },
          '3': { text: '黄金会员', color: 'gold' },
        };
        const level = levelMap[record.level] || { text: '未知', color: 'default' };
        return <Tag color={level.color}>{level.text}</Tag>;
      },
    },
    {
      title: '积分余额',
      dataIndex: 'points',
      width: 100,
      sorter: true,
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      width: 180,
      render: (_, record) => record.registerTime ? new Date(record.registerTime).toLocaleString('zh-CN') : '-',
      sorter: true,
    },
    {
      title: '最后消费时间',
      dataIndex: 'lastConsumeTime',
      width: 180,
      render: (_, record) => record.lastConsumeTime ? new Date(record.lastConsumeTime).toLocaleString('zh-CN') : '-',
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Button
          key="adjust"
          type="link"
          size="small"
          onClick={() => handleAdjustPoints(record)}
        >
          调整积分
        </Button>,
      ],
    },
  ];

  const handleEdit = async (record: API.Member) => {
    const detail = await getMemberDetail(record.memberId);
    form.setFieldsValue(detail.data);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    const values = await form.validateFields();
    await updateMember(values);
    setEditModalVisible(false);
    actionRef.current?.reload();
  };

  const handleAdjustPoints = (record: API.Member) => {
    // 这里可以跳转到积分调整页面或弹出调整框
    Modal.info({
      title: '调整积分',
      content: `会员: ${record.name} (${record.memberId})\n当前积分: ${record.points}`,
    });
  };

  return (
    <PageContainer>
      <ProTable<API.Member>
        headerTitle="会员列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />}>
            新增会员
          </Button>,
        ]}
        request={async (params) => {
          const res = await getMemberList({
            current: params.current,
            pageSize: params.pageSize,
            keyword: params.keyword,
          });
          return {
            data: res.data || [],
            success: true,
            total: res.total || 0,
          };
        }}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />

      <Modal
        title="编辑会员信息"
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="memberId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="请输入手机号" disabled />
          </Form.Item>
          <Form.Item label="会员等级" name="level">
            <Input placeholder="1-普通会员 2-白银会员 3-黄金会员" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
