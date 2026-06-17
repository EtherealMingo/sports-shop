import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Badge, message } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  ReloadOutlined,
  ToolOutlined,
  CheckSquareOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useRef } from 'react';
import { history } from '@umijs/max';
import { getAppointments, updateServiceProgress } from '@/services/admin';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

// 状态配置
const statusConfig: Record<string, { text: string; color: string; icon: any }> = {
  pending: { text: '待确认', color: 'warning', icon: <ClockCircleOutlined /> },
  confirmed: { text: '已确认', color: 'processing', icon: <CheckCircleOutlined /> },
  received: { text: '已收件', color: 'purple', icon: <InboxOutlined /> },
  in_progress: { text: '缠线中', color: 'orange', icon: <ReloadOutlined /> },
  completed: { text: '已完成', color: 'success', icon: <ToolOutlined /> },
  delivered: { text: '已取件', color: 'default', icon: <ShoppingOutlined /> },
  cancelled: { text: '已取消', color: 'error', icon: <CloseCircleOutlined /> },
};

// 状态流程
const statusFlow: API.ServiceStatus[] = ['pending', 'confirmed', 'received', 'in_progress', 'completed', 'delivered'];

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Appointment>[] = [
    {
      title: '预约ID',
      dataIndex: 'id',
      width: 80,
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
      title: '服务类型',
      dataIndex: 'serviceType',
      width: 120,
      render: (_, record) => {
        const typeMap: Record<string, { text: string; color: string }> = {
          badminton: { text: '羽毛球拍缠线', color: 'blue' },
          tennis: { text: '网球拍缠线', color: 'green' },
        };
        const type = typeMap[record.serviceType] || { text: '未知', color: 'default' };
        return <Tag color={type.color}>{type.text}</Tag>;
      },
    },
    {
      title: '预约日期',
      dataIndex: 'appointmentDate',
      width: 120,
      render: (_, record) => record.appointmentDate || '-',
    },
    {
      title: '预约时段',
      dataIndex: 'timeSlot',
      width: 120,
    },
    {
      title: '球拍数量',
      dataIndex: 'racketCount',
      width: 80,
    },
    {
      title: '当前进度',
      dataIndex: 'status',
      width: 150,
      render: (_, record) => {
        const config = statusConfig[record.status];
        const currentIndex = statusFlow.indexOf(record.status as API.ServiceStatus);
        const totalSteps = statusFlow.length;
        
        return (
          <div>
            <Tag color={config.color} icon={config.icon}>
              {config.text}
            </Tag>
            {!['cancelled', 'delivered'].includes(record.status) && (
              <div style={{ marginTop: 4, fontSize: 12, color: '#999' }}>
                步骤 {currentIndex + 1} / {totalSteps}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: '预约时间',
      dataIndex: 'createTime',
      width: 180,
      render: (_, record) => record.createTime ? new Date(record.createTime).toLocaleString('zh-CN') : '-',
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <Button
          key="progress"
          type="primary"
          size="small"
          icon={<HistoryOutlined />}
          onClick={() => history.push(`/service-progress/${record.id}`)}
        >
          进度管理
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Appointment>
        headerTitle="预约管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button key="export" type="primary">
            导出数据
          </Button>,
        ]}
        request={async (params) => {
          const res = await getAppointments({
            current: params.current,
            pageSize: params.pageSize,
            status: params.status,
            date: params.date,
          });
          return {
            data: res.data || [],
            success: true,
            total: res.total || 0,
          };
        }}
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  );
};
