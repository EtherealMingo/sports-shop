import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Form, InputNumber, Input, Card, Button, message } from 'antd';
import { useRequest } from '@umijs/max';
import { getPointsRule, updatePointsRule } from '@/services/admin';
import { SaveOutlined } from '@ant-design/icons';

export default () => {
  const [form] = Form.useForm();

  const { data: rule, loading } = useRequest(getPointsRule, {
    onSuccess: (data) => {
      form.setFieldsValue(data.data);
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updatePointsRule(values);
      message.success('更新成功');
    } catch (error) {
      console.error('提交失败', error);
    }
  };

  return (
    <PageContainer loading={loading}>
      <ProCard headerBordered title="积分规则设置">
        <Card>
          <Form form={form} layout="vertical">
            <Form.Item
              label="获取比例"
              name="earnRate"
              extra="每消费1元获得的积分数"
              rules={[{ required: true, message: '请输入获取比例' }]}
            >
              <InputNumber min={1} max={100} style={{ width: 200 }} addonAfter="积分/元" />
            </Form.Item>

            <Form.Item
              label="抵扣比例"
              name="deductRate"
              extra="抵扣1元所需积分数"
              rules={[{ required: true, message: '请输入抵扣比例' }]}
            >
              <InputNumber min={1} max={100} style={{ width: 200 }} addonAfter="积分/元" />
            </Form.Item>

            <Form.Item
              label="积分有效期"
              name="validMonths"
              extra="积分获得后有效时长"
              rules={[{ required: true, message: '请输入有效期' }]}
            >
              <InputNumber min={1} max={60} style={{ width: 200 }} addonAfter="个月" />
            </Form.Item>

            <Form.Item
              label="规则说明"
              name="description"
              rules={[{ required: true, message: '请输入规则说明' }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="请输入积分规则说明,将展示给用户查看"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit}>
                保存规则
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="规则说明" style={{ marginTop: 16 }}>
          <ul>
            <li><strong>获取比例：</strong>设置消费金额与获得积分的比例，如设置1，则消费1元获得1积分</li>
            <li><strong>抵扣比例：</strong>设置积分与抵扣金额的比例，如设置10，则10积分可抵扣1元</li>
            <li><strong>积分有效期：</strong>设置积分获得后多长时间内有效，到期自动清零</li>
            <li><strong>规则说明：</strong>面向用户展示的积分规则说明，语言要简洁易懂</li>
          </ul>
        </Card>
      </ProCard>
    </PageContainer>
  );
};
