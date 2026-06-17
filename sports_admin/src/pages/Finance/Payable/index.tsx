import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    { title: '供应商', dataIndex: 'supplierName', width: 160 },
    { title: '应付总额(元)', dataIndex: 'totalPayable', width: 130 },
    { title: '已付金额(元)', dataIndex: 'paidAmount', width: 120 },
    { title: '未付金额(元)', dataIndex: 'remainingAmount', width: 120 },
    { title: '到期日期', dataIndex: 'dueDate', width: 120 },
    { title: '状态', dataIndex: 'status', width: 100, render: (_: any, r: any) => <Tag color={r.status === 'paid' ? 'green' : r.status === 'overdue' ? 'red' : r.status === 'partial' ? 'orange' : 'default'}>{r.status === 'paid' ? '已付' : r.status === 'overdue' ? '逾期' : r.status === 'partial' ? '部分' : '未付'}</Tag> },
    {
      title: '操作', valueType: 'option', width: 120,
      render: (_: any, record: any) => [
        record.status !== 'paid' && <Button key="pay" type="link" size="small" onClick={() => { message.success('记录付款成功'); actionRef.current?.reload(); }}>记录付款</Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable headerTitle="应付账款" actionRef={actionRef} rowKey="id" search={{ labelWidth: 80 }}
        toolBarRender={() => [<Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => message.success('新增应付账款')}>新增应付</Button>]}
        request={async () => ({ data: [{ id: 1, supplierName: '上海羽毛球用品批发', totalPayable: 5000, paidAmount: 2000, remainingAmount: 3000, dueDate: '2026-07-15', status: 'unpaid' }], success: true, total: 1 })}
        columns={columns} pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </PageContainer>
  );
};
