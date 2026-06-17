import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Button, Tag, Timeline, Steps, message, Modal, Form, Input, Empty } from 'antd';
import {
    CheckCircleOutlined,
    InboxOutlined,
    ReloadOutlined,
    ToolOutlined,
    CheckSquareOutlined,
    ShoppingOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { history, useParams } from '@umijs/max';
import { getAppointments, updateServiceProgress } from '@/services/admin';

const { TextArea } = Input;

// 状态配置
const statusConfig: Record<string, { text: string; color: string; icon: any; description: string }> = {
    pending: {
        text: '待确认',
        color: '#FF9500',
        icon: <ClockCircleOutlined />,
        description: '用户提交预约，等待商家确认',
    },
    confirmed: {
        text: '已确认',
        color: '#007AFF',
        icon: <CheckCircleOutlined />,
        description: '商家已确认预约，等待用户送拍',
    },
    received: {
        text: '已收件',
        color: '#5856D6',
        icon: <InboxOutlined />,
        description: '已收到用户球拍',
    },
    in_progress: {
        text: '缠线中',
        color: '#FF6B35',
        icon: <ReloadOutlined />,
        description: '正在进行缠线服务',
    },
    completed: {
        text: '已完成',
        color: '#34C759',
        icon: <ToolOutlined />,
        description: '缠线服务已完成，等待取件',
    },
    delivered: {
        text: '已取件',
        color: '#8E8E93',
        icon: <ShoppingOutlined />,
        description: '用户已取走球拍，服务完成',
    },
    cancelled: {
        text: '已取消',
        color: '#FF3B30',
        icon: <CloseCircleOutlined />,
        description: '预约已取消',
    },
};

// 完整流程
const fullFlow = ['pending', 'confirmed', 'received', 'in_progress', 'completed', 'delivered'];

export default () => {
    const { id } = useParams<{ id: string }>();
    const [appointment, setAppointment] = useState<API.Appointment | null>(null);
    const [loading, setLoading] = useState(false);
    const [progressModalOpen, setProgressModalOpen] = useState(false);
    const [progressForm] = Form.useForm();

    useEffect(() => {
        loadAppointmentDetail();
    }, [id]);

    const loadAppointmentDetail = async () => {
        setLoading(true);
        try {
            const res = await getAppointments({ current: 1, pageSize: 100 });
            const list = res.data || [];
            const item = list.find((a: API.Appointment) => a.id === Number(id));
            if (item) {
                setAppointment(item);
            } else {
                message.error('未找到预约信息');
                history.push('/appointment');
            }
        } catch (error) {
            message.error('加载失败');
        } finally {
            setLoading(false);
        }
    };

    // 获取当前进度在流程中的位置
    const getCurrentStepIndex = () => {
        if (!appointment) return -1;
        if (appointment.status === 'cancelled') return -1;
        return fullFlow.indexOf(appointment.status);
    };

    // 推进到下一步
    const handleNextStep = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex < fullFlow.length - 1) {
            const nextStatus = fullFlow[currentIndex + 1] as API.ServiceStatus;
            progressForm.setFieldsValue({
                status: nextStatus,
                description: statusConfig[nextStatus].description,
                operator: '',
            });
            setProgressModalOpen(true);
        }
    };

    // 提交进度更新
    const handleSubmitProgress = async () => {
        const values = await progressForm.validateFields();
        if (appointment) {
            await updateServiceProgress(appointment.id, values);
            message.success('进度更新成功');
            setProgressModalOpen(false);
            loadAppointmentDetail();
        }
    };

    // 取消预约
    const handleCancel = () => {
        Modal.confirm({
            title: '确认取消预约',
            content: '确定要取消该预约吗？取消后无法恢复。',
            okText: '确认取消',
            okType: 'danger',
            cancelText: '返回',
            onOk: async () => {
                if (appointment) {
                    await updateServiceProgress(appointment.id, {
                        status: 'cancelled',
                        description: '商家取消预约',
                        operator: '商家',
                    });
                    message.success('预约已取消');
                    loadAppointmentDetail();
                }
            },
        });
    };

    if (!appointment) {
        return (
            <PageContainer>
                <Empty description="加载中..." />
            </PageContainer>
        );
    }

    const currentStepIndex = getCurrentStepIndex();
    const isCancelled = appointment.status === 'cancelled';
    const isCompleted = appointment.status === 'delivered';

    return (
        <PageContainer
            header={{
                title: '服务进度管理',
                breadcrumb: {
                    items: [
                        { title: '预约管理', path: '/appointment' },
                        { title: '服务进度' },
                    ],
                },
            }}
            extra={[
                <Button key="back" icon={<ArrowLeftOutlined />} onClick={() => history.push('/appointment')}>
                    返回列表
                </Button>,
            ]}
        >
                        {/* 预约信息 */}
            <ProCard loading={loading} title="预约信息">
                <ProDescriptions
                    column={4}
                    dataSource={appointment}
                    columns={[
                        { title: '预约ID', dataIndex: 'id' },
                        { title: '会员姓名', dataIndex: 'memberName' },
                        { title: '会员手机', dataIndex: 'memberPhone' },
                        {
                            title: '服务类型',
                            dataIndex: 'serviceType',
                            render: (val) => (
                                <Tag color={val === 'badminton' ? 'blue' : 'green'}>
                                    {val === 'badminton' ? '羽毛球拍缠线' : '网球拍缠线'}
                                </Tag>
                            ),
                        },
                        { title: '预约日期', dataIndex: 'appointmentDate' },
                        { title: '预约时段', dataIndex: 'timeSlot' },
                        { title: '球拍数量', dataIndex: 'racketCount' },
                        {
                            title: '当前状态',
                            dataIndex: 'status',
                            render: (val) => (
                                <Tag
                                    color={statusConfig[val]?.color}
                                    style={{ fontSize: 14, padding: '4px 12px' }}
                                >
                                    {statusConfig[val]?.icon} {statusConfig[val]?.text}
                                </Tag>
                            ),
                        },
                        { title: '特殊要求', dataIndex: 'requirements', span: 2 },
                    ]}
                />
            </ProCard>
            {/* 进度记录 - 横向 Steps */}
            <ProCard
                title="进度记录"
                style={{ marginTop: 24 }}
                extra={
                    !isCancelled && !isCompleted && (
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button type="primary" onClick={handleNextStep}>
                                推进到下一步
                            </Button>
                            <Button danger onClick={handleCancel}>
                                取消预约
                            </Button>
                        </div>
                    )
                }
            >
                {isCancelled ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                        <CloseCircleOutlined style={{ fontSize: 48, color: '#FF3B30', marginBottom: 16 }} />
                        <div style={{ fontSize: 16 }}>该预约已取消</div>
                    </div>
                ) : (
                    <>
                        <Steps
                            current={currentStepIndex}
                            labelPlacement="vertical"
                            style={{ marginTop: 16, marginBottom: 32 }}
                            items={fullFlow.map((status, index) => {
                                const config = statusConfig[status];
                                const stepStatus = index < currentStepIndex
                                    ? 'finish'
                                    : index === currentStepIndex
                                        ? 'process'
                                        : 'wait';
                                // 已完成或进行中时显示对应状态背景色，等待状态显示灰色
                                const bgColor = stepStatus === 'finish' || stepStatus === 'process'
                                    ? config.color
                                    : '#d9d9d9';
                                return {
                                    title: config.text,
                                    description: config.description,
                                    icon: (
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                backgroundColor: bgColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: 16,
                                            }}
                                        >
                                            {config.icon}
                                        </div>
                                    ),
                                    status: stepStatus,
                                };
                            })}
                        />
                    </>
                )}
            </ProCard>





            {/* 进度更新弹窗 */}
            <Modal
                title="更新服务进度"
                open={progressModalOpen}
                onOk={handleSubmitProgress}
                onCancel={() => setProgressModalOpen(false)}
                width={500}
            >
                <Form form={progressForm} layout="vertical">
                    <Form.Item label="新状态" name="status" rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="进度说明" name="description" rules={[{ required: true, message: '请输入进度说明' }]}>
                        <TextArea rows={3} placeholder="请输入进度说明" />
                    </Form.Item>
                    <Form.Item label="操作人" name="operator" rules={[{ required: true, message: '请输入操作人' }]}>
                        <Input placeholder="请输入操作人姓名" />
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer>
    );
};
