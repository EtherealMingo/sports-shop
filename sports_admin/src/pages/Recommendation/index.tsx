import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    { title: '会员ID', dataIndex: 'memberId', width: 150 },
    { title: '推荐类型', dataIndex: 'recType', width: 100, render: (_: any, r: any) => <Tag color={r.recType === 'wire' ? 'blue' : r.recType === 'accessory' ? 'green' : 'orange'}>{r.recType === 'wire' ? '线材' : r.recType === 'accessory' ? '配件' : '活动'}</Tag> },
    { title: '推荐项目', dataIndex: 'recItemName', width: 150 },
    { title: '推荐理由', dataIndex: 'reason', width: 200 },
    { title: '得分', dataIndex: 'score', width: 80 },
    { title: '状态', dataIndex: 'status', width: 80, render: (_: any, r: any) => <Tag color={r.status === 'clicked' ? 'green' : r.status === 'ignored' ? 'default' : 'blue'}>{r.status === 'shown' ? '已展示' : r.status === 'clicked' ? '已点击' : '已忽略'}</Tag> },
    { title: '创建时间', dataIndex: 'createTime', width: 160 },
  ];

  return (
    <PageContainer>
      <ProTable headerTitle="个性化推荐" actionRef={actionRef} rowKey="id" search={{ labelWidth: 80 }}
        request={async () => ({ data: [{ id: 1, memberId: 'M202401010001', recType: 'wire', recItemName: 'Yonex BG-80', reason: '基于您上次的选择', score: 0.85, status: 'shown', createTime: '2026-06-12 10:00:00' }], success: true, total: 1 })}
        columns={columns} pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </PageContainer>
  );
};
