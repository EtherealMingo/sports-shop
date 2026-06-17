// @ai-generated - 全部由 AI 輔助生成
import { PageContainer, ProTable, ProCard } from '@ant-design/pro-components';
import { Row, Col, DatePicker, Select, Tag, Empty } from 'antd';
import { BarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { getDailyReport, getSupplierCompare, getWastageReport, getMonthlySummary } from '@/services/wire';
import type { ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export default () => {
  const { data: dailyData } = useRequest(() => getDailyReport(dayjs().format('YYYY-MM-DD')));
  const { data: supplierData } = useRequest(() => getSupplierCompare());
  const { data: wastageData } = useRequest(() => getWastageReport(
    dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ));
  const { data: monthlyData } = useRequest(() => getMonthlySummary(dayjs().format('YYYY-MM')));

  const dailyReport = dailyData || [];
  const supplierCompare = supplierData || [];
  const wastageReport = wastageData || [];
  const monthly = monthlyData;

  const dailyColumns: ProColumns<API.DailyReport>[] = [
    { title: '日期', dataIndex: 'date', width: 120 },
    { title: '线材', dataIndex: 'wireName', width: 160 },
    { title: '消耗量(条)', dataIndex: 'usedQty', width: 110 },
    { title: '报废量(条)', dataIndex: 'wastedQty', width: 110 },
    { title: '成本(元)', dataIndex: 'cost', width: 100,
      render: (_, record) => record.cost ? `¥${record.cost.toFixed(2)}` : '-',
    },
  ];

  const supplierColumns: ProColumns<API.SupplierCompare>[] = [
    { title: '线材', dataIndex: 'wireName', width: 160 },
    { title: '供应商', dataIndex: 'supplierName', width: 180 },
    { title: '平均单价(元)', dataIndex: 'avgPrice', width: 120,
      render: (_, record) => record.avgPrice ? `¥${record.avgPrice.toFixed(2)}` : '-',
    },
    { title: '累计采购(条)', dataIndex: 'totalQty', width: 120 },
    { title: '最近进货', dataIndex: 'lastPurchaseDate', width: 120 },
  ];

  const wastageColumns: ProColumns<API.WastageReport>[] = [
    { title: '线材', dataIndex: 'wireName', width: 160 },
    { title: '总消耗(条)', dataIndex: 'totalUsed', width: 110 },
    { title: '总报废(条)', dataIndex: 'totalWasted', width: 110 },
    {
      title: '损耗率', dataIndex: 'wastageRate', width: 100,
      render: (_, record) => {
        const rate = record.wastageRate || 0;
        const color = rate > 10 ? '#ff4d4f' : rate > 5 ? '#faad14' : '#52c41a';
        return <span style={{ color, fontWeight: 'bold' }}>{rate.toFixed(1)}%</span>;
      },
    },
  ];

  return (
    <PageContainer>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <ProCard title="本月进货成本" headerBordered>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1890ff' }}>
              ¥{(monthly?.totalPurchaseCost || 0).toFixed(2)}
            </div>
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard title="本月消耗成本" headerBordered>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#52c41a' }}>
              ¥{(monthly?.totalUsageCost || 0).toFixed(2)}
            </div>
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard title="本月报废成本" headerBordered>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#ff4d4f' }}>
              ¥{(monthly?.totalWasteCost || 0).toFixed(2)}
            </div>
          </ProCard>
        </Col>
        <Col span={6}>
          <ProCard title="本月合计成本" headerBordered>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#722ed1' }}>
              ¥{((monthly?.totalPurchaseCost || 0) + (monthly?.totalUsageCost || 0) + (monthly?.totalWasteCost || 0)).toFixed(2)}
            </div>
          </ProCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <ProCard title="日消耗统计" headerBordered extra={<BarChartOutlined />}>
            {dailyReport.length > 0 ? (
              <ProTable<API.DailyReport>
                rowKey={(r) => `${r.date}-${r.wireId}`}
                dataSource={dailyReport}
                columns={dailyColumns}
                search={false}
                pagination={false}
                size="small"
                scroll={{ x: 600 }}
              />
            ) : <Empty description="暂无今日数据" />}
          </ProCard>
        </Col>
        <Col span={12}>
          <ProCard title="供应商价格比较" headerBordered extra={<PieChartOutlined />}>
            <ProTable<API.SupplierCompare>
              rowKey={(r) => `${r.wireId}-${r.supplierId}`}
              dataSource={supplierCompare}
              columns={supplierColumns}
              search={false}
              pagination={false}
              size="small"
              scroll={{ x: 600 }}
            />
          </ProCard>
        </Col>
      </Row>

      <ProCard title="损耗率统计（近30天）" headerBordered>
        <ProTable<API.WastageReport>
          rowKey="wireId"
          dataSource={wastageReport}
          columns={wastageColumns}
          search={false}
          pagination={false}
          scroll={{ x: 600 }}
        />
      </ProCard>
    </PageContainer>
  );
};
