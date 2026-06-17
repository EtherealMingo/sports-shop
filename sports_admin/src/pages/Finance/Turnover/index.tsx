import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Select, Statistic } from 'antd';

export default () => {
  const data = [
    { name: 'Yonex BG-80', stock: 28, turnover: 45, status: 'normal' },
    { name: 'Luxilon ALU Power', stock: 2, turnover: 90, status: 'low' },
    { name: 'Wilson Sensation', stock: 4, turnover: 60, status: 'low' },
  ];

  return (
    <PageContainer>
      <ProCard title="库存周转率" headerBordered style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <Statistic title="平均周转天数" value={65} suffix="天" />
          <Statistic title="滞销品种" value={2} suffix="种" />
        </div>
        <Select defaultValue="30" style={{ width: 120 }} options={[{ value: '30', label: '近30天' }, { value: '90', label: '近90天' }]} />
      </ProCard>

      <ProCard title="各线材周转" headerBordered>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={{ padding: 12, textAlign: 'left' }}>线材</th>
              <th style={{ padding: 12, textAlign: 'left' }}>当前库存</th>
              <th style={{ padding: 12, textAlign: 'left' }}>周转天数</th>
              <th style={{ padding: 12, textAlign: 'left' }}>状态</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, i: number) => (
              <tr key={i}>
                <td style={{ padding: 12 }}>{row.name}</td>
                <td style={{ padding: 12 }}>{row.stock}</td>
                <td style={{ padding: 12 }}>{row.turnover}天</td>
                <td style={{ padding: 12 }}>
                  <span style={{ color: row.status === 'low' ? '#ff4d4f' : '#52c41a' }}>
                    {row.status === 'low' ? '滞销' : '正常'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ProCard>
    </PageContainer>
  );
};
