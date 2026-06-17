import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    { title: '技师', dataIndex: 'technicianName', width: 100 },
    { title: '培训类型', dataIndex: 'trainingType', width: 120 },
    { title: '触发原因', dataIndex: 'triggerReason', width: 200 },
    { title: '状态', dataIndex: 'status', width: 100, render: (_: any, r: any) => <Tag color={r.status === 'completed' ? 'green' : r.status === 'in_progress' ? 'blue' : 'orange'}>{r.status === 'completed' ? '已完成' : r.status === 'in_progress' ? '培训中' : '待培训'}</Tag> },
    { title: '结果', dataIndex: 'result', width: 80, render: (_: any, r: any) => r.result ? <Tag color={r.result === 'passed' ? 'green' : 'red'}>{r.result === 'passed' ? '通过' : '未通过'}</Tag> : '-' },
    { title: '分配时间', dataIndex: 'assignedAt', width: 160 },
    { title: '完成时间', dataIndex: 'completedAt', width: 160 },
    {
      title: '操作', valueType: 'option', width: 120,
      render: (_: any, record: any) => [
        record.status === 'pending' && <Button key="start" type="link" size="small" onClick={() => { message.success('培训已开始'); actionRef.current?.reload(); }}>开始培训</Button>,
        record.status === 'in_progress' && <Button key="complete" type="link" size="small" onClick={() => { message.success('培训已完成'); actionRef.current?.reload(); }}>完成培训</Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable headerTitle="培训管理" actionRef={actionRef} rowKey="id" search={{ labelWidth: 80 }}
        toolBarRender={() => [<Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => message.success('创建培训任务')}>创建培训</Button>]}
        request={async () => ({ data: [{ id: 1, technicianName: '李师傅', trainingType: '打结技巧', triggerReason: '连续3天损耗率>10%', status: 'pending', result: null, assignedAt: '2026-06-12 10:00:00', completedAt: null }], success: true, total: 1 })}
        columns={columns} pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </PageContainer>
  );
};
