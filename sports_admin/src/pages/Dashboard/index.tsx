import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Row, Col, Card, List, Tag, Typography } from 'antd';
import {
  UserOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  BuildOutlined,
  AlertOutlined,
  RiseOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Statistic } = StatisticCard;

export default () => {
  return (
    <PageContainer>
      <Title level={4} style={{ marginBottom: 24 }}>数据概览</Title>

      {/* 核心指标卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '会员总数',
              value: 128,
              icon: <UserOutlined style={{ color: '#1890ff' }} />,
              description: <><RiseOutlined /> 今日 +3</>,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '今日新增',
              value: 3,
              icon: <UserOutlined style={{ color: '#52c41a' }} />,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '今日积分发放',
              value: 580,
              icon: <GiftOutlined style={{ color: '#faad14' }} />,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '今日积分扣除',
              value: 320,
              icon: <GiftOutlined style={{ color: '#ff4d4f' }} />,
            }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '今日预约',
              value: 5,
              icon: <ShoppingCartOutlined style={{ color: '#13c2c2' }} />,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '今日核销',
              value: 3,
              icon: <ShoppingCartOutlined style={{ color: '#722ed1' }} />,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '线材种类',
              value: 8,
              icon: <BuildOutlined style={{ color: '#eb2f96' }} />,
            }}
          />
        </Col>
        <Col span={6}>
          <StatisticCard
            statistic={{
              title: '低库存预警',
              value: 2,
              icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
              description: <span style={{ color: '#ff4d4f' }}>需要补货</span>,
            }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 快捷操作 */}
        <Col span={12}>
          <ProCard title="快捷操作" headerBordered>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card hoverable style={{ textAlign: 'center' }}>
                  <UserOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  <div style={{ marginTop: 8 }}>会员管理</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable style={{ textAlign: 'center' }}>
                  <GiftOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                  <div style={{ marginTop: 8 }}>积分管理</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card hoverable style={{ textAlign: 'center' }}>
                  <ShoppingCartOutlined style={{ fontSize: 32, color: '#faad14' }} />
                  <div style={{ marginTop: 8 }}>预约管理</div>
                </Card>
              </Col>
            </Row>
          </ProCard>
        </Col>

        {/* 近期动态 */}
        <Col span={12}>
          <ProCard title="近期动态" headerBordered>
            <List
              size="small"
              dataSource={[
                { title: '新会员注册', name: '张三', time: '10分钟前' },
                { title: '积分兑换', name: '李四', time: '30分钟前', item: '运动毛巾' },
                { title: '预约确认', name: '王五', time: '1小时前', service: '羽毛球拍缠线' },
                { title: '线材入库', name: 'Yonex BG-80', time: '2小时前', qty: '20条' },
                { title: '积分补赠', name: '赵六', time: '3小时前', points: '100分' },
              ]}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <div>
                        <Text type="secondary">{item.name}</Text>
                        {item.item && <Tag style={{ marginLeft: 8 }}>{item.item}</Tag>}
                        {item.service && <Tag style={{ marginLeft: 8 }}>{item.service}</Tag>}
                        {item.qty && <Tag style={{ marginLeft: 8 }}>{item.qty}</Tag>}
                        {item.points && <Tag color="gold" style={{ marginLeft: 8 }}>{item.points}</Tag>}
                        <Text type="secondary" style={{ marginLeft: 16 }}>{item.time}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};
