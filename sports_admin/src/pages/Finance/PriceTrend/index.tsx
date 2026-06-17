import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Select } from 'antd';

export default () => {
  const data = [
    { date: '2026-06-01', price: 15.00, supplier: '上海羽毛球用品批发' },
    { date: '2026-06-10', price: 16.00, supplier: '上海羽毛球用品批发' },
    { date: '2026-06-15', price: 15.50, supplier: '北京体育器材中心' },
  ];

  return (
    <PageContainer>
      <ProCard title="价格趋势" headerBordered>
        <div style={{ marginBottom: 16 }}>
          <Select defaultValue="1" style={{ width: 200 }} options={[{ value: '1', label: 'Yonex BG-80' }, { value: '2', label: 'Luxilon ALU Power' }]} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={{ padding: 12, textAlign: 'left' }}>日期</th>
              <th style={{ padding: 12, textAlign: 'left' }}>价格(元)</th>
              <th style={{ padding: 12, textAlign: 'left' }}>供应商</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, i: number) => (
              <tr key={i}>
                <td style={{ padding: 12 }}>{row.date}</td>
                <td style={{ padding: 12 }}>¥{row.price.toFixed(2)}</td>
                <td style={{ padding: 12 }}>{row.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ProCard>
    </PageContainer>
  );
};
