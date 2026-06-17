import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Modal, message } from 'antd';
import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    { title: '批次号', dataIndex: 'batchNo', width: 160 },
    { title: '线材', dataIndex: 'wireName', width: 160 },
    { title: '供应商', dataIndex: 'supplierName', width: 160 },
    { title: '数量(条)', dataIndex: 'quantity', width: 100 },
    { title: '已生成', dataIndex: 'generated', width: 100 },
    { title: '状态', dataIndex: 'status', width: 100,
      render: (_: any, record: any) => (
        <Tag color={record.generated > 0 ? 'green' : 'default'}>
          {record.generated > 0 ? '已生成' : '待生成'}
        </Tag>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (_: any, record: any) => [
        <Button key="generate" type="link" size="small" icon={<PlusOutlined />}
          onClick={() => handleGenerate(record)}>
          生成二维码
        </Button>,
        <Button key="print" type="link" size="small" icon={<PrinterOutlined />}
          onClick={() => handlePrint(record)}
          disabled={!record.generated}>
          打印
        </Button>,
      ],
    },
  ];

  const handleGenerate = (record: any) => {
    Modal.confirm({
      title: '生成二维码',
      content: `确定要为 ${record.wireName} (${record.batchNo}) 生成 ${record.quantity} 个二维码吗？`,
      onOk: () => {
        message.success(`已生成 ${record.quantity} 个二维码`);
        actionRef.current?.reload();
      },
    });
  };

  const handlePrint = (record: any) => {
    message.success('正在打印二维码标签...');
  };

  return (
    <PageContainer>
      <ProTable
        headerTitle="二维码管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 80 }}
        toolBarRender={() => []}
        request={async () => {
          return {
            data: [
              { id: 1, batchNo: 'YNX-20260601-001', wireName: 'Yonex BG-80', supplierName: '上海羽毛球用品批发', quantity: 20, generated: 20, status: 'generated' },
              { id: 2, batchNo: 'YNX-20260610-001', wireName: 'Yonex BG-80', supplierName: '上海羽毛球用品批发', quantity: 15, generated: 0, status: 'pending' },
            ],
            success: true,
            total: 2,
          };
        }}
        columns={columns}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </PageContainer>
  );
};
