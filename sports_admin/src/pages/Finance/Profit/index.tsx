// @ai-generated - 全部由 AI 輔助生成
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { DatePicker, Select, Statistic } from 'antd';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default () => {
  const [period, setPeriod] = useState({ start: '2026-06-01', end: '2026-06-30' });

  const data = [
    { type: '羽毛球拍缠线', revenue: 5000, cost: 1500, profit: 3500, margin: 70, orders: 62 },
    { type: '网球拍缠线', revenue: 3000, cost: 1000, profit: 2000, margin: 66.7, orders: 30 },
  ];

  const columns: ColumnsType<any> = [
    { title: '服务类型', dataIndex: 'type', width: 150 },
    { title: '收入(元)', dataIndex: 'revenue', width: 100 },
    { title: '材料成本(元)', dataIndex: 'cost', width: 120 },
    { title: '毛利(元)', dataIndex: 'profit', width: 100 },
    { title: '毛利率(%)', dataIndex: 'margin', width: 100 },
    { title: '订单数', dataIndex: 'orders', width: 80 },
  ];

  return (
    <PageContainer>
      <ProCard title="月度汇总" headerBordered style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
          <RangePicker defaultValue={[dayjs('2026-06-01'), dayjs('2026-06-30')]} onChange={(dates: any) => setPeriod({ start: dates?.[0]?.format('YYYY-MM-DD'), end: dates?.[1]?.format('YYYY-MM-DD') })} />
          <Select defaultValue="month" style={{ width: 120 }} options={[{ value: 'month', label: '按月' }, { value: 'week', label: '按周' }]} />
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <ProCard><Statistic title="总收入" value={8000} precision={2} /></ProCard>
          <ProCard><Statistic title="总成本" value={2500} precision={2} /></ProCard>
          <ProCard><Statistic title="总利润" value={5500} precision={2} /></ProCard>
          <ProCard><Statistic title="总订单" value={92} /></ProCard>
        </div>
      </ProCard>

      <ProCard title="服务毛利分析" headerBordered>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {columns.map((col: any) => <th key={col.dataIndex} style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #f0f0f0' }}>{col.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, i: number) => (
              <tr key={i}>
                {columns.map((col: any) => <td key={col.dataIndex} style={{ padding: 12, borderBottom: '1px solid #f0f0f0' }}>{row[col.dataIndex]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </ProCard>
    </PageContainer>
  );
};
