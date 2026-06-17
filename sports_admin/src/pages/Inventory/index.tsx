// @ai-generated - 全部由 AI 輔助生成
import { PageContainer, ProTable, StatisticCard } from '@ant-design/pro-components';
import { Row, Col, Tag } from 'antd';
import { AlertOutlined, BuildOutlined, AppstoreOutlined, DollarOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { getInventoryList, getLowStockItems } from '@/services/wire';
import type { ProColumns } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  const { data: inventoryData, loading: inventoryLoading } = useRequest(getInventoryList);
  const { data: lowStockData, loading: lowStockLoading } = useRequest(getLowStockItems);

  const inventory = inventoryData?.data || [];
  const lowStockItems = lowStockData?.data || [];

  const totalTypes = inventory.length;
  const totalStock = inventory.reduce((sum, i) => sum + (i.currentStock || 0), 0);
  const totalValue = inventory.reduce((sum, i) => sum + (i.currentStock || 0) * (i.avgCost || 0), 0);
  const lowStockCount = lowStockItems.length;

  const columns: ProColumns<API.InventoryItem>[] = [
    { title: '品牌', dataIndex: 'brand', width: 120 },
    { title: '型号', dataIndex: 'model', width: 120 },
    { title: '总进货(条)', dataIndex: 'totalPurchased', width: 110 },
    { title: '总消耗(条)', dataIndex: 'totalUsed', width: 110 },
    { title: '总报废(条)', dataIndex: 'totalWasted', width: 110 },
    {
      title: '实时库存(条)', dataIndex: 'currentStock', width: 120,
      render: (_, record) => (
        <span style={{ color: record.isLowStock ? '#ff4d4f' : '#52c41a', fontWeight: 'bold' }}>
          {record.currentStock ?? 0}
          {record.isLowStock && <Tag color="error" style={{ marginLeft: 8 }}>低库存</Tag>}
        </span>
      ),
    },
    {
      title: '加权均价(元)', dataIndex: 'avgCost', width: 120,
      render: (_, record) => record.avgCost ? `¥${record.avgCost.toFixed(2)}` : '-',
    },
    {
      title: '库存价值(元)', width: 120,
      render: (_, record) => {
        const value = (record.currentStock || 0) * (record.avgCost || 0);
        return `¥${value.toFixed(2)}`;
      },
    },
  ];

  return (
    <PageContainer loading={inventoryLoading || lowStockLoading}>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <StatisticCard statistic={{
            title: '线材种类', value: totalTypes,
            icon: <AppstoreOutlined style={{ color: '#1890ff' }} />,
          }} />
        </Col>
        <Col span={6}>
          <StatisticCard statistic={{
            title: '库存总量', value: totalStock,
            icon: <BuildOutlined style={{ color: '#52c41a' }} />,
          }} />
        </Col>
        <Col span={6}>
          <StatisticCard statistic={{
            title: '库存总值', value: `¥${totalValue.toFixed(2)}`,
            icon: <DollarOutlined style={{ color: '#faad14' }} />,
          }} />
        </Col>
        <Col span={6}>
          <StatisticCard statistic={{
            title: '低库存预警', value: lowStockCount,
            icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
          }} />
        </Col>
      </Row>

      <ProTable<API.InventoryItem>
        headerTitle="库存明细"
        rowKey="wireId"
        search={false}
        dataSource={inventory}
        columns={columns}
        scroll={{ x: 1100 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </PageContainer>
  );
};
