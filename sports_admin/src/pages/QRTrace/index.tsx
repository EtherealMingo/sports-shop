import { PageContainer, ProTable, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Input, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Statistic } = StatisticCard;

export default () => {
  const [qrCode, setQrCode] = useState('');

  return (
    <PageContainer>
      <ProCard title="线材追溯" headerBordered style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="输入或扫描二维码"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          enterButton={<><SearchOutlined /> 查询</>}
          onSearch={(value) => setQrCode(value)}
          style={{ width: 400 }}
        />
      </ProCard>

      {qrCode && (
        <>
          <ProCard title="线材信息" headerBordered style={{ marginBottom: 16 }}>
            <Statistic title="线材" value="Yonex BG-80" />
            <Statistic title="批次" value="YNX-20260601-001" />
            <Statistic title="供应商" value="上海羽毛球用品批发" />
            <Statistic title="卷号" value="3/20" />
          </ProCard>

          <ProTable
            headerTitle="使用记录"
            rowKey="id"
            request={async () => ({
              data: [
                { id: 1, action: '开始服务', operator: '张师傅', time: '2026-06-15 14:00:00', serviceId: 'ORD-20260615-001' },
                { id: 2, action: '结束服务', operator: '张师傅', time: '2026-06-15 15:30:00', serviceId: 'ORD-20260615-001' },
              ],
              success: true,
              total: 2,
            })}
            columns={[
              { title: '动作', dataIndex: 'action', width: 120 },
              { title: '操作人', dataIndex: 'operator', width: 120 },
              { title: '时间', dataIndex: 'time', width: 180 },
              { title: '关联服务', dataIndex: 'serviceId', width: 150 },
            ]}
            pagination={false}
          />
        </>
      )}

      {!qrCode && (
        <ProCard>
          <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
            <SearchOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>请输入或扫描二维码查询线材信息</div>
          </div>
        </ProCard>
      )}
    </PageContainer>
  );
};
