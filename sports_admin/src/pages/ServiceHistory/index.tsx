import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    { title: '服务日期', dataIndex: 'serviceDate', width: 120 },
    { title: '会员', dataIndex: 'memberName', width: 100 },
    { title: '球拍', dataIndex: 'racket', width: 150, render: (_: any, r: any) => `${r.racketBrand} ${r.racketModel}` },
    { title: '线材', dataIndex: 'wireName', width: 120 },
    { title: '磅数', dataIndex: 'tension', width: 80 },
    { title: '费用(元)', dataIndex: 'cost', width: 100 },
    { title: '技师', dataIndex: 'technicianName', width: 100 },
    { title: '评分', dataIndex: 'rating', width: 80, render: (_: any, r: any) => r.rating ? `${r.rating}★` : '-' },
  ];

  return (
    <PageContainer>
      <ProTable headerTitle="服务历史" actionRef={actionRef} rowKey="id" search={{ labelWidth: 80 }}
        request={async () => ({ data: [{ id: 1, serviceDate: '2026-06-15', memberName: '张三', racketBrand: 'Yonex', racketModel: 'NR-900', wireName: 'Yonex BG-80', tension: 26, cost: 80, technicianName: '张师傅', rating: 5 }], success: true, total: 1 })}
        columns={columns} pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </PageContainer>
  );
};
